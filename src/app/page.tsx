import FAQS from '@/components/FAQS';
import Category from '@/components/home-page/Category';
import Hero from '@/components/home-page/Hero';
import HowItWorks from '@/components/home-page/HowItWorks';
import Testimonials from '@/components/home-page/Testimonials';
import WhyChooseUs from '@/components/home-page/WhyChooseUs';

export default function Home() {
    return (
        <main className="">
            {/* <Hero /> */}
            <WhyChooseUs />
            <Category />
            <HowItWorks />
            <FAQS />
            <Testimonials />
        </main>
    );
}
