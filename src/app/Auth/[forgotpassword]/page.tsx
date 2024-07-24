"use client"
import React from 'react'

const page = ({ params }: { params: { forgotpassword: any } }) => {
    const { forgotpassword } = params
    return (
        <div>{forgotpassword}</div>
    )
}

export default page