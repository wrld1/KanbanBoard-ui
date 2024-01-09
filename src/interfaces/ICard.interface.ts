import { IBoardColumn } from "./IBoardColumn.interface";
import { ICoreEntity } from "./ICoreEntity.interface";

export interface ICard extends ICoreEntity {
  title: string;
  description?: string;
  column: IBoardColumn;
}

export type ICardResponseInterface = Pick<
  ICard,
  "id" | "title" | "description" | "column"
>;
