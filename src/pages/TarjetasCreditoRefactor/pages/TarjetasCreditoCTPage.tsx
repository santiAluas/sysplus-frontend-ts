import UploadExcel from "@/componentesCommons/UploadExcel"
import CobrosOriginalesOutDto from "../Dtos/CobrosOriginalesOutDto";
import { useLoading } from "@/componentesCommons/LoadingContext";
import { subirCobrosOriginales } from "../services/TarjetasCreditoServices";
import { showAlert } from "@/utils/modalAlerts";

const TarjetasCreditoCTPage = () => {
    const { startLoading, stopLoading } = useLoading();
    const grabarCobrosOriginales = async (items: any) => {
        try {
            startLoading();
            const data: CobrosOriginalesOutDto[] = items.map((item: any) => ({
                pago: item["pago"],
                fechaOpen: item["fecha_open"],
                fechaTransaccion: item["fecha_transaccion"],
                tercero: item["tercero"],
                comercio: item["comercio"],
                lote: item["lote"],
                recap: item["recap"],
                importeDeposito: item["importe_deposito"],
                facturaCliente: item["factura_cliente"],
                bancoProcesador: item["banco_procesador"],
                usuario1: item["usuario_1"],
                totalCoutas: item["total_cuotas"],
            }));
            console.log("first", data)
            await subirCobrosOriginales(data);
            const configAlert = {
                title: "Correcto",
                message: "Los. <strong>COBROS ORIGINALES's</strong>, se subieron exitosamente",
                type: 'success',
                callBackFunction: true,
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    }
    return (
        <>
            <UploadExcel maxFileSize={50}
                onFileProcessed={grabarCobrosOriginales}
                requiredColumns={{
                    'pago': 'string',
                    'fecha_open': 'date',
                    'fecha_transaccion': 'date',
                    'tercero': 'string',
                    'comercio': 'string',
                    'lote': 'string',
                    'recap': 'string',
                    'importe_deposito': 'number',
                    'factura_cliente': 'string',
                    'banco_procesador': 'string',
                    'usuario_1': 'string'
                }}
            />
        </>
    )
}

export default TarjetasCreditoCTPage