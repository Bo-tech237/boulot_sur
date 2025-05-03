import { ReactElement, useState } from "react";
import { UseFormTrigger } from "react-hook-form";
import { applicantTypes } from "@/lib/applicantSchema";

const stepFields: Record<number, (keyof applicantTypes)[]> = {
  0: ["education"],
  1: ["skills", "file"],
};

export function useApplicantMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  async function next(trigger: UseFormTrigger<applicantTypes>) {
    const fields = stepFields[currentStepIndex];
    const isValid = await trigger(fields, {
      shouldFocus: true,
    });

    if (!isValid) return;

    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    setCurrentStepIndex,
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
