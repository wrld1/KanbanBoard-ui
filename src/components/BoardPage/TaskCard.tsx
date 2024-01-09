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
            `${import.meta.env.VITE_BASE_API_LINK}/boards`,
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
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between">
          {/* <CustomTooltip content="Edit board">
            <ModalWindow actionType="update" tooltipContent="Update board">
              <UpdateBoardForm id={id} onSubmit={handleCardUpdateSubmit} />
            </ModalWindow>
          </CustomTooltip> */}

          <CustomTooltip content="Edit card">
            <ModalWindow actionType="update" tooltipContent="Update card">
              <UpdateCardForm id={cardId} onSubmit={handleCardUpdateSubmit} />
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
      <p>{cardId}</p>
    </div>
  );
};

export default TaskCard;
