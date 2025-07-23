import axios from "axios";
import { PostTranslationRequest } from "./models";

export const postTranslation = async (
  data: PostTranslationRequest
): Promise<void> => {
  await axios.post("https://localhost:7113/translation", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
