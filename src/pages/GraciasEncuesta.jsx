import React from 'react'
import Logo from '../assets/images/Logo.png'
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
const GraciasEncuesta = () => {
    return (
        <div style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 'rgb(51, 47, 46)',
            color: 'white',
            height: '98vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Paper elevation={3}
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    width: '80%',
                    display: 'inline',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                <img src={Logo}
                    width={160}
                    height={120}
                    alt='logo de la empresa master moto'></img>
                <div>
                    <Typography>
                        ¡AHORA YA ERES UN MAESTER!
                    </Typography>
                    <Typography>
                        GRACIAS POR LLENAR NUESTRA ENCUESTA.
                    </Typography>
                </div>
            </Paper>
        </div>
    )
}

export default GraciasEncuesta