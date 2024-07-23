import React from 'react';
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import Image from 'next/image';
import { TbCategoryFilled } from "react-icons/tb";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    return (
        <header className=''>
            <div className='flex items-center py-3 gap-2 px-2 bg-gray-200 text-gray-700 max-sm:hidden'>
                <div className='text-xl flex items-center gap-2'>
                    <IoIosCall /> <span className='text-sm font-semibold'>:  +91-9967995334</span>
                </div>
                <span className='h-6 w-[1px] border-l-[1px] border-pink-700'></span>
                <div className='text-xl flex items-center gap-2'>
                    <IoIosMail /> <span className='text-sm font-semibold'>info@dailynarratives.info</span>
                </div>
            </div>
            <div className='bg-gray-700 flex items-center py-2 gap-3 px-1 text-pink-100'>
                <div>
                    <Image src={"https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-12899.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721606400&semt=ais_user"} alt='blog' height={1000} width={1000} className='h-20 w-20 rounded' />
                </div>
                <span className='h-14 w-[1px] border-l-[2px] border-pink-200 max-sm:hidden'></span>
                <div className='flex items-center gap-2 max-sm:hidden'>
                    <TbCategoryFilled className='text-2xl' />
                    <Link href={"#"} className='font-semibold'>Category</Link>
                </div>
                <div className='ml-5 max-sm:hidden'>
                    <ul className='flex gap-4'>
                        <li className='border-2 border-b-2 border-gray-700 hover:border-b-gray-100 transition-all duration-300'>
                            <Link href={"#"}>Home</Link>
                        </li>
                        <li className='border-2 border-b-2 border-gray-700 hover:border-b-gray-100 transition-all duration-300'>
                            <Link href={"#"}>Blog</Link>
                        </li>
                        <li className='border-2 border-b-2 border-gray-700 hover:border-b-gray-100 transition-all duration-300'>
                            <Link href={"#"}>About Us</Link>
                        </li>
                        <li className='border-2 border-b-2 border-gray-700 hover:border-b-gray-100 transition-all duration-300'>
                            <Link href={"#"}>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className='absolute right-2  sm:hidden'> 
                    <div>
                        <GiHamburgerMenu className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header