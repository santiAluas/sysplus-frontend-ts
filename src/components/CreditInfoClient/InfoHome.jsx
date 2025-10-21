import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import React from 'react'

const InfoHome = ({info,  handleChange }) => {
    return (
        <>
            <Grid container>
                <Grid item sx={6} lg={6}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        TIPO VIVIENDA:
                        <FormControl mt={2} sx={{ marginLeft: 2 }}>
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="dataHome.housingType"
                                value={info.dataHome.housingType}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="01C4FC200E1A4C78B66448C7186B6367" control={<Radio />} label="Arrendada" />
                                <FormControlLabel value="F6892A5677354107B26D4A90C33C2604" control={<Radio />} label="Vive con familiares" />
                                <FormControlLabel value="90C099D4BC794574A9195DA17C36C39D" control={<Radio />} label="Propia hipotecada" />
                                <FormControlLabel value="8AB690A2D5F2485EBD6E27DAB72D6BA4" control={<Radio />} label="Propia No hipotecada" />
                                <FormControlLabel value="EE424F1C8A594621801253DD94C57045" control={<Radio />} label="Prestada" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>

                <Grid item sx={6} lg={6}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        TIEMPO DE RESIDENCIA:
                        <TextField id="filled-basic" 
                                   label="AAAA/MM" 
                                   variant="filled" 
                                   sx={{ width: '55%' }}
                                   name="dataHome.housingTime"
                                   value={info.dataHome.housingTime}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container mt={3}>
                <Grid item sx={6} lg={6}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        DIRECCION:
                        <TextField id="filled-basic" 
                                   label="Cargas" 
                                   variant="filled" 
                                   sx={{ width: '55%' }}
                                   name="dataHome.address"
                                   value={info.dataHome.address}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
                <Grid item sx={6} lg={6}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        REFERENCIA DOMICILIO:
                        <TextField id="filled-basic" 
                                   label="Cargas" 
                                   variant="filled" 
                                   sx={{ width: '55%' }}
                                   name="dataHome.reference"
                                   value={info.dataHome.reference}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>

            <Grid container mt={3}>
                <Grid item sx={6} lg={4}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        PROVINCIA:
                        <TextField id="filled-basic" 
                                   label="Cargas" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name="dataHome.province"
                                   value={info.dataHome.province}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
                <Grid item sx={6} lg={4}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        CANTON:
                        <TextField id="filled-basic" 
                                   label="Cargas" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name="dataHome.canton"
                                   value={info.dataHome.canton}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
                <Grid item sx={6} lg={4}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap'>
                        PARROQUIA:
                        <TextField id="filled-basic" 
                                   label="Cargas" 
                                   variant="filled" 
                                   sx={{ width: '80%' }}
                                   name="dataHome.parroquia"
                                   value={info.dataHome.parroquia}
                                   onChange={handleChange} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default InfoHome