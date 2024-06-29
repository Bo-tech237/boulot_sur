import { ReactElement, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { applicantUpdateTypes } from '@/lib/applicantSchema';

export function useUpdateApplicantMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const nextLevel = [
        {
            fields: ['institutionName', 'startYear', 'endYear'],
        },
        {
            fields: ['skills'],
        },
    ];
    type FieldName = keyof applicantUpdateTypes;
    async function next(
        trigger: UseFormTrigger<{
            education: {
                institutionName: string;
                startYear: string;
                endYear: string;
            }[];
            skills: {
                text: string;
                id: string;
            }[];
        }>
    ) {
        const fields = nextLevel[currentStepIndex].fields;
        const output = await trigger(fields as FieldName[], {
            shouldFocus: true,
        });

        if (!output) return;

        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
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
