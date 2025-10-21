import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { useNavigate } from 'react-router-dom';
import { Decrypt_User } from '../services/Storage_Service'
import {
    ObtenerAgenciasXUsuarioFinalizar,
    ObtenerReporteAuditoria,
    DESCARGAR_DOCUMENTO_PDF,
    DESCARGAR_DOCUMENTO_EXCEL,
    DESCARGAR_DOCUMENTO_ACTA,
    ObtenerReporteAuditoriaStock,
    DESCARGAR_DOCUMENTO_PDF_ITEMS_STOCK

} from '../services/AuditoriaInventario_Api.js'

import {
    GET_AGENCIES_FINISH_AUDITORY,
    DOWNLOAD_COUNT_ITEM_INVENTORY,
    DOWNLOAD_COUNT_ITEM_INVENTORY_CIEGO,
    DOWNLOAD_COUNT_ITEM_NOT_AUDITED,
    DOWNLOAD_REPORT_EXCEL,
    DOWNLOAD_ACT_DOCUMENT,
    DOWNLOAD_COUNT_ITEM_NOT_AUDITED_MOTOS,
    DOWNLOAD_ITEMS_CONFORME_MOTOS
} from '../services/Api_Inventario/Api_TomaFisicaInventario.js'
import './css/ReporteInventario.css'
import ModalError from '../components/Modals/ModalError.jsx';
import { manejoMensajes } from '../helpers/ManejoExcepciones.js'
import { ToastContainer, toast } from 'react-toastify';
import CachedIcon from '@mui/icons-material/Cached';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadingIcon from '@mui/icons-material/Downloading';
const ReporteAuditoriaInventario = () => {
    const [userLogin, setUserLogin] = useState({});
    const [dataReporte, setDataReporte] = useState([])
    const [dataReporteStockOpen, setDataReporteStockOpen] = useState([])

    const [open, setOpen] = React.useState(false);
    const [mensajeModal, setMensajeModal] = useState(false);
    const [agencuasUsuarios, setAgencuasUsuarios] = useState([]);
    const [seleccionarAgencia, setSeleccionarAgencia] = useState(0)

    const [totalStock, setTotalStock] = useState(0)
    const [totalFisico, setTotalFisico] = useState(0)
    const [totalSobrante, setTotalSobrante] = useState(0)
    const [totalFaltante, setFaltante] = useState(0)
    let navigate = useNavigate();
    const OnInitPage = async () => {
        const user = Decrypt_User();
        if (user === null) {
            // return navigate('/');
        }
        setUserLogin(user)
        try {
            const respuesta = await GET_AGENCIES_FINISH_AUDITORY(user.User)
            setAgencuasUsuarios(respuesta)
        } catch (error) {
            setOpen(true)
            setMensajeModal(error.message)
        }
    }

    useEffect(() => {
        OnInitPage();
    }, []);
    
    const descargarPDF = async () => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_COUNT_ITEM_INVENTORY(seleccionarAgencia)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO PDF ...")
    }

    const descargarPDF_CIEGO = async () => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_COUNT_ITEM_INVENTORY_CIEGO(seleccionarAgencia)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO PDF ...")
    }

    const descargarReporteExcel = (tipoauditoria) => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_REPORT_EXCEL(seleccionarAgencia, tipoauditoria)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO EXCEL ...")
    }
    const generarReporte = async () => {
        const respuesta = await ObtenerReporteAuditoria(seleccionarAgencia)
        const data = await ObtenerReporteAuditoriaStock(seleccionarAgencia)
        setDataReporte(respuesta)
        setDataReporteStockOpen(data)
        if (respuesta.length > 0) {
            let ss = dataReporte.reduce(function (total, elemento) {
                return total + elemento.jsondata.reduce(function (suma, json) {
                    return suma + parseInt(json.cantidad);
                }, 0);
            }, 0)
            setTotalStock(ss)
            setTotalFisico(dataReporte.reduce(function (total, elemento) {
                return total + elemento.jsondata.reduce(function (suma, json) {
                    return suma + parseInt(json.cantidadFisica);
                }, 0);
            }, 0))
        }
    }

    const descargarActaAuditoria = (tipoauditoria) => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_ACT_DOCUMENT(seleccionarAgencia, tipoauditoria)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO ACTA ...")
    }

    

    const descargarReporteItemsOpen = () => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_COUNT_ITEM_NOT_AUDITED(seleccionarAgencia)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO REPORTE ...")
    }

    const descargarReporteItemsOpenMotos = () => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_COUNT_ITEM_NOT_AUDITED_MOTOS(seleccionarAgencia)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO REPORTE ...")
    }
    
    const descargarReporteItemsConformesMotos = () => {
        const functionThatReturnPromise = async () => {
            try {
                await DOWNLOAD_ITEMS_CONFORME_MOTOS(seleccionarAgencia)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "DESCARGANDO REPORTE ...")
    }


    useEffect(() => {
        if (dataReporte.length > 0) {

            setTotalStock(dataReporte.reduce((total, elemento) => {
                return (
                    total +
                    elemento.jsondata.reduce((suma, json) => {
                        return suma + parseInt(json.cantidad);
                    }, 0)
                );
            }, 0));

            setTotalFisico(
                dataReporte.reduce((total, elemento) => {
                    return (
                        total +
                        elemento.jsondata.reduce((suma, json) => {
                            return suma + parseInt(json.cantidadFisica);
                        }, 0)
                    );
                }, 0)
            );
        }
    }, [dataReporte]);
    return (
        <>
            <ToastContainer />
            <ModalError open={open} setOpen={setOpen} titulo='ERROR EN LA DATA' mensaje={mensajeModal} />
            <NavbarMasterMoto titulo="REPORTE INVENTARIO" />
            <Grid container mt={5} spacing={2}>
                <Grid item sm={6}>
                    <Stack direction='row'
                        justifyContent='center'
                        alignItems='center'>
                        <span style={{ fontWeight: 'bold' }}>AGENCIA:</span>
                        <FormControl sx={{ marginLeft: 5, width: 350 }}  >
                            <InputLabel id="demo-simple-select-label">AGENCIA</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                sx={{ width: '80%' }}
                                value={seleccionarAgencia}
                                onChange={(e) => setSeleccionarAgencia(e.target.value)}
                            >
                                <MenuItem value={0}>-- SELECT --</MenuItem>
                                {agencuasUsuarios.map(item => {
                                    return <MenuItem value={item.id}>{item.agencia}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item sm={4} style={{display:'none'}}>
                    <Accordion style={{ background: 'rgb(51, 47, 46)', color: 'white' }} elevation={3} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color='white' htmlColor='white'/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography fontWeight='bold' color='white' >DESCARGAS </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Stack direction='column' spacing={2}>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarPDF}
                                >1. GENERAR REPORTE ITEMS TOMA FISICA</Button>
                                 <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarReporteItemsOpen}
                                >2. GENERAR REPORTE ITEM NO FISICOS</Button>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth 
                                    startIcon={<DownloadingIcon />}
                                    color="success"
                                    onClick={(e) => descargarReporteExcel("normal")}
                                >3. DESCARGAR EXCEL</Button>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={(e) => descargarActaAuditoria("normal")}
                                >4. GENERAR ACTA </Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item sm={4}>
                    <Accordion style={{ background: 'rgb(51, 47, 46)', color: 'white' }} elevation={3} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color='white' htmlColor='white'/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography fontWeight='bold' color='white' >DESCARGAS INVENTARIO CIEGO </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Stack direction='column' spacing={2}>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarPDF_CIEGO}
                                >1. REPORTE CONFORME Y SOBRANTES (REPUESTOS)</Button>
                                 <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarReporteItemsOpen}
                                >2. REPORTE DE FALTANTES (REPUESTOS)</Button>
                                 <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarReporteItemsConformesMotos}
                                >3. REPORTE DE FALTANTES (Motos)</Button>
                                 <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={descargarReporteItemsOpenMotos}
                                >4. REPORTE DE FALTANTES (Motos)</Button>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth 
                                    startIcon={<DownloadingIcon />}
                                    color="success"
                                    sx={{display:'none'}}
                                    onClick={(e) => descargarReporteExcel("ciego")}
                                >3. DESCARGAR EXCEL</Button>
                                <Button size="large"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PictureAsPdfIcon />}
                                    color="error"
                                    onClick={(e) => descargarActaAuditoria("ciego")}
                                >4. GENERAR ACTA</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Grid>


                <Grid item sm={2}>
                </Grid>
            </Grid>
            <Grid container mt={5} sx={{display: 'none'}}>
                <Grid item sm={12}>
                    <Button size="large"
                        variant="contained"
                        fullWidth
                        startIcon={<CachedIcon/>}
                        onClick={generarReporte}
                    >GENERAR REPORTE</Button>
                </Grid>
            </Grid>
            
            <Accordion sx={{ marginTop: '12px', display: 'none' }} elevation={15}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography fontSize={16} color='black'><strong>TOMA FISICA PRIMER CONTEO</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {dataReporte.length === 0 ?
                        ""
                        : (<Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            flexWrap='wrap' spacing={12} mt={6}>
                            <p>TOTAL STOCK: {totalStock}</p>
                            <p>TOTAL FISICO:  {totalFisico} </p>
                            <p>TOTAL FALTANTE: {totalStock > totalFisico ? (totalStock - totalFisico) : 0} </p>
                            <p>TOTAL SOBRANTE: {totalStock < totalFisico ? (totalFisico - totalStock) : 0}
                            </p>
                        </Stack>)}
                    {dataReporte.length === 0 ? "" :
                        (
                            dataReporte.map((item, index) => {
                                return (<Stack mt={2}>
                                    <table className="tbInventario" key={index}>
                                        <thead>
                                            <tr>
                                                <td colSpan="8">
                                                    <strong>EMPRESA: UNNOPARTS</strong>
                                                </td>
                                            </tr>
                                            <tr style={{ backgroundColor: item.motor.length > 30 ? '#aae3ab' : 'white' }}>
                                                <td colSpan="8">
                                                    <strong>PRODUCTO: {item.motor}</strong>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "120px" }}>CONTEO</td>
                                                <td style={{ width: "120px" }}>CODIGO</td>
                                                <td style={{ width: "120px" }}>PRODUCTO</td>
                                                <td style={{ width: "120px" }}>MOTOR-SERIE</td>
                                                <td style={{ width: "120px" }}>STOCK</td>
                                                <td style={{ width: "120px" }}>CANTIDAD FISICA</td>
                                                <td style={{ width: "120px", fontWeight: 'bold' }}>SOBRANTE</td>
                                                <td style={{ width: "120px", fontWeight: 'bold' }}>FALTANTE</td>
                                            </tr>
                                            {item.jsondata.map((caracteristicas, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ width: "120px" }}>
                                                            <strong>CONTEO {index + 1}</strong>
                                                        </td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.codigo}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.nombre}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.motor}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.cantidad}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.cantidadFisica}</td>
                                                        <td style={{ width: "120px", color: (caracteristicas.cantidadFisica - caracteristicas.cantidad) > 0 ? 'green' : 'black', fontWeight: 'bold' }}>
                                                            {parseInt(caracteristicas.cantidadFisica) > parseInt(caracteristicas.cantidad)
                                                                ? parseInt(caracteristicas.cantidadFisica) - parseInt(caracteristicas.cantidad)
                                                                : 0}
                                                        </td>
                                                        <td style={{ width: "120px", color: (caracteristicas.cantidad - caracteristicas.cantidadFisica) > 0 ? 'red' : 'black', fontWeight: 'bold' }}>
                                                            {parseInt(caracteristicas.cantidad) > parseInt(caracteristicas.cantidadFisica)
                                                                ? (parseInt(caracteristicas.cantidad) - parseInt(caracteristicas.cantidadFisica))
                                                                : 0}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Stack>)
                            })
                        )}
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={15} sx={{display: 'none'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography fontSize={16} color='black'><strong>PRODUCTOS FALTANTES FISICOS</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {dataReporteStockOpen.length === 0 ? "" :
                        (
                            dataReporteStockOpen.map((item, index) => {
                                return (<Stack mt={2}>

                                    <table className="tbInventario" key={index}>
                                        <thead>
                                            <tr>
                                                <td colSpan="8">
                                                    <strong>EMPRESA: UNNOPARTS</strong>
                                                </td>
                                            </tr>
                                            <tr style={{ backgroundColor: item.motor.length > 30 ? '#aae3ab' : 'white' }}>
                                                <td colSpan="8">
                                                    <strong>PRODUCTO: {item.motor}</strong>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "120px" }}>CONTEO</td>
                                                <td style={{ width: "120px" }}>CODIGO</td>
                                                <td style={{ width: "120px" }}>PRODUCTO</td>
                                                <td style={{ width: "120px" }}>MOTOR-SERIE</td>
                                                <td style={{ width: "120px" }}>STOCK</td>
                                                <td style={{ width: "120px" }}>CANTIDAD FISICA</td>
                                                <td style={{ width: "120px", fontWeight: 'bold' }}>SOBRANTE</td>
                                                <td style={{ width: "120px", fontWeight: 'bold' }}>FALTANTE</td>
                                            </tr>
                                            {item.jsondata.map((caracteristicas, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ width: "120px" }}>
                                                            <strong>CONTEO {index + 1}</strong>
                                                        </td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.codigo}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.nombre}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.motor}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.cantidad}</td>
                                                        <td style={{ width: "120px" }}>{caracteristicas.cantidadFisica}</td>
                                                        <td style={{ width: "120px", color: (caracteristicas.cantidadFisica - caracteristicas.cantidad) > 0 ? 'green' : 'black', fontWeight: 'bold' }}>
                                                            {parseInt(caracteristicas.cantidadFisica) > parseInt(caracteristicas.cantidad)
                                                                ? parseInt(caracteristicas.cantidadFisica) - parseInt(caracteristicas.cantidad)
                                                                : 0}
                                                        </td>
                                                        <td style={{ width: "120px", color: (caracteristicas.cantidad - caracteristicas.cantidadFisica) > 0 ? 'red' : 'black', fontWeight: 'bold' }}>
                                                            {parseInt(caracteristicas.cantidad) > parseInt(caracteristicas.cantidadFisica)
                                                                ? (parseInt(caracteristicas.cantidad) - parseInt(caracteristicas.cantidadFisica))
                                                                : 0}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Stack>)
                            })
                        )}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ReporteAuditoriaInventario