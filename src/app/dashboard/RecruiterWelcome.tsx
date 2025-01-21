import JobPostings from '@/components/JobPostings';

export default function RecruiterWelcome() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <JobPostings />
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <JobPostings />
            </div>
        </div>
    );
}
