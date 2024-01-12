import { fetcher } from "@/lib/fetcher";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import Column from "./Column";
import { IBoardColumn } from "@/interfaces/IBoardColumn.interface";
import { Skeleton } from "../ui/skeleton";
import { DragDropContext } from "react-beautiful-dnd";
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

  const onDragEnd = async (result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    destination: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    draggableId: any;
  }) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColId = source.droppableId;
    const destinationColId = destination.droppableId;

    if (sourceColId === destinationColId) {
      await updateCardColumn(draggableId, destinationColId);
      mutate(
        `${
          import.meta.env.VITE_BASE_API_LINK
        }/board-columns/${destinationColId}`
      );
      return;
    }

    await updateCardColumn(draggableId, destinationColId);

    mutate(
      `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${sourceColId}`
    );
    mutate(
      `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${destinationColId}`
    );
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Skeleton className="w-full h-[500px] rounded-md" />;

  const sortedColumns = [...board.columns].sort((a, b) => a.order - b.order);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-2 w-full justify-between items-stretch">
        {sortedColumns.map((column: IBoardColumn) => (
          <Column key={column.id} columnId={column.id} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default ColumnsContainer;
