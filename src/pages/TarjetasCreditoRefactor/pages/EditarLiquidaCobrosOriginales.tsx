import { CustomGridColumn, CustomGridCrud } from "@/components/DataGridCrud/CustomGridCrud"
import SearchBlobal from "@/components/SearchBlobal"
import TextFielCustom from "@/components/TextFielCustom"
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import CobrosOriginalesInDto from "../Dtos/CobrosOriginalesInDto"
import ConfiguracionPagosOriginalesEditar from "../configs/ConfiguracionPagosOriginalesEditar"
import { ActualizarCobroOriginales, ActualizarCobroOriginalesBloqueServicioWeb, BuscarCobrosOriginalesServicioWeb } from "../services/TarjetasCreditoServices"
import { useLoading } from "@/componentesCommons/LoadingContext"

const EditarLiquidaCobrosOriginales = () => {

    const { startLoading, stopLoading } = useLoading();

    const [buscar, setBuscar] = useState("")
    const [nuevoComercio, setNuevoComercio] = useState("")

    const [pagosOriginales, setPagosOriginales] = useState<CobrosOriginalesInDto[]>([]);

    const buscarCobroOriginalesXPago = async () => {
        if(!buscar){
            setPagosOriginales([]);
            return;
        }
        try {
            startLoading();
            const respuesta = await BuscarCobrosOriginalesServicioWeb(buscar);
            setPagosOriginales(respuesta);
        } finally {
            stopLoading();
        }
    }

    const actualizarCobroOriginal = async (item: CobrosOriginalesInDto) => {
        try {
            startLoading();
            await ActualizarCobroOriginales(item.id, { comercio: item.comercio });
            buscarCobroOriginalesXPago();
        } finally {
            stopLoading();
        }
    }

    const actualizarBloqueComercio = async () => {
        try {
            startLoading();
            await ActualizarCobroOriginalesBloqueServicioWeb(buscar, nuevoComercio);
            setPagosOriginales([]);
            setNuevoComercio("")
            buscarCobroOriginalesXPago();
        } finally {
            stopLoading();
        }
    }
    return (
        <Grid container >
            <Grid item lg={12}>
                <SearchBlobal
                    functionExecute={buscarCobroOriginalesXPago}
                    setParameterSearch={setBuscar}
                    parameterSearch={buscar}
                    title="Ingrese el codigo de pago"
                />
            </Grid>
            {pagosOriginales.length > 0 && (
                <Grid item lg={12} mb={2}>
                    <Stack
                        spacing={2}
                        direction="row"
                        width="100%"
                        alignItems="center"
                    >
                        <div style={{ width: "100%" }}>
                            <Typography>
                                Introduzca el nuevo comercio
                            </Typography>

                            <TextField
                                fullWidth
                                value={nuevoComercio}
                                onChange={(e) => setNuevoComercio(e.target.value)}
                            />
                        </div>

                        <Button onClick={actualizarBloqueComercio}>
                            Actualizar en bloque
                        </Button>
                    </Stack>
                </Grid>
            )}

            <Grid item lg={12}>
                <CustomGridCrud<CobrosOriginalesInDto>
                    title="Pagos originales"
                    rows={pagosOriginales}
                    columns={ConfiguracionPagosOriginalesEditar.columns()}
                    onSave={async (row) => {
                        actualizarCobroOriginal(row);
                        return row;
                    }}
                    onDelete={(id, row) => console.log("eliminar", id, row)}
                    canDelete={false}
                    canCreate={false}
                />
            </Grid>
        </Grid>
    )
}

export default EditarLiquidaCobrosOriginales