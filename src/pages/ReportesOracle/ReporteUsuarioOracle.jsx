
import { Box, Button } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { GET_REPORT_USUARIOS_ORACLE } from '../../services/Service_Api_Reportes'
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
const ReporteUsuarioOracle = () => {

    const reporteUsuarioOracle = () =>{
        manejoMensajes(fetchData, "CARGANDO....")
    }
    
    const fetchData = async () => {
        try {
            await GET_REPORT_USUARIOS_ORACLE();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
                <legend>REPORTE USUARIOS ORACLE</legend>
                <ToastContainer />
                <Button fullWidth variant="contained" onClick={reporteUsuarioOracle}>DESCARGAR REPORTE USUARIO ORACLE</Button>
            </Box>
        </>
    )
}

export default ReporteUsuarioOracle