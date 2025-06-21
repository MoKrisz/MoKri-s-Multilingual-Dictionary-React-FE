import { useState } from "react";
import { Tag } from "../Words/models";
import { CgClose } from "react-icons/cg";

export interface TagInputProps {
  tags?: Tag[];
}

const TagInput: React.FC<TagInputProps> = ({ tags }) => {
  const [tagsState, setTagsState] = useState<Tag[]>(
    tags ?? [
      { tagId: 1, text: "asd" },
      { tagId: 2, text: "asd2" },
    ]
  );

  return (
    <div className="flex flex-wrap items-start content-start gap-2 p-1 h-full bg-slate-100 rounded-lg cursor-text overflow-y-auto">
      {tagsState.map((tag) => (
        <div
          key={`tag_${tag.tagId}`}
          className="flex items-center px-1 rounded bg-slate-300 h-6"
        >
          <span className="text-sm">{tag.text}</span>
          <button
            type="button"
            className="mx-1 p-0.5 bg-red-600 rounded-lg text-white hover:bg-red-500"
          >
            <CgClose className="size-3" />
          </button>
        </div>
      ))}
      <input className="flex-grow bg-transparent outline-none" />
    </div>
  );
};

export default TagInput;
