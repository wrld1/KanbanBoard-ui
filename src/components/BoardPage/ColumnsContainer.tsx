import { fetcher } from "@/lib/fetcher";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Column from "./Column";
import { IBoardColumn } from "@/interfaces/IBoardColumn.interface";
import { Skeleton } from "../ui/skeleton";

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

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Skeleton className="w-full h-[500px] rounded-md" />;

  return (
    <div className="flex gap-2 w-full justify-between items-stretch">
      {board.columns.map((column: IBoardColumn) => (
        <Column key={column.id} columnId={column.id} />
      ))}
    </div>
  );
}

export default ColumnsContainer;
