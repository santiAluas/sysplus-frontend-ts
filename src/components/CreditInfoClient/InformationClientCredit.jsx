import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid, Stack, TextField } from '@mui/material';
import InformationJobs from './InformationJobs';
const InformationClientCredit = ({ title, infoClient }) => {
  const style = {
    dividerStyle: { mb: '15px', mt: '15px' }
  }
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={style.dividerStyle}>DATOS PERSONALES</Divider>
          <Grid container spacing={2}>
            <Grid item xs={6} justifyContent="flex-end">
              <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography mr={2}>
                  CEDULA
                </Typography>
                <TextField value={infoClient.documentIdentity} sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography>
                  NOMBRE
                </Typography>
                <TextField value={infoClient.address} sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography mr={2}>
                  DOMICILIO
                </Typography>
                <TextField value={infoClient.address} 
                           sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography mr={2}>
                  FECHA NACIMIENTO
                </Typography>
                <TextField value={infoClient.dateOfBirth} sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography mr={2}>
                  LUGAR NACIMIENTO
                </Typography>
                <TextField value={infoClient.placeOfBirth} sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
            <Stack direction="row" justifyContent="space-between" alignItems='center'>
                <Typography mr={2}>
                  ESTADO CIVIL
                </Typography>
                <TextField value={infoClient.maritalStatus} sx={{width:'80%'}}></TextField>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={style.dividerStyle}>DATOS PADRES</Divider>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Stack direction="row" justifyContent="start" alignItems='center'>
                <Typography mr={2}>
                  CEDULA PADRE
                </Typography>
                <TextField value={infoClient.documentIdentityFather} fullWidth></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
            <Stack direction="row" justifyContent="start" alignItems='center'>
                <Typography mr={2}>
                  NOMBRE PADRE
                </Typography>
                <TextField value={infoClient.fullNameFather} fullWidth></TextField>
              </Stack>
            </Grid>
            <Grid item xs={6}>
            <Stack direction="row" justifyContent="start" alignItems='center'>
                <Typography mr={2}>
                  CEDULA MADRE
                </Typography>
                <TextField value={infoClient.documentIdentityMother} fullWidth></TextField>
              </Stack>
            </Grid>

            <Grid item xs={6}>
            <Stack direction="row" justifyContent="start" alignItems='center'>
                <Typography mr={2}>
                  NOMBRES MADRE
                </Typography>
                <TextField value={infoClient.fullNameMother} fullWidth></TextField>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={style.dividerStyle}>VEHICULOS</Divider>
          <Typography>
            VEHICULO : {infoClient.vehicles}
          </Typography>
          <Divider sx={style.dividerStyle}>TELEFONOS</Divider>
          <Typography>
            TELEFONOS : {infoClient.phones}
          </Typography>
          <Divider sx={style.dividerStyle}>EMPLEOS</Divider>
          { infoClient.campanies.length > 0 ?  
              infoClient.campanies.map(item => {
                  return (<InformationJobs companie={item} width={infoClient.campanies.length > 1 ? "50%":"100%"} />)
              })
          : null}

        </AccordionDetails>
      </Accordion>

    </>
  )
}

export default InformationClientCredit