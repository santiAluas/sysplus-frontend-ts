import { FINISH_INVENTORY, GET_AGENCIES_BY_EMPLOYEE, SAVE_PRODUCT_INVENTORY } from "@/services/Api_Inventario/Api_TomaFisicaInventario";
import { Decrypt_User } from "@/services/Storage_Service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productoEncerrado } from "../ObjetosInventario";
import { showAlert } from "@/utils/modalAlerts";
import { TomaFisicaProducto } from "@/components/TomaInventarioFisicoComp/class/TomaFisicaProducto";

const InventarioCiegoHook = () => {
    let navigate = useNavigate();

    const [agencuasUsuarios, setAgencuasUsuarios] = useState([]);
    const [seleccionarAgencia, setSeleccionarAgencia] = useState("")
    const [objectAgencia, setObjectAgencia] = useState([])
    const [selectNameAgencia, setSelectNameAgencia] = useState("")
    const [idAgencySelect, setIdAgencySelect] = useState("")
    const [userLogin, setUserLogin] = useState({});
    const [codigoProducto, setCodigoProducto] = useState("")
    const [producto, setProducto] = useState(productoEncerrado)
    const [cantidad, setCantidad] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [motor, setMotor] = useState("")
    const [chasis, setChasis] = useState("")
    const [color, setColor] = useState("")
    const [observacion, setObservacion] = useState("")
    const [llaves, setllaves] = useState(0)
    const [manual, setmanual] = useState(0)
    const [baterias, setbaterias] = useState(0)
    const [herramientas, setherramientas] = useState(0)
    const [retrovisores, setretrovisores] = useState(0)
    const [apoyaPies, setapoyaPies] = useState(0)
    const [portaPlacas, setportaPlacas] = useState(0)
    const [portaMaleteros, setportaMaleteros] = useState(0)
    const [aguaBateria, setaguaBateria] = useState(0)
    const [isConsignado, setIsConsignado] = useState(0)
    const [counterComponent, setCounterComponent] = useState(new Date().getTime())
    const [organizations, setOrganizations] = useState([]);
    const [codProducto, setCodProducto] = useState("");
    const [typeDamageMotocycle, setTypeDamageMotocycle] = useState(0)
    const [typeSelectionMotoCount, setTypeSelectionMotoCount] = useState(0)
    const [blockSectionKits, setBlockSectionKits] = useState(false)
    const [selectedKitMoto, setSelectedKitMoto] = useState(0)
    const [cantidadBuenEstado, setCantidadBuenEstado] = useState(0)
    const [cantidadMalEstado, setCantidadMalEstado] = useState(0)
    const [existProduct, setExistProduct] = useState(false)
    const [isKit, setIsKit] = useState(false)
    const [observationSelection, setObservationSelection] = useState(0)
    const [habiliatObsercacion, setHabilitarObservacion] = useState(true)
    const [obsActive, setObsActive] = useState(false)
    const [estadoKit, setEstadoKit] = useState("")
    const [observacionesKit, setObservacionesKit] = useState("")
    const [activarObservacionesKit, setActivarObservacionesKit] = useState(true)
    const [openFinishAuditory, setOpenFinishAuditory] = useState(false)
    const [esSobrante, setEsSobrante] = useState(false);
    const [ubicacion, setUbicacion] = useState({
        rac: "",
        columna: "",
        nivel: "",
        posicion: ""
    });
    const OnInitPage = async () => {
        const user = Decrypt_User();
        if (user === null) {
            return navigate('/');
        }
        setUserLogin(user)

        try {
            const respuesta = await GET_AGENCIES_BY_EMPLOYEE(user.User)
            setAgencuasUsuarios([{idagencia: '0', nombreagencia: "-- SELECT --"}, ...respuesta])
        } catch (error) {
        }
    }

    useEffect(() => {
        OnInitPage();
        setCantidad(cantidadBuenEstado + cantidadMalEstado)
    }, [producto, cantidadBuenEstado, cantidadMalEstado]);

    const handleKitStateChange = (value) => {
        setEstadoKit(value)
        if (value === "INCOMPLETO") {
            setObservacionesKit("")
            return setActivarObservacionesKit(false)
        }
        return setActivarObservacionesKit(true)
    }

    const CheckIsKit = (e, checked) => {
        setIsKit(checked);

        if (checked) {
            setEstadoKit(0);
        } else {
            setEstadoKit(0); 
        }
    };

    const seleccionarAgenciaYJefeAgencia = (e) => {
        setSeleccionarAgencia(e.target.value)
        const resultado = agencuasUsuarios.find(item => item.idagencia === e.target.value);
        setObjectAgencia(resultado)
        setSelectNameAgencia(resultado.nombreagencia)
        setIdAgencySelect(resultado.idagencia)
    }

    const checkProductExist = () => {
        setExistProduct(prev => !prev)
        setCodigoProducto("")
        setDescripcion("")
    }

    const haveAllKitMoto = (havekit) => {
        setBlockSectionKits(havekit)
        setllaves(havekit ? 1 : 0)
        setmanual(havekit ? 1 : 0)
        setbaterias(havekit ? 1 : 0)
        setherramientas(havekit ? 1 : 0)
        setretrovisores(havekit ? 1 : 0)
    }

    const resetComponentes = () => {
        setllaves(0)
        setmanual(0)
        setbaterias(0)
        setherramientas(0)
        setretrovisores(0)
        setapoyaPies(0)
        setportaPlacas(0)
        setportaMaleteros(0)
        setaguaBateria(0)
    }

    const getCountGoodOrBatStatus = (value) => {
        if (value !== 2) {
            setTypeDamageMotocycle(0)
            setObservacion("")
            setObservationSelection(0)
        }
        if (value !== undefined) {
            setTypeSelectionMotoCount(value)
        }
    }


    const SelectObservation = (value) => {
        setHabilitarObservacion(value !== 5);
        setObservationSelection(value)
        if (value === 5)
            return setObservacion(prev => prev.replace(prev, ""))
        setObservacion(prev => prev.replace(prev, value))
    }

    const estiloLaberBuenMalEstado = (estado) => {
        return {
            "& label": { color: estado, fontWeight: "bold" }, // Color del label
            "& label.Mui-focused": { color: estado }, // Color cuando está enfocado
            "& .MuiInput-underline:before": { borderBottomColor: estado }, // Línea antes de interactuar
            "& .MuiInput-underline:after": { borderBottomColor: estado }, // Línea después de interactuar
        }
    }


    const errores = [
        { cond: seleccionarAgencia?.trim() === "", msg: "No ha seleccionado una agencia para poder grabar." },
        { cond: cantidad === 0, msg: "La cantidad no puede ser cero." },
        { cond: existProduct !== false && (descripcion.trim() === ""), msg: "Los campos descripción y código producto deben ser llenados cuando el producto no existe." },
        { cond: existProduct === true && codProducto === 0, msg: "No existe ningún producto seleccionado." },
        { cond: isKit === true && estadoKit === 0, msg: "No ha seleccionado el estado del kit." },
        { cond: isKit === true && estadoKit === "INCOMPLETO" && observacionesKit.trim() === "", msg: "El KIT está incompleto, la observación debe ser llenada." },
        { cond: observationSelection === 5 && observacion.trim() === "", msg: "Seleccionó OTROS en OBSERVACIONES, la observación es obligatoria." },
        {
            cond: ubicacion.rac.trim().length === 0 || ubicacion.rac.trim() === "0",
            msg: "Debe ingresar un <strong>RAC</strong> válido."
        },
        {
            cond: ubicacion.columna.trim().length === 0 || ubicacion.columna.trim() === "0",
            msg: "Debe ingresar una <strong>COLUMNA</strong> válida."
        },
        {
            cond: ubicacion.nivel.trim().length === 0 || ubicacion.nivel.trim() === "0",
            msg: "Debe ingresar un <strong>NIVEL</strong> válido."
        },
        {
            cond: ubicacion.posicion.trim().length === 0 || ubicacion.posicion.trim() === "0",
            msg: "Debe ingresar una <strong>POSICION</strong> válida."
        }
    ];


    const grabarItem = async () => {
        const error = errores.find(e => e.cond);
        if (!existProduct && !codProducto) {
            const configAlert = {
                title: "ERROR",
                message: "Debe Seleccionar un producto",
                type: 'error',
                callBackFunction: false,
            };
            showAlert(configAlert);
            return;
        }
        if (error) {
            respuestaAlert("ERROR", error.msg, "error");
            return;
        }
        try {
            const tomaFisicaProducto = new TomaFisicaProducto(
                !existProduct ? codProducto : codigoProducto,
                descripcion.replace("'", ""),
                String(cantidadBuenEstado ?? "0"),
                String(cantidadMalEstado ?? "0"),
                String(motor),
                String(chasis),
                String(llaves ?? "0"),
                String(manual ?? "0"),
                String(baterias ?? "0"),
                String(herramientas ?? "0"),
                String(retrovisores ?? "0"),
                String(apoyaPies ?? "0"),
                String(portaPlacas ?? "0"),
                String(portaMaleteros ?? "0"),
                String(aguaBateria ?? "0"),
                `Observación: ${observacion} ; Observación KIT: ${observacionesKit.trim() || "SIN OBSERVACIONES"}`,
                "0",
                String(parseInt(cantidad)),
                String(color),
                "0",
                String(generarCodigo()),
                String(userLogin.User),
                String(seleccionarAgencia),
                "SIN LOCALIZACION",
                `Estado del KIT: ${estadoKit}`,
                `${ubicacion.rac}`,
                `${ubicacion.columna}`,
                `${ubicacion.nivel}`,
                `${ubicacion.posicion}`
            );


            const resp = await SAVE_PRODUCT_INVENTORY(tomaFisicaProducto);
            console.log(resp)
            setIsKit(false)
            setEsSobrante(false);
            setExistProduct(false);
            InicializarDatos();
            respuestaAlert("CORRECTO", resp, "success");
        } catch (error) {
            respuestaAlert("Error al guardar el producto.", error.msg, "error");
        }
    }


    const InicializarDatos = () => {
        setCantidad(0);
        setDescripcion("");
        setMotor("");
        setChasis("");
        setColor("");
        setObservacion("");
        resetComponentes();
        setOrganizations([]);
        setEstadoKit(0);
        setObservationSelection(0);
        setCodigoProducto("")
        setSelectedKitMoto(null);
        setCantidadBuenEstado(0);
        setCantidadMalEstado(0);
        setTypeDamageMotocycle(0);
        getCountGoodOrBatStatus(0);
        setCounterComponent(new Date().getTime())
        setObservacionesKit("")
        setObsActive(false)
        setIsKit(false)
        CheckIsKit()
        setCodProducto("")
        setUbicacion({
        rac: "",
        columna: "",
        nivel: "",
        posicion: ""
        })
    }

    function generarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
        const longitud = 36;
        let codigoGenerado = '';

        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            codigoGenerado += caracteres.charAt(indiceAleatorio);
        }
        return codigoGenerado;
    }

    const setCountProduct = (e, setValor) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        if (inputValue === "") {
            setValor(0)
        } else {
            setValor(parseInt(inputValue));
        }
    }

    const confirmInventoryFinish = () => {
        finishAutory()
    }

    const cancelConfirmInventoryFinish = () => {
        setOpenFinishAuditory(false)
    }

    const finishAutory = async () => {
        console.log(idAgencySelect)
        if (idAgencySelect.trim() === "" || idAgencySelect === "0") {
            respuestaAlert("ERROR", "<strong style='text-align: center;'>No seleccionó agencia</strong>", "error");
            return;
        }
        await FINISH_INVENTORY({
            agencia: idAgencySelect,
            usuario: userLogin.User
        });
        respuestaAlert("CORRECTO", "<strong style='text-align: center;'>Se cerro el inventario</strong>", "success");
    }

    const generarSobrante = (isChecked) => {
        setEsSobrante(isChecked);
        setCodigoProducto(isChecked ? `SOB-${generarNumeroAleatorio()}` : "");
    };

    function generarNumeroAleatorio() {
        return Math.floor(10000 + Math.random() * 90000);
    }


    const respuestaAlert = (titulo, mensaje, type) => {
        const configAlert = {
            title: titulo,
            message: mensaje,
            type: type,
            callBackFunction: false,
        };
        showAlert(configAlert);
    }

    useEffect(() => {
        if(!isKit){
            setObservacionesKit("");
            handleKitStateChange(0)
        }
    }, [isKit])
    
    return {
        // Agencia / usuario
        agencuasUsuarios,
        seleccionarAgencia,
        seleccionarAgenciaYJefeAgencia,
        objectAgencia,
        selectNameAgencia,
        idAgencySelect,
        userLogin,

        // Producto
        codigoProducto,
        setCodigoProducto,
        codProducto,
        setCodProducto,
        descripcion,
        setDescripcion,
        organizations,
        setOrganizations,
        counterComponent,

        // Cantidades
        cantidad,
        cantidadBuenEstado,
        setCantidadBuenEstado,
        cantidadMalEstado,
        setCantidadMalEstado,
        setCountProduct,

        // Producto no identificado / sobrante
        existProduct,
        checkProductExist,
        esSobrante,
        generarSobrante,

        // Observaciones
        observacion,
        setObservacion,
        observationSelection,
        SelectObservation,
        habiliatObsercacion,

        // Kit
        isKit,
        CheckIsKit,
        estadoKit,
        handleKitStateChange,
        observacionesKit,
        setObservacionesKit,
        activarObservacionesKit,

        // Ubicación
        ubicacion,
        setUbicacion,

        // Estilos
        estiloLaberBuenMalEstado,

        // Confirm dialog finalizar inventario
        openFinishAuditory,
        setOpenFinishAuditory,
        confirmInventoryFinish,
        cancelConfirmInventoryFinish,

        // Acciones
        grabarItem
    };
}

export default InventarioCiegoHook;