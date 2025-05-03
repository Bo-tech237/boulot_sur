import React from 'react';
import AddNewJob from './AddNewJob';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Job',
};

async function CreateJob() {
    return (
        <div className="my-3">
            <AddNewJob />
        </div>
    );
}

export default CreateJob;
