import axios from "axios";
import { Tag } from "./models";

export const getClosesMatchingTag = async (
  text: string,
  signal: AbortSignal
): Promise<Tag[]> => {
  try {
    const response = await axios.get<Tag | null>(
      "https://localhost:7113/tag/closest-matching-tag",
      {
        params: {
          tagText: text,
        },
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      }
    );

    return response.data ? [response.data] : [];
  } catch (error) {
    throw new Error("Tag fetch failed.");
  }
};
