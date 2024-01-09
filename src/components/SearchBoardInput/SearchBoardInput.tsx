import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  boardId: z.string().uuid(),
});

function SearchBoardInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      boardId: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.boardId.trim() !== "") {
      navigate(`/boards/${data.boardId}`);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset({ boardId: "" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex items-center"
      >
        <div className="flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Board ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a Board ID here" {...field} />
                </FormControl>
                <FormDescription>Task will be shown below</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Load</Button>
        </div>
      </form>
    </Form>
  );
}

export default SearchBoardInput;
