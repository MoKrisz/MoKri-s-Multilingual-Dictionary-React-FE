import { z } from "zod";
import Form from "../../../components/Form";
import TranslationGroupFormFields from "./TranslationGroupFormFields";
import { postTranslationGroup } from "../api";
import { TranslationGroup } from "../models";

const TranslationGroupFormSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Translation group description must have value."),
  tags: z
    .array(
      z.object({
        tagId: z.number().nullable(),
        text: z.string().trim().min(1, "Tag cannot be empty."),
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
      title="Create new translation group"
      submitButtonText="Create translation group"
      defaultValues={{ description: "", tags: [] }}
    >
      <TranslationGroupFormFields />
    </Form>
  );
};

export default TranslationGroupForm;
