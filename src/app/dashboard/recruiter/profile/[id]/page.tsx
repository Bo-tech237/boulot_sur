import { Metadata } from 'next';
import UpdateProfile from './UpdateProfile';

type Props = { params: { id: string } };

export const metadata: Metadata = {
    title: 'Update Profile',

    description: 'Find your dream job in Cameroon!',
};

function UpdateProfilepage({ params }: Props) {
    const id = params.id;

    return (
        <div>
            <UpdateProfile id={id} />
        </div>
    );
}

export default UpdateProfilepage;
