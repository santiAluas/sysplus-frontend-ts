import SearchBlobal from "@/components/SearchBlobal"
import SelectOneItem from "@/components/SelectOneItem";
import { Button, Card, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Opciones from "../models/Opciones";
import { DescargarPDFATM, nombrePlantillasPorCiudad, VizualizarHtml } from "../Services/ATMServices";
import RenderHTML from "@/componentesCommons/RenderHTML";
import { useLoading } from "@/componentesCommons/LoadingContext";
import CiudadesLista from "../helpers/CiudadesLista";
import CustomAutocompleteTs from "@/componentesCommons/CustomAutocompleteTs";
import { showAlert } from "@/utils/modalAlerts";
import { Decrypt_User } from "@/services/Storage_Service";
import OpcionesList from "../models/OpcionesList";

export const VizualizarDescargarPdfAtm = () => {

    const [ramvBuscar, setRamvBuscar] = useState<String>("");
    const [seleccionItem, setSeleccionItem] = useState<any>(null);
    
    const [htmlVizualizar, setHtmlVizualizar] = useState<string>("");
    const [ciudad, setCiudad] = useState<string>("");

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
            const response = await VizualizarHtml(seleccionItem?.id?.toString(), ramvBuscar, ciudad, user.User);
            setHtmlVizualizar(response);
        } finally {
            stopLoading();
        }
    }

    const descargarReportePDFAtm = async () => {
        try {
            const user = Decrypt_User();

            startLoading();
            await DescargarPDFATM(seleccionItem?.id?.toString(), ramvBuscar, ciudad, user.User);
        } finally {
            stopLoading();
        }
    }

    const llenarPlantillasPorCiudad = async (ciudadParametro: string) => {
        const respuesta = await  nombrePlantillasPorCiudad(ciudadParametro);
        setOpcionesPlantillas(respuesta);
    }

    useEffect(() => {
        setHtmlVizualizar("");
    }, [seleccionItem])


    const seleccionarCiudad = async (item: any) => {
        setCiudad(item.descripcion ?? '')
        setOpcionesPlantillas([]);
        setSeleccionItem("");
        llenarPlantillasPorCiudad(item.descripcion);
    }

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <CustomAutocompleteTs
                    options={CiudadesLista}
                    labelFullField="Seleccione la Ciudad"
                    optionLabel="descripcion"
                    handleChange={(e, value) => seleccionarCiudad(value)}
                />
            </Grid>
            <Grid item lg={12}>
                <CustomAutocompleteTs 
                    options={opcionesPlantilla}
                    defaultValue={seleccionItem}
                    labelFullField="Seleccione la Plantilla"
                    handleChange={(e, value) => setSeleccionItem(value ?? "")} />
            </Grid>
            
            <Grid item lg={12} >
                <SearchBlobal parameterSearch={ramvBuscar}
                    setParameterSearch={setRamvBuscar}
                    title="Buscar RAMV"
                    functionExecute={buscarRAMV}></SearchBlobal>
            </Grid>


            {htmlVizualizar && (
                <Grid item lg={12} mt={3}>
                    <Stack direction='column' justifyContent='center' alignItems='center' spacing={3}>
                        <Typography>Previzualizacion</Typography>
                        <Button variant="contained"
                            onClick={descargarReportePDFAtm}
                        >Descargar PFD</Button>
                        <Card style={{ padding: '10px 10px 10px 10px' }}>
                            <RenderHTML html={htmlVizualizar} />
                        </Card>
                    </Stack>
                </Grid>
            )}

        </Grid>
    )
}
