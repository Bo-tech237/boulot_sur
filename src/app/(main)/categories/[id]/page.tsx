import React from 'react';
import JobsByCategory from './JobsByCategory';

type Props = {
    params: { id: string };
};

export default function CategoryJobsPage({ params }: Props) {
    const id = params.id;

    return (
        <div>
            <JobsByCategory id={id} />
        </div>
    );
}
