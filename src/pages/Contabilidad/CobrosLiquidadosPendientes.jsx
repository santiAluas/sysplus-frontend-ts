import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import UpdateIcon from '@mui/icons-material/Update';
import RangoFechas from '../../components/RangoFechas';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SelectMultiple from '../../components/SelectMultiple';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import {
    RETORNAR_COLUMAS_REPORTE_COBROS,
    RETORNAR_BANCOS_REPORTE_COBROS,
    REPORTE_COBROS_TARJETAS,
    REPORT_EXCEL_COBROS_TARJETAS
} from '../../services/ContabilidadServicesWeb/Contabilidad_SW'
import { useEffect } from 'react';
import SelectOneItem from '../../components/SelectOneItem.jsx';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';

const CobrosLiquidadosPendientes = () => {
    const [dataColumnas, setDataColumnas] = useState([]) // {id: "1", description: "1"} 
    const [dataBancos, setDataBancos] = useState([])
    const [bancoSeleccionado, setBancoseleccionado] = useState("")
    const [chipData, setChipData] = useState([]);
    const [dateInit, setDateInit] = React.useState(dayjs().subtract(5, 'day'));
    const [dateEnd, setDateEnd] = React.useState(dayjs());
    const [numeroCobro, setNumeroCobro] = useState("")
    const [lote, setLote] = useState("")
    const [referencia, setReferencia] = useState("")
    const [dataReporte, setDataReporte] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    const ObtenerColumnasReporte = async () => {
        const respuesta = await RETORNAR_COLUMAS_REPORTE_COBROS();
        setDataColumnas(respuesta)
    }

    const ObteneListaBancos = async () => {
        const respuesta = await RETORNAR_BANCOS_REPORTE_COBROS();
        setDataBancos(respuesta)
    }

    const Ejecutar_Funcion_retornar_columnas = () => {
        manejoMensajes(ObtenerColumnasReporte, "OBTENIENDO COLUMNAS....")
        manejoMensajes(ObteneListaBancos, "OBTENIENDO BANCOS....")

    }

    const Generar_Reporte = async () => {
        const columnas = chipData.join(",")
        const respuesta = await REPORTE_COBROS_TARJETAS(numeroCobro, dateInit, dateEnd, bancoSeleccionado, lote, referencia, columnas);
        if (respuesta.length > 0) {
            const dynamicColumns = Object.keys(respuesta[0]).map((key) => ({
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre
                width: 150, // Ajusta el ancho según tus necesidades
            }));
            setColumns(dynamicColumns);
        }

        const formattedData = respuesta.map((item, index) => ({
            id: index + 1,
            ...item,
        }));

        setDataReporte(formattedData);
        setLoading(false);
    }

    const Generar_Reporte_Excel = async () => {
        const columnas = chipData.join(",")
        await REPORT_EXCEL_COBROS_TARJETAS(numeroCobro, dateInit, dateEnd, bancoSeleccionado, lote, referencia, columnas);
    }

    const Ejecutar_Consultas = (tiporeporte) => {
        switch (tiporeporte) {
            case "vista":
                manejoMensajes(Generar_Reporte, "VIZUALIZANDO REPORTE....")
                break;
            case "excel":
                manejoMensajes(Generar_Reporte_Excel, "DESCARGANDO REPORTE EN EXCEL....")
                break;
        }

    }

    useEffect(() => {
        Ejecutar_Funcion_retornar_columnas()
    }, []);

    return (
        <>

            <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
                <legend>COBROS LIQUIDADOS Y PENDIENTES</legend>
                <ToastContainer />
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <TextField id="filled-basic"
                            label="NUMERO DE COBRO"
                            variant="filled"
                            fullWidth
                            value={numeroCobro}
                            onChange={(e) => setNumeroCobro(e.target.value)} />
                    </Grid>
                    <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant="contained"
                            size='large'
                            startIcon={<UpdateIcon />}>SINCRONIZAR</Button>
                    </Grid>
                    <Grid lg={12}>
                        <RangoFechas dateInit={dateInit}
                            dateEnd={dateEnd}
                            setDateInit={setDateInit}
                            setDateEnd={setDateEnd} />
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <SelectOneItem title='SELECCIONE BANCO'
                            items={dataBancos}
                            itemSeleccionado={bancoSeleccionado}
                            setItemSelecionato={setBancoseleccionado} />
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <TextField id="filled-basic"
                            label="LOTE"
                            variant="filled"
                            fullWidth
                            value={lote}
                            onChange={(e) => setLote(e.target.value)} />
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <div style={{ paddingRight: 5 }}>
                            <SelectMultiple title='Seleccione columnas'
                                data={dataColumnas}
                                chipData={chipData}
                                setChipData={setChipData}></SelectMultiple>
                        </div>
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <TextField id="filled-basic"
                                label="REFERENCIA"
                                variant="filled"
                                fullWidth
                                value={referencia}
                                onChange={(e) => setReferencia(e.target.value)} />
                        </div>
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <Button variant="contained"
                            size='large'
                            startIcon={<ContentPasteSearchIcon />}
                            fullWidth
                            onClick={(e) =>Ejecutar_Consultas("vista")}>GENERAR PENDIENTE COBRO</Button>
                    </Grid>
                    <Grid lg={6} pl={1} mt={2}>
                        <Button variant="contained"
                            size='large'
                            startIcon={<FileUploadIcon />}
                            fullWidth
                            onClick={(e) => Ejecutar_Consultas("excel")}>EXPORTAR EXCEL</Button>
                    </Grid>
                    <Grid item lg={12} sm={12}>
                        <Paper sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={dataReporte}
                                columns={columns}
                                loading={loading}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                sx={{ border: 0 }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CobrosLiquidadosPendientes