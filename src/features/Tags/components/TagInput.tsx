import React, { KeyboardEvent, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { Tag } from "../models";
import { getClosesMatchingTag } from "../api";
import AutofillInput from "../../../components/AutofillInput";
import { twMerge } from "tailwind-merge";

export interface TagInputProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
  extraStyle?: string;
  allowNewElements?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  extraStyle,
  allowNewElements = true,
}) => {
  const [inputState, setInputState] = useState("");
  const [freezeListDisplay, setFreezeListDisplay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTag = (tag: Tag) => {
    const modifiedTags = tags.filter((t) => t.text !== tag.text);

    onChange(modifiedTags);
  };

  const addNewTag = (
    tag: Tag,
    setInputState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const tagsWithNewTag = [...tags, tag];
    onChange(tagsWithNewTag);
    setInputState("");
    setFreezeListDisplay(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && allowNewElements) {
      event.preventDefault();

      const trimmedText = inputState.trim().toLowerCase();
      if (!trimmedText) {
        return;
      }

      if (!tags.some((tag) => tag.text.toLowerCase() === trimmedText)) {
        addNewTag({ tagId: null, text: trimmedText }, setInputState);
      } else {
        setInputState("");
        setFreezeListDisplay(true);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const renderListItem = (tag: Tag) => {
    return (
      <li
        key={`tag-autofill-${tag.tagId}`}
        className="p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => {
          if (!tags.some((t) => t.tagId === tag.tagId)) {
            addNewTag(tag, setInputState);
          } else {
            setInputState("");
            setFreezeListDisplay(true);
          }
        }}
      >
        {tag.text}
      </li>
    );
  };

  const renderTagItem = (tag: Tag) => {
    return (
      <div
        key={`tag_${tag.tagId}_${tag.text}`}
        className="flex items-center px-1 rounded h-6 bg-complementary-background-primary text-complementary-text"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="text-sm">{tag.text}</span>
        <button
          type="button"
          className="ml-2 transition-colors duration-200 hover:text-white"
          onClick={() => {
            handleDeleteTag(tag);
          }}
        >
          <CgClose className="size-3" />
        </button>
      </div>
    );
  };

  const handleInputValue = (value: string) => {
    setInputState(value);
    setFreezeListDisplay(false);
  };

  return (
    <div
      className={twMerge(
        "flex flex-wrap items-start content-start gap-2 p-1 h-full rounded-lg cursor-text overflow-y-auto bg-input-background",
        extraStyle
      )}
      onClick={handleContainerClick}
    >
      {tags.map((tag) => renderTagItem(tag))}
      <AutofillInput
        style="flex-grow bg-transparent outline-none"
        inputValue={inputState}
        setInputValue={handleInputValue}
        inputRef={inputRef}
        queryKeys={["tag"]}
        getAutofillData={(values) =>
          getClosesMatchingTag(values.input, values.signal)
        }
        placeholder="Add tag..."
        renderItem={renderListItem}
        handleKeyDown={handleKeyDown}
        freezeListDisplay={freezeListDisplay}
      />
    </div>
  );
};

export default TagInput;
