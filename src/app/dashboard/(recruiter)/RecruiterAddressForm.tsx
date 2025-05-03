import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormWrapper } from "@/components/forms/formWrapper";
import { recruiterTypes } from "@/lib/recruiterSchema";

function RecruiterAddressForm(form: UseFormReturn<recruiterTypes>) {
  return (
    <div>
      <FormWrapper title="Address">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="phone" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="country" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="city" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}

export default RecruiterAddressForm;
