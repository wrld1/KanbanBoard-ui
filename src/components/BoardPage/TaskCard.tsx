import { FC } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mutate } from "swr";
import CustomTooltip from "../ui/CustomTooltip";
import { Button } from "../ui/button";
import { XCircle } from "lucide-react";
import { deleteCard } from "@/api/Card.api";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

import { IBoardColumn } from "@/interfaces/IBoardColumn.interface";

type TaskCardProps = {
  title: string;
  cardId: string;
  description?: string;
  columnId: string;
};

const TaskCard: FC<TaskCardProps> = ({
  cardId,
  title,
  description,
  columnId,
}) => {
  const handleDelete = () => {
    deleteCard(cardId)
      .then(() => {
        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${columnId}`,
          (column: IBoardColumn | undefined) => {
            if (column) {
              return {
                ...column,
                cards: column.cards.filter((card) => card.id !== cardId),
              };
            }
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
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardFooter>
          <CustomTooltip content="Delete card">
            <Button
              className="bg-red-400"
              variant="outline"
              size="icon"
              onClick={handleDelete}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </CustomTooltip>
        </CardFooter>
      </Card>
      <p>{cardId}</p>
    </div>
  );
};

export default TaskCard;
