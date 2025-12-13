"use client";

import { ChangeEvent, useState } from "react";
import { FormFieldType } from "@/types";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { CreditCard, CreditCardValue } from "@/components/ui/credit-card";

const countries = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Mexico", value: "MX" },
  { label: "United Kingdom", value: "UK" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Spain", value: "ES" },
  { label: "Italy", value: "IT" },
] as const;

const usStates = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
] as const;

export const renderCheckoutField = (field: FormFieldType, form: any) => {
  const [checked, setChecked] = useState<boolean>(field.checked || false);
  const [password, setPassword] = useState<string>("");
  const [creditCard, setCreditCard] = useState<CreditCardValue>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  switch (field.variant) {
    case "Input":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={field.placeholder}
              disabled={field.disabled}
              type={field?.type || "text"}
              className="h-10"
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Email":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={field.placeholder || "email@example.com"}
              type="email"
              disabled={field.disabled}
              className="h-10"
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Phone":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              disabled={field.disabled}
              onChange={(phoneNumber) => {
                form.setValue(field.name, phoneNumber, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Password":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <PasswordInput
              value={password}
              placeholder={field.placeholder || "Enter password"}
              disabled={field.disabled}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                form.setValue(field.name, e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className="h-10"
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Textarea":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={field.placeholder || "Enter text"}
              disabled={field.disabled}
              className="resize-none min-h-24"
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Country":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select onValueChange={(value) => form.setValue(field.name, value)}>
            <FormControl>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "State":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select onValueChange={(value) => form.setValue(field.name, value)}>
            <FormControl>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    case "Credit Card":
      return (
        <FormField
          control={form.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 flex-nowrap">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <CreditCard
                  value={creditCard}
                  onChange={(value) => {
                    setCreditCard(value);
                    formField.onChange(value);
                    form.setValue(field.name, value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
              </FormControl>
              <FormDescription>{field.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "Checkbox":
      return (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={checked}
              onCheckedChange={() => {
                setChecked(!checked);
                form.setValue(field.name, !checked, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              disabled={field.disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-normal cursor-pointer">
              {field.label}
            </FormLabel>
            <FormDescription>{field.description}</FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      );

    case "Select":
      return (
        <FormItem>
          <FormLabel className="flex items-center gap-1 flex-nowrap">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            onValueChange={(value) => {
              form.setValue(field.name, value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <FormControl>
              <SelectTrigger className="h-10">
                <SelectValue
                  placeholder={field.placeholder || "Select an option"}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      );

    default:
      return null;
  }
};
