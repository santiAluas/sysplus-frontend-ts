import React from 'react'
import RangoFechas from '../../components/RangoFechas'
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import {REPORT_EXCEL_EXTRACTOBANCARIO} from '../../services/ContabilidadServicesWeb/Contabilidad_SW'
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'



const ReporteExtractoBancario = () => {
  const [dateInit, setDateInit] = React.useState(dayjs().subtract(5, 'day'));
  const [dateEnd, setDateEnd] = React.useState(dayjs());


  const DownLoadExcel = async () => {
    await REPORT_EXCEL_EXTRACTOBANCARIO(dateInit,dateEnd); 
}

const feacht_UPDATE = () =>{
    manejoMensajes(DownLoadExcel, "DESCARGANDO....")
}

  return (
    <>
    <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
      <legend>REPORTE EXTRACTOS BANCARIOS</legend>
      <ToastContainer />
      <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
        <RangoFechas dateInit={dateInit}
          dateEnd={dateEnd}
          setDateInit={setDateInit}
          setDateEnd={setDateEnd}></RangoFechas>
        <Stack
          direction="row"
          spacing={2}
          style={{ width: '100%' }}>
          <Button variant="contained" 
                  onClick={feacht_UPDATE}
                  fullWidth >DESCARGAR REPORTE</Button>
        </Stack>
      </Stack>
    </Box>

    </>
  )
}

export default ReporteExtractoBancario