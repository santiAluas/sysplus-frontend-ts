import React from 'react'
import RangoFechas from '../../components/RangoFechas'
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { REPORT_EXCEL_COMPROMISOS } from '../../services/Administrativo_Apis/Api_Administrativo'
import { ToastContainer, toast } from 'react-toastify';
import { Decrypt_User } from '../../services/Storage_Service.js'
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
const ReporteCumplimientoAgencias = () => {
    const [dateInit, setDateInit] = React.useState(dayjs().subtract(5, 'day'));
    const [dateEnd, setDateEnd] = React.useState(dayjs());
    const [userLogin, setUserLogin] = React.useState({});

    const OnInitPageUser =  () => {
        const user = Decrypt_User();
        if (user === null) {
            return toast.error("NO EXISTE NINGUN USUARIO LOGGEADO", { position: toast.POSITION.TOP_CENTER })
        }
        setUserLogin(user)
        return user;
    }
    const DownLoadExcel = async () => {
        try {
          const user = OnInitPageUser();
          await REPORT_EXCEL_COMPROMISOS(dateInit, dateEnd, user.User, user.OrganizationId );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    const descargarReporteExcel=()=>{
        manejoMensajes(DownLoadExcel,"CONSULTANDO...")
    }

    return (
        <>
            <ToastContainer />
            <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
                <legend>REPORTE LIQUIDACIONES MATRICULA</legend>
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
                             onClick={descargarReporteExcel} fullWidth>DESCARGAR REPORTE</Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ReporteCumplimientoAgencias