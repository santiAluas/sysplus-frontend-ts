import { useLoading } from '@/componentesCommons/LoadingContext';
import UploadExcel from '@/componentesCommons/UploadExcel'
import { cargarGestoresServiceWeb, generarAnticiposServiceWeb } from '../services/CargarGestoresServiciosWeb';
import { showAlert } from '@/utils/modalAlerts';
import { useState } from 'react';

const SubirExcelGestores = () => {

    const { startLoading, stopLoading } = useLoading();
     const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
            await cargarGestoresServiceWeb(data);
            let mensaje = "";
            for (const item of data) {
                const respuesta:string = await obtenerRespuesta(item);

                if (respuesta.includes("ERROR")) {
                    mensaje += respuesta + "<br/>"
                }
            }
            let configAlert = {
                    title: "Correcto",
                    message: "Los Gestores se grabaron exitosamente. <strong>Se generaron automaticamente las cabeceras anticipo</strong>",
                    type: 'success',
                    callBackFunction: false,
                    onCloseFunction: () => {}
                };
            if (mensaje){
                configAlert.title = 'Error';
                configAlert.type = 'error';
                configAlert.message = mensaje;
                configAlert.callBackFunction = false;
            }
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    };

    const obtenerRespuesta = async (element: any) =>{
        const respuesta:string = await  generarAnticiposServiceWeb(element?.factura, element?.cedula_gestor, element?.valor_pago);
        return respuesta;
    }
  return (
    <>
        <UploadExcel legend="Subir gestores en formato Excel"
                    requiredColumns={{
                        'factura': 'string',
                        'ramv': 'string',
                        'fecha_pago': 'date',
                        'valor_pago': 'number',
                        'cedula_gestor': 'string'
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}/>
    </>
  )
}

export default SubirExcelGestores