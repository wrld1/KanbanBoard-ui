import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ReactNode } from "react";

type CustomTooltipProps = {
  children: ReactNode;
  content: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default CustomTooltip;
