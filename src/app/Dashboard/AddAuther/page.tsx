"use client"
import React from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import AddAuthers from '@/Features/Dashboard/AddAuthers'

const page = () => {
  return (
    <PageContainer title='Add Auther' description='this is add auther page'>
        <AddAuthers/>
    </PageContainer>
  )
}

export default page