import React from 'react';
import H1 from './ui/h1';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

export default function FAQS() {
    return (
        <div className="container mx-auto my-10">
            <H1 className="text-center my-10">Frequently Asked Questions</H1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="w-full rounded-lg">
                    <Image
                        src={'/how-it-works.svg'}
                        width={700}
                        height={700}
                        alt="How it works"
                    />
                </div>
                <div className="w-full rounded-lg lg:col-span-2">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Is it accessible?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It comes with default styles that matches
                                the other components&apos; aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It&apos;s animated by default, but you can
                                disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
