import { TranslationGroupFormData } from "./components/TranslationGroupForm";

export const postTranslationGroup = async (
  data: TranslationGroupFormData
): Promise<number> => {
  console.log(JSON.stringify(data));

  const response = await fetch("https://localhost:7113/translation-group", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Word creation failed.");
  }

  const resJson = await response.json();

  return resJson;
};
