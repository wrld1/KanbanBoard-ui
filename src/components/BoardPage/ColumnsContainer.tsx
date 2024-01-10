import { fetcher } from "@/lib/fetcher";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import Column from "./Column";
import { IBoardColumn } from "@/interfaces/IBoardColumn.interface";
import { Skeleton } from "../ui/skeleton";
import { DragDropContext } from "react-beautiful-dnd";
import { useCallback } from "react";
import { showErrorToast } from "@/lib/showErrorToast";
import { ICard } from "@/interfaces/ICard.interface";
import { updateCardColumn } from "@/api/Card.api";

function ColumnsContainer() {
  const { boardId } = useParams();

  const {
    data: board,
    error,
    isLoading,
  } = useSWR(
    `${import.meta.env.VITE_BASE_API_LINK}/boards/${boardId}`,
    fetcher
  );

  // ColumnsContainer.tsx

  const onDragEnd = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (result: { destination: any; source: any; draggableId: any }) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const startColumn = board.columns.find(
        (column: IBoardColumn) => column.id === source.droppableId
      );
      const finishColumn = board.columns.find(
        (column: IBoardColumn) => column.id === destination.droppableId
      );
      const card = startColumn.cards.find((c: ICard) => c.id === draggableId);

      if (!card) {
        return;
      }

      try {
        const updatedCard = await updateCardColumn(
          card.id,
          destination.droppableId
        );

        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${
            source.droppableId
          }`,
          {
            ...startColumn,
            cards: startColumn.cards.filter((c: ICard) => c.id !== draggableId),
          },
          false
        );

        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${
            destination.droppableId
          }`,
          { ...finishColumn, cards: [...finishColumn.cards, updatedCard] },
          false
        );

        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${
            source.droppableId
          }`
        );
        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${
            destination.droppableId
          }`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        showErrorToast(error);
      }
    },
    [board]
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Skeleton className="w-full h-[500px] rounded-md" />;

  const sortedColumns = [...board.columns].sort((a, b) => a.order - b.order);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="font-bold uppercase">{board.name}</h2>
      <div className="flex gap-2 w-full justify-between items-stretch">
        {sortedColumns.map((column: IBoardColumn) => (
          <Column key={column.id} columnId={column.id} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default ColumnsContainer;
