import React from 'react'
import RangoFechas from '../components/RangoFechas'
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { Get_Report_Gestiones_Cloud } from '../services/Service_Api_Reportes'
import { ToastContainer, toast } from 'react-toastify'; 
const ReporteCallCenter = () => {
    const [dateInit, setDateInit] = React.useState(dayjs().subtract(5, 'day'));
    const [dateEnd, setDateEnd] = React.useState(dayjs());
  
    const descargarReporteCobros = async (e) =>{
        e.preventDefault()
        if ( dateEnd.isBefore(dateInit)) {
          toast.warn("FECHAS INCORRECTAS!", {
            position: toast.POSITION.TOP_CENTER
          });
          return
        }
        let result = ""
        const functionThatReturnPromise = async () => {
          try {
            result =   await Get_Report_Gestiones_Cloud(dateInit.format('YYYY-MM-DD'), dateEnd.add(1,'day').format('YYYY-MM-DD'));
          } catch (error) {
            throw error;
          }
        };
        toast.promise(
          functionThatReturnPromise,
          {
            pending: {
              render({ data }) {
                return "CONSULTANDO ..."
              },
              position: toast.POSITION.TOP_CENTER
            },
            success: {
              render({ data }) {
                return "DESCARGANDO REPORTE"
              },
              icon: "🟢",
              position: toast.POSITION.TOP_CENTER
            },
            error: {
              render({ data }) {
                return data
              },
              icon: '🔴',
              position: toast.POSITION.TOP_CENTER
            }
          }
        );
    }
  return (
    <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
    <legend>REPORTE PURE CLOUD</legend>
    <ToastContainer />
    <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
      <RangoFechas dateInit={dateInit} 
                  dateEnd={dateEnd} 
                  setDateInit={setDateInit} 
                  setDateEnd={setDateEnd}></RangoFechas>
      <Button variant="contained" onClick={(e) => descargarReporteCobros(e)} fullWidth>GENERAR</Button>
    </Stack>
  </Box>
  )
}

export default ReporteCallCenter