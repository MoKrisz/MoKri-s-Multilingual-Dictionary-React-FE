import { Controller, useFormContext } from "react-hook-form";
import TagInput from "../../Tags/components/TagInput";
import { TranslationGroupFormData } from "./TranslationGroupForm";
import FormFieldWithError from "../../../components/FormFieldWithError";

const TranslationGroupFormFields: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TranslationGroupFormData>();

  return (
    <>
      <FormFieldWithError
        extraStyle="my-2"
        label="Translation group name"
        htmlFor="translationGroupName"
        error={errors.groupName?.message}
      >
        <input id="translationGroupName" {...register("groupName")} />
      </FormFieldWithError>

      <FormFieldWithError
        extraStyle="my-5 h-40"
        label="Tags"
        htmlFor="tags"
        error={errors.tags?.message}
      >
        <Controller
          control={control}
          name="tags"
          defaultValue={[]}
          render={({ field }) => (
            <TagInput tags={field.value ?? []} onChange={field.onChange} />
          )}
        />
      </FormFieldWithError>
    </>
  );
};

export default TranslationGroupFormFields;
