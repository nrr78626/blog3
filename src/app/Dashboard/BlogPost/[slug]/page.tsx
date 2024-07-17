"use client"
import React, { useEffect, useState } from 'react'
import PageContainer from '@/components/components/container/PageContainer'

const page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    const [blog, setBlog] = useState("")
    const fetchSpecificBlog = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await response.json()
            setBlog(json.blog)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(blog)

    const { title, description, content,autherName }: any = blog

    useEffect(() => {
        fetchSpecificBlog()
    }, [])
    return (
        <PageContainer title='Blog' description='this this blog content' >
            <div className='flex flex-col'>
                <h1 className='text-3xl font-semibold text-wrap my-4'>{title}</h1>
                <span className='text-semibold text-wrap font-semibold' >{description}</span>
                <div dangerouslySetInnerHTML={{__html:content}} className='my-4' >

                </div>
                <div className='flex justify-end mt-4'>
                    <span className='text-right'>Write By :- {autherName}</span>
                </div>
            </div>
        </PageContainer>
    )
}

export default page
