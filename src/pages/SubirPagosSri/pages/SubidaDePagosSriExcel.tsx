import UploadExcel from "@/componentesCommons/UploadExcel"
import { anticipoPorLiquidarServiceWeb } from "../services/ServiciosWebPagoSri"
import { useLoading } from "@/componentesCommons/LoadingContext"

const SubidaDePagosSriExcel = () => {
  const {startLoading, stopLoading} = useLoading();
  
  const subirPagosSri = async (items: any) =>{
      startLoading();
      await  anticipoPorLiquidarServiceWeb(items);
      stopLoading();
  }
  return (
    <>
      <UploadExcel maxFileSize={50}
                    onFileProcessed={subirPagosSri}
                    requiredColumns={{
                        'ramv': 'string',
                        'factura': 'string',
                        'fechaPagoSri': 'date',
                        'monto': 'number'
                    }} ></UploadExcel>
    </>
  )
}

export default SubidaDePagosSriExcel