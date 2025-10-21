import React, { useState, useEffect } from 'react'
import NavbarMasterMoto from '../../components/NavbarMasterMoto'
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, tableCellClasses, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { ToastContainer, toast } from 'react-toastify';
import {
    UPLOAD_INITIAL_DAY,
    UPLOAD_FINISH_DAY,
    UPLOAD_CHECK_INIT_PAGE,
    INFO_DATE_REGISTER
} from '../../services/Administrativo_Apis/Api_Administrativo.js'
import { Decrypt_User } from '../../services/Storage_Service.js'
import { styled } from '@mui/material/styles';

const InsertCompliance = () => {
    const estadoCompromisoComercial = {
        estadoMeta: "PENDIENTE",
        prospectoMeta: "0",
        solicitudMeta: "0",
        facturaMeta: "0",
        estadoReal: "PENDIENTE",
        prospectoReal: "0",
        solicitudReal: "0",
        facturaReal: "0"
    };

    const Titulo = `INGRESE SU COMPROMISO COMERCIAL DEL DÍA ${dayjs().locale('es').format('dddd, D [de] MMMM [del] YYYY').toUpperCase()}`;
    const [statusCompromisoComercial, setStatusCompromisoComercial] = useState(estadoCompromisoComercial)
    const [isActiveTextMeta, setIsActiveTextMeta] = useState(false);
    const [isActiveTextReal, setIsActiveTextReal] = useState(false);
    const [prospecto, setProspecto] = useState('0');
    const [solicitud, setSolicitud] = useState('0');
    const [facturas, setFacturas] = useState('0');
    const [infoDate, setInfoDate] = useState({
        rangedateInit: "00:00:00",
        rangedateFinish: "00:00:00"
    })

    const [prospectoReal, setProspectoReal] = useState('0');
    const [solicitudReal, setSolicitudReal] = useState('0');
    const [facturasReal, setFacturasReal] = useState('0');

    const [userLogin, setUserLogin] = React.useState({});



    const OnInitPage = async () => {
        const user = Decrypt_User();
        if (user === null) {
            return toast.error("NO EXISTE NINGUN USUARIO LOGGEADO", { position: toast.POSITION.TOP_CENTER })
        }
        setUserLogin(user)
        return user;
    }


    const handleNumberInput = (setter) => (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setter(value);
        }
    };

    const INSERT_META_AGENCIA = () => {
        if (prospecto === "" || solicitud === "" || facturas === "") {
            return toast.error("Los datos de Prospecto, Solicitud o Factura no pueden estar vacios (Iniciar dia)", { position: toast.POSITION.TOP_CENTER })
        }
        const functionThatReturnPromise = async () => {
            try {
                await UPLOAD_INITIAL_DAY(userLogin.User,
                    prospecto,
                    solicitud,
                    facturas);
                fetchData();
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "SE INSERTO CORRECTAMENTE....")
    }


    const INSERT_REAL_AGENCIA = () => {
        if (prospectoReal === "" || solicitudReal === "" || facturasReal === "") {
            return toast.error("Los datos de Prospecto, Solicitud o Factura no pueden estar vacios (Finalizar dia)", { position: toast.POSITION.TOP_CENTER })
        }
        const functionThatReturnPromise = async () => {
            try {
                await UPLOAD_FINISH_DAY(userLogin.User,
                    prospectoReal,
                    solicitudReal,
                    facturasReal);
                fetchData();
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "SE INSERTO CORRECTAMENTE....")
    }

    useEffect(() => {
        GetInfoRegister();
        manejoMensajes(fetchData, "FINALIZANDO CARGA....")
    }, []);

    const GetInfoRegister = async () => {
        try {
            const respuesta = await INFO_DATE_REGISTER();
            setInfoDate(respuesta)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const fetchData = async () => {
        try {
            const user = await OnInitPage()

            const respuesta = await UPLOAD_CHECK_INIT_PAGE(user.User);
            setIsActiveTextMeta(respuesta.estadoMeta === "PENDIENTE"? true:false)
            setIsActiveTextReal(respuesta.estadoReal === "PENDIENTE"? true:false)
            setProspecto(respuesta.prospectoMeta);
            setSolicitud(respuesta.solicitudMeta);
            setFacturas(respuesta.facturaMeta);
            setProspectoReal(respuesta.prospectoReal);
            setSolicitudReal(respuesta.solicitudReal);
            setFacturasReal(respuesta.facturaReal);
            setStatusCompromisoComercial(respuesta)
            setIsActiveTextMeta(respuesta.estadoMeta === "REALIZADO" ? false : true);
            setIsActiveTextReal(respuesta.estadoReal === "REALIZADO" ? false : true);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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



    function SimpleTable() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ width: '10%' }}>Grabar</StyledTableCell>
                            <StyledTableCell>Prospecto (UNIDADES)</StyledTableCell>
                            <StyledTableCell>Solicitud (UNIDADES)</StyledTableCell>
                            <StyledTableCell>Facturas (UNIDADES)</StyledTableCell>
                            <StyledTableCell>Estado</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell  >
                                <Button variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={INSERT_META_AGENCIA}
                                    disabled={!isActiveTextMeta}
                                >
                                    Grabar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    disabled={!isActiveTextMeta}
                                    label="Prospecto"
                                    variant="outlined"
                                    fullWidth
                                    value={prospecto}
                                    onChange={handleNumberInput(setProspecto)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    disabled={!isActiveTextMeta}
                                    label="Solicitud"
                                    variant="outlined"
                                    fullWidth
                                    value={solicitud}
                                    onChange={handleNumberInput(setSolicitud)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    disabled={!isActiveTextMeta}
                                    label="Facturas"
                                    variant="outlined"
                                    fullWidth
                                    value={facturas}
                                    onChange={handleNumberInput(setFacturas)}
                                />
                            </TableCell>
                            <TableCell>
                                <Typography align='CENTER' fontWeight='bold'>
                                    INICIO DE DIA
                                </Typography>
                            </TableCell>
                        </TableRow>
                        {statusCompromisoComercial.estadoMeta === "REALIZADO" ? columFinishDay() : null}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    const columFinishDay = () => {
        return (<TableRow >
            <TableCell style={{ width: '10%' }}>
                <Button variant="contained"
                    color="primary"
                    fullWidth
                    onClick={INSERT_REAL_AGENCIA}
                    disabled={!isActiveTextReal}
                >
                    Grabar
                </Button>
            </TableCell>
            <TableCell>
                <TextField
                    disabled={!isActiveTextReal}
                    label="Prospecto"
                    variant="outlined"
                    fullWidth
                    value={prospectoReal}
                    onChange={handleNumberInput(setProspectoReal)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    disabled={!isActiveTextReal}
                    label="Solicitud"
                    variant="outlined"
                    fullWidth
                    value={solicitudReal}
                    onChange={handleNumberInput(setSolicitudReal)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    disabled
                    label="Facturas"
                    variant="outlined"
                    fullWidth
                    value={facturasReal}
                    onChange={handleNumberInput(setFacturasReal)}
                />
            </TableCell>
            <TableCell>
                <Typography align='CENTER' fontWeight='bold'>
                    FINALIZANDO EL DIA
                </Typography>
            </TableCell>
        </TableRow>)
    }
    return (
        <>
            <ToastContainer />
            <NavbarMasterMoto titulo={Titulo} />

            <Card sx={{ width: '100%', padding: 2 }}>
                <CardHeader
                    title="HORARIOS DISPONIBLES REGISTRAR"
                    sx={{ backgroundColor: '#000000', padding: 1 }}
                />
                <CardContent>
                    <Typography >HORARIO PARA REGISTRAR LAS METAS DEL DIA: {infoDate.rangedateInit}</Typography>
                    <Typography >HORARIO DATOS AL FINALIZAR EL DIA: {infoDate.rangedateFinish}</Typography>
                </CardContent>
            </Card>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {SimpleTable()}
            </Box>
        </>
    )
}

export default InsertCompliance