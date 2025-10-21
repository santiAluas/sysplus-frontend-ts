import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Paper, TextField, Typography, IconButton } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import SearchBlobal from '../../components/SearchBlobal';
import NavbarMasterMoto from '../../components/NavbarMasterMoto';
import { REPORT_CONSIGNACION_PROPIEDAD  } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion'
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ReportSysOB = () => {
    const reporteInit = {
        codproduct: "",
        nameproduct: "",
        color: "",
        chasis: "",
        motor: "",
        ramv: "",
        currentWarehouse: "",
        supplier: "",
        type: "",
    }
    const [parameterSearch, setParameterSearch] = useState("")
    const [reporteData, setReporteData] = useState([reporteInit])

   


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#ffe800",
            color: "#171718",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        '&.customWidth': {
            width: '12px',  // Ajusta el ancho según tus necesidades
        },
    }));

    
    useEffect(() => {
       
        manejoMensajes(fetchData, "CARGANDO ....")
    }, []);

    const fetchData = async () => {
        try {
            const respuesta = await REPORT_CONSIGNACION_PROPIEDAD(parameterSearch.trim());
            setReporteData(respuesta)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const tableResult = () => {
        return (<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">COD PRODUCTO</StyledTableCell>
                        <StyledTableCell align="center">PRODUCTO</StyledTableCell>
                        <StyledTableCell align="center">COLOR</StyledTableCell>
                        <StyledTableCell align="center">CHASIS </StyledTableCell>
                        <StyledTableCell align="center">MOTOR</StyledTableCell>
                        <StyledTableCell align="center">RAMV</StyledTableCell>
                        <StyledTableCell align="center">BODEG. ACT.</StyledTableCell>
                        <StyledTableCell align="center">PROVEEDOR</StyledTableCell>
                        <StyledTableCell align="center">TIPO</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reporteData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{row.codproduct}</TableCell>
                            <TableCell align="right">{row.nameproduct}</TableCell>
                            <TableCell align="right">{row.color}</TableCell>
                            <TableCell align="right">{row.chasis}</TableCell>
                            <TableCell align="right">{row.motor}</TableCell>
                            <TableCell align="right">{row.ramv}</TableCell>
                            <TableCell align="right">{row.currentWarehouse}</TableCell>
                            <TableCell align="right">{row.supplier}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
    }



    return (
        <>
            <NavbarMasterMoto titulo="REPORTE BODEGAS CONSIGNACION SYSPLUS - OPENBRAVO" />
            <br/>
            <ToastContainer />
            <Paper elevation={3} 
                style={{
                    marginRight: 20,
                    marginLeft: 20,
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20
                }}>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        Buscar (codigo producto / producto / atributos)
                        <SearchBlobal parameterSearch={parameterSearch} 
                                      setParameterSearch={setParameterSearch} 
                                      functionExecute={fetchData}  
                                      style={{ width: '100%' }} />
                    </Grid>
                    <Grid item sm={12}>
                        {tableResult()}
                    </Grid>
                </Grid>
            </Paper>

        </>
    )
}

export default ReportSysOB