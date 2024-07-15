"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = ({ user }: { user: any }) => {
    const router = useRouter()
    const [userImg, setUserImg] = useState<File | null>(null)

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!userImg) {
                return
            }

            const formData = new FormData()
            formData.append("avatar", userImg)
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/AvatarUploader`, {
                method: "PUT",
                headers: {

                },
                body: formData
            })
            const json = await response.json()
            if (json.success) {
                toast.success(json.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push("/Dashboard")
            } else {
                toast.error(json.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUserImg(e.target.files[0])
        }
    }
    return (
        <div className="container px-5 py-2 mx-auto">
            <ToastContainer />
            <form onSubmit={handleOnSubmit} encType='multipart/form-data' >
                <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center">
                    <Image priority={true} alt="ecommerce" className="lg:w-1/2 w-64 lg:h-64 h-64 object-cover object-center rounded cursor-pointer" src={user?.avatar} height={500} width={500} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <span className="text-sm title-font text-gray-50 bg-green-600 px-3 py-2 rounded mt-3">{user.role}</span>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">{user.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <span className="text-gray-600 ml-3">Years old</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                {user.age}
                            </span>
                        </div>
                        <p className="leading-relaxed">{user.email}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex items-center">
                                <span className="mr-3">Trust : </span>
                                {user.isVerified && <button className="border-2 border-gray-300 ml-1 p-1 rounded text-gray-50 bg-green-600 focus:outline-none">Verified</button>}
                                {!user.isVerified && <button className="border-2 border-gray-300 ml-1 p-1 rounded text-gray-50 bg-red-500 focus:outline-none">Not Verified</button>}
                            </div>
                            <div className="flex ml-6 items-center text-center justify-center">
                                <label htmlFor="avatar">
                                    <span className="mr-3 hover:font-bold cursor-pointer transition-all">Change Picture</span>
                                    <div className="relative">
                                        <input type="file" className='hidden' id='avatar' name='avatar' onChange={handleOnChange} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type='submit' className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MyProfile