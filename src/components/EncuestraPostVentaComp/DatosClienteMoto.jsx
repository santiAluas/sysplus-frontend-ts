import React from 'react'
import { Grid, Paper,  TextField } from '@mui/material'
import './DatosClienteMoto.css'
import dayjs from 'dayjs';
const DatosClienteMoto = ({ordenTrabajo}) => {
    return (
        <Paper elevation={3}
            style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#e2e2e2',
                color: 'black',
                width: "90%",
            }}>
            <Grid container spacing={4} style={{ color: 'black' }}>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        NOMBRES Y APELLIDOS
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.nombre} ${ordenTrabajo.apellido}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        NUMERO DE CEDULA
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard" 
                        value={`${ordenTrabajo.cedula}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        TELEFONO CELULAR
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.celular}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        CORREO
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.email}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        CIUDAD
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.motc_clt_ciudad}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        TALLER
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.direccion}`}  />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        MARCA MOTOCICLETA
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard" 
                        value={`${ordenTrabajo.marca}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        MODELO MOTOCICLETA
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ordenTrabajo.modelo}`}  />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        FECHA DE REGISTRO
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${dayjs(ordenTrabajo.fecha).format('DD-MM-YYYY')}`} />
                </Grid>
                <Grid item 
                      sx={12} 
                      md={12} 
                      sm={12}
                      xs={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0,
                        
                    }}>
                        FECHA DE ENTREGA MOTO
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        fullWidth
                        variant="standard"
                        value={`${ dayjs(ordenTrabajo.fechaentrega).format('DD-MM-YYYY')}`} />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DatosClienteMoto