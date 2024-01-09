import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomTooltip from "./CustomTooltip";
import { PenSquare, PlusSquare } from "lucide-react";
import { ReactNode } from "react";

type ModalWindowProps = {
  actionType: "create" | "update";
  tooltipContent: string;
  children: ReactNode;
};

function ModalWindow({
  actionType,
  tooltipContent,
  children,
}: ModalWindowProps) {
  const dialogTitle = actionType === "create" ? "Create" : "Save changes";
  const dialogDescription =
    actionType === "create"
      ? "Create here. Click save when you're done."
      : "Make changes here. Click 'Save changes' when you are done";

  return (
    <Dialog>
      <CustomTooltip content={tooltipContent}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            {actionType === "create" ? (
              <PlusSquare className="h-4 w-4" />
            ) : (
              <PenSquare className="h-4 w-4" />
            )}
          </Button>
        </DialogTrigger>
      </CustomTooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalWindow;
