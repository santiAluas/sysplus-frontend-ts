import { CustomGridCrud } from "@/components/DataGridCrud/CustomGridCrud";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { LiquidacionesTarjetasInDto } from "../Dtos/LiquidacionesTarjetasInDto";
import ConfiguracionLiquidacionTarjetaCreditoEditar from "../configs/ConfiguracionLiquidacionTarjetaCreditoEditar ";
import { showAlert } from "@/utils/modalAlerts";
import { ActualizarLiquidacionesTarjetasServicioWeb, BuscarLiquidacionesTarjetaServicioWeb } from "../services/TarjetasCreditoServices";
import { useLoading } from "@/componentesCommons/LoadingContext";

const EditarLiquidacionTarjetas = () => {
    const [comercio, setComercio] = useState("");
    const [liquidaciones, setLiquidaciones] = useState<LiquidacionesTarjetasInDto[]>([]);
    const { startLoading, stopLoading } = useLoading();

    const [lote, setLote] = useState("");
    const [recap, setRecap] = useState("");

    const buscarLiquidaciones = async () => {
       try {
        startLoading();
         const respuesta = await BuscarLiquidacionesTarjetaServicioWeb(comercio, lote, recap)
        setLiquidaciones(respuesta);
       } finally {
        stopLoading();
       }
    }

    const acutalizarLiquidacion = async (item: LiquidacionesTarjetasInDto) => {
        await ActualizarLiquidacionesTarjetasServicioWeb(item.id, {
            valorPagado: item.valorPagado,
            comision: item.comision,
            retencionIva: item.retencionIva,
            retencionFte: item.retencionFte,
        })
        buscarLiquidaciones();
    }

    return (
        <Grid container spacing={2}>
            <Grid item lg={3}>
                <Typography>Ingrese el comercio</Typography>
                <TextField value={comercio} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComercio(e.target.value)} fullWidth />
            </Grid>
            <Grid item lg={3}>
                <Typography>Ingrese el Lote</Typography>
                <TextField value={lote} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLote(e.target.value)} fullWidth />
            </Grid>
            <Grid item lg={3}>
                <Typography >Ingrese el Recap</Typography>
                <TextField value={recap} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecap(e.target.value)} fullWidth />
            </Grid>
            <Grid item lg={3}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                    >
                        <Button onClick={buscarLiquidaciones} fullWidth>
                            Consultar
                        </Button>
                    </Stack>
            </Grid>
            <Grid item lg={12}>
                <CustomGridCrud<LiquidacionesTarjetasInDto>
                    title="Pagos originales"
                    rows={liquidaciones}
                    columns={ConfiguracionLiquidacionTarjetaCreditoEditar.columns()}
                    onSave={async (row) => {
                        acutalizarLiquidacion(row);
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

export default EditarLiquidacionTarjetas