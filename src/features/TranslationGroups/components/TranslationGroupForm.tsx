import { z } from "zod";
import Form from "../../../components/Form";
import TranslationGroupFormFields from "./TranslationGroupFormFields";
import { postTranslationGroup } from "../api";
import { TranslationGroup } from "../models";
import { useTranslation } from "react-i18next";

const TranslationGroupFormSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "translationGroups:errors.description.required"),
  tags: z
    .array(
      z.object({
        tagId: z.number().nullable(),
        text: z.string().trim().min(1),
      })
    )
    .optional(),
});

export type TranslationGroupFormData = z.infer<
  typeof TranslationGroupFormSchema
>;

interface TranslationGroupFormProps {
  onSuccessCallback?: (translationGroup: TranslationGroup) => void;
}

const TranslationGroupForm: React.FC<TranslationGroupFormProps> = ({
  onSuccessCallback,
}) => {
  const { t } = useTranslation("translationGroups");
  const handleSubmit = async (data: TranslationGroupFormData) => {
    const newTranslationGroup = await postTranslationGroup(data);

    if (onSuccessCallback) {
      onSuccessCallback(newTranslationGroup);
    }
  };

  return (
    <Form<TranslationGroupFormData>
      schema={TranslationGroupFormSchema}
      onSubmit={handleSubmit}
      title={t("createTitle")}
      submitButtonText={t("createButton")}
      defaultValues={{ description: "", tags: [] }}
    >
      <TranslationGroupFormFields />
    </Form>
  );
};

export default TranslationGroupForm;
