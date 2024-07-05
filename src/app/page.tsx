"use client"
import PageContainer from "@/components/components/container/PageContainer";
import Header from "@/Features/Header";
import Blog from "@/Features/Blog";

export default function Home() {
  return (
    <PageContainer title="Home" description="this is daily narratives home page">
      <Header />
      <div>
        <Blog />
      </div>
    </PageContainer>
  );
}
