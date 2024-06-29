import FAQS from '@/components/FAQS';
import Category from '@/components/home-page/Category';
import Hero from '@/components/home-page/Hero';
import HowItWorks from '@/components/home-page/HowItWorks';
import Testimonials from '@/components/home-page/Testimonials';

export default function Home() {
    return (
        <main className="">
            <Hero />
            <Category />
            <HowItWorks />
            <FAQS />
            <Testimonials />
        </main>
    );
}
