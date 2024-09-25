import FormInput from "../components/FormInput";

export default function NewWordPage() {
  return (
    <>
      <h1 className="text-center">Create a new word!</h1>
      <form className="p-4 px-12 flex flex-col gap-4">
        <FormInput id="article" name="article" className="-mb-3">
          Article:
        </FormInput>

        <FormInput id="wordText" name="text" className="-mb-3">
          Text:
        </FormInput>

        <FormInput id="plural" name="plural" className="-mb-3">
          Plural:
        </FormInput>

        <FormInput id="type" name="type" className="-mb-3">
          Type:
        </FormInput>

        <FormInput id="conjugation" name="conjugation" className="-mb-3">
          Conjugation:
        </FormInput>

        <FormInput id="language" name="language" className="-mb-3">
          Language:
        </FormInput>

        <button type="submit" className="w-1/4 p-1 mt-4 place-self-center bg-lincolngreen hover:bg-lincolngreenlighter rounded-md">
          Save
        </button>
      </form>
    </>
  );
}
