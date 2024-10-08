"use client"
import BaseCard from '@/components/components/shared/BaseCard'
import { Grid, Stack, TextField, Button, Box } from '@mui/material'
import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useAppDispatch, useAppSelector } from '@/Store/Hooks/hooks'
import { addBlog } from '@/Store/Feature/Blog/blogSlice'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })
import { ToastContainer } from 'react-toastify'
import BlogCategory from '@/Models/BlogType/BlogType'

const AddBlog = () => {
    const dispatch = useAppDispatch()
    const elementRef = useRef(null)
    const [blog, setBlog] = useState<any | null>({ title: "", description: "" })
    const [category, setCategory] = useState<any>("")
    const [content, setContent] = useState<any | null>(null)
    const [blogImg, setBlogImg] = useState<any | null>(null)
    const { success }: any = useAppSelector(state => state.blogMethod)

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
        formData.append("category", category)
        dispatch(addBlog(formData))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const handleOnSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if(e.target.name=="category"){
            setCategory(e.target.value)
        }
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
                            <div className='flex flex-col border-[1px] rounded px-1 text-gray-700 hover:border-gray-900 focus:border-cyan-500'>
                                <select name="category" id="category" className='outline-none py-3' onChange={handleOnSelectChange} >
                                    <option value={BlogCategory.any}>Select Category</option>
                                    <option value={BlogCategory.news}>News</option>
                                    <option value={BlogCategory.result}>Result</option>
                                    <option value={BlogCategory.sports}>Sports</option>
                                    <option value={BlogCategory.stocks}>Stocks</option>
                                    <option value={BlogCategory.tech}>Technology</option>
                                </select>
                            </div>
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