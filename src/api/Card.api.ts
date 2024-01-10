import { fetcher } from "@/lib/fetcher";

export async function createCard(
  title: string,
  columnId: string,
  description?: string
) {
  const newCard = await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/cards`,
    "POST",
    { title, description, columnId }
  );

  if (!newCard) {
    throw new Error("Failed to create board");
  }

  return newCard;
}

export async function updateCard(
  id: string,
  title?: string,
  description?: string,
  columnId?: string
) {
  const updatedCard = await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/cards/${id}`,
    "PATCH",
    { title, description, columnId }
  );

  if (!updatedCard) {
    throw new Error("Failed to update card");
  }

  return updatedCard;
}

export async function updateCardColumn(cardId: string, newColumnId: string) {
  const updatedCard = await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/cards/${cardId}/update-column`,
    "PATCH",
    { newColumnId }
  );

  if (!updatedCard) {
    throw new Error("Failed to update card column");
  }

  return updatedCard;
}

export async function deleteCard(id: string) {
  return await fetcher(
    `${import.meta.env.VITE_BASE_API_LINK}/cards/${id}`,
    "DELETE"
  );
}
