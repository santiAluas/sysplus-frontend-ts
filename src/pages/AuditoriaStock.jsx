import React, { useEffect, useState, useRef } from 'react'
import precaucionfondo from '../assets/images/precaucionfondo.jpg'
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField
} from '@mui/material'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Decrypt_User } from '../services/Storage_Service'
import { Search } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { SelectSINO } from '../components/AuditoriaStock/SelectSINO';
import 'dayjs/locale/es';
import { ToastContainer, toast } from 'react-toastify';
import './css/AuditoriaStock.css'
import Checkbox from '@mui/material/Checkbox';
import {
    GET_AGENCIES_BY_EMPLOYEE,
    SEARCH_PRODUCTO_INVENTORY,
    CHECK_SAVE_PRODUCT,
    PRODUCTO_BY_ID,
    FINISH_INVENTORY
} from '../services/Api_Inventario/Api_TomaFisicaInventario.js'
import ModalSearchProduct from '../components/TomaInventarioFisicoComp/ModalSearchProduct.jsx';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ConfirmSaveItemAudit from '../components/TomaInventarioFisicoComp/ConfirmSaveItemAudit.jsx';
import { TomaFisicaProducto } from '../components/TomaInventarioFisicoComp/class/TomaFisicaProducto.js';
import ConfirmDialog from '../components/TomaInventarioFisicoComp/ConfirmDialog.jsx';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import IngresarProductoNoOpenBravo from '../components/Modals/IngresarProductoNoOpenBravo.jsx';


const AuditoriaStock = (props) => {
    const { tipoTomaFisica } = props;
    let productoEncerrado = {
        "fecha_actual": "28/12/2023 20:50:27",
        "organizacion": "",
        "nombre": "",
        "organizationid": "",
        "bodega": "",
        "categoria": "",
        "codigo": "",
        "descripcion": "",
        "unidad": 0,
        "cantidad": 0,
        "atributos": "",
        "color": "",
        atributo1: "0",
        atributo2: "0",
        "atributo3": "0",
        "atributo4": "0",
        "ubicacion": "",
        "c_oem": "",
        "tercero": "",
        "dateordered": "",
        "priceactual": "",
        "cantidadbuenestado": "",
        "cantidadmalestado": "",
        "cantidadtotal": "",

    }

    const [openSearchProduct, setOpenSearchProduct] = React.useState(false);
    const [userLogin, setUserLogin] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [habilitarComponente, setHabilitarComponente] = useState(false)
    const [agencuasUsuarios, setAgencuasUsuarios] = useState([]);
    const [seleccionarAgencia, setSeleccionarAgencia] = useState(0)
    const [cantidadBuenEstado, setCantidadBuenEstado] = useState(0)
    const [cantidadMalEstado, setCantidadMalEstado] = useState(0)
    const [total, setTotal] = useState(0);
    const [codigoProducto, setCodigoProducto] = useState("")
    const [producto, setProducto] = useState(productoEncerrado)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [llaves, setllaves] = useState(0)
    const [manual, setmanual] = useState(0)
    const [baterias, setbaterias] = useState(0)
    const [herramientas, setherramientas] = useState(0)
    const [retrovisores, setretrovisores] = useState(0)
    const [apoyaPies, setapoyaPies] = useState(0)
    const [portaPlacas, setportaPlacas] = useState(0)
    const [portaMaleteros, setportaMaleteros] = useState(0)
    const [aguaBateria, setaguaBateria] = useState(0)
    const [typeSelectionMotoCount, setTypeSelectionMotoCount] = useState(0)
    const [observaciones, setObservaciones] = useState("")
    const [objectAgencia, setObjectAgencia] = useState([])
    const [selectObservacion, setSelectObservacion] = useState(false)
    const [isConsignado, setIsConsignado] = useState(0)
    const [modalCheckDataItem, setModalCheckDataItem] = useState(false)
    const [productoAudSave, setProductoAudSave] = useState(new TomaFisicaProducto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0))
    let navigate = useNavigate();
    const [selectNameAgencia, setSelectNameAgencia] = useState("")
    const valuesNull = ["N/A", "0", "", "null", undefined]
    const [locationItem, setLocationItem] = useState("")
    const [idAgencySelect, setIdAgencySelect] = useState("")
    const [modalIngresarProducto, setModalIngresarProducto] = useState(false)
    const [typeDamageMotocycle, setTypeDamageMotocycle] = useState(0)

    const OnInitPage = async () => {
        const user = Decrypt_User();
        if (user === null) {
            return navigate('/');
        }
        setUserLogin(user)
        try {
            const respuesta = await GET_AGENCIES_BY_EMPLOYEE(user.User)
            setAgencuasUsuarios(respuesta)
        } catch (error) {
            setOpen(true)
            setHabilitarComponente(true)
        }
    }

    const [listProduct, setListProduct] = useState([]);
    const buscarProducto = async () => {
        try {
            if (codigoProducto === "")
                return toast.warn("No ha escrito ningun codigo", { position: toast.POSITION.TOP_CENTER })
            if (seleccionarAgencia === 0) {
                return toast.warn("Debe seleccionar una Agencia", { position: toast.POSITION.TOP_CENTER })
            }
            const respuesta = await SEARCH_PRODUCTO_INVENTORY(codigoProducto, selectNameAgencia, true);
            if (respuesta.length > 1) {
                setOpenSearchProduct(true)
                setListProduct(respuesta)
                return;
            }

            if (respuesta.length === 0) {
                setOpenSearchProduct(true)
                return toast.warn("NO SE ENCONTRARON RESULTADOS", { position: toast.POSITION.TOP_CENTER })
            }
            resetComponentes()
            setProducto(respuesta[0])
            setLocationItem("LOCAL")
            return toast.info("VIZUALIZANDO DATOS", { position: toast.POSITION.TOP_CENTER })
        } catch (error) {
            return toast.error("Debe seleccionar una Agencia", { position: toast.POSITION.TOP_CENTER })
        }
    }


    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            buscarProducto()
        }
    };

    const verifyValueFieldNotEmpty = () => {
        let pass = true;
        pass = validarSelectVacios()
        return pass;
    }


    useEffect(() => {
        OnInitPage();
        // getCountGoodOrBatStatus();
        checkSaveProduct()
    }, [
        producto
    ]);


    const grabarInventarioProducto = async () => {
        getCountGoodOrBatStatus()
        const isSelectCorrect = validarSelectVacios()
        if (valuesNull.includes(producto.id)) {
            return toast.warn("NO HA SELECCIONADO NINGUN PRODUCTO", { position: toast.POSITION.TOP_CENTER })
        }
        // if (!valuesNull.includes(producto.atributo2.toString()) && (isConsignado === null || isConsignado === 0)) {
        //     return toast.warn("NO HA SELECCIONADO EL TIPO DE PRODUCTO", { position: toast.POSITION.TOP_CENTER })
        // }
        if (isSelectCorrect && !valuesNull.includes(producto.atributo2.toString())) {
            return toast.warn("PORFAVOR REVISE QUE LOS KIT O VARIOS DE LA MOTO NO ESTE VACIO", { position: toast.POSITION.TOP_CENTER })
        }
        if ((typeSelectionMotoCount === 0 || typeSelectionMotoCount === undefined)
            && !valuesNull.includes(producto.atributo2.toString())) {
            return toast.warn("ELIJA EL ESTADO DE LA MOTO", { position: toast.POSITION.TOP_CENTER })
        }

        if ((typeSelectionMotoCount === 0 || typeSelectionMotoCount === undefined)
            && !valuesNull.includes(producto.atributo2.toString()) && typeDamageMotocycle === 0) {
            return toast.warn("ELIJA EL TIPO DE DAÑO DE LA MOTO", { position: toast.POSITION.TOP_CENTER })
        }


        if (parseInt(cantidadMalEstado) > 0 && observaciones === "") {
            return toast.warn("PRODUCTO EN EL MAL ESTADO, ESCRIBA UNA OBSERVACION", { position: toast.POSITION.TOP_CENTER })
        }

        if (validarSelectMalEstado() && (observaciones === "" || observaciones === undefined)) {
            return toast.warn("KIT O VARIOS EN EL MAL ESTADO, ESCRIBA UNA OBSERVACION", { position: toast.POSITION.TOP_CENTER })
        }

        try {
            const tomaFisicaProducto = new TomaFisicaProducto(
                String(producto.codigo),
                String(producto.nombre),
                String(cantidadBuenEstado ?? "0"),
                String(cantidadMalEstado ?? "0"),
                String(producto.atributo2 ?? "0"),
                String(producto.atributo3 ?? "0"),
                String(llaves ?? "0"),
                String(manual ?? "0"),
                String(baterias ?? "0"),
                String(herramientas ?? "0"),
                String(retrovisores ?? "0"),
                String(apoyaPies ?? "0"),
                String(portaPlacas ?? "0"),
                String(portaMaleteros ?? "0"),
                String(aguaBateria ?? "0"),
                String(observaciones),
                String((locationItem === "NACIONAL" ? "0" : producto.cantidad) ?? "0"),
                String(parseInt(cantidadBuenEstado) + parseInt(cantidadMalEstado) ?? "0"),
                String(producto.atributo1 ?? ""),
                String(isConsignado ?? "0"),
                String(producto.id),
                String(userLogin.User),
                String(idAgencySelect),
                String(locationItem),
                String(typeDamageMotocycle)
            );
            setProductoAudSave(tomaFisicaProducto)
            setModalCheckDataItem(true)
        } catch (error) {
            return toast.warn(error.message, { position: toast.POSITION.TOP_CENTER })
        }
    }


    const getCountGoodOrBatStatus = (value) => {
        if (value !== 2) {
            setTypeDamageMotocycle(0)
        }
        if (!valuesNull.includes(producto.atributo2) && value !== undefined) {
            setTypeSelectionMotoCount(value)
            setCantidadBuenEstado(value === 1 ? 1 : 0);
            setCantidadMalEstado(value === 2 ? 1 : 0);
        }
    }

    const checkSaveProduct = async () => {
        if (producto.codigo !== "") {
            const isProduct = await CHECK_SAVE_PRODUCT(producto.id, idAgencySelect);
            if (isProduct === "REOPEN") {
                setOpenConfirmDialog(true)
            } else if (isProduct === "NOTOPEN") {
                setProducto(productoEncerrado)
                resetComponentes()
                toast.error("EL PRODUCTO NO PUEDE SER REAPERTURADO.", { position: toast.POSITION.TOP_CENTER });
            }
        }
    };

    const confirmDialog = async () => {
        try {
            const item = await PRODUCTO_BY_ID(producto.id, idAgencySelect);
            setValuesComponents(item[0])
        } catch (error) {

        }
    }

    const cancelarConfirm = () => {
        setProducto(productoEncerrado)
        resetComponentes()
    }

    const seleccionarAgenciaYJefeAgencia = (e) => {
        setSeleccionarAgencia(e.target.value)

        // if (agencuasUsuarios.length > 0) {
        const resultado = agencuasUsuarios.find(item => item.idagencia === e.target.value);
        setObjectAgencia(resultado)
        setSelectNameAgencia(resultado.nombreagencia)
        setIdAgencySelect(resultado.idagencia)
        // }
    }

    const handleEnterKeyPressGrabar = (e) => {
        if (e.key === 'Enter') {
            grabarInventarioProducto(e)
        }
    };

    const validarSelect = () => {
        if (llaves === "2" ||
            manual === "2" ||
            baterias === "2" ||
            herramientas === "2" ||
            retrovisores === "2" ||
            apoyaPies === "2" ||
            portaPlacas === "2" ||
            portaMaleteros === "2" ||
            aguaBateria === "2") {
            // return setHabilitarTextBox(true)
        }
    }

    const validarSelectVacios = () => {
        if (llaves === 0 ||
            manual === 0 ||
            baterias === 0 ||
            herramientas === 0 ||
            retrovisores === 0 ||
            apoyaPies === 0 ||
            portaPlacas === 0 ||
            portaMaleteros === 0 ||
            aguaBateria === 0
        ) {
            return true
        }
        return false
    }

    const validarSelectMalEstado = () => {
        const variables = [
            llaves,
            manual,
            baterias,
            herramientas,
            retrovisores,
            apoyaPies,
            portaPlacas,
            portaMaleteros,
            aguaBateria
        ];
        const valoresAValidar = ['2', '3'];
        return variables.some(variable => valoresAValidar.includes(variable));
    };

    function transformSITIENE(valor) {
        const mensajes = {
            1: 1,
            2: 0,
            3: 0,
        };
        return mensajes[valor] || "VALOR DESCONOCIDO";
    }


    const setValuesComponents = (item) => {
        getCountGoodOrBatStatus(item)
        if (!valuesNull.includes(item.chasis)) {
            setCantidadBuenEstado(item.cantidadbuenestado);
            setCantidadMalEstado(item.cantidadmalestado);
            setTypeDamageMotocycle(item.tipodefectomoto)
            setTypeSelectionMotoCount(item.cantidadmalestado === 1 ? 2 : 1)
        } else {
            setCantidadBuenEstado((item.cantidadbuenestado));
            setCantidadMalEstado((item.cantidadmalestado))
        }
        setObservaciones(item.observaciones);
        setSelectObservacion(item.observaciones !== "");
        setIsConsignado(item.isconsignado === "1" ? 1 : 2)
        setllaves(parseInt(item.llaves))
        setmanual(parseInt(item.manual))
        setbaterias(parseInt(item.tienebateria))
        setherramientas(parseInt(item.herramientas))
        setretrovisores(parseInt(item.retrovisores))
        setapoyaPies(parseInt(item.apoyapies))
        setportaPlacas(parseInt(item.portaplacas))
        setportaMaleteros(parseInt(item.portamaleteros))
        setaguaBateria(parseInt(item.aguabateria))
        const sum = (transformSITIENE(item.llaves) + transformSITIENE(item.manual) +
            transformSITIENE(item.tienebateria) + transformSITIENE(item.herramientas) +
            transformSITIENE(item.retrovisores) + transformSITIENE(item.apoyapies) +
            transformSITIENE(item.portaplacas) + transformSITIENE(item.portamaleteros) + transformSITIENE(item.aguabateria))
        setSelectedKitMoto(sum === 9 ? 1 : 2)
    }


    const resetComponentes = () => {
        setProducto(productoEncerrado)
        setCodigoProducto("")
        setTotal(0)
        setCantidadBuenEstado(0)
        setCantidadMalEstado(0)
        setTypeSelectionMotoCount(0)
        setllaves(0)
        setmanual(0)
        setbaterias(0)
        setherramientas(0)
        setretrovisores(0)
        setapoyaPies(0)
        setportaPlacas(0)
        setportaMaleteros(0)
        setaguaBateria(0)
        setObservaciones("")
        setSelectObservacion(false)
        setIsConsignado(null)
        setSelectedKitMoto(null)
        setLocationItem("")
        setTypeDamageMotocycle(0)
    }

    const handleCantidadMalEstadoChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        if (inputValue === "") {
            setCantidadMalEstado(0)
        } else {
            setCantidadMalEstado(parseInt(inputValue));
        }
        setTotal(parseInt(inputValue === "" ? 0 : inputValue, 10) + parseInt(cantidadBuenEstado, 10));
    };

    const handleCantidadBuenEstadoChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        if (inputValue === "") {
            setCantidadBuenEstado(0)
        } else {
            setCantidadBuenEstado(parseInt(inputValue));
        }
        setTotal(parseInt(inputValue === "" ? 0 : inputValue, 10) + parseInt(cantidadMalEstado, 10));
    };

    const [openFinishAuditory, setOpenFinishAuditory] = useState(false)

    const finishAutory = async () => {
        try {
            await FINISH_INVENTORY({
                agencia: idAgencySelect,
                usuario: userLogin.User
            });
            toast.success(`SE FINALIZO EL INVENTARIO DE LA AGENCIA ${selectNameAgencia} CORRECTAMENTE`, { position: toast.POSITION.TOP_CENTER });
        } catch (error) {
            toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
        }
    }

    const [blockSectionKits, setBlockSectionKits] = useState(false)
    const [selectedKitMoto, setSelectedKitMoto] = useState(0)
    const haveAllKitMoto = (havekit) => {
        setBlockSectionKits(havekit)
        setllaves(havekit ? 1 : 0)
        setmanual(havekit ? 1 : 0)
        setbaterias(havekit ? 1 : 0)
        setherramientas(havekit ? 1 : 0)
        setretrovisores(havekit ? 1 : 0)
        // setapoyaPies(havekit ? 1 : 0)
        // setportaPlacas(havekit ? 1 : 0)
        // setportaMaleteros(havekit ? 1 : 0)
        // setaguaBateria(havekit ? 1 : 0)
    }

    const confirmInventoryFinish = () => {
        finishAutory()
    }

    const cancelConfirmInventoryFinish = () => {
        setOpenFinishAuditory(false)
    }

    const controlObservacion = (value) => {
        if (!value) {
            setObservaciones("")
        }
        setSelectObservacion(value)
    }

    return (
        <>
            <ToastContainer />
            <IngresarProductoNoOpenBravo open={modalIngresarProducto}
                setOpen={setModalIngresarProducto}
                titulo={`INGRESE PRODUCTO ${tipoTomaFisica === 1? 'SOBRANTE':''}`}
                mensaje="LLENE LOS SIGUIENTE"
                user={userLogin.User}
                codigoAgencia={idAgencySelect}
                tipoTomaInventario={tipoTomaFisica} />
            <ConfirmDialog
                title="DESEA REA-PERTURAR EL ITEM"
                functionConfirm={confirmDialog}
                functionCancel={cancelarConfirm}
                setOpen={setOpenConfirmDialog}
                open={openConfirmDialog}
            />
            <ConfirmDialog
                title={`DESEA FINALIR EL INVENTARIO DE LA AGENCIA ${selectNameAgencia}`}
                functionConfirm={confirmInventoryFinish}
                functionCancel={cancelConfirmInventoryFinish}
                setOpen={setOpenFinishAuditory}
                open={openFinishAuditory}
            />
            {listProduct.length > 1 || listProduct.length === 0 ?
                <ModalSearchProduct openModal={openSearchProduct}
                    setOpen={setOpenSearchProduct}
                    setProduct={setProducto}
                    parameterSearch={codigoProducto}
                    agencia={selectNameAgencia}
                    setLocationItem={setLocationItem}
                    resetdata={resetComponentes} /> : null}
            <ConfirmSaveItemAudit openModal={modalCheckDataItem}
                setOpen={setModalCheckDataItem}
                productSave={productoAudSave}
                resetdata={resetComponentes} />
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                flexWrap='wrap'
                sx={{ pointerEvents: habilitarComponente ? 'none' : '' }}>
                {/* <img src={precaucionfondo}></img> */}
                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0.8, 0.5), rgba(0, 0, 10, 0.5)), url(${precaucionfondo})`, // Añadir opacidad con linear-gradient
                        backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir todo el Paper
                        color: 'white',
                        width: '90%',
                        textAlign: 'center',

                    }}
                    spacing={3}>
                    <Divider style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>ACCIONES ESPECIALES <p className='parpadeo-rojo'>(PRECAUCION)</p></Divider>
                    <Grid container
                        spacing={2}>
                        {/* <Grid item md={6}>
                            <Button size="large"
                                variant="contained"
                                fullWidth
                                onClick={reconteo_auditoria_stock}>RE-PERTURAR ITEM</Button>
                        </Grid> */}
                        <Grid item md={12}>
                            <Button className='parpadeo-rojo'
                                size="large"
                                fullWidth
                                variant="contained"
                                style={{ background: '#9ecfbc', fontWeight: 'bold' }}
                                sx={{ boxShadow: 4 }}
                                onClick={(e) => setOpenFinishAuditory(true)}>FINALIZAR INVENTARIO</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                flexWrap='wrap'
            // sx={{ pointerEvents: habilitarComponente ? 'none' : '' }}
            >
                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '90%',
                        textAlign: 'center'
                    }}>
                    <Divider>INFORMACION</Divider>
                    <Grid container>
                        <Grid item sm={6} md={6}>
                            <span style={{ fontWeight: 'bold' }}>EMPRESA:</span>
                            <FormControl sx={{ marginLeft: 5 }}>
                                UNNOPARTS
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <Stack direction='row'
                                justifyContent='center'
                                alignItems='center'>
                                <span style={{ fontWeight: 'bold' }}>AGENCIA:</span>
                                <FormControl sx={{ marginLeft: 5, width: 140 }} >
                                    <InputLabel id="demo-simple-select-label">AGENCIA</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        value={seleccionarAgencia}
                                        onChange={(e) => seleccionarAgenciaYJefeAgencia(e)}
                                    >
                                        <MenuItem value={0}>-- SELECT --</MenuItem>
                                        {agencuasUsuarios.map(item => {
                                            return <MenuItem value={item.idagencia}>{item.nombreagencia}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid container mt={4}>
                        <Grid item sm={6} md={6} >
                            <span style={{ fontWeight: 'bold' }}>FECHA: </span>
                            <FormControl sx={{ marginLeft: 7 }}>
                                {dayjs().locale('es').format('dddd, D [de] MMMM [de] YYYY').toUpperCase()}
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <Stack direction='row'
                                justifyContent='center'
                                alignItems='center'>
                                <span style={{ fontWeight: 'bold' }}>USUARIO:
                                </span>
                                <FormControl sx={{ marginLeft: 5 }}>
                                    {userLogin.Name}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item sm={6} md={6} mt={2}></Grid>
                        <Grid item sm={6} md={6} mt={2}>
                            <Stack direction='row'
                                justifyContent='center'
                                alignItems='center'>
                                <span style={{ fontWeight: 'bold' }}>JEFE AGENCIA:
                                </span>
                                <FormControl sx={{ marginLeft: 5 }}>
                                    {objectAgencia.jefeagencia}
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <div style={{ display: tipoTomaFisica === 1 ? "" : "none" }}>
                        <Divider>BUSCAR PRODUCTO</Divider>
                        <Stack direction="row"
                            justifyContent="left"
                            alignItems="center"
                            spacing={2}>
                            <TextField
                                id="filled-basic"
                                label="CODIGO PRODUCTO"
                                variant="filled"
                                onKeyDown={handleEnterKeyPress}
                                value={codigoProducto}
                                onChange={(e) => setCodigoProducto(e.target.value)}
                                sx={{ width: '90%' }}
                            />
                            <Button
                                startIcon={<Search />}
                                variant="contained"
                                size="large"
                                onClick={() => buscarProducto()}
                            >
                                Buscar
                            </Button>
                        </Stack>
                    </div>

                    <Button startIcon={<SaveAsIcon />}
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ marginTop: '15px' }}
                        onClick={(e) => setModalIngresarProducto(true)}
                    >INGRESO DE PRODUCTO {`${tipoTomaFisica === 1? ' SOBRANTE':''}`}</Button>
                </Paper>
                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '90%',
                        textAlign: 'center',
                        display: tipoTomaFisica === 1 ? "" : "none"
                    }}>
                    <Divider>INFORMACION PRODUCTO</Divider>
                    <Grid container spacing={5}>
                        <Grid item md={4} spacing={3}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="CODIGO"
                                variant="standard"
                                value={producto.codigo}
                                focused
                                disabled />
                        </Grid>
                        <Grid item md={4}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="NOMBRE"
                                variant="standard"
                                value={producto.nombre}
                                disabled />
                        </Grid>

                        <Grid item md={4} spacing={3}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="CHASIS"
                                variant="standard"
                                value={producto.atributo2}
                                disabled />
                        </Grid>
                        <Grid item md={4}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="MOTOR"
                                variant="standard"
                                value={producto.atributo3}
                                disabled />
                        </Grid>
                        <Grid item md={4}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="COLOR"
                                variant="standard"
                                value={producto.atributo1}
                                disabled />
                        </Grid>
                        {!valuesNull.includes(producto.atributo2) ? (
                            <Grid item md={4}>
                                <FormControl sx={{ width: '100%', marginTop: '15px' }}  >
                                    <InputLabel id="demo-simple-select-label">ESTADO MOTO</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        value={typeSelectionMotoCount}
                                        onChange={(e) => getCountGoodOrBatStatus(e.target.value)}
                                    >
                                        <MenuItem value={0}>-- ESTADO --</MenuItem>
                                        <MenuItem value={1}>BUEN ESTADO</MenuItem>
                                        <MenuItem value={2}>MAL ESTADO</MenuItem>

                                    </Select>
                                </FormControl>
                                {typeSelectionMotoCount === 2 ?
                                    <FormControl sx={{ width: '100%', marginTop: '15px' }}  >
                                        <InputLabel id="demo-simple-select-label">TIPO DE DAÑO</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="DamageMotocycle"
                                            value={typeDamageMotocycle}
                                            onChange={(e) => setTypeDamageMotocycle(e.target.value)}
                                        >
                                            <MenuItem value={0}>-- SELECCIONE --</MenuItem>
                                            <MenuItem value={1}>RAYADO</MenuItem>
                                            <MenuItem value={2}>GOLPEADO</MenuItem>
                                            <MenuItem value={3}>ROTO</MenuItem>
                                            <MenuItem value={4}>INCOMPLETO</MenuItem>
                                            <MenuItem value={5}>DAÑO EN LA MOTO</MenuItem>
                                        </Select>
                                    </FormControl>
                                    :
                                    null
                                }
                            </Grid>
                        ) : null}







                    </Grid>
                </Paper>

                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '90%',
                        textAlign: 'center',
                        display: (valuesNull.includes(producto.atributo2) ? ('none') : (tipoTomaFisica === 1 ? "" : "none")),
                        
                        // pointerEvents: producto.motor === "" ? 'none' : ''
                    }}>
                    <Divider>ACCESORIOS PRODUCTO</Divider>
                    <Stack direction='column' spacing={2}>
                        <FormControl sx={{ display: 'none' }}>
                            <FormLabel id="group-radio-isproduct" sx={{ textAlign: 'left' }}>EL PRODUCTO ES:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="group-radio-isproduct"
                                name="row-radio-buttons-group"
                                value={isConsignado}
                                onChange={(e) => setIsConsignado(e.target.value)}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Consignado" />
                                <FormControlLabel value="2" control={<Radio />} label="Propio" />
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        <FormControl mt={2}>
                            <FormLabel id="goup-label-kit" sx={{ textAlign: 'left' }}>KIT DE LA MOTO:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="goup-label-kit"
                                name="row-radio-buttons-group"
                                value={selectedKitMoto}
                                onChange={(e) => setSelectedKitMoto(e.target.value)}
                            >
                                <FormControlLabel value="1" control={<Radio />} onClick={(e) => haveAllKitMoto(true)} label="Todo" />
                                <FormControlLabel value="2" control={<Radio />} onClick={(e) => haveAllKitMoto(false)} label="Manual" />
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                    </Stack>
                    <Grid container spacing={5} mt={1} mb={5} sx={{ pointerEvents: blockSectionKits ? 'none' : '' }}>
                        <Grid item md={2}>
                            <SelectSINO titulo='LLAVE'
                                setSelect={setllaves}
                                itemSelect={llaves}></SelectSINO>
                        </Grid>
                        <Grid item md={2}>
                            <SelectSINO titulo='MANUAL'
                                setSelect={setmanual}
                                itemSelect={manual} />
                        </Grid>
                        <Grid item md={2}>
                            <SelectSINO titulo='BATERIA' setSelect={setbaterias} itemSelect={baterias} />
                        </Grid>
                        <Grid item md={3}>
                            <SelectSINO titulo='HERRAMIENTAS'
                                setSelect={setherramientas}
                                itemSelect={herramientas}></SelectSINO>
                        </Grid>
                        <Grid item md={3}>
                            <SelectSINO titulo='RETROVISORES'
                                setSelect={setretrovisores}
                                itemSelect={retrovisores}></SelectSINO>
                        </Grid>
                    </Grid>
                    <Divider>VARIOS</Divider>
                    {/* sx={{ pointerEvents: blockSectionKits ? 'none' : '' }} */}
                    <Grid container spacing={2} mt={1} >
                        <Grid item md={3}>
                            <SelectSINO titulo='APOYA PIES'
                                setSelect={setapoyaPies}
                                itemSelect={apoyaPies}></SelectSINO>
                        </Grid>
                        <Grid item md={3}>
                            <SelectSINO titulo='PORTA PLACAS'
                                setSelect={setportaPlacas}
                                itemSelect={portaPlacas}></SelectSINO>
                        </Grid>
                        <Grid item md={3}>
                            <SelectSINO titulo='PORTA-MALETEROS'
                                setSelect={setportaMaleteros}
                                itemSelect={portaMaleteros}></SelectSINO>
                        </Grid>
                        <Grid item md={3}>
                            <SelectSINO titulo='AGUA-BATERIA'
                                setSelect={setaguaBateria}
                                itemSelect={aguaBateria}></SelectSINO>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '90%',
                        textAlign: 'center',
                        display: (!valuesNull.includes(producto.atributo2) ? 'none' : (tipoTomaFisica === 1 ? "" : "none"))
                    }}>
                    <Divider>CONTAR CANTIDAD PRODUCTOS</Divider>
                    <Grid container spacing={5} mt={1} mb={5}>
                        <Grid item md={4} spacing={3}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="CANTIDAD FISICA (BUEN ESTADO)"
                                variant="standard"
                                color='success'
                                onChange={handleCantidadBuenEstadoChange}
                                value={cantidadBuenEstado}
                                autoComplete='false'
                            />
                        </Grid>
                        <Grid item md={4}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="CANTIDAD FISICA (MAL ESTADO)"
                                variant="standard"
                                color='error'
                                onChange={(e) => handleCantidadMalEstadoChange(e)}
                                value={cantidadMalEstado}
                                autoComplete='false'

                            />
                            {/* {cantidadMalEstado === "0" || cantidadMalEstado === "" || cantidadMalEstado === 0 ? "" : (
                                <FormControl sx={{ width: '100%', marginTop: '15px' }}  >
                                    <InputLabel id="demo-simple-select-label">TIPO DAÑO</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        value={razonMalEstado}
                                        onChange={(e) => setRazonMalEstado(e.target.value)}
                                    >
                                        <MenuItem value={0}>-- SELECT --</MenuItem>
                                        <MenuItem value={1}>RAYONES</MenuItem>
                                        <MenuItem value={2}>GOLPES</MenuItem>
                                        <MenuItem value={3}>ROTO</MenuItem>
                                    </Select>
                                </FormControl>
                            )} */}
                        </Grid>
                        <Grid item md={4}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="TOTAL"
                                variant="standard"
                                value={total}
                                autoComplete='false'
                                disabled
                                type='number'
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3}
                    style={{
                        marginTop: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: '90%',
                        textAlign: 'center',
                        display:tipoTomaFisica === 1 ? "" : "none"
                    }}>
                    <Divider mb={1}>OBSERVACIONES</Divider>
                    {/* <FormControl fullWidth>
                        <InputLabel htmlFor="grouped-native-select">"OBSERVACION"</InputLabel>
                        <Select native defaultValue=""
                            id="grouped-native-select"
                            label="Grouping"
                            value={selectObservacion}
                            onChange={(e) => setSelectObservacion(e.target.value)}>
                            <option value={1}>SI</option>
                            <option value={2}>NO</option>
                        </Select>
                    </FormControl> */}
                    <Checkbox
                        defaultChecked
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        onChange={(e) => controlObservacion(e.target.checked)}
                        checked={selectObservacion}
                    /> ¿ Tiene Observaciones ?
                    <TextField fullWidth
                        sx={{ display: selectObservacion ? "" : "none", marginTop: '15px' }}
                        id="standard-textarea"
                        label="ESCRIBIR OBSERVACION ..."
                        placeholder="Escribir...."
                        multiline
                        rows={4}
                        variant="standard"
                        value={observaciones}
                        onKeyDown={handleEnterKeyPressGrabar}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                    {/* <TextField fullWidth
                        sx={{ display: producto.chasis === "" ? "" : "none" }}
                        id="standard-textarea"
                        label="ESCRIBIR OBSERVACION ..."
                        placeholder="Escribir...."
                        multiline
                        rows={4}
                        variant="standard"
                        value={observacionesNoMotos}
                        onChange={(e) => setObservacionesNoMotos(e.target.value)}
                    /> */}
                    <Divider mb={5} mt={5} ></Divider>
                    <br></br>
                    <Button sx={{ marginTop: "80px" }} size="large"
                        fullWidth
                        onClick={(e) => grabarInventarioProducto()}
                        variant="contained">VERIFICAR DATOS A GRABAR</Button>
                </Paper>
            </Stack>
        </>
    )
}

export default AuditoriaStock