import { fetcher } from "@/lib/fetcher";

export async function createBoard(name: string) {
  const newBoard = await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/boards`,
    "POST",
    { name }
  );

  if (!newBoard) {
    throw new Error("Failed to create board");
  }

  return newBoard;
}
