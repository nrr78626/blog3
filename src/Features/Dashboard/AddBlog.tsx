"use client"
import BaseCard from '@/components/components/shared/BaseCard'
import { Grid, Stack, TextField, Button, Box } from '@mui/material'
import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useAppDispatch } from '@/Store/Hooks/hooks'
import { addBlog } from '@/Store/Feature/Blog/blogSlice'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

const AddBlog = () => {
    const dispatch = useAppDispatch()
    const ref = useRef(null)
    const [blog, setBlog] = useState({ title: "", description: "" })
    const [content, setContent] = useState("")

    const config = useMemo(() => ({
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
        },

    }), [])

    const handleOnSubmit=async(e:any)=>{
        e.preventDefault()
        const {title,description} = blog
        dispatch(addBlog({content,title,description}))
    }



    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
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
                            <JoditEditor value={content} ref={ref} onChange={(newContent) => setContent(newContent)} />
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