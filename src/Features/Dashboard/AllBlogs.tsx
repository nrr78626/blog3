import BaseCard from '@/components/components/shared/BaseCard';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'

const AllBlogs = ({ blogs }: { blogs: any }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="All Blogs">
          <TableContainer
            sx={{
              width: {
                xs: "274px",
                sm: "100%",
              },
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Auther
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog: any, index: any) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <Typography fontSize="15px" fontWeight={500}>
                        {blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography variant="h6" fontWeight={600} className='overflow-hidden truncate text-wrap line-clamp-1' >
                            {blog.description}
                          </Typography>
                          <Typography color="textSecondary" fontSize="13px">
                            {/* {blog[0].description} */}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {blog.autherName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        <Link href={`/Dashboard/BlogPost/${blog._id}`} >
                          Open
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BaseCard>
      </Grid>
    </Grid>
  )
}

export default AllBlogs