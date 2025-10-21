import React, { useEffect } from 'react'
import Grid from '@mui/system/Unstable_Grid';
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import {
    Get_Report_Generate_File_SRI,
    Get_Report_Generate_File_EXCEL,
    Get_Consultar_Actuaizar_Valores,
    Get_Report_TEXT,
    Get_Report_EXCEL,
    Get_Report_VALORES_CENTRO_COSTO,
    Get_Consultar_MATRICULA_VISOR
} from '../services/Service_Api_Reportes'
import { ToastContainer, toast } from 'react-toastify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const MatriculacionPage = () => {
    const [date, setDate] = React.useState(dayjs());
    const [dataReporte, setDataReporte] = React.useState([]);
    function createData(campVpn, ciudad, fechaActualizacion, fechaIngreso, fechaVenta, valor) {
        return { campVpn, ciudad, fechaActualizacion, fechaIngreso, fechaVenta, valor };
    }


    const GenerarArchivoSri = async (e, tipo) => {
        e.preventDefault()

        let result = ""
        const functionThatReturnPromise = async () => {
            try {
                if (tipo === 'ZIP_SRI')
                    result = await Get_Report_Generate_File_SRI(date.format('DD-MM-YYYY'));
                if (tipo === 'R_EXCEL')
                    result = await Get_Report_Generate_File_EXCEL(date.format('DD-MM-YYYY'));
                if (tipo === 'CA_VALORES')
                    result = await Get_Consultar_Actuaizar_Valores(date.format('DD-MM-YYYY'));
                if (tipo === 'RP_EXCEL')
                    result = await Get_Report_EXCEL(date.format('DD-MM-YYYY'));
                if (tipo === 'RP_TEXT')
                    result = await Get_Report_TEXT(date.format('DD-MM-YYYY'));
                if (tipo === 'VC_COSTO')
                    result = await Get_Report_VALORES_CENTRO_COSTO(date.format('DD-MM-YYYY'));
            } catch (error) {
                throw error;
            }
        };
        toast.promise(
            functionThatReturnPromise,
            {
                pending: {
                    render({ data }) {
                        return "CONSULTANDO ..."
                    },
                    position: toast.POSITION.TOP_CENTER
                },
                success: {
                    render({ data }) {
                        return tipo == 'CA_VALORES' ? "SE REALIZO CORRECTAMENTE" : "DESCARGANDO REPORTE"
                    },
                    icon: "🟢",
                    position: toast.POSITION.TOP_CENTER
                },
                error: {
                    render({ data }) {
                        return data
                    },
                    icon: '🔴',
                    position: toast.POSITION.TOP_CENTER
                }
            }
        );
    }

    const transformToCustomObjects = (Data) => {
        const transformedData = Data.map((row) => {
            return createData(row.camvpn,
                row.ciudad,
                row.fecha_actualizacion,
                row.fecha_ingreso,
                row.fecha_venta,
                row.valor);
        });
        return transformedData;
    };



    const generar_Reporte = (e) => {
        e.preventDefault()
        let result = ""
        const functionThatReturnPromise = async () => {
            try {
                result = await Get_Consultar_MATRICULA_VISOR(date.format('DD-MM-YYYY'));
                const transformedResults = transformToCustomObjects(result);
                setDataReporte(transformedResults);
                // dataReporte = transformToCustomObjects(result)
            } catch (error) {
                throw error;
            }
        };
        toast.promise(
            functionThatReturnPromise,
            {
                pending: {
                    render({ data }) {
                        return "CONSULTANDO ..."
                    },
                    position: toast.POSITION.TOP_CENTER
                },
                success: {
                    render({ data }) {
                        return "DESPLEGANDO REPORTE"
                    },
                    icon: "🟢",
                    position: toast.POSITION.TOP_CENTER
                },
                error: {
                    render({ data }) {
                        return "NO SE PUDO GENERAR EL REPORTE, PORFAVOR CONSULTE A SISTEMAS"
                    },
                    icon: '🔴',
                    position: toast.POSITION.TOP_CENTER
                }
            }
        );
    }


    useEffect(() => {
        // Esta función se ejecutará cada vez que result o transformedResults cambien.
        // Puedes poner aquí cualquier lógica adicional que necesites.

        // Ejemplo: Actualizar dataReporte cuando result y transformedResults cambien.
    }, [setDataReporte, dataReporte]);


    const contruirTable = () => {
        return (dataReporte.length > 0 ? (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>CAMVPN</TableCell>
                            <TableCell align="center">CIUDAD</TableCell>
                            <TableCell align="center">FECHA ACTUALIZACION</TableCell>
                            <TableCell align="center">FECHA INGRESO</TableCell>
                            <TableCell align="center">FECHA VENTA</TableCell>
                            <TableCell align="center">VALOR</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataReporte.map((row) => (
                            <TableRow
                                key={row.campVpn}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.campVpn}
                                </TableCell>
                                <TableCell align="center">{row.ciudad}</TableCell>
                                <TableCell align="center">{row.fechaActualizacion !== null ? dayjs(row.fechaActualizacion).format('DD-MM-YYYY hh:mm:ss') : "S/N"}</TableCell>
                                <TableCell align="center">{dayjs(row.fechaIngreso).format('DD-MM-YYYY hh:mm:ss')}</TableCell>
                                <TableCell align="center">{dayjs(row.fechaVenta).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align="center">{row.valor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : "")
    }

    return (
        <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
            <legend>REPORTE MATRICULACION</legend>
            <ToastContainer />
            <Grid container spacing={2} columns={16} style={{ display: 'flex', alignItems: 'center' }}>
                <Grid xs={16} md={8}>
                    <div style={{ with: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']} >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    with: '100%',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        with: '100%',
                                        marginTop: "10px"
                                    }}>
                                        <Typography fontWeight="bold" padding={2}>
                                            SELECCIONE FECHA
                                        </Typography>
                                        <DatePicker label="FECHA INICIO"
                                            value={date}
                                            onChange={(newValue) => setDate(newValue)}
                                            format="YYYY-MM-DD"
                                            padding={2}
                                        />
                                    </div>
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </Grid>
                <Grid xs={16} md={8}>
                    <Button variant="contained" onClick={(e) => GenerarArchivoSri(e, 'ZIP_SRI')} fullWidth>1- GENERAR ARCHIVO SRI</Button>
                </Grid>
                <Grid xs={8}>
                    <Button variant="contained" onClick={(e) => GenerarArchivoSri(e, 'R_EXCEL')} fullWidth>2.- GENERAR ARCHIVO EXCEL</Button>

                </Grid>
                <Grid xs={8}>
                    <Button variant="contained" onClick={(e) => GenerarArchivoSri(e, 'CA_VALORES')} fullWidth>3.- CONSULTAR Y ACTUALIZAR VALORES</Button>
                </Grid>
                <Grid xs={8}>
                    <Accordion style={{ width: '100%', backgroundColor: '#1976d2', color: 'white' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{
                                color: 'white', // Establece el fondo blanco
                            }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        >
                            <Typography textAlign='center'>4.- REPORTES</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white' }}>
                            <Stack spacing={{ xs: 2, sm: 2 }} justifyContent="center" alignItems="center" direction="row">
                                <Button variant="contained"
                                    onClick={(e) => GenerarArchivoSri(e, 'RP_EXCEL')}
                                    fullWidth>REPORTE EXCEL</Button>
                                <Button variant="contained"
                                    onClick={(e) => GenerarArchivoSri(e, 'RP_TEXT')} fullWidth>REPORTE TEXT</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid xs={8}>
                    <Button variant="contained" onClick={(e) => GenerarArchivoSri(e, 'VC_COSTO')} fullWidth>5.- VALORES POR CENTRO DE COSTO</Button>
                </Grid>
            </Grid>
            <Stack spacing={{ xs: 1, sm: 2, }} mt={2} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={(e) => generar_Reporte(e)} fullWidth>GENERAR REPORTE MATRICULAS VISOR</Button>
            </Stack>
            <Box mt={2}> 
                {contruirTable()}
            </Box>
        </Box>
    )
}

export default MatriculacionPage