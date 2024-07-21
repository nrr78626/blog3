import React from 'react'
import Link from 'next/link'
import Loading from '@/app/loading'
import Image from 'next/image'

const Blog = ({ blog }: { blog: any }) => {
    console.log(blog)
    if (!blog) {
        return <Loading></Loading>
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {blog?.map((e: any) => (
                        <Link href={`/SingleBlog/${e._id}`} key={e._id} legacyBehavior className='cursor-pointer' >
                            <div className="p-4 md:w-1/3 cursor-pointer">
                                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={e.images} alt="blog" />
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{e.title}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{e.title}</h1>
                                        <p className="leading-relaxed mb-3 overflow-hidden text-wrap truncate line-clamp-3">{e.description}</p>
                                        <div className="flex items-center flex-wrap ">
                                            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                Auther
                                            </span>
                                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                {e.autherName}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Blog