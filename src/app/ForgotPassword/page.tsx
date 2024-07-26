"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import Header from '@/Features/Header'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const page = () => {
    const token: any = useSearchParams().get("token")
    const router = useRouter()

    const [forgotPass, setForgotPass] = useState({ email: "" })
    const [changePassword, setChangePassword] = useState({ password: "", cpassword: "" })

    const handleOnForgotSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email } = forgotPass
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/ForgotPass`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
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
                setTimeout(() => {
                    router.push("/")
                }, 3000)
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

    const handleOnChangePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { password, cpassword } = changePassword
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/ConfirmNewPassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ password, cpassword })
            })
            const json = await response.json()
            console.log(json)
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
                setTimeout(() => {
                    router.push("/Login")
                }, 3000)
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

    const handleOnForgotChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForgotPass({ ...forgotPass, [e.target.name]: e.target.value })
    }

    const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setChangePassword({ ...changePassword, [e.target.name]: e.target.value })
    }

    return (
        <>
            {!token && <PageContainer title='Forgot Password' description='this is forgot password page' >
                <Header />
                <section className="text-gray-600 body-font relative">
                    <ToastContainer className="z-[9999]" />
                    <div className="px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full">
                            <h1 className="sm:text-lg text-lg title-font mb-4 text-gray-800 font-semibold">Forgot Password</h1>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <form onSubmit={handleOnForgotSubmit}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="relative w-full">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleOnForgotChange} />
                                    </div>
                                    <div className="p-2 w-full mt-10">
                                        <button type='submit' className="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-md">Forget</button>
                                    </div>
                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-gray-500">dailynarratives08@gmail.com</a>
                                        <p className="leading-normal my-5">Nasirpur,Hansrajpur,
                                            <br />Ghazipur, U.P. 233310.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </PageContainer>}
            {token && <PageContainer title='Chnage Password' description='this is change password page' >
                <Header />
                <section className="text-gray-600 body-font relative">
                    <ToastContainer className="z-[9999]" />
                    <div className="px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full">
                            <h1 className="sm:text-lg text-lg title-font mb-4 text-gray-800 font-semibold">Change Password</h1>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <form onSubmit={handleOnChangePasswordSubmit}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="relative w-full my-2">
                                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                        <input type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleOnChangePassword} />
                                    </div>
                                    <div className="relative w-full my-2">
                                        <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                        <input type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={handleOnChangePassword} />
                                    </div>
                                    <div className="p-2 w-full mt-10">
                                        {changePassword.password != changePassword.cpassword && <span className='text-red-500 font-semibold'>Password not match</span>}
                                    </div>
                                    <div className="p-2 w-full mt-5">
                                        <button type='submit' className="flex mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-md" disabled={changePassword.password != changePassword.cpassword}>Change</button>
                                    </div>
                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-gray-500">dailynarratives08@gmail.com</a>
                                        <p className="leading-normal my-5">Nasirpur,Hansrajpur,
                                            <br />Ghazipur, U.P. 233310.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </PageContainer>}
        </>
    )
}

export default page

