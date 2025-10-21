import React from 'react'
import { TituloComponent } from '../TituloComponent'
import { Grid, TextField } from '@mui/material'

const DatosAnticipo = ({ anticipo }) => {
    return (
        <>
            <TituloComponent color='#3498db'
                texto="INFORMACION DE ANTICIPO"
                mt={10}></TituloComponent>
            <TituloComponent color='#4169E1'
                texto="NOMBRES DEL CLIENTE"
                fontSize={15}
                mt={10}
                mb={5} ></TituloComponent>
            <TextField fullWidth
                disabled
            />
            <Grid container spacing={3}>
                <Grid item sm={4}>
                    <TituloComponent color='#4169E1'
                        texto="CEDULA"
                        fontSize={15}
                        mt={10}
                        mb={5} />
                    <TextField fullWidth
                        disabled
                    />
                </Grid>
                <Grid item sm={4}>
                    <TituloComponent color='#4169E1'
                        texto="CIUDAD"
                        fontSize={15}
                        mt={10}
                        mb={5} />
                    <TextField fullWidth
                        disabled
                    />
                </Grid>
                <Grid item sm={4}>
                <TituloComponent color='#4169E1'
                        texto="VALOR TOTAL"
                        fontSize={15}
                        mt={10}
                        mb={5} />
                    <TextField fullWidth
                        disabled
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default DatosAnticipo