import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Stack, TextField } from '@mui/material'
import React from 'react'
import Radio from '@mui/material/Radio';
import InputMask from 'react-input-mask';

const InfoClient = ({ isConyuge = false, client, handleChange }) => {
    return (
        <>
            <Grid container>
                <Grid item sx={12} lg={3}>
                    <FormControl mt={2}>
                        <RadioGroup
                            row
                            aria-labelledby="goup-label-kit"
                            name="typeIdentification"
                            value={client.typeIdentification}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="F7B8C5595D3D4DC0A9069CA398E18EA1" control={<Radio />} label="CC" />
                            <FormControlLabel value="CCF01D38CE5A438BA87CD64F390CBE8D" control={<Radio />} label="CI" />
                            <FormControlLabel value="9792F4F138FA40D8962EB3D962691CF1" control={<Radio />} label="RUC" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item sx={12} lg={5}>

                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={4}>
                            NUMERO DE IDENTIFICACION:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField hiddenLabel id="filled-basic" label="" variant="filled" fullWidth name="numberIdentification" value={client.numberIdentification} onChange={handleChange} />
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item sx={12} lg={4}>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={4}>
                            FECHA DE NACIMIENTO:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <InputMask
                                mask="9999/99/99"
                                value={client.dateBirth}
                                onChange={handleChange}
                            >
                                {() => (
                                    <TextField
                                        id="dateBirth"
                                        label="(YYYY/MM/DD)"
                                        variant="filled"
                                        fullWidth
                                        name="dateBirth"
                                        value={client.dateBirth}
                                        onChange={handleChange}
                                    />
                                )}
                            </InputMask>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item sx={6} lg={6}>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={2}>
                            NOMBRES:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField hiddenLabel id="filled-basic" label="" variant="filled" fullWidth name="firstNameClient" value={client.firstNameClient} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={6} lg={6}>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={3}>
                            APELLIDOS:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField hiddenLabel id="filled-basic" label="" variant="filled" fullWidth name='lastNameClient' value={client.lastNameClient} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container mt={2} >
                <Grid item sx={6} lg={4}>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={3}>
                            NACIONALIDAD:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField hiddenLabel id="filled-basic" label="" variant="filled" fullWidth name='nationality' value={client.nationality} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={6} lg={5}>
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        flexWrap='wrap'>
                        ESTADO CIVIL:
                        <FormControl mt={2} sx={{ marginLeft: 2 }}>
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="statusCivil"
                                value={client.statusCivil}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="1676E45D1C8C440D8059BCB714CD0B99" control={<Radio />} label="Soltero" />
                                <FormControlLabel value="DEEFEAA8FD6242FE957DBC7FBE621CDC" control={<Radio />} label="Casado" />
                                <FormControlLabel value="57416E6557594B3690A11C1F96795A41" control={<Radio />} label="Viudo" />
                                <FormControlLabel value="4602B6605C7B4B599E5249FAA4698EE6" control={<Radio />} label="Divorciado" />
                                <FormControlLabel value="07E8AEB5B87D4536ACD74D4144A2A42C" control={<Radio />} label="Union Libre" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item sx={12} lg={3} spacing={2}>

                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={4}>
                            CARGAS FAMILIARES:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField hiddenLabel id="filled-basic"
                                variant="filled"
                                fullWidth
                                name='familyBurdens'
                                value={client.familyBurdens}
                                onChange={handleChange}
                              />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

            <Grid container mt={3}>
                <Grid item sx={12} lg={4}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap' spacing={2}>
                        CORREO:
                        <TextField hiddenLabel id="filled-basic"
                            variant="filled"
                            name='email'
                            value={client.email}
                            onChange={handleChange}
                            sx={{ width: '80%' }} />
                    </Stack>
                </Grid>
                <Grid item sx={12} lg={8}>
                    <Stack direction="row"
                        justifyContent="left"
                        alignItems="center"
                        flexWrap='wrap' spacing={2}>
                        CELULAR:
                        <TextField hiddenLabel
                            id="filled-basic"
                            variant="filled"
                            sx={{ width: '55%' }}
                            name='phone'
                            value={client.phone} onChange={handleChange} />
                        <FormControl >
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="linePhone"
                                value={client.linePhone}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Movi" />
                                <FormControlLabel value="2" control={<Radio />} label="Claro" />
                                <FormControlLabel value="3" control={<Radio />} label="Tuenti" />
                                <FormControlLabel value="4" control={<Radio />} label="CNT" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid>

        </>
    )
}

export default InfoClient