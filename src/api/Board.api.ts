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
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_LINK}/boards/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update board");
  }

  const updatedBoard = await response.json();
  return updatedBoard;
}

export async function deleteBoard(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_LINK}/boards/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete board");
  }
}
