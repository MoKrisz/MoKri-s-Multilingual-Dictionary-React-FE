import { Link } from "react-router-dom";
import ColumnOrderIcon from "../../../components/ColumnOrderIcon";
import { getLanguageName, getWordTypeNameKey } from "../utils";
import { BsPencilFill } from "react-icons/bs";
import { ColumnOrderEnum } from "../../../models/ColumnOrderEnum";
import { Word } from "../models";
import { ODataDisplayComponentWithSortingProps } from "../../../components/ODataContainer";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

export type WordSorting = {
  article: ColumnOrderEnum;
  text: ColumnOrderEnum;
  type: ColumnOrderEnum;
  languageCode: ColumnOrderEnum;
};

type WordSortingKeys = keyof WordSorting;

const WordOdataTable: React.FC<
  ODataDisplayComponentWithSortingProps<Word, WordSorting>
> = ({ data: words, isPending, isError, sortingState, setSortingState }) => {
  const { t } = useTranslation(["common", "words"]);
  if (isPending) return <p>{t("words:getWords")}</p>;
  if (isError) return <p>{t("words:errorGetWords")}</p>;

  const changeSorting = (column: WordSortingKeys) => {
    setSortingState((prevSort) => {
      const newSort = { ...prevSort };

      if (newSort[column] === ColumnOrderEnum.NoSort) {
        newSort[column] = ColumnOrderEnum.Ascending;
      } else if (newSort[column] === ColumnOrderEnum.Ascending) {
        newSort[column] = ColumnOrderEnum.Descending;
      } else {
        newSort[column] = ColumnOrderEnum.NoSort;
      }

      return newSort;
    });
  };

  return (
    <table className="w-full mt-5 border border-border-secondary">
      <thead className="bg-background-secondary">
        <tr>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>{t("words:article")}</span>
              <ColumnOrderIcon
                sortingState={sortingState["article"]}
                clickHandler={() => changeSorting("article")}
              />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>{t("words:word")}</span>
              <ColumnOrderIcon
                sortingState={sortingState["text"]}
                clickHandler={() => changeSorting("text")}
              />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>{t("words:type")}</span>
              <ColumnOrderIcon
                sortingState={sortingState["type"]}
                clickHandler={() => changeSorting("type")}
              />
            </div>
          </th>
          <th className="border border-black">
            <div className="flex items-center justify-between mx-4 my-2">
              <span>{t("words:language")}</span>
              <ColumnOrderIcon
                sortingState={sortingState["languageCode"]}
                clickHandler={() => changeSorting("languageCode")}
              />
            </div>
          </th>
          <th className="border border-black"></th>
        </tr>
      </thead>
      <tbody>
        {words &&
          words.data.map((word, idx) => (
            <tr
              key={word.wordId}
              className={
                idx % 2 == 0
                  ? "bg-background-tertiary"
                  : "bg-background-quaternary"
              }
            >
              <td className="border border-black text-center">
                {word.article}
              </td>
              <td className="border border-black text-center">{word.text}</td>
              <td className="border border-black text-center">
                {t(`partsOfSpeech.${getWordTypeNameKey(word.type)}`)}
              </td>
              <td className="border border-black text-center">
                {getLanguageName(word.languageCode)}
              </td>
              <td className="border border-black p-1">
                <Link
                  to={`${word.wordId}`}
                  className="inline-block align-middle"
                >
                  <Button extraStyle="p-1">
                    <BsPencilFill className="" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default WordOdataTable;
