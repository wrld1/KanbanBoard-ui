import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICard } from "@/interfaces/ICard.interface";
import { FC } from "react";
import TaskCard from "./TaskCard";
import ModalWindow from "../ui/ModalWindow";
import { CreateCardForm } from "../Forms/CreateCardForm";
import { FieldValues } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { createCard } from "@/api/Card.api";
import { fetcher } from "@/lib/fetcher";
import { showErrorToast } from "@/lib/showErrorToast";
import { Droppable } from "react-beautiful-dnd";

type ColumnProps = {
  columnId: string;
};

const Column: FC<ColumnProps> = ({ columnId }) => {
  const {
    data: column,
    error,
    isLoading,
  } = useSWR(
    `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${columnId}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return null;

  const { cards, name, order } = column;

  const handleCardCreationSubmit = (data: FieldValues) => {
    createCard(data.title, columnId, data.description)
      .then((newCard) => {
        mutate(
          `${import.meta.env.VITE_BASE_API_LINK}/board-columns/${columnId}`,
          { ...column, cards: [...cards, newCard] },
          false
        );
      })
      .catch((error) => {
        showErrorToast(error);
      });
  };

  return (
    <Card className="w-1/3 flex-grow-0">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Droppable key={columnId} droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "lightgrey"
                  : "white",
              }}
            >
              {cards.map((card: ICard, index: number) => (
                <TaskCard
                  cardId={card.id}
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  columnId={columnId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
      <CardFooter>
        {order === 1 ? (
          <ModalWindow actionType="create" tooltipContent="Add Card">
            <CreateCardForm
              onSubmit={handleCardCreationSubmit}
              columnId={columnId}
            />
          </ModalWindow>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default Column;
