import { Link } from "react-router-dom";
import ColumnOrderIcon from "../../../components/ColumnOrderIcon";
import { Word } from "../models";
import { getLanguageName, getWordTypeName } from "../utils";
import { BsPencilFill } from "react-icons/bs";

interface WordOdataTableParams {
  words: Word[]
}

export default function WordOdataTable({words}: WordOdataTableParams) {
  return (
    <table className="w-full mt-5 border border-black">
      <thead className="bg-lincolngreen">
        <tr>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Article</span> <ColumnOrderIcon />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Word</span> <ColumnOrderIcon />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Type</span> <ColumnOrderIcon />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>Language</span> <ColumnOrderIcon />
            </div>
          </th>
          <th className="border border-black"></th>
        </tr>
      </thead>
      <tbody>
        {words.map((word) => (
          <tr key={word.wordId} className="bg-lincolngreenlighter">
            <td className="border border-black text-center">{word.article}</td>
            <td className="border border-black text-center">{word.text}</td>
            <td className="border border-black text-center">
              {getWordTypeName(word.type)}
            </td>
            <td className="border border-black text-center">
              {getLanguageName(word.languageCode)}
            </td>
            <td className="border border-black p-1">
              <Link
                to={`word/${word.wordId}`}
                className="inline-block align-middle"
              >
                <BsPencilFill className="p-1 h-7 w-8 border border-black rounded-lg bg-green-900 fill-white hover:bg-green-600" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
