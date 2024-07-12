"use client"
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import AllAuthers from '@/Features/Dashboard/AllAuthers'

const page = () => {
  return (
    <PageContainer title='All Authers' description='this is our all authers' >
        <AllAuthers/>
    </PageContainer>
  )
}

export default page