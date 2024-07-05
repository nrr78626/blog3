"use client"
import React from 'react'
import Signup from '@/Features/Signup'
import PageContainer from '@/components/components/container/PageContainer'
import Header from '@/Features/Header'

const page = () => {
  return (
    <PageContainer title='Signup' description='this is signup page' >
        <Header/>
        <Signup/>
    </PageContainer>
  )
}

export default page