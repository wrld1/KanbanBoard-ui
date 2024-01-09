import { IBoardColumn } from "./IBoardColumn.interface";
import { ICoreEntity } from "./ICoreEntity.interface";

export interface IBoard extends ICoreEntity {
  name: string;
  columns: IBoardColumn[];
}

export type IBoardResponseInterface = Pick<IBoard, "id" | "name" | "columns">;
