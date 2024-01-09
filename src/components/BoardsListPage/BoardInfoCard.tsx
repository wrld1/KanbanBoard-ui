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
import { ToastAction } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import { IBoard, IBoardResponseInterface } from "@/interfaces/IBoard.interface";
import CustomTooltip from "../ui/CustomTooltip";
import { toast } from "../ui/use-toast";
import { deleteBoard, updateBoard } from "@/api/Board.api";
import ModalWindow from "../ui/ModalWindow";
import { FieldValues } from "react-hook-form";
import { UpdateBoardForm } from "../Forms/UpdateBoardForm";
import { useNavigate } from "react-router-dom";

type BoardInfoCardProps = IBoardResponseInterface &
  React.ComponentProps<typeof Card>;

const BoardInfoCard: FC<BoardInfoCardProps> = ({ name, columns, id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteBoard(id)
      .then(() => {
        mutate(`${import.meta.env.VITE_BASE_API_LINK}/boards`);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request: ${error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const handleFormUpdatingSubmit = (id: string, data: FieldValues) => {
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
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `There was a problem with your request: ${error.message}`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        });
    }
  };

  console.log(columns);
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
      {/* <CardContent>{columns.length}</CardContent> */}
      <CardContent>id:{id}</CardContent>
      <CardFooter className="flex gap-2">
        <CustomTooltip content="Edit board">
          <ModalWindow actionType="update" tooltipContent="Update board">
            <UpdateBoardForm id={id} onSubmit={handleFormUpdatingSubmit} />
          </ModalWindow>
        </CustomTooltip>
        <CustomTooltip content="Delete board">
          <Button variant="outline" size="icon" onClick={handleDelete}>
            <XCircle className="h-4 w-4" />
          </Button>
        </CustomTooltip>
      </CardFooter>
    </Card>
  );
};

const MemoizedBoardInfoCard = memo(BoardInfoCard);

export default MemoizedBoardInfoCard;
