"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import PageContainer from '@/components/components/container/PageContainer'
import BaseCard from '@/components/components/shared/BaseCard'
import { Grid, Stack, TextField, Button, Box } from '@mui/material'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const [changepass, setChangePass] = useState({ oldpass: "", newpass: "", confpass: "" })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const { oldpass, newpass, confpass } = changepass
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/ChangePass`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ oldpass, newpass, confpass })
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
                    router.push("/Dashboard")
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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChangePass({ ...changepass, [e.target.name]: e.target.value })
    }
    return (
        <PageContainer title='Change Password' description='this is change password page' >
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <Box zIndex={"999999"}>
                        <ToastContainer />
                    </Box>
                    <BaseCard title="Change Password">
                        <form onSubmit={handleOnSubmit} >
                            <Stack spacing={3}>
                                <TextField
                                    id="oldpass-basic"
                                    label="Old Password"
                                    type="password"
                                    variant="outlined"
                                    name='oldpass'
                                    onChange={handleOnChange}
                                />
                                <TextField
                                    id="newpass-basic"
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    name='newpass'
                                    onChange={handleOnChange}
                                />
                                <TextField
                                    id="confirmpass-basic"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    name='confpass'
                                    onChange={handleOnChange}
                                />
                            </Stack>
                            <br />
                            <Box display={"flex"} justifyContent={"center"}>
                                <Button color='success' variant='contained' size='large' type='submit' >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </BaseCard>
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default page