"use client"
import PageContainer from "@/components/components/container/PageContainer";
import Header from "@/Features/Header";
import Blog from "@/Features/Blog";
import { useEffect, useState } from "react";

export default function Home() {
  const [blog, setBlog] = useState("")

  const getAllUsersBlogs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/GetUsersBlog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()
    setBlog(json.blogs)
  }

  useEffect(() => {
    getAllUsersBlogs()
  }, [])
  return (
    <PageContainer title="Home" description="this is daily narratives home page">
      <Header />
      <div>
        <Blog blog={blog} />
      </div>
    </PageContainer>
  );
}
