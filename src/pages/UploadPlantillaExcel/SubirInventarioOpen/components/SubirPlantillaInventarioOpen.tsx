import { useLoading } from "@/componentesCommons/LoadingContext";
import { subirInventarioOpenBravoNuevoServiceWeb } from "../services/SubirInventarioServiciosWeb";
import { showAlert } from "@/utils/modalAlerts";
import UploadExcel from "@/componentesCommons/UploadExcel";

const SubirPlantillaInventarioOpen = () => {
    const { startLoading, stopLoading } = useLoading();
    const grabarInventario = async (data: any) => {
        startLoading()
        try {
            await subirInventarioOpenBravoNuevoServiceWeb(data)
            const configAlert = {
                title: "Correcto",
                message: "El <strong>Inventario Open Bravo</strong>, subio exitosamente",
                type: 'success',
                callBackFunction: true,
            };
            showAlert(configAlert);
        } catch (error) {
            const configAlert = {
                title: "Error",
                message: error,
                type: 'error',
                callBackFunction: true,
            };
            showAlert(configAlert);

        } finally {
            stopLoading();

        }
    }

    return (
        <>
            <UploadExcel
                onFileProcessed={grabarInventario}
                requiredColumns={{
                    'categoria': 'string',
                    'codigo': 'string',
                    'nombre': 'string',
                    'atributo1': 'string',
                    'atributo2': 'string',
                    'atributo3': 'string',
                    'atributo4': 'string',
                    'atributo5': 'string',
                    'tercero': 'string',
                    'factura': 'string',
                    'cantidad': 'number',
                    'unidad': 'string',
                    'fechapedido?': 'date?',
                    'costo': 'number',
                    'costomodificado?': 'number?',
                    'codigooem?': 'string?',
                    'almacen': 'string',
                    'ubicacion': 'string',
                    'usuario': 'string',
                    'namecampania': 'string',
                }} />
        </>
    )
}

export default SubirPlantillaInventarioOpen