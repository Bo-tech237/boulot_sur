import { api } from '../../../convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import CategoryList from '../CategoryList';

export default async function Category() {
    const preloadedCategories = await preloadQuery(
        api.categories.getAllCategories
    );

    return (
        <section className="">
            <CategoryList preloadedCategories={preloadedCategories} />
        </section>
    );
}
