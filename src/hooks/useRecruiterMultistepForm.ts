import { ReactElement, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { recruiterTypes } from '../lib/recruiterSchema';

const stepFields: Record<number, (keyof recruiterTypes)[]> = {
    0: ['country','city','phone'],
    1: ['description'],
    
  };

export function useRecruiterMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    
    async function next(
        trigger: UseFormTrigger<recruiterTypes>
    ) {
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
