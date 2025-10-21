import React from 'react'
import { Divider, 
    FormControl,  
    Grid, 
    InputLabel, MenuItem, Paper,  Select, Stack } from '@mui/material'
import dayjs from 'dayjs';

const CabeceraInventario = ({seleccionarAgencia,
    seleccionarAgenciaYJefeAgencia,
    agencuasUsuarios,
    userLogin,
    objectAgencia,
}) => {
  return (
    <>

        <Paper elevation={3}
          style={{
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            width: '90%',
            textAlign: 'center'
          }}>
          <Divider>INFORMACION</Divider>
          <Grid container>
            <Grid item sm={6} md={6}>
              <span style={{ fontWeight: 'bold' }}>EMPRESA:</span>
              <FormControl sx={{ marginLeft: 5 }}>
                UNNOPARTS
              </FormControl>
            </Grid>
            <Grid item sm={6} md={6}>
              <Stack direction='row'
                justifyContent='center'
                alignItems='center'>
                <span style={{ fontWeight: 'bold' }}>AGENCIA:</span>
                <FormControl sx={{ marginLeft: 5, width: 140 }} >
                  <InputLabel id="demo-simple-select-label">AGENCIA</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={seleccionarAgencia}
                    onChange={(e) => seleccionarAgenciaYJefeAgencia(e)}
                  >
                    <MenuItem value={0}>-- SELECT --</MenuItem>
                    {agencuasUsuarios.map(item => {
                      return <MenuItem value={item.idagencia}>{item.nombreagencia}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
          <Grid container mt={4}>
            <Grid item sm={6} md={6} >
              <span style={{ fontWeight: 'bold' }}>FECHA: </span>
              <FormControl sx={{ marginLeft: 7 }}>
                {dayjs().locale('es').format('dddd, D [de] MMMM [de] YYYY').toUpperCase()}
              </FormControl>
            </Grid>
            <Grid item sm={6} md={6}>
              <Stack direction='row'
                justifyContent='center'
                alignItems='center'>
                <span style={{ fontWeight: 'bold' }}>USUARIO:
                </span>
                <FormControl sx={{ marginLeft: 5 }}>
                  {userLogin.Name}
                </FormControl>
              </Stack>
            </Grid>
            <Grid item sm={6} md={6} mt={2}></Grid>
            <Grid item sm={6} md={6} mt={2}>
              <Stack direction='row'
                justifyContent='center'
                alignItems='center'>
                <span style={{ fontWeight: 'bold' }}>JEFE AGENCIA:
                </span>
                <FormControl sx={{ marginLeft: 5 }}>
                  {objectAgencia.jefeagencia}
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

    </>
  )
}

export default CabeceraInventario