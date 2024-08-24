import React from 'react';
import RecruiterProfile from './RecruiterProfile';

type Props = { params: { id: string } };

export default function ApplicantProfilePage({ params }: Props) {
    const id = params.id;

    return (
        <div>
            <RecruiterProfile id={id} />
        </div>
    );
}
