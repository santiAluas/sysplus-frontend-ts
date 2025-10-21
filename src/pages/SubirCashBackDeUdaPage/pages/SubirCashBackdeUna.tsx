import { useLoading } from "@/componentesCommons/LoadingContext";
import UploadExcel from "@/componentesCommons/UploadExcel"
import { showAlert } from "@/utils/modalAlerts";
import { cargarCashBackServiceWeb } from "../services/CashBackServiciosWeb";

const SubirCashBackdeUna = () => {
    const { startLoading, stopLoading } = useLoading();
    const subirCashBack= async (data: any) =>{
        startLoading()
        try{
            await cargarCashBackServiceWeb(data);
            const configAlert = {
                    title: "Correcto",
                    message: "Los. <strong>CASHBACK DE UNA</strong>, se subieron exitosamente",
                    type: 'success',
                    callBackFunction: true,
                };
                showAlert(configAlert);
        }catch(error){
            const configAlert = {
                title: "Error",
                message: error,
                type: 'error',
                callBackFunction: true,
            };
            showAlert(configAlert);

        }finally{
            stopLoading();

        }
       
    }
  return (
    <>
        <UploadExcel maxFileSize={50}
                    onFileProcessed={subirCashBack}
                    requiredColumns={{
                        'dni': 'string',
                        'valor_pago': 'number',
                        'fecha_pago': 'date',
                        'fecha_ingreso': 'date',
                        'valor_cashback': 'number'
                    }}
        />
    </>
  )
}

export default SubirCashBackdeUna