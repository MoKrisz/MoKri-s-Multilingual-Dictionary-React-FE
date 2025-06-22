import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import TagInput from "../../Tags/components/TagInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TranslationGroupFormSchema = z.object({
  groupName: z
    .string()
    .trim()
    .min(1, "Translation group name must have value."),
  tags: z
    .array(
      z.object({
        tagId: z.number().optional(),
        text: z.string().trim().min(1, "Tag cannot be empty."),
      })
    )
    .optional(),
});

type TranslationGroupFormData = z.infer<typeof TranslationGroupFormSchema>;

const TranslationGroupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TranslationGroupFormData>({
    resolver: zodResolver(TranslationGroupFormSchema),
  });

  const onSubmit = async (data: TranslationGroupFormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <div className="justify-items-center">
      <h1 className="font-bold text-2xl m-3">Create new Translation group</h1>
      <form className="w-2/3" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex justify-center my-3">
          <Button type="submit" isDisabled={false}>
            Create new translation group
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TranslationGroupForm;
