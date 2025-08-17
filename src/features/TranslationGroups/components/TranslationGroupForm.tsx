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
  translationGroup?: TranslationGroup;
  onSubmit: (data: TranslationGroupFormData) => Promise<void>;
  isSubmitting: boolean;
}

const TranslationGroupForm: React.FC<TranslationGroupFormProps> = ({
  translationGroup,
  onSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation("translationGroups");
  const isEditing = !!translationGroup;

  const defaultValue: TranslationGroupFormData = {
    description: translationGroup?.description ?? "",
    tags: translationGroup?.tags ?? [],
  };

  return (
    <Form<TranslationGroupFormData>
      schema={TranslationGroupFormSchema}
      onSubmit={onSubmit}
      title={isEditing ? t("translationGroup") : t("createTitle")}
      submitButtonText={isEditing ? t("editButton") : t("createButton")}
      defaultValues={defaultValue}
      isSubmitting={isSubmitting}
    >
      <TranslationGroupFormFields />
    </Form>
  );
};

export default TranslationGroupForm;
