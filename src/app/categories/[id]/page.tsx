import React from 'react';

type Props = {
    params: { id: string };
};

export default function CategoryJobsPage({ params }: Props) {
    const id = params.id;

    return (
        <div>
            <h1>All Category Jobs Here</h1>
            Coming soon, here is the id: {id}
        </div>
    );
}
