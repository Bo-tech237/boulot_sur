import { Metadata } from 'next';
import JobCardList from './JobCardList';
import H1 from '@/components/ui/h1';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
    title: 'All Jobs',

    description: 'Find your dream job in Cameroon!',
};

type Props = {
    searchParams: { search: string };
};

export default async function JobsPage({ searchParams }: Props) {
    const search = searchParams.search;

    return (
        <main className="my-10 space-y-10">
            <div className="space-y-5 text-center">
                <H1>Reliable jobs</H1>
                <p className="text-muted-foreground">
                    {!search ? 'Find your dream job.' : 'Search result for: '}
                    {search && <span>{search}</span>}
                </p>
            </div>
            <div className="mx-20">
                <SearchBar />
            </div>

            <JobCardList search={search} />
        </main>
    );
}
