"use client"
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import AllUsers from '@/Features/Dashboard/AllUsers'

const page = () => {
  return (
    <PageContainer title='All Users' description='this is all users page'>
        <AllUsers/>
    </PageContainer>
  )
}

export default page