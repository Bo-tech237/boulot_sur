'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserLogin from './UserLogin';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

function LoginTabs({ SignIn }: { SignIn: React.ReactNode }) {
    return (
        <div>
            <Tabs defaultValue="recruiter" className="w-80 sm:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recruiter">RECRUITER</TabsTrigger>
                    <TabsTrigger value="applicant">APPLICANT</TabsTrigger>
                </TabsList>
                <TabsContent value="recruiter">
                    <Card>
                        <CardHeader>
                            <CardTitle>RECRUITER ACCOUNT</CardTitle>
                            <CardDescription>
                                Press to sign in with your Google account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserLogin
                                accountType="recruiter"
                                SignIn={SignIn}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="applicant">
                    <Card>
                        <CardHeader>
                            <CardTitle>APPLICANT ACCOUNT</CardTitle>
                            <CardDescription>
                                Press to sign in with your Google account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserLogin
                                accountType="applicant"
                                SignIn={SignIn}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default LoginTabs;
