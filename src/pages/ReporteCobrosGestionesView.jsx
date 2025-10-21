import React, { useEffect } from 'react'
import RangoFechas from '../components/RangoFechas'
import { Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { Get_Consultar_GESTIONES_COBROS_VISUALIZAR } from '../services/Service_Api_Reportes'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const ReporteCobrosGestionesView = () => {
    const [dataReporte, setDataReporte] = React.useState([]);
    const [filter, setFilter] = React.useState("");
    function createData(nombre, padre, secuencia, codigocomprobante, fechacomporomiso, cliente) {
        return { nombre, padre, secuencia, codigocomprobante, fechacomporomiso, cliente };
    }

    const transformToCustomObjects = (Data) => {
        const transformedData = Data.map((row) => {
            return createData(row.nombre,
                row.padre,
                row.secuencia,
                row.codigo_comprobante,
                row.fecha_compromiso_pago,
                row.cliente);
        });
        return transformedData;
    };
    const generar_Reporte = (e) => {
        e.preventDefault()
        let result = ""
        const functionThatReturnPromise = async () => {
            try {
                result = await Get_Consultar_GESTIONES_COBROS_VISUALIZAR(filter);
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
                            <TableCell>NOMBRE</TableCell>
                            <TableCell align="center">PADRE</TableCell>
                            <TableCell align="center">SECUENCIA</TableCell>
                            <TableCell align="center">CODIGO COMPROBANTE</TableCell>
                            <TableCell align="center">FECHA COMPROMISO PAGO</TableCell>
                            <TableCell align="center">CLIENTE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataReporte.map((row) => (
                            <TableRow
                                key={row.campVpn}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                <TableCell align="center">{row.padre}</TableCell>
                                <TableCell align="center">{row.secuencia}</TableCell>
                                <TableCell align="center">{row.codigocomprobante}</TableCell>
                                <TableCell align="center">{dayjs(row.fechacompromisopago).format('DD-MM-YYYY')}</TableCell>
                                <TableCell align="center">{row.cliente}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : "")
    }

    return (
        <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
            <legend>REPORTE GESTIONES COBROS</legend>
            <ToastContainer />
            <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
                <div style={{ width: '100%', display: 'flex' }}>
                    <Typography fontWeight="bold" padding={2}>
                        INGRESE CRITERIO A BUSCAR
                    </Typography>
                    <TextField id="filled-basic"
                        label="Buscador (NOMBRE USUARIO/CODIGO COMPROBANTE)"
                        variant="filled"
                        style={{ width: '100%' }}
                        onChange={(e) => setFilter(e.target.value)} />
                </div>
            </Stack>
            <Box mt={2}>
                {contruirTable()}
            </Box>
        </Box>
    )
}

export default ReporteCobrosGestionesView