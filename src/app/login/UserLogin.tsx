'use client';

import { ReactNode, useEffect } from 'react';
import { getUserRole } from '@/action/getRole';

type accountTypeProps = {
    accountType: string;
    SignIn: ReactNode;
};

function UserLogin({ accountType, SignIn }: accountTypeProps) {
    useEffect(() => {
        async function getRole(account: string) {
            return await getUserRole(accountType);
        }

        getRole(accountType);
    }, [accountType]);

    return <div>{SignIn}</div>;
}

export default UserLogin;
