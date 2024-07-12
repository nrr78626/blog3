"use client"
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import AllBlogs from '@/Features/Dashboard/AllBlogs'

const page = () => {
  return (
    <PageContainer title='All Blogs' description='this is all blogs page'>
        <AllBlogs/>
    </PageContainer>
  )
}

export default page