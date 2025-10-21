import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Stack, TextField } from '@mui/material'
import React from 'react'
import Radio from '@mui/material/Radio';
import InputMask from 'react-input-mask';
const InfoConyuge = ({ client, handleChange }) => {
    return (
        <>
            <Grid container>
                <Grid item sx={12} lg={3}>
                    <FormControl mt={2}>
                        <RadioGroup
                            row
                            aria-labelledby="goup-label-kit"
                            name="dataConyuge.typeIdentification"
                            value={client.dataConyuge.typeIdentification}
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
                            <TextField id="filled-basic"
                                label=""
                                variant="filled"
                                fullWidth
                                name="dataConyuge.numberIdentification"
                                value={client.dataConyuge.numberIdentification}
                                onChange={handleChange} />
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
                                value={client.dataConyuge.dateBirth}
                                onChange={handleChange}
                            >
                                {() => (
                                    <TextField
                                        id="dateBirth"
                                        label="(YYYY/MM/DD)"
                                        variant="filled"
                                        fullWidth
                                        name="dataConyuge.dateBirth"
                                        value={client.dataConyuge.dateBirth}
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
                            <TextField id="filled-basic"
                                label=""
                                variant="filled"
                                fullWidth
                                name="dataConyuge.firstNameClient"
                                value={client.dataConyuge.firstNameClient}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={6} lg={6}>
                    <Grid container alignItems='center'>
                        <Grid item xs={12} lg={3}>
                            APELLIDOS:
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <TextField id="filled-basic"
                                label=""
                                variant="filled"
                                fullWidth
                                name='dataConyuge.lastNameClient'
                                value={client.dataConyuge.lastNameClient}
                                onChange={handleChange} />
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
                        <TextField id="filled-basic"
                            label="test@gmail.com"
                            variant="filled"
                            name='dataConyuge.email'
                            value={client.dataConyuge.email}
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
                        <TextField id="filled-basic"
                            label="09999999999"
                            variant="filled"
                            sx={{ width: '55%' }}
                            name='dataConyuge.phone'
                            value={client.dataConyuge.phone}
                            onChange={handleChange} />
                        <FormControl >
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="dataConyuge.linePhone"
                                value={client.dataConyuge.linePhone}
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

export default InfoConyuge