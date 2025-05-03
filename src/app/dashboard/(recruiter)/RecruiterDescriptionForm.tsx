import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormWrapper } from "@/components/forms/formWrapper";
import Tiptap from "@/components/Tiptap";
import { recruiterTypes } from "@/lib/recruiterSchema";

function RecruiterDescriptionForm(form: UseFormReturn<recruiterTypes>) {
  return (
    <div>
      <FormWrapper title="Description">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl>
                <Tiptap description={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}

export default RecruiterDescriptionForm;
