import SearchBlobal from "@/components/SearchBlobal"
import SelectOneItem from "@/components/SelectOneItem";
import { Button, Card, Checkbox, FormControlLabel, Grid, Stack, Switch, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Opciones from "../models/Opciones";
import { DescargarPDFATM, nombrePlantillasPorCiudad, VizualizarHtml } from "../Services/ATMServices";
import RenderHTML from "@/componentesCommons/RenderHTML";
import { useLoading } from "@/componentesCommons/LoadingContext";
import CiudadesLista from "../helpers/CiudadesLista";
import CustomAutocompleteTs from "@/componentesCommons/CustomAutocompleteTs";
import { showAlert } from "@/utils/modalAlerts";
import { Decrypt_User } from "@/services/Storage_Service";
import CiudadesMatriculacion from "@/componentesCommons/SelectCiudadesMatriculacion/CiudadesMatriculacion";

export const VizualizarDescargarPdfAtm = () => {

    const [ramvBuscar, setRamvBuscar] = useState<String>("");
    const [seleccionItem, setSeleccionItem] = useState<any>(null);

    const [htmlVizualizar, setHtmlVizualizar] = useState<string>("");
    const [ciudad, setCiudad] = useState<string>("");
    const [esContraEntrega, setEsContraEntrega] = useState<boolean>(false);


    const { stopLoading, startLoading } = useLoading();
    const [opcionesPlantilla, setOpcionesPlantillas] = useState<any[]>([]);


    const buscarRAMV = async () => {
        try {
            if (!ciudad) {
                const configAlert = {
                    title: "Error",
                    message: "Debe seleccionar la Ciudad",
                    type: 'error',
                };
                showAlert(configAlert);
                return
            }

            if (!ramvBuscar) {
                const configAlert = {
                    title: "Error",
                    message: "Debe escribir el RAMV",
                    type: 'error',
                };
                showAlert(configAlert);
                return
            }
            const user = Decrypt_User();
            startLoading();
            const response = await VizualizarHtml({
                codigoPlantilla: seleccionItem?.id?.toString(),
                ramv: ramvBuscar.toString(),
                ciudad: ciudad,
                usuario: user.User,
                esContraEntrega: esContraEntrega
            });
            setHtmlVizualizar(response);
        } finally {
            stopLoading();
        }
    }

    const descargarReportePDFAtm = async () => {
        try {
            const user = Decrypt_User();

            startLoading();
            await DescargarPDFATM({
                codigoPlantilla: seleccionItem?.id?.toString(),
                ramv: ramvBuscar.toString(),
                ciudad: ciudad,
                usuario: user.User,
                esContraEntrega: esContraEntrega
            });
        } finally {
            stopLoading();
        }
    }

    const llenarPlantillasPorCiudad = async (ciudadParametro: string) => {
        
         try {
            startLoading();
            const respuesta = await nombrePlantillasPorCiudad(ciudadParametro);
            setOpcionesPlantillas(respuesta);
        } finally {
            stopLoading();
        }
    }

    useEffect(() => {
        setHtmlVizualizar("");
    }, [seleccionItem])


    const seleccionarCiudad = async (item: any) => {
        setCiudad(item.name ?? '')
        setOpcionesPlantillas([]);
        setSeleccionItem("");
        llenarPlantillasPorCiudad(item.name);
    }

    return (
        <Grid container spacing={3}>
            <Grid item lg={6} xs={12}>
               <CiudadesMatriculacion setCiudad={seleccionarCiudad}/>
            </Grid>
            <Grid item lg={6} xs={12}>
                <CustomAutocompleteTs
                    options={opcionesPlantilla}
                    defaultValue={seleccionItem}
                    labelFullField="Seleccione la Plantilla"
                    label="Plantillas"
                    handleChange={(e, value) => setSeleccionItem(value ?? "")} />
            </Grid>
             <Grid item lg={12} xs={12}>
                <FormControlLabel
                    control={<Checkbox checked={esContraEntrega}
                        onChange={(e) => setEsContraEntrega(e.target.checked)}
                        color="primary" />}
                    label="¿Es contra-entrega?"
                    labelPlacement="end"
                />
            </Grid>
            <Grid item lg={12} xs={12} >
                <SearchBlobal parameterSearch={ramvBuscar}
                    setParameterSearch={setRamvBuscar}
                    title="Descargar documento"
                    functionExecute={descargarReportePDFAtm}></SearchBlobal>
            </Grid>
        </Grid>
    )
}
