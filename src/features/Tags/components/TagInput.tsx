import React, { KeyboardEvent, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Tag } from "../models";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../hooks/useDebounce";
import { getClosesMatchingTag } from "../api";

export interface TagInputProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputState, setInputState] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedInput = useDebounce(inputState, 200);

  const { data } = useQuery({
    queryKey: ["tag", "autofill", debouncedInput],
    queryFn: ({ signal }) => getClosesMatchingTag(debouncedInput, signal),
    staleTime: 120000,
    enabled: !!debouncedInput,
  });

  const handleDeleteTag = (tag: Tag) => {
    const modifiedTags = tags.filter((t) => t.text !== tag.text);

    onChange(modifiedTags);
  };

  const addNewTag = (tag: Tag) => {
    const tagsWithNewTag = [...tags, tag];
    onChange(tagsWithNewTag);

    setInputState("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const trimmedText = inputState?.trim().toLowerCase();
      if (!trimmedText) {
        return;
      }

      if (tags.some((tag) => tag.text.toLowerCase() === trimmedText)) {
        setInputState("");
      } else {
        addNewTag({ tagId: null, text: trimmedText });
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-wrap items-start content-start gap-2 p-1 h-full bg-slate-100 rounded-lg cursor-text overflow-y-auto"
      onClick={handleContainerClick}
    >
      {tags.map((tag) => (
        <div
          key={`tag_${tag.tagId}_${tag.text}`}
          className="flex items-center px-1 rounded bg-slate-300 h-6"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span className="text-sm">{tag.text}</span>
          <button
            type="button"
            className="mx-1 p-0.5 bg-red-600 rounded-lg text-white hover:bg-red-500"
            onClick={() => {
              handleDeleteTag(tag);
            }}
          >
            <CgClose className="size-3" />
          </button>
        </div>
      ))}
      <div>
        <input
          ref={inputRef}
          type="text"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent outline-none"
          placeholder="Add tag..."
        />
        {data && (
          <ul className="absolute bg-white border border-gray-300 mt-1 rounded shadow-2xl">
            <li
              key={`tag-autofill-${data.tagId}`}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                if (!tags.some((t) => t.tagId === data.tagId)) {
                  addNewTag(data);
                } else {
                  setInputState("");
                }
              }}
            >
              {data.text}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TagInput;
