import React from 'react'
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import RangoFechas from './RangoFechas';
import NavbarMasterMoto from './NavbarMasterMoto';


const ReporteBaseDownloadExcel = ({ title = "sin titulo", 
                                    funcionReporte = null, 
                                    conrangofecha=true, 
                                    departamento = '',
                                    dateInit=null,
                                    setDateInit=null,
                                    dateEnd=null,
                                    setDateEnd=null }) => {
    
    return (
        <>
            <NavbarMasterMoto titulo={ `${departamento} - ${title}`} />
            <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
                <legend>{title}</legend>
                <ToastContainer />
                <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
                    {conrangofecha  && (<RangoFechas dateInit={dateInit}
                        dateEnd={dateEnd}
                        setDateInit={setDateInit}
                        setDateEnd={setDateEnd}></RangoFechas>)}
                    <Stack
                        direction="row"
                        spacing={2}
                        style={{ width: '100%' }}>
                        <Button variant="contained"
                                onClick={(e) => funcionReporte && funcionReporte(e)} 
                                fullWidth>DESCARGAR REPORTE</Button>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default ReporteBaseDownloadExcel