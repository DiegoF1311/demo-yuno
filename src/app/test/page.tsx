"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderFormField } from "@/components/screens/render-form-field";
import type { FormFieldType } from "@/types";

export default function Page() {
  const formFields: FormFieldType[] = [
    {
      checked: true,
      description: "Enter your full name.",
      disabled: false,
      label: "Full Name",
      name: "name_5382594627",
      placeholder: "John Doe",
      required: true,
      rowIndex: 0,
      type: "",
      value: "",
      variant: "Input",
      className: "bg-blue-500",
    },
  ];

  const schema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Formulario</CardTitle>
          <CardDescription>Completa los campos requeridos</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => console.log(data))}
              className="space-y-4"
            >
              {formFields.map((field) => (
                <div key={field.name}>{renderFormField(field, form)}</div>
              ))}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
