import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function showErrorToast(error: Error) {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: `There was a problem with your request: ${error.message}`,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}
