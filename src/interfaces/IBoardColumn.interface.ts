import { IBoard } from "./IBoard.interface";
import { ICard } from "./ICard.interface";
import { ICoreEntity } from "./ICoreEntity.interface";

export interface IBoardColumn extends ICoreEntity {
  name: string;
  order: number;
  board: IBoard;
  cards: ICard[];
}

export type IBoardColumnResponseInterface = Pick<
  IBoardColumn,
  "id" | "name" | "order" | "board" | "cards"
>;
