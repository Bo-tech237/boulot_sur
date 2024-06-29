'use server';
import { signOut } from '@/auth';
import { promises as fs } from 'fs';

export async function getUserRole(account: string) {
    const file = await fs.readFile(
        process.cwd() + '/src/app/userRole.json',
        'utf8'
    );
    const data = JSON.parse(file);

    data.role = account;

    const jsonString = JSON.stringify(data);

    const updatedFile = await fs.writeFile(
        process.cwd() + '/src/app/userRole.json',
        jsonString,
        'utf8'
    );

    const updatedJsonFile = JSON.stringify(updatedFile);
    return updatedJsonFile;
}

export async function logOut() {
    await signOut();
}
