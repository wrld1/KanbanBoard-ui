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

type CardFormProps = {
  onSubmit: (data: FieldValues) => void;
  columnId: string;
};

const createCardSchema = z.object({
  title: z.string().min(1, {
    message: "Card title must be at least 1 character.",
  }),
  description: z
    .string()
    .min(5, {
      message: "Card description must be at least 5 characters.",
    })
    .optional(),
});

export function CreateCardForm({ onSubmit, columnId }: CardFormProps) {
  const form = useForm({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = (data: FieldValues) => {
    if ("title" in data) {
      onSubmit({ ...data, columnId });
      form.reset({ title: "", description: "" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Title</FormLabel>
              <FormControl>
                <Input placeholder="Card title" {...field} />
              </FormControl>
              <FormDescription>This is the title of the card.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Description</FormLabel>
              <FormControl>
                <Input placeholder="Card description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of the card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
