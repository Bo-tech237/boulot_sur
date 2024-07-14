import { whyChooseUs } from '@/constants/data';
import { MessageCircle } from 'lucide-react';

export default function WhyChooseUs() {
    return (
        <section className="bg-gray-900 text-white">
            <div className="container py-8 sm:py-12 lg:px-8 lg:py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold sm:text-5xl">
                        Why Choose Us
                    </h2>

                    <p className="mt-4 text-gray-300">Reliable Job Listings</p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {whyChooseUs.map((chooseUs) => (
                        <div
                            key={chooseUs.title}
                            className="flex items-start gap-4"
                        >
                            <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                                <MessageCircle />
                            </span>

                            <div>
                                <h2 className="text-lg font-bold">
                                    {chooseUs.title}
                                </h2>

                                <p className="mt-1 text-sm text-gray-300">
                                    {chooseUs.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
