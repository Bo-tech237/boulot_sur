import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    account: string;
    setAccount: (accountType: string) => void;
}

export const useAccountStore = create<State>()(
    persist(
        (set) => ({
            account: '',
            setAccount: (accountType) => set(() => ({ account: accountType })),
        }),
        {
            name: 'accountType',
        }
    )
);
