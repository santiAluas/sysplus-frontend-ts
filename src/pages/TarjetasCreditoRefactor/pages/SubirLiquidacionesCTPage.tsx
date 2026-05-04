import UploadExcel from "@/componentesCommons/UploadExcel"
import { LiquidacionesTarjetaCreditoOutDto } from "../Dtos/LiquidacionesTarjetaCreditoOutDto";
import { showAlert } from "@/utils/modalAlerts";
import { useLoading } from "@/componentesCommons/LoadingContext";
import { subirLiquidacionesTarjetasServicioWeb } from "../services/TarjetasCreditoServices";

const SubirLiquidacionesCTPage = () => {
    const { startLoading, stopLoading } = useLoading();

    const grabarLiquidaciones = async (items: any) => {
        try {
            startLoading();
            const data: LiquidacionesTarjetaCreditoOutDto[] = items.map((item: any) => ({
                fechaLiquidacion: new Date(item["fecha_liquidacion"]).toISOString(),
                comercio: item["comercio"],
                lote: item["lote"],
                recap: item["recap"],
                valorPagado: item["valor_pagado"],
                comision: item["comision"],
                retencionIva: item["retencion_iva"],
                retencionFte: item["retencion_fte"],
            }));
            console.log("first", data)
            await subirLiquidacionesTarjetasServicioWeb(data);
            const configAlert = {
                title: "Correcto",
                message: "Los. <strong>LIQUIDACIONES DE TARJETAS</strong>, se subieron exitosamente",
                type: 'success',
                callBackFunction: true,
            };
            showAlert(configAlert);
        } finally {
            stopLoading();
        }
    };

    const formatearFecha = (fecha: Date) => {
        const d = new Date(fecha);
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const anio = d.getFullYear();

        return `${dia}-${mes}-${anio}`;
    };

    return (
        <>
            <UploadExcel maxFileSize={50}
                onFileProcessed={grabarLiquidaciones}
                requiredColumns={{
                    'fecha_liquidacion': 'date',
                    'comercio': 'string',
                    'lote': 'string',
                    'recap': 'string',
                    'valor_pagado': 'number',
                    'comision': 'number',
                    'retencion_iva': 'number',
                    'retencion_fte': 'number'
                }}
            />
        </>
    )
}

export default SubirLiquidacionesCTPage