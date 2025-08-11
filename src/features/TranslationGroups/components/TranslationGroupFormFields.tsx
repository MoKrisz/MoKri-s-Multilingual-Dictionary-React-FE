import { Controller, useFormContext } from "react-hook-form";
import TagInput from "../../Tags/components/TagInput";
import { TranslationGroupFormData } from "./TranslationGroupForm";
import FormFieldWithError from "../../../components/FormFieldWithError";
import { useTranslation } from "react-i18next";

const TranslationGroupFormFields: React.FC = () => {
  const { t } = useTranslation(["translationGroups", "tags"]);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TranslationGroupFormData>();

  return (
    <>
      <FormFieldWithError
        extraStyle="my-2"
        label={t("description")}
        htmlFor="translationGroupDescription"
        error={errors.description?.message}
      >
        <input
          className="px-2 bg-input-background rounded-md"
          id="translationGroupDescription"
          {...register("description")}
        />
      </FormFieldWithError>

      <FormFieldWithError
        extraStyle="my-5 h-40"
        label={t("tags:tags")}
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
