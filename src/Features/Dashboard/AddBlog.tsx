"use client"
import BaseCard from '@/components/components/shared/BaseCard'
import { Grid, Stack, TextField, Button, Box } from '@mui/material'
import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/Store/Hooks/hooks'
import { addBlog } from '@/Store/Feature/Blog/blogSlice'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

const AddBlog = () => {
    const dispatch = useAppDispatch()
    const elementRef = useRef(null)
    const [blog, setBlog] = useState<any>({ title: "", description: "" })
    const [content, setContent] = useState<any | null>(null)
    const { loading, success } = useAppSelector(state => state.blogMethod)
    const router = useRouter()

    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        const { title, description } = blog
        dispatch(addBlog({ content, title, description }))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (success == true) {
            router.push("/Dashboard/AllBlogs")
        }
    }, [success])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <ToastContainer className={"z-[99999]"} />
                <BaseCard title="Add Blog">
                    <form onSubmit={handleOnSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                id="title-basic"
                                label="Title"
                                variant="outlined"
                                onChange={handleOnChange}
                                name='title'
                            />
                            <TextField id="desc-basic" name='description' label="Description" variant="outlined" onChange={handleOnChange} />
                        </Stack>
                        <Stack mt={3}>
                            <JoditEditor value={blog.content} ref={elementRef} onChange={(newContent) => setContent(newContent)} />
                        </Stack>
                        <br />
                        <Box display={"flex"} justifyContent={"center"} >
                            <Button type='submit' variant='contained' color='success' size='large'>
                                Add Blog
                            </Button>
                        </Box>
                    </form>
                </BaseCard>
            </Grid>
        </Grid>
    )
}

export default AddBlog