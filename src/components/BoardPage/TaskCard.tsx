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
import { deleteCard, updateCard } from "@/api/Card.api";

import { IBoardColumn } from "@/interfaces/IBoardColumn.interface";
import { showErrorToast } from "@/lib/showErrorToast";
import ModalWindow from "../ui/ModalWindow";
import { FieldValues } from "react-hook-form";
import { ICard } from "@/interfaces/ICard.interface";
import { UpdateCardForm } from "../Forms/UpdateCardForm";
import { Draggable } from "react-beautiful-dnd";

type TaskCardProps = {
  title: string;
  cardId: string;
  description?: string;
  columnId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  index: any;
};

const TaskCard: FC<TaskCardProps> = ({
  cardId,
  title,
  description,
  columnId,
  index,
}) => {
  const handleCardDelete = () => {
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
        showErrorToast(error);
      });
  };

  const handleCardUpdateSubmit = (cardId: string, data: FieldValues) => {
    if (cardId) {
      updateCard(cardId, data.title, data.description, columnId)
        .then((updatedCard) => {
          mutate(
            `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${columnId}`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cards: any) => {
              if (!cards) {
                return [];
              }
              return cards.map((card: ICard) =>
                card.id === cardId ? updatedCard : card
              );
            },
            false
          );
          mutate(
            `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${columnId}`
          );
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  };

  return (
    <Draggable key={cardId} draggableId={cardId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <CustomTooltip content="Edit card">
                <ModalWindow actionType="update" tooltipContent="Update card">
                  <UpdateCardForm
                    id={cardId}
                    onSubmit={handleCardUpdateSubmit}
                  />
                </ModalWindow>
              </CustomTooltip>
              <CustomTooltip content="Delete card">
                <Button
                  className="bg-red-400"
                  variant="outline"
                  size="icon"
                  onClick={handleCardDelete}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </CustomTooltip>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
