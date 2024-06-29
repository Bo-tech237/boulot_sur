import { RecruiterDataType } from '@/types/recruiters';
import React from 'react';

type Props = {
    recruiter: RecruiterDataType;
};

export default function RightContent({ recruiter }: Props) {
    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="p-6 border rounded">
                <div>
                    <h6 className="mb-3 text-gray-900 text-17 dark:text-gray-50">
                        About Recruiter
                    </h6>
                    <p className="mb-2 text-gray-500 dark:text-gray-300">
                        Very well thought out and articulate communication.
                        Clear milestones, deadlines and fast work. Patience.
                        Infinite patience. No shortcuts. Even if the client is
                        being careless. Some quick example text to build on the
                        card title and bulk the cards content Moltin gives you
                        platform.
                    </p>

                    <div
                        className="ProseMirror whitespace-pre-line py-4"
                        style={{ whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{
                            __html: recruiter?.description!,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
