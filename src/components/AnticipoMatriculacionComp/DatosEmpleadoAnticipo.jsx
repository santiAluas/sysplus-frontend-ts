import { TextField, Typography } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid';
import './css/DatosEmpleado.css'
const DatosEmpleadoAnticipo = (props) => {
    const {datosEmpleado} = props
    return (
        <div>
            <Typography variant="h5"
                gutterBottom
                align='left'
                fontWeight="bold"
                color='#D9BD30'
                style={{
                    textShadow: '2px 1px 33px rgba(0, 0, 0, 0.5)'
                }}>
                DATOS GENERALES
            </Typography>
            <Grid container spacing={3} style={{color:'#2196f3'}}>
                <Grid item xs={12} md={3} sm={3}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Usuario
                    </p>
                    <TextField id="standard-basic"
                        value={datosEmpleado.User}
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                    />
                </Grid>
                <Grid item xs={12} md={4} sm={4}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Organizacion
                    </p>
                    <TextField id="standard-basic"
                        value={datosEmpleado.OrganizationName}
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                    />
                </Grid>
                <Grid item xs={12} md={5} sm={4}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Nombres y Apellidos
                    </p>
                    <TextField id="standard-basic"
                        value={datosEmpleado.Name}
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                    />
                </Grid>
                
            </Grid>
        </div>
    )
}

export default DatosEmpleadoAnticipo