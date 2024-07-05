"use client"
import Header from '@/Features/Header'
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'

const page = ({ params }: { params: { slug: string } }) => {

    return (
        <PageContainer title='Title' description='this is desctiption'>
            <Header />

        </PageContainer>
    )
}

export default page