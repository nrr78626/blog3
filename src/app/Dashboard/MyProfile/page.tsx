"use client"
import React, { useEffect, useState } from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import { useAppSelector } from '@/Store/Hooks/hooks'
import MyProfile from '@/Features/Dashboard/MyProfile'
import Loading from '../loading'


const page = () => {
  const [isClient, setIsClient] = useState(false)
  const { currenUser } = useAppSelector((state) => state.userMethod)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <PageContainer title='My Profile' description='this my profile page' >
      {isClient ? <MyProfile user={currenUser} /> : <Loading />}
    </PageContainer>
  )
}

export default page