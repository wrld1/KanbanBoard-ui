import { FC, memo } from "react";
import { mutate } from "swr";
import { XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { IBoard, IBoardResponseInterface } from "@/interfaces/IBoard.interface";
import CustomTooltip from "../ui/CustomTooltip";
import { deleteBoard, updateBoard } from "@/api/Board.api";
import ModalWindow from "../ui/ModalWindow";
import { FieldValues } from "react-hook-form";
import { UpdateBoardForm } from "../Forms/UpdateBoardForm";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/lib/showErrorToast";

type BoardInfoCardProps = Omit<IBoardResponseInterface, "columns"> &
  React.ComponentProps<typeof Card>;

const BoardInfoCard: FC<BoardInfoCardProps> = ({ name, id }) => {
  const navigate = useNavigate();

  const handleBoardDelete = () => {
    deleteBoard(id)
      .then(() => {
        mutate(`${import.meta.env.VITE_BASE_API_LINK}/boards`);
      })
      .catch((error) => {
        showErrorToast(error);
      });
  };

  const handleBoardUpdateSubmit = (id: string, data: FieldValues) => {
    if (id && "name" in data) {
      updateBoard(id, data.name)
        .then((updatedBoard) => {
          mutate(
            `${import.meta.env.VITE_BASE_API_LINK}/boards`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (boards: any) => {
              if (!boards) {
                return [];
              }
              return boards.map((board: IBoard) =>
                board.id === id ? updatedBoard : board
              );
            },
            false
          );
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  };
  console.log("render");
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle
          onClick={() => navigate(`/boards/${id}`)}
          className="cursor-pointer"
        >
          {name}
        </CardTitle>
        <CardDescription>Total tasks:</CardDescription>
      </CardHeader>
      <CardContent>id: {id}</CardContent>
      <CardFooter className="flex gap-2">
        <CustomTooltip content="Edit board">
          <ModalWindow actionType="update" tooltipContent="Update board">
            <UpdateBoardForm id={id} onSubmit={handleBoardUpdateSubmit} />
          </ModalWindow>
        </CustomTooltip>
        <CustomTooltip content="Delete board">
          <Button
            className="bg-red-400"
            variant="outline"
            size="icon"
            onClick={handleBoardDelete}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </CustomTooltip>
      </CardFooter>
    </Card>
  );
};

const MemoizedBoardInfoCard = memo(BoardInfoCard);

export default MemoizedBoardInfoCard;
