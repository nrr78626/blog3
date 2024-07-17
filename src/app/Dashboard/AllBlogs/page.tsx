"use client"
import React, { useEffect } from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import AllBlogs from '@/Features/Dashboard/AllBlogs'
import { useAppDispatch, useAppSelector } from '@/Store/Hooks/hooks'
import { getallblogs } from '@/Store/Feature/Blog/blogSlice'

const page = () => {
  const {blogs} = useAppSelector(state=>state.blogMethod)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getallblogs())
  },[])
  return (
    <PageContainer title='All Blogs' description='this is all blogs page'>
        <AllBlogs blogs={blogs} />
    </PageContainer>
  )
}

export default page