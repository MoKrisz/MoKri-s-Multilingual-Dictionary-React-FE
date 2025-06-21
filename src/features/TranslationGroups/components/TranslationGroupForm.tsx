import Button from "../../../components/Button";
import TagInput from "../../Tags/TagInput";

type TranslationGroupFormData = {
  groupName: string;
  tags: string[];
};

const TranslationGroupForm: React.FC = () => {
  return (
    <div className="justify-items-center">
      <h1 className="font-bold text-2xl m-3">Create new Translation group</h1>
      <form className="w-2/3">
        <div className="flex flex-col my-2">
          <label className="font-bold">Translation group name</label>
          <input />
        </div>

        <div className="flex flex-col my-5 h-40">
          <label className="font-bold">Tags</label>
          <TagInput />
          {/* <Controller control={} name="tags" render={} /> */}
        </div>

        <div className="flex justify-center my-3">
          <Button>Create new translation group</Button>
        </div>
      </form>
    </div>
  );
};

export default TranslationGroupForm;
