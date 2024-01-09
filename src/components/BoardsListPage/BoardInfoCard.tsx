// import { fetcher } from "@/lib/fetcher";
import { FC } from "react";
// import useSWR from "swr";
import { PenSquare } from "lucide-react";
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
import { IBoardResponseInterface } from "@/interfaces/IBoard.interface";
import CustomTooltip from "../ui/CustomTooltip";

type BoardInfoCardProps = IBoardResponseInterface &
  React.ComponentProps<typeof Card>;

const BoardInfoCard: FC<BoardInfoCardProps> = ({ name, columns, id }) => {
  console.log(columns);
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Total tasks:</CardDescription>
      </CardHeader>
      {/* <CardContent>{columns.length}</CardContent> */}
      <CardContent>id:{id}</CardContent>
      <CardFooter className="flex gap-2">
        <CustomTooltip content="Edit board">
          <Button variant="outline" size="icon">
            <XCircle className="h-4 w-4" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Delete board">
          <Button variant="outline" size="icon">
            <PenSquare className="h-4 w-4" />
          </Button>
        </CustomTooltip>
      </CardFooter>
    </Card>
  );
};

export default BoardInfoCard;
