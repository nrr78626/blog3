"use client"
import PageContainer from '@/components/components/container/PageContainer'
import Header from '@/Features/Header'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    const [blog, setBlog] = useState("")
    const getSingleBlog = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/SingleBlog/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await response.json()
            console.log(json)
            setBlog(json.blog)
        } catch (error) {
            console.log(error)
        }
    }
    const { title, description, content, autherName }: any = blog

    useEffect(() => {
        getSingleBlog()
    }, [])
    return (
        <PageContainer title='Blog' description='this this blog content' >
            <Header />
            <div className='flex flex-col mx-6'>
                <h1 className='text-3xl font-semibold text-wrap my-4 mt-28'>{title}</h1>
                <span className='text-semibold text-wrap font-semibold' >{description}</span>
                <div dangerouslySetInnerHTML={{ __html: content }} className='my-4' >

                </div>
                <div className='flex justify-end mt-4'>
                    <span className='text-right'>Write By :- {autherName}</span>
                </div>
            </div>
        </PageContainer>
    )
}

export default page