import BaseCard from '@/components/components/shared/BaseCard';
import { useAppSelector } from '@/Store/Hooks/hooks';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box } from '@mui/material';
import React from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import roles from '@/Models/Roles/Roles';
import Link from 'next/link';
import { editUserRole } from '@/Store/Feature/Auth/userSlice';

const AllUsers = () => {
    const { user } = useAppSelector(state => state.userMethod)
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="All Users">
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
                                        <Typography display={"flex"} justifyContent={"center"} color="textSecondary" variant="h6">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography display={"flex"} justifyContent={"center"} color="textSecondary" variant="h6">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography display={"flex"} justifyContent={"center"} color="textSecondary" variant="h6">
                                            Role
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography display={"flex"} justifyContent={"center"} color="textSecondary" variant="h6">
                                            Contact
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography display={"flex"} justifyContent={"center"} color="textSecondary" variant="h6">
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.map((_users: any) => (
                                    <TableRow key={_users._id}>
                                        <TableCell>
                                            <Typography display={"flex"} justifyContent={"center"} fontSize="15px" fontWeight={500}>
                                                {/* {product.id} */}{_users.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" justifyContent={"center"}>
                                                <Box display={"flex"} justifyContent={"center"}>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {/* {product.name} */}{_users.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <select className='outline-none flex items-center justify-center bg-blue-700 text-gray-50 rounded-sm py-1 px-1' name="role" id="role" defaultValue={_users.role}>
                                                <option value={roles.admin}>Admin</option>
                                                <option value={roles.moderatars}>Moderatars</option>
                                                <option value={roles.user}>User</option>
                                                <option value={roles.superuser} disabled >Superuser</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <Typography display={"flex"} justifyContent={"center"} variant="h6">{_users.contact}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                <FaTrashCan className='mx-3 cursor-pointer text-red-600' />
                                                <IoMdCloudUpload onClick={()=>editUserRole({id:_users._id})} className='mx-3 cursor-pointer text-green-600 font-semibold text-xl' />
                                            </Box>
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

export default AllUsers