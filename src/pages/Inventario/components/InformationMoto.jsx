import React from 'react'
import {
    Divider, FormControl, Grid, InputLabel, MenuItem, Paper,
    Select, TextField
} from '@mui/material'

const InformationMoto = ({
    setMotor,
    motor,
    setChasis,
    chasis,
    setColor,
    color,
    getCountGoodOrBatStatus,
    typeSelectionMotoCount,
    setTypeDamageMotocycle,
    typeDamageMotocycle,
}) => {
    return (
        <>
            <Grid item sm={12} >
                <Divider>LLENAR SI ES MOTO</Divider>
            </Grid>
            <Grid item sm={6}>
                <TextField id="MOTOR"
                    label="MOTOR"
                    variant="outlined"
                    value={motor}
                    onChange={(e) => setMotor(e.target.value)}
                    fullWidth />
            </Grid>
            <Grid item sm={6}>
                <TextField id="CHASIS"
                    label="CHASIS"
                    variant="outlined"
                    value={chasis}
                    onChange={(e) => setChasis(e.target.value)}
                    fullWidth />
            </Grid>
            <Grid item sm={6}>
                <TextField id="COLOR"
                    label="COLOR"
                    variant="outlined"
                    value={color.toUpperCase()}
                    onChange={(e) => setColor(e.target.value)}
                    fullWidth />
            </Grid>
            <Grid item md={6}>
                <FormControl sx={{ width: '100%', marginTop: '15px' }}  >
                    <InputLabel id="demo-simple-select-label">ESTADO MOTO</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={typeSelectionMotoCount}
                        onChange={(e) => getCountGoodOrBatStatus(e.target.value)}
                    >
                        <MenuItem value={0}>-- ESTADO --</MenuItem>
                        <MenuItem value={1}>BUEN ESTADO</MenuItem>
                        <MenuItem value={2}>MAL ESTADO</MenuItem>

                    </Select>
                </FormControl>
                {typeSelectionMotoCount === 2 ?
                    <FormControl sx={{ width: '100%', marginTop: '15px' }}  >
                        <InputLabel id="demo-simple-select-label">TIPO DE DAÑO</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="DamageMotocycle"
                            value={typeDamageMotocycle}
                            onChange={(e) => setTypeDamageMotocycle(e.target.value)}
                        >
                            <MenuItem value={0}>-- SELECCIONE --</MenuItem>
                            <MenuItem value={1}>RAYADO</MenuItem>
                            <MenuItem value={2}>GOLPEADO</MenuItem>
                            <MenuItem value={3}>ROTO</MenuItem>
                            <MenuItem value={4}>INCOMPLETO</MenuItem>
                            <MenuItem value={5}>DAÑO EN LA MOTO</MenuItem>
                        </Select>
                    </FormControl>
                    :
                    null
                }
            </Grid>
        </>
    )
}

export default InformationMoto