import React from 'react'
import Logo from '../assets/images/Logo.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { GET_REVISION_MOTO, VERIFICAR_GARANTIA, GRABAR_GARANTIA, UPDATE_EMAIL, UPDATE_TELEFONO } from '../services/Aura_Api'
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import './css/AuraPage.css'
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Typography from '@mui/material/Typography';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateIcon from '@mui/icons-material/Update';
import { VENTA_DATA_BASE } from '../Models/VentaDataBase'
import EncuestaAura from './EncuestaAura';
const RegistroGarantia = () => {
    const baseData = VENTA_DATA_BASE
    const [numeroFactura, setNumeroFactura] = React.useState("")
    const [infomoto, setInfoMoto] = React.useState(baseData);
    const [telefono, setTelefono] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [isChecked, setIsChecked] = React.useState("");
    const [otrosMedios, setOtrosMedios] = React.useState("");
    const [botonActivado, setBotonActivaro] = React.useState(true);
    const [cambioFormulario, setCambioFormulario] = React.useState(true);


    const handleNumeroFacturaChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < numericValue.length; i++) {
            if (i === 3 || i === 6) {
                formattedValue += '-';
            }
            formattedValue += numericValue[i];
        }
        setNumeroFactura(formattedValue);
    };



    const handleCheckboxChange = (event, tipocheck) => {
        event.preventDefault()
        setIsChecked(tipocheck);
    };

    const update_email_correo = (e, tipo) => {
        e.preventDefault()
        const functionThatReturnPromise = async () => {
            try {
                if (tipo === "email") {
                    if (!validarCorreoElectronico(email)) {
                        throw new Error('INGRESE UN CORREO VALIDO!');
                    }
                    const respuesta = await UPDATE_EMAIL(infomoto.motc_n_documento, telefono, infomoto.motc_cod_cliente, email);
                }
                if (tipo === "telefono") {
                    if (telefono.trim().length === 0) {
                        throw new Error('INGRESE UN TELEFONO VALIDO!');
                    }
                    const respuesta = await UPDATE_TELEFONO(infomoto.motc_n_documento, telefono, infomoto.motc_cod_cliente, email);
                }
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
                        return "SE ACTUALIZO CORRECTAMENTE"
                    },
                    icon: "🟢",
                    position: toast.POSITION.TOP_CENTER
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                    icon: '🔴',
                    position: toast.POSITION.TOP_CENTER
                }
            }
        );

    }


    function validarCorreoElectronico(correo) {
        const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return expresionRegular.test(correo);
    }

    const grabarGarantia = (e) => {
        e.preventDefault()
        if (!validarCorreoElectronico(email)) {
            return toast.warn("INGRESE UN CORREO VALIDO", { position: toast.POSITION.TOP_CENTER })
        }
        if (telefono.trim().length === 0) {
            return toast.warn("INGRESE UN TELEFONO VALIDO", { position: toast.POSITION.TOP_CENTER })
        }
        if (infomoto.motc_n_documento === "") {
            return toast.warn("NO HA REALIZADO LA BUSQUEDA DE SU MOTO", { position: toast.POSITION.TOP_CENTER })
        }
        if (isChecked === "") {
            return toast.warn("DEBE SELECCIONAR EL MEDIO DE COMUNICACION PORFAVOR", { position: toast.POSITION.TOP_CENTER })
        }
        if (isChecked === "otros" && otrosMedios.trim() === "") {
            return toast.warn("PORFAVOR LLENE EL CAMPO OTROS", { position: toast.POSITION.TOP_CENTER })
        }
        const garantiaNueva = {
            "id": "123",
            "factura": infomoto.motc_n_documento,
            "nombrecliente": infomoto.motc_des_cliente,
            "direccioncliente": infomoto.motc_clt_direccion,
            "telefonocliente": telefono,
            "emailclient": email,
            "marcamoto": infomoto.marca_motos,
            "modelomoto": infomoto.motc_des_producto,
            "ciudad": infomoto.motc_clt_ciudad,
            "agencia": infomoto.motc_des_punto_fact,
            "fecharegistro": dayjs().format('YYYY-MM-DD hh:mm:ss'),
            "mediocomunicacion": isChecked,
            "leyendaotros": otrosMedios,
            "estado": "",
            "calificacion": "",
            "razoncalificacion": ""
        }
        let result = ""
        const functionThatReturnPromise = async () => {
            try {
                const respuesta = await GRABAR_GARANTIA(garantiaNueva);
                setBotonActivaro(false)
                setCambioFormulario(false)
                // navigate(`/ENCUESTA-GARANTIA/?codigoDocumento=${infomoto.motc_n_documento}`)
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
                        return "SE INSERTO CORRECTAMENTE"
                    },
                    icon: "🟢",
                    position: toast.POSITION.TOP_CENTER
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                    icon: '🔴',
                    position: toast.POSITION.TOP_CENTER
                }
            }
        );
    }

    const buscarMotoXDocumento = async (e) => {
        e.preventDefault()
        let result = ""
        const functionThatReturnPromise = async () => {
            try {
                let respuesta = await VERIFICAR_GARANTIA(numeroFactura);
                if (respuesta === true) {
                    setInfoMoto(baseData)
                    throw "GRACIAS!. UD YA HA REALIZADO LA ENCUESTA";
                }
                respuesta = await GET_REVISION_MOTO(numeroFactura);
                if (respuesta.length !== 0) {
                    setInfoMoto(respuesta[0])
                    setTelefono(respuesta[0].motc_clt_telefono)
                    setEmail(respuesta[0].motc_clt_email)
                } else {
                    throw "No se encontraron DATOS de la factura";
                }
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
                        return "DESPLEGANDO DATOS"
                    },
                    icon: "🟢",
                    position: toast.POSITION.TOP_CENTER
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                    icon: '🔴',
                    position: toast.POSITION.TOP_CENTER
                }
            }
        );
    }

    const estiloParrafo = {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 0,
        marginBottom: 0,
    }

    const redireccionarEncuesta = (e) => {
        e.preventDefault()

        // navigate(`/ENCUESTA-GARANTIA/?codigoDocumento=${infomoto.motc_n_documento}`)
    }

    return (
        <>
            {cambioFormulario ? (<div style={{ backgroundColor: '#696969' }}>
                <ToastContainer />
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#332F2E',
                    color: '#D9BD30',
                    paddingLeft: '50px',
                    paddingRight: '50px'
                }}>
                    <p style={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }}> BIENVENIDO - ACTIVA TU GARANTIA</p>
                    <img src={Logo}
                        width={120}
                        height={80}
                        alt='logo de la empresa master moto'></img>
                </nav>

                <Box sx={{
                    flexGrow: 1,
                    paddingRight: 2,
                    paddingLeft: 2,
                    paddingTop: 3
                }}>
                    <Paper elevation={3}
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                            backgroundColor: 'rgb(51, 47, 46)',
                            color: 'white'
                        }}>
                        <p style={{
                            textAlign: 'center',
                            color: '#FFE516',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginTop: 0,
                            marginBottom: 0,
                            textShadow: '2px 1px 2px rgba(0, 0, 0, 0.5)'
                        }}>BIENVENIDO</p>
                        <p style={estiloParrafo}>Te damos la más cordial bienvenida al Yellow Team.</p>
                        <p style={estiloParrafo}>Gracias por permitirnos ser parte de este sueño.</p>
                        <p style={estiloParrafo}>A continuación, por favor ingresa tus datos en el formulario, y de esta manera podrás activar tu garantía.</p>
                    </Paper>
                    <br></br>
                    <Paper elevation={3}  >
                        <Grid container spacing={2} paddingLeft={5} paddingRight={5} paddingBottom={10}>
                            <Grid item xs={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Buscar Factura
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id="standard-basic"
                                        label="FORMATO (000-000-0000)"
                                        variant="standard"
                                        fullWidth
                                        value={numeroFactura}
                                        onChange={handleNumeroFacturaChange} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <SearchIcon onClick={(e) => buscarMotoXDocumento(e)} />
                                        <Button onClick={(e) => buscarMotoXDocumento(e)}> Buscar</Button>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Codigo Cliente
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    variant="standard"
                                    className='TextfieldFullWidth'
                                    value={infomoto.motc_cod_cliente} />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Nombres y Apellidos
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    value={infomoto.motc_des_cliente}
                                    variant="standard"
                                    className='TextfieldFullWidth' />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Direccion del Domicilio
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    variant="standard"
                                    value={infomoto.motc_clt_direccion}
                                    className='TextfieldFullWidth' />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Telefono de Celular
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField id="standard-basic"
                                        label=""
                                        variant="standard"
                                        className='TextfieldFullWidthEneable'
                                        onChange={(e) => setTelefono(e.target.value)}
                                        value={telefono}
                                    />
                                    <UpdateIcon className='iconoBotton'
                                        onClick={(e) => update_email_correo(e, "telefono")}></UpdateIcon>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Correo Electronico
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField id="standard-basic"
                                        label=""
                                        value={email}
                                        variant="standard"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='TextfieldFullWidthEneable'
                                    />
                                    <UpdateIcon className='iconoBotton'
                                        onClick={(e) => update_email_correo(e, "telefono")}></UpdateIcon>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Marca
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    variant="standard"
                                    className='TextfieldFullWidth'
                                    value={infomoto.marca_motos} />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Modelo
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    variant="standard"
                                    className='TextfieldFullWidth'
                                    value={infomoto.motc_des_producto} />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Ciudad
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    value={infomoto.motc_clt_ciudad}
                                    variant="standard"
                                    className='TextfieldFullWidth' />
                            </Grid>
                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Nombre de la agencia
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    className='TextfieldFullWidth'
                                    value={infomoto.motc_des_punto_fact}
                                    variant="standard" />
                            </Grid>

                            <Grid item xs={12} md={6} sm={12}>
                                <p style={{
                                    paddingBottom: 0,
                                    marginBottom: 0
                                }}>
                                    Fecha de Factura
                                </p>
                                <TextField id="standard-basic"
                                    label=""
                                    variant="standard"
                                    className='TextfieldFullWidth'
                                    value={dayjs().format('YYYY-MM-DD')} />
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <Typography variant="h6" gutterBottom align='center' >
                                    ¿ Cuál es el medio de comunicación de preferencia para ser contactado?
                                </Typography>
                                <p>

                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={(isChecked === 'llamada' ? true : false)}
                                        onChange={(e) => handleCheckboxChange(e, 'llamada')}
                                    />
                                    <Typography variant="subtitle2" gutterBottom onClick={(e) => handleCheckboxChange(e, 'llamada')}>
                                        Llamada Telefonica
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={(isChecked === 'whatsapp' ? true : false)}
                                        onChange={(e) => handleCheckboxChange(e, 'whatsapp')}
                                    />
                                    <Typography variant="subtitle2" gutterBottom onClick={(e) => handleCheckboxChange(e, 'whatsapp')}>
                                        Mensaje de WhatsApp
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={(isChecked === 'correo' ? true : false)}
                                        onChange={(e) => handleCheckboxChange(e, 'correo')}
                                    />
                                    <Typography variant="subtitle2" gutterBottom onClick={(e) => handleCheckboxChange(e, 'correo')}>
                                        Correo
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={(isChecked === 'otros' ? true : false)}
                                        onChange={(e) => handleCheckboxChange(e, 'otros')}
                                    />
                                    <Typography variant="subtitle2" gutterBottom onClick={(e) => handleCheckboxChange(e, 'otros')}>
                                        Otros
                                    </Typography>
                                </div>
                            </Grid>
                            {isChecked === 'otros' ?
                                (<Grid item xs={12} md={12} sm={12}>
                                    <TextField id="outlined-basic"
                                        label="Otros medio de comunicacion"
                                        variant="filled"
                                        onChange={(e) => setOtrosMedios(e.target.value)}
                                        fullWidth />
                                </Grid>)
                                : ""}

                            <Grid item xs={12} md={12} sm={12}>
                                <Typography variant="subtitle1"
                                    gutterBottom
                                    align='center'
                                    color='red'
                                    type='bold' >
                                    ** CONFIRMAR QUE SU CORREO Y CELULAR ESTEN CORRECTOS **
                                </Typography>

                            </Grid>

                            <Grid item xs={12} md={12} sm={12}>
                                {botonActivado ?
                                    <Button variant="contained"
                                        fullWidth onClick={(e) => grabarGarantia(e)}>CONFIRMAR DATOS</Button>
                                    : (
                                        <div>
                                            <Typography variant="h6" gutterBottom align='center'  >
                                                Su garantia ha sido activada correctamente, GRACIAS!
                                            </Typography>
                                            <Button variant="contained" color="success"
                                                fullWidth onClick={(e) => redireccionarEncuesta(e)}>AYUDANOS A LLENAR LA SIGUIENTE ENCUESTA</Button>
                                        </div>
                                    )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>) :
                <EncuestaAura codDocumento={infomoto.motc_n_documento} />}

        </>

    )
}

export default RegistroGarantia