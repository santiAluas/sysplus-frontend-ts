import UploadExcel from "@/componentesCommons/UploadExcel";
import { subirCarteraExtraJudicialExcelServicioWeb } from "../services/SubirExtraJudicialesServiciosWeb"
import { showAlert } from "@/utils/modalAlerts";
import { useLoading } from "@/componentesCommons/LoadingContext";

export const SubirExtraJudicialesExcel = () => {
    const { startLoading, stopLoading } = useLoading();

    const handleFileProcessed = async (data: any[]) => {
        startLoading();
        try {
          await subirCarteraExtraJudicialExcelServicioWeb(data);
          let configAlert = {
                  title: "Correcto",
                  message: "<strong>La carga se realizo correctamente</strong>",
                  type: 'success',
                  callBackFunction: false,
                  onCloseFunction: () => {}
              };
          showAlert(configAlert);
        } finally {
            stopLoading();
        }
    };

  return (
    <>
        <UploadExcel legend="Subir cartera extra judiciales EXCEL"
                    requiredColumns={{
                        'EMPRESA': 'string',
                        'TIPO_COMPROBANTE': 'string',
                        'COD_COMPROBANTE': 'string',
                        'FECHA_ASIGNACION': 'string',
                        'ASIGNADO_POR': 'string',
                        'ACTIVO': 'string',
                        'FECHA_DESACTIVACION': 'string',
                        'DESACTIVADO_POR': 'string',
                        'COD_PERSONA_EJ': 'string',
                    }}
                    onFileProcessed={handleFileProcessed}
                    maxFileSize={10}/>
    </>
  )
}
