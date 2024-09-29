import FormInput, { Option } from "../components/FormInput";
import { LanguageCodeEnum, WordTypeEnum } from "../models";
import { getLanguageLongName, getWordTypeName } from "../utils";

export default function NewWordPage() {
  const languageOptions = Object.values(LanguageCodeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== LanguageCodeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getLanguageLongName(enumValue),
      })
    );

  const typeOptions = Object.values(WordTypeEnum)
    .filter(
      (enumValue) =>
        typeof enumValue === "number" && enumValue !== WordTypeEnum.None
    )
    .map(
      (enumValue): Option => ({
        value: enumValue,
        name: getWordTypeName(enumValue),
      })
    );

  return (
    <>
      <h1 className="text-center">Create a new word!</h1>
      <form className="p-4 px-12 flex flex-col gap-4">
        <FormInput
          id="language"
          name="language"
          type="select"
          className="-mb-3"
          options={languageOptions}
        >
          Language:
        </FormInput>

        <FormInput
          id="type"
          name="type"
          type="select"
          options={typeOptions}
          className="-mb-3"
        >
          Type:
        </FormInput>

        <FormInput id="article" name="article" className="-mb-3">
          Article:
        </FormInput>

        <FormInput id="wordText" name="text" className="-mb-3">
          Text:
        </FormInput>

        <FormInput id="plural" name="plural" className="-mb-3">
          Plural:
        </FormInput>

        <FormInput id="conjugation" name="conjugation" className="-mb-3">
          Conjugation:
        </FormInput>

        <button
          type="submit"
          className="w-1/4 p-1 mt-4 place-self-center bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
        >
          Save
        </button>
      </form>
    </>
  );
}
