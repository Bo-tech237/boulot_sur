import CategoryList from '@/components/CategoryList';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';

export default async function CategoryPage() {
    const preloadedCategories = await preloadQuery(
        api.categories.getAllCategories
    );

    return (
        <section className="">
            <CategoryList preloadedCategories={preloadedCategories} />
        </section>
    );
}
