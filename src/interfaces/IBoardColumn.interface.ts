import { IBoard } from "./IBoard.interface";
import { ICard } from "./ICard.interface";
import { ICoreEntity } from "./ICoreEntity.interface";

export interface IBoardColumn extends ICoreEntity {
  name: string;
  board: IBoard;
  cards: ICard[];
}

export type IBoardColumnResponseInterface = Pick<
  IBoardColumn,
  "id" | "name" | "board" | "cards"
>;
