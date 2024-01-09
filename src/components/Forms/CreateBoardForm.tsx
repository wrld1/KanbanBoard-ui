import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FieldValues } from "react-hook-form";

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

type BoardFormProps = {
  onSubmit: (data: FieldValues) => void;
};

const createBoardSchema = z.object({
  name: z.string().min(5, {
    message: "Board name must be at least 5 characters.",
  }),
});

export function CreateBoardForm({ onSubmit }: BoardFormProps) {
  const form = useForm({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (data: FieldValues) => {
    if ("name" in data) {
      onSubmit(data);
      form.reset({ name: "" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Name</FormLabel>
              <FormControl>
                <Input placeholder="Board name" {...field} />
              </FormControl>
              <FormDescription>This is the name of the board.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
