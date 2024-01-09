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

export async function updateBoard(id: string, newName: string) {
  const updatedBoard = await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/boards/${id}`,
    "PATCH",
    { name: newName }
  );

  if (!updatedBoard) {
    throw new Error("Failed to update board");
  }

  return updatedBoard;
}

export async function deleteBoard(id: string) {
  return await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/boards/${id}`,
    "DELETE"
  );
}
