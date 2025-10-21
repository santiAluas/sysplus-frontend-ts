import { useLoading } from '@/componentesCommons/LoadingContext';
import UploadExcel from '@/componentesCommons/UploadExcel'
import { cargarGestoresServiceWeb, generarAnticiposServiceWeb } from '../services/CargarGestoresServiciosWeb';
import { showAlert } from '@/utils/modalAlerts';

const SubirExcelGestores = () => {

    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        
        startLoading();
        try {
            await cargarGestoresServiceWeb(data);
            await Promise.all(
                data.map(element => generarAnticiposServiceWeb(element?.factura))
            );
            const configAlert = {
                title: "Correcto",
                message: "Los Gestores se grabaron exitosamente. <strong>Se generaron automaticamente las cabeceras anticipo</strong>",
                type: 'success',
                callBackFunction: false,
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    };

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