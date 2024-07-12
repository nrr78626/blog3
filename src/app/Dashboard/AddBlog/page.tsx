"use client"
import PageContainer from '@/components/components/container/PageContainer'
import AddBlog from '@/Features/Dashboard/AddBlog'

const page = () => {
 
  return (
    <PageContainer title='Add Blog' description='this add blog page' >
        <AddBlog />
    </PageContainer>
  )
}

export default page