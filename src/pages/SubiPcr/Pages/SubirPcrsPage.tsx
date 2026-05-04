import UploadExcel from "@/componentesCommons/UploadExcel"
import { cargarPcrs } from "../Services/PcrServices";
import { useLoading } from "@/componentesCommons/LoadingContext";
import { showAlert } from "@/utils/modalAlerts";

const SubirPcrsPage = () => {

  const { startLoading, stopLoading } = useLoading();
  const grabarPcs = async (items: any[]) => {
    try {
      startLoading();
      const data = items.map((item) => ({
        tipoCliente: item["Tipo de Cliente"],
        categoriaProducto: item["Categoría del producto"],
        cuotaMinima: item["Cuota Mínima"],
        mesesInteres: item["Meses de Interés"],
        interes: item["Interés"],
        riesgo: item["Riesgo"],
        perfil: item["Perfil"],
        rango: item["Rango"],
        porcentajeEntrada: item["% de Entrada"],
        plazoMinimo: item["Plazo Mínimo"],
        plazoMaximo: item["Plazo Máximo"],
        tipoAnalisis: item["Tipo de Análisis"],
      }));

      await cargarPcrs(data);
       const configAlert = {
                          title: "Correcto",
                          message: "Los. <strong>PCR's</strong>, se subieron exitosamente",
                          type: 'success',
                          callBackFunction: true,
                      };
                      showAlert(configAlert);
    } finally {
      stopLoading();
    }
  };


  return (
    <UploadExcel maxFileSize={50}
      onFileProcessed={grabarPcs}
      requiredColumns={{
        'Tipo de Cliente': 'string',
        'Categoría del producto': 'string',
        'Cuota Mínima': 'number',
        'Meses de Interés': 'number',
        'Interés': 'number',
        'Riesgo': 'number',
        'Perfil': 'string',
        'Rango': 'string',
        '% de Entrada': 'number',
        'Plazo Mínimo': 'number',
        'Plazo Máximo': 'number',
        'Tipo de Análisis': 'string'
      }}
    />

  )
}

export default SubirPcrsPage