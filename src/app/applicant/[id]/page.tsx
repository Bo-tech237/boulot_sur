import ApplicantProfile from './ApplicantProfile';
import React from 'react';

type Props = { params: { id: string } };

export default function ApplicantProfilePage({ params }: Props) {
    const id = params.id;

    return (
        <div>
            <ApplicantProfile id={id} />
        </div>
    );
}
