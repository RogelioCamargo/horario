/* eslint-disable @typescript-eslint/no-misused-promises */
import { Select } from "@radix-ui/react-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "~/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { type Store } from "@prisma/client";

const storeFormSchema = z.object({
  storeId: z.string({
    required_error: "Store ID is required.",
  }),
  name: z.string({
    required_error: "Store name is required.",
  }),
  city: z.string({
    required_error: "Store city is required.",
  }),
  state: z.string({
    required_error: "Store state is required.",
  }),
  startOfWeekIndex: z.string({
    required_error: "Weekday start is required.",
  }),
});

type ProfileFormValues = z.infer<typeof storeFormSchema>;

export function StoreDetailsForm({ store }: { store: Store }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeId: store.storeId,
      name: store.name,
      city: store.city,
      state: store.state,
      startOfWeekIndex: store.startOfWeekIndex,
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="storeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="number" placeholder="i.e. 2400" {...field} />
              </FormControl>
              <FormDescription>
                This is a unique identifier for your store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="i.e. Subway" {...field} />
              </FormControl>
              <FormDescription>This the name of your store.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="i.e. Campbell" {...field} />
                </FormControl>
                <FormDescription>
                  This the location of your store.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="i.e. CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="startOfWeekIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When does your week start?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day of the week" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SUNDAY">Sunday</SelectItem>
                  <SelectItem value="MONDAY">Monday</SelectItem>
                  <SelectItem value="TUESDAY">Tuesday</SelectItem>
                  <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                  <SelectItem value="THURSDAY">Thursday</SelectItem>
                  <SelectItem value="FRIDAY">Friday</SelectItem>
                  <SelectItem value="SATURDAY">Saturday</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                It&apos;s important to select the correct week start for your
                business.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-40" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
}
