import SearchBlobal from "@/components/SearchBlobal"
import SelectOneItem from "@/components/SelectOneItem";
import { Button, Card, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Opciones from "../models/Opciones";
import { DescargarPDFATM, VizualizarHtml } from "../Services/ATMServices";
import RenderHTML from "@/componentesCommons/RenderHTML";
import { useLoading } from "@/componentesCommons/LoadingContext";
import CiudadesLista from "../helpers/CiudadesLista";
import CustomAutocompleteTs from "@/componentesCommons/CustomAutocompleteTs";
import { showAlert } from "@/utils/modalAlerts";

export const VizualizarDescargarPdfAtm = () => {

    const [ramvBuscar, setRamvBuscar] = useState<String>("");
    const [seleccionItem, setSeleccionItem] = useState<string>();
    const [htmlVizualizar, setHtmlVizualizar] = useState<string>("");
    const [ciudad, setCiudad] = useState<string>("");

    const { stopLoading, startLoading } = useLoading();

    const [opciones] = useState<Opciones[]>([{
        id: "IMPRONTAATM",
        descripcion: "Impronta ATM"
    },
    {
        id: "SOLICITUDATM",
        descripcion: "Solicitud ATM"
    }]);


    const buscarRAMV = async () => {
        try {
            console.log(ciudad)
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

            startLoading();
            const response = await VizualizarHtml(seleccionItem, ramvBuscar, ciudad);
            setHtmlVizualizar(response);
        } finally {
            stopLoading();
        }
    }

    const descargarReportePDFAtm = async () => {
        try {
            startLoading();
            await DescargarPDFATM(seleccionItem, ramvBuscar, ciudad);
        } finally {
            stopLoading();
        }
    }

    useEffect(() => {
        setHtmlVizualizar("");
    }, [seleccionItem])


    const seleccionarCiudad = async (item: any) => {
        setCiudad(item.descripcion ?? '')
    }

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <SelectOneItem items={opciones}
                    title="Seleccione Plantilla"
                    itemSeleccionado={seleccionItem}
                    setItemSelecionato={setSeleccionItem} />
            </Grid>
            <Grid item lg={12}>
                <CustomAutocompleteTs
                    options={CiudadesLista}
                    labelFullField="Seleccione la Ciudad"
                    optionLabel="descripcion"

                    handleChange={(e, value) => seleccionarCiudad(value)}
                />
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
