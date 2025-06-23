import { Controller, useFormContext } from "react-hook-form";
import TagInput from "../../Tags/components/TagInput";
import { TranslationGroupFormData } from "./TranslationGroupForm";

const TranslationGroupFormFields: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TranslationGroupFormData>();

  return (
    <>
      <div className="flex flex-col my-2">
        <label htmlFor="translationGroupName" className="font-bold">
          Translation group name
        </label>
        <input id="translationGroupName" {...register("groupName")} />
        {errors.groupName && (
          <span className="text-red-600">{errors.groupName.message}</span>
        )}
      </div>

      <div className="flex flex-col my-5 h-40">
        <label className="font-bold">Tags</label>
        <Controller
          control={control}
          name="tags"
          defaultValue={[]}
          render={({ field }) => (
            <TagInput tags={field.value ?? []} onChange={field.onChange} />
          )}
        />
        {errors.tags && <span>{errors.tags.message}</span>}
      </div>
    </>
  );
};

export default TranslationGroupFormFields;
