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
  id: string;
  onSubmit: (id: string, data: FieldValues) => void;
};

const UpdateCardSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "The title length should be between 1 and 255 characters.",
    })
    .optional(),
  description: z
    .string()
    .min(5, {
      message: "The description length should be between 5 and 255 characters.",
    })
    .optional(),
  columnId: z.string().optional(),
});

export function UpdateCardForm({ id, onSubmit }: CardFormProps) {
  const form = useForm({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: {
      title: "",
      description: "",
      columnId: "",
    },
  });

  const handleSubmit = (data: FieldValues) => {
    if ("title" in data) {
      onSubmit(id, data);
      form.reset({ title: "", description: "", columnId: "" });
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
        <FormField
          control={form.control}
          name="columnId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Column ID</FormLabel>
              <FormControl>
                <Input placeholder="Column ID" {...field} />
              </FormControl>
              <FormDescription>
                This is the ID of the column the card belongs to.
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
