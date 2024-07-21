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
    const [blogImg, setBlogImg] = useState<any | null>(null)
    const { success }: any = useAppSelector(state => state.blogMethod)
    const router = useRouter()

    const handleOnSubmit = async (e: any) => {
        e.preventDefault()
        const { title, description } = blog
        if (!blogImg) {
            return
        }
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("images", blogImg)
        formData.append("content", content)
        dispatch(addBlog(formData))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files) {
            setBlogImg(e.target.files[0])
        }
    }


    useEffect(() => {

    }, [success])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <ToastContainer className={"z-[9999]"} />
                <BaseCard title="Add Blog">
                    <form onSubmit={handleOnSubmit} encType='multipart/form-data'>
                        <Stack spacing={3}>
                            <TextField
                                id="title-basic"
                                label="Title"
                                variant="outlined"
                                onChange={handleOnChange}
                                name='title'
                            />
                            <TextField id="desc-basic" name='description' label="Description" variant="outlined" onChange={handleOnChange} />
                            <TextField type='file' id="desc-basic" name='images' label="" variant="outlined" onChange={handleOnChangeImage} />
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