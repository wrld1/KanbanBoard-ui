import { IBoardResponseInterface } from "@/interfaces/IBoard.interface";
import { fetcher } from "@/lib/fetcher";
import { FC } from "react";
import useSWR, { mutate } from "swr";
import BoardInfoCard from "./BoardInfoCard";
import ModalWindow from "../ui/ModalWindow";
import { Skeleton } from "../ui/skeleton";
import { CreateBoardForm } from "../Forms/CreateBoardForm";
import { FieldValues } from "react-hook-form";
import { createBoard } from "@/api/Board.api";
import { showErrorToast } from "@/lib/showErrorToast";

const BoardsList: FC = () => {
  const { data: boards, error } = useSWR(
    `${import.meta.env.VITE_BASE_API_LINK}/boards`,
    fetcher
  );

  if (error) return <div>Error loading data</div>;
  if (!boards) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  const handleFormCreationSubmit = (data: FieldValues) => {
    createBoard(data.name)
      .then((newBoard) => {
        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/boards`,
          [...boards, newBoard],
          false
        );
      })
      .catch((error) => {
        showErrorToast(error);
      });
  };

  return (
    <>
      <ModalWindow actionType="create" tooltipContent="Add board">
        <CreateBoardForm onSubmit={handleFormCreationSubmit} />
      </ModalWindow>
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap gap-2 w-full">
          {boards.map((board: IBoardResponseInterface) => (
            <BoardInfoCard
              key={board.id}
              id={board.id}
              name={board.name}
              columns={board.columns}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardsList;
