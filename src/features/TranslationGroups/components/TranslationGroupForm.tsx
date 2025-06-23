import { z } from "zod";
import Form from "../../../components/Form";
import TranslationGroupFormFields from "./TranslationGroupFormFields";
import { postTranslationGroup } from "../api";

const TranslationGroupFormSchema = z.object({
  groupName: z
    .string()
    .trim()
    .min(1, "Translation group name must have value."),
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

const TranslationGroupForm: React.FC = () => {
  return (
    <Form<TranslationGroupFormData>
      schema={TranslationGroupFormSchema}
      onSubmit={postTranslationGroup}
      title="Create new translation group"
      submitButtonText="Create translation group"
      defaultValues={{ groupName: "", tags: [] }}
    >
      <TranslationGroupFormFields />
    </Form>
  );
};

export default TranslationGroupForm;
