import { Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BankDebitAccount = ({ info, handleChange }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} lg={6}>
          <Stack direction="row" justifyContent="space-between" alignItems='center'>
            <Typography variant='h6' component='h6' fontWeight='bold'>
              Identificacion del Titular
            </Typography>
            <TextField sx={{ width: '80%' }}
              name="informationCount.ownerIdentification"
              value={info.informationCount.ownerIdentification}
              onChange={handleChange}></TextField>
          </Stack>
        </Grid>

        <Grid item xs={6} lg={6}>
          <Stack direction="row" justifyContent="space-between" alignItems='center'>
            <Typography variant='h6' component='h6' fontWeight='bold'>
              Nombre del Titular
            </Typography>
            <TextField sx={{ width: '80%' }}
              name="informationCount.accountHolderName"
              value={info.informationCount.accountHolderName}
              onChange={handleChange}></TextField>
          </Stack>
        </Grid>


        <Grid item xs={6} lg={6}>
          <Stack direction="row" justifyContent="space-between" alignItems='center'>
            <Typography variant='h6' component='h6' fontWeight='bold'>
              Numero de Cuenta
            </Typography>
            <TextField sx={{ width: '80%' }}
              name="informationCount.accountNumber"
              value={info.informationCount.accountNumber}
              onChange={handleChange}></TextField>
          </Stack>
        </Grid>

        <Grid item xs={6} lg={6}>
          <Stack direction="row" justifyContent="space-between" alignItems='center'>
            <Typography variant='h6' component='h6' fontWeight='bold'>
              Tipo de Cuenta
            </Typography>
            {/* <TextField sx={{ width: '80%' }}
              name="informationCount.typeAccount"
              value={info.informationCount.typeAccount}
              onChange={handleChange}></TextField> */}


            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">TIPO CUENTA</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="TIPO CUENTA"
                name="informationCount.typeAccount"
                value={info.informationCount.typeAccount}
                onChange={handleChange}
              >
                <MenuItem value="">-SELECT-</MenuItem>
                <MenuItem value="AHORRO">AHORRO</MenuItem>
                <MenuItem value="CORRIENTE">CORRIENTE</MenuItem>
              </Select>
            </FormControl>



          </Stack>
        </Grid>


        <Grid item xs={12} lg={12}>
          <Stack direction="row" justifyContent="space-between" alignItems='center'>
            <Typography variant='h6' component='h6' fontWeight='bold'>
              Entidad financiera
            </Typography>
            <TextField fullWidth
              name="informationCount.entityInstituion"
              value={info.informationCount.entityInstituion}
              onChange={handleChange}></TextField>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default BankDebitAccount