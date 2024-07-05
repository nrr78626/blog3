"use client"
import React from 'react'
import PageContainer from "@/components/components/container/PageContainer";
import Login from "@/Features/Login";
import Header from '@/Features/Header';

const page = () => {
    return (
        <PageContainer title='Login' description='this is login page' >
            <Header />
            <Login />
        </PageContainer>
    )
}

export default page