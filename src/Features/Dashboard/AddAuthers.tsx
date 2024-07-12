import BaseCard from '@/components/components/shared/BaseCard'
import { Grid, Stack, TextField, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, Button, Box } from '@mui/material'
import React from 'react'

const AddAuthers = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <BaseCard title="Add Auther">
                    <>
                        <Stack spacing={3}>
                            <TextField
                                id="name-basic"
                                label="Name"
                                variant="outlined"
                            />
                            <TextField id="email-basic" label="Email" variant="outlined" />
                            <TextField
                                id="pass-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                            />
                            <TextField
                                id="cpass-basic"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                            />
                        </Stack>
                        <br />
                        <Box display={"flex"} justifyContent={"center"} >
                            <Button variant='contained' color='success' >
                                Add Auther
                            </Button>
                        </Box>
                    </>
                </BaseCard>
            </Grid>
        </Grid>
    )
}

export default AddAuthers