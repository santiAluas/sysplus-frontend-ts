import { useLoading } from '@/componentesCommons/LoadingContext'
import { Button, Stack } from '@mui/material'
import { DescargarCobrosOriginalesServiciosWeb } from '../services/TarjetasCreditoServices';
import RangoFechas from '@/components/RangoFechas';
import { useState } from 'react';
import { showAlert } from '@/utils/modalAlerts';
import dayjs from '@/utils/dayjs-setup'
import { Dayjs } from 'dayjs';

const DescargarCobrosOriginales = () => {
    const { startLoading, stopLoading } = useLoading();
    const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(null);
const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);
    
    const descargar = async () => {
        try {
            const verificar = verificarFechasVacias();
            if(verificar) return true;
            startLoading();
            const fechaInicioStr = fechaInicio!.format('YYYY-MM-DD');
            const fechaFinStr = fechaFin!.format('YYYY-MM-DD');

            await DescargarCobrosOriginalesServiciosWeb(fechaInicioStr, fechaFinStr);
            const configAlert = {
                                title: "Correcto",
                                message: "Los <strong>Se descargo exitosamente</strong>",
                                type: 'success',
                                callBackFunction: true,
                            };
                            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }

    const verificarFechasVacias = () =>{
        if(!fechaInicio || !fechaFin){
            const configAlert = {
                                title: "Error",
                                message: "Los <strong>Rango de fechas vacias</strong>",
                                type: 'error',
                                callBackFunction: true,
                            };
                            showAlert(configAlert);
            return true;

        }
        return false;
    }

    return (
        <Stack spacing={3}>
            <RangoFechas dateInit={fechaInicio} dateEnd={fechaFin} setDateInit={setFechaInicio} setDateEnd={setFechaFin} />

            <Button variant='contained' onClick={descargar} fullWidth sx={{ borderRadius: 5 }}> DESCARGAR COBROS ORIGINALES</Button>
        </Stack>
    )
}

export default DescargarCobrosOriginales