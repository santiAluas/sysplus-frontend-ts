import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const ApplicationCredit = ({ infoCredit }) => {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <strong>FECHA:</strong> {infoCredit.f_creacion}
          </Grid>
          <Grid item xs={12} lg={4}>
            <strong>AGENCIA:</strong> {infoCredit.agencia_nom}
          </Grid>
          <Grid item xs={12} lg={4}>
            <strong>VENDEDOR:</strong> {infoCredit.nom_usuario}
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} lg={3}>
            <strong>MONTO FINANCIADO:</strong> {infoCredit.valor_financiado}
          </Grid>
          <Grid item xs={12} lg={3}>
            <strong>PLAZO:</strong> {infoCredit.meses_plazo}
          </Grid>
          <Grid item xs={12} lg={3}>
            <strong>CUOTA:</strong> {infoCredit.valor_cuota}
          </Grid>
          <Grid item xs={12} lg={3}>
            <strong>ENTRADA:</strong> {infoCredit.valor_entrada}
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} lg={5}>
            <strong>MODELO DE MOTO: </strong>{infoCredit.product}
          </Grid>
          <Grid item xs={12} lg={3}>
            <strong>DEUDOR:</strong>  {infoCredit.cliente_nom}
          </Grid>
          <Grid item xs={12} lg={3}>
            <strong>GARANTE:</strong> {infoCredit.codeudor}
          </Grid>
        </Grid>

      </Box>
    </>
  )
}

export default ApplicationCredit