
import React from 'react'
import '@smastrom/react-rating/style.css'
import RatingComponent from './ratingComponent/RatingComponent';
import { Paper, Stack, Typography } from '@mui/material';
const Calificacion = ({setCalificacion}) => {
  

  return (
    <Paper
      elevation={3}
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e2e2e2',
        color: 'black',
        width: '90%',
      }}
    >
      <Typography variant="h6" align="center">
        ¿Qué tan probable es que recomiende el Servicio Técnico de Mastermoto?
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center">
        &#128543;
        <RatingComponent setCalificacion={setCalificacion} />
        &#128512;
      </Stack>
    </Paper>
  )
}

export default Calificacion
