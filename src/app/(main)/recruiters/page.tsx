import { Metadata } from 'next';
import AllRecruiters from './AllRecruiters';

export const metadata: Metadata = {
    title: 'Recruiters',
};

export default function RecruitersPage() {
    return (
        <div>
            <AllRecruiters />
        </div>
    );
}
