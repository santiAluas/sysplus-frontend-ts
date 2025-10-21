import { Container, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const SourceCustumerIncome = ({ info, handleChange }) => {
    return (
        <>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Container>
                    <Typography fontWeight="bold" variant='h5' component='h2' mb={1}  >1. Negocio Propio:</Typography>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="NOMBRE DEL NEGOCIO"
                            variant="filled" fullWidth
                            name="sourceIncome.ownBusiness.nameBusiness"
                            value={info.sourceIncome.ownBusiness.nameBusiness}
                            onChange={handleChange} />
                    </Stack>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="ANTIGUEDAD DE NEGOCIO"
                            variant="filled"
                            fullWidth
                            name="sourceIncome.ownBusiness.timeBusiness"
                            value={info.sourceIncome.ownBusiness.timeBusiness}
                            onChange={handleChange} />
                    </Stack>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="DIRECCION"
                            variant="filled"
                            fullWidth
                            name="sourceIncome.ownBusiness.address"
                            value={info.sourceIncome.ownBusiness.address}
                            onChange={handleChange} />
                    </Stack>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="REFERENCIA NEGOCIO"
                            variant="filled"
                            fullWidth
                            name="sourceIncome.ownBusiness.reference"
                            value={info.sourceIncome.ownBusiness.reference}
                            onChange={handleChange} />
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item sx={12} lg={6}>
                            <TextField id="filled-basic"
                                label="TELEFONO"
                                variant="filled"
                                fullWidth
                                name="sourceIncome.ownBusiness.phone"
                                value={info.sourceIncome.ownBusiness.phone}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item sx={12} lg={6}>
                            <TextField id="filled-basic"
                                label="CIUDAD"
                                variant="filled"
                                fullWidth
                                name="sourceIncome.ownBusiness.city"
                                value={info.sourceIncome.ownBusiness.city}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={2}>
                        <Grid item sx={12} lg={6}>
                            <TextField id="filled-basic"
                                label="CANTON"
                                variant="filled"
                                fullWidth
                                name="sourceIncome.ownBusiness.canton"
                                value={info.sourceIncome.ownBusiness.canton}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item sx={12} lg={6}>
                            <TextField id="filled-basic"
                                label="PROVINCIA"
                                variant="filled"
                                fullWidth
                                name="sourceIncome.ownBusiness.provincia"
                                value={info.sourceIncome.ownBusiness.provincia}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Container>
                <Container>
                    <Typography fontWeight="bold" variant='h5' component='h2' mb={1} >2.Empleado Privado: (sueldo, remesa, jubilacion, etc)</Typography>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="NOMBRE DE LA EMPRESA"
                            variant="filled"
                            sx={{ width: '100%' }}
                            name="sourceIncome.privateEmployee.nameCompany"
                            value={info.sourceIncome.privateEmployee.nameCompany}
                            onChange={handleChange} />
                    </Stack>
                    <Grid container spacing={2} mt={1} mb={2}>
                        <Grid item sx={12} lg={8}>
                            <TextField id="filled-basic"
                                label="TIEMPO TRABAJO (AAAA/MM)"
                                variant="filled"
                                fullWidth
                                name="sourceIncome.privateEmployee.timeCompany"
                                value={info.sourceIncome.privateEmployee.timeCompany}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item sx={12} lg={4}>
                            <Stack direction="row"
                                justifyContent="center"
                                alignItems="center"
                                flexWrap='wrap'>
                                AFILIADO:
                                <FormControl mt={2} sx={{ marginLeft: 2 }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="goup-label-kit"
                                        name="sourceIncome.privateEmployee.isAfiliado"
                                        value={info.sourceIncome.privateEmployee.isAfiliado}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="SI" />
                                        <FormControlLabel value="2" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="DIRECCION"
                            variant="filled"
                            sx={{ width: '100%' }}
                            name="sourceIncome.privateEmployee.address"
                            value={info.sourceIncome.privateEmployee.address}
                            onChange={handleChange} />

                    </Stack>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="REFERENCIA LUGAR TRABAJO"
                            variant="filled"
                            sx={{ width: '100%' }}
                            name="sourceIncome.privateEmployee.reference"
                            value={info.sourceIncome.privateEmployee.reference}
                            onChange={handleChange} />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="TELEFONO"
                            variant="filled"
                            sx={{ width: '45%' }}
                            name="sourceIncome.privateEmployee.phone"
                            value={info.sourceIncome.privateEmployee.phone}
                            onChange={handleChange} />
                        <TextField id="filled-basic"
                            label="CARGO"
                            variant="filled"
                            sx={{ width: '45%' }}
                            name="sourceIncome.privateEmployee.cargo"
                            value={info.sourceIncome.privateEmployee.cargo}
                            onChange={handleChange} />
                    </Stack>
                    <Stack direction="row" justifyContent="left" alignItems="center" flexWrap='wrap' sx={{ marginBottom: 2 }}>
                        <TextField id="filled-basic"
                            label="NOMBRE JEFE"
                            variant="filled"
                            sx={{ width: '100%' }}
                            name="sourceIncome.privateEmployee.bossName"
                            value={info.sourceIncome.privateEmployee.bossName}
                            onChange={handleChange} />
                    </Stack>
                </Container>
            </Stack>
        </>
    )
}

export default SourceCustumerIncome