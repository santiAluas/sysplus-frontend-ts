import React from 'react';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { REPORT_EXCEL_PRODUCTONOAPROPIADO } from '../../services/Api_Logistica/ServiceWebLogistica.js';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js';
import { ToastContainer } from 'react-toastify';

const Reporteapropiacionproducto = () => {
  // Función para descargar el Excel
  const DownLoadExcel = async () => {
    await REPORT_EXCEL_PRODUCTONOAPROPIADO();
  };

  // Manejo de eventos con mensajes
  const feacht_UPDATE = () => {
    manejoMensajes(DownLoadExcel, "DESCARGANDO....");
  };

  return (
    <div>
      <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
        <legend>REPORTE PRODUCTO NO APROPIADO</legend>
        <ToastContainer />
        <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
          {/* RangoFechas eliminado */}
          <Stack
            direction="row"
            spacing={2}
            style={{ width: '100%' }}
          >
            <Button
              variant="contained"
              onClick={feacht_UPDATE}
              fullWidth
            >
              DESCARGAR REPORTE
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Reporteapropiacionproducto;
