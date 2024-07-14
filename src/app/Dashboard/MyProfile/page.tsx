"use client"
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import { useAppSelector } from '@/Store/Hooks/hooks'

const page = () => {
    const {currenUser} = useAppSelector(state=>state.userMethod)
  return (
    <PageContainer title='My Profile' description='this my profile page' >
        <>
        
        </>
    </PageContainer>
  )
}

export default page