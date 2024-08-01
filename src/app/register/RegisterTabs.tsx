'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import RegisterRecruiter from '@/components/RegisterRecruiter';
import RegisterApplicant from '@/components/RegisterApplicant';
import RegisterPermissions from '@/auth/RegisterPermissions';

function RegisterTabs() {
    return (
        <div>
            <RegisterPermissions>
                <Tabs defaultValue="recruiter" className="w-96 sm:w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="recruiter">RECRUITER</TabsTrigger>
                        <TabsTrigger value="applicant">APPLICANT</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recruiter">
                        <Card>
                            <CardHeader>
                                <CardTitle>RECRUITER ACCOUNT</CardTitle>
                                <CardDescription>
                                    Create your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RegisterRecruiter />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="applicant">
                        <Card>
                            <CardHeader>
                                <CardTitle>APPLICANT ACCOUNT</CardTitle>
                                <CardDescription>
                                    Create your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RegisterApplicant />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </RegisterPermissions>
        </div>
    );
}

export default RegisterTabs;
