import JobDetail from './JobDetail';

type PageProps = { params: { id: string } };

// export async function generateStaticParams() {
//     const jobs = await preloadQuery(api.jobs.getJobs);
//     return jobs.map((job) => ({ id: job?._id }));
// }

// export async function generateMetadata({
//     params: { id },
// }: PageProps): Promise<Metadata> {
//     const job: jobApiTypes = await getJobById(id);
//     return { title: job.title };
// }

export default async function SingleJobPage({ params: { id } }: PageProps) {
    return (
        <div className="my-10">
            <JobDetail id={id} />
        </div>
    );
}
