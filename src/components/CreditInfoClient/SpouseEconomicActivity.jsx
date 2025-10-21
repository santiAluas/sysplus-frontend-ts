import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const SpouseEconomicActivity = ({ info, handleChange }) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        <Typography fontWeight="bold" variant='h6' component='h6'>
                            Ocupacion Laboral:
                        </Typography>
                        <FormControl mt={2} sx={{ marginLeft: 2 }}>
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="economicActivityConyuge.occupationJob"
                                value={info.economicActivityConyuge.occupationJob}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Comercio" />
                                <FormControlLabel value="2" control={<Radio />} label="Emp Privada" />
                                <FormControlLabel value="3" control={<Radio />} label="Emp Publica" />
                                <FormControlLabel value="4" control={<Radio />} label="Remesas" />
                                <FormControlLabel value="5" control={<Radio />} label="jubilado" />
                                <FormControlLabel value="6" control={<Radio />} label="otros" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item sx={12} lg={4}>
                        <Grid container alignItems="center" >
                            <Grid item xs={12} lg={2}>
                                Antiguedad:
                            </Grid>
                            <Grid item xs={12} lg={10}>
                                <TextField id="filled-basic"
                                    label="AAAA/MM"
                                    variant="filled"
                                    fullWidth
                                    name="economicActivityConyuge.antiguedad"
                                    value={info.economicActivityConyuge.antiguedad}
                                    onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={12} lg={4}>
                        <Grid container alignItems="center" >
                            <Grid item xs={12} lg={2}>
                                Cargo:
                            </Grid>
                            <Grid item xs={12} lg={10}>
                                <TextField id="filled-basic"
                                    label="CARGO"
                                    variant="filled"
                                    fullWidth
                                    name="economicActivityConyuge.cargo"
                                    value={info.economicActivityConyuge.cargo}
                                    onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={12} lg={4}>
                        <Grid container alignItems="center" >
                            <Grid item xs={12} lg={2}>
                                Jefe:
                            </Grid>
                            <Grid item xs={12} lg={10}>
                                <TextField id="filled-basic"
                                    label="JEFE"
                                    variant="filled"
                                    fullWidth
                                    name="economicActivityConyuge.boss"
                                    value={info.economicActivityConyuge.boss}
                                    onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} lg={6}>
                        <Grid container>
                            <Grid item xs={6} lg={6} >
                                <TextField id="filled-basic"
                                    label="Telefono"
                                    variant="filled"
                                    fullWidth
                                    name="economicActivityConyuge.phone"
                                    value={info.economicActivityConyuge.phone}
                                    onChange={handleChange} />

                            </Grid>
                            <Grid item xs={6} lg={6} alignItems="center">
                                <Stack direction="row"
                                    justifyContent="left"
                                    alignItems="center"
                                    flexWrap='wrap'>
                                    <FormControl mt={2} sx={{ marginLeft: 2 }}>
                                        <RadioGroup
                                            row
                                            aria-labelledby="goup-label-kit"
                                            name="economicActivityConyuge.linePhone"
                                            value={info.economicActivityConyuge.linePhone}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="1" control={<Radio />} label="Movi" />
                                            <FormControlLabel value="2" control={<Radio />} label="Clar" />
                                            <FormControlLabel value="3" control={<Radio />} label="Tuenti" />
                                            <FormControlLabel value="4" control={<Radio />} label="CNT" />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField id="filled-basic"
                            label="Direccion"
                            variant="filled"
                            fullWidth
                            name="economicActivityConyuge.address"
                            value={info.economicActivityConyuge.address}
                            onChange={handleChange} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default SpouseEconomicActivity