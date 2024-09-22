import { Word } from "./models";

export const fetchWords = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Word[]> => {
  const response = await fetch("https://localhost:7113/words", { signal });
  if (!response.ok) {
    throw new Error("Something went wrong...");
  }
  return response.json();
};
