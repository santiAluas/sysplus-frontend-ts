import {
  Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup,
  Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import precaucionfondo from '../../assets/images/precaucionfondo.jpg'
import { ToastContainer, toast } from 'react-toastify';
import {
  GET_AGENCIES_BY_EMPLOYEE,
  SEARCH_PRODUCTO_INVENTORY,
  SAVE_PRODUCT_INVENTORY,
  FINISH_INVENTORY
} from '../../services/Api_Inventario/Api_TomaFisicaInventario.js' //services/Api_Inventario/Api_TomaFisicaInventario.js'
import { TomaFisicaProducto } from '../../components/TomaInventarioFisicoComp/class/TomaFisicaProducto.js';
import DescripcionItem from '../../components/AuditoriaStock/DescripcionItem.jsx';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { Decrypt_User } from '../../services/Storage_Service'
import { useNavigate } from 'react-router-dom';
import { productoEncerrado } from './ObjetosInventario.js'
import InformationMoto from './components/InformationMoto.jsx';
import KitMotoinformacion from './components/KitMotoinformacion.jsx';
import CabeceraInventario from './components/CabeceraInventario.jsx';
import ConfirmDialog from '../../components/TomaInventarioFisicoComp/ConfirmDialog.jsx';
import { showAlert } from '@/utils/modalAlerts.js';
const InventarioCiego = () => {
  let navigate = useNavigate();

  const [agencuasUsuarios, setAgencuasUsuarios] = useState([]);
  const [seleccionarAgencia, setSeleccionarAgencia] = useState("")
  const [objectAgencia, setObjectAgencia] = useState([])
  const [selectNameAgencia, setSelectNameAgencia] = useState("")
  const [idAgencySelect, setIdAgencySelect] = useState("")
  const [userLogin, setUserLogin] = React.useState({});
  const [codigoProducto, setCodigoProducto] = useState("")
  const [openSearchProduct, setOpenSearchProduct] = React.useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [producto, setProducto] = useState(productoEncerrado)
  const [locationItem, setLocationItem] = useState("")
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
  const [esSobrante, setEsSobrante] = useState(false)
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
    setEstadoKit(0); // o lo que corresponda cuando NO es kit
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
    { cond: seleccionarAgencia.trim() === "", msg: "No ha seleccionado una agencia para poder grabar." },
    { cond: cantidad === 0, msg: "La cantidad no puede ser cero." },
    { cond: existProduct !== false && (descripcion.trim() === "" ), msg: "Los campos descripción y código producto deben ser llenados cuando el producto no existe." },
    { cond: existProduct === true && codProducto === 0, msg: "No existe ningún producto seleccionado." },
    { cond: isKit === true && estadoKit === 0, msg: "No ha seleccionado el estado del kit." },
    { cond: isKit === true && estadoKit === "INCOMPLETO" && observacionesKit.trim() === "", msg: "El KIT está incompleto, la observación debe ser llenada." },
    { cond: observationSelection === 5 && observacion.trim() === "", msg: "Seleccionó OTROS en OBSERVACIONES, la observación es obligatoria." },
    { cond: cantidadMalEstado > 0 && observacion.trim() === "", msg: "TIENE PRODUCTOS EN MAL ESTADO Y NO HA ESCRITO NINGUNA OBSERVACION" }

  ];


  const grabarItem = async () => {
    const error = errores.find(e => e.cond);
    if(!existProduct && !codProducto ){
        const configAlert = {
                            title: "ERROR",
                            message: "Debe Seleccionar un producto",
                            type: 'error',
                            callBackFunction: false,
                        };
        showAlert(configAlert);
        return ;
    }
    if (error) return toast.error(error.msg, { position: toast.POSITION.TOP_CENTER });
    try {
      const tomaFisicaProducto = new TomaFisicaProducto(
        !existProduct ? codProducto : codigoProducto,
        descripcion.replace("'",""),
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
        `Estado del KIT: ${estadoKit}`
      );


      await SAVE_PRODUCT_INVENTORY(tomaFisicaProducto);
      setIsKit(false)
      setEsSobrante(false);
      setExistProduct(false);
      InicializarDatos();
      manejoMensajes(() => Promise.resolve(), "SE GRABÓ CORRECTAMENTE");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error("Error al guardar el producto.", { position: toast.POSITION.TOP_CENTER });
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

  const generarSobrante = (isChecked) => {
    setEsSobrante(isChecked);
    setCodigoProducto(isChecked ? `SOB-${generarNumeroAleatorio()}` : "");
  };

  function generarNumeroAleatorio() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  return (
    <>
      <ToastContainer />
      <ConfirmDialog
        title={`DESEA FINALIZAR EL INVENTARIO DE LA AGENCIA ${selectNameAgencia}`}
        functionConfirm={confirmInventoryFinish}
        functionCancel={cancelConfirmInventoryFinish}
        setOpen={setOpenFinishAuditory}
        open={openFinishAuditory}
      />
      <Stack direction="row" justifyContent="center" alignItems="center" flexWrap='wrap'>
        <Paper
          elevation={3}
          style={{
            marginTop: 10,
            padding: '10px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0.8, 0.5), rgba(0, 0, 10, 0.5)), url(${precaucionfondo})`,
            backgroundSize: 'cover',
            color: 'white',
            width: '90%',
            textAlign: 'center',
          }}
        >
          <Divider style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
            ACCIONES ESPECIALES <p className='parpadeo-rojo'>(PRECAUCION)</p>
          </Divider>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Button
                className='parpadeo-rojo'
                size="large"
                fullWidth
                variant="contained"
                style={{ background: '#9ecfbc', fontWeight: 'bold' }}
                sx={{ boxShadow: 4 }}
                onClick={() => setOpenFinishAuditory(true)}
              >
                FINALIZAR INVENTARIO
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <CabeceraInventario
          seleccionarAgencia={seleccionarAgencia}
          seleccionarAgenciaYJefeAgencia={seleccionarAgenciaYJefeAgencia}
          agencuasUsuarios={agencuasUsuarios}
          userLogin={userLogin}
          objectAgencia={objectAgencia}
        />

        <Paper
          elevation={3}
          style={{
            marginTop: 10,
            padding: '10px',
            width: '90%',
            textAlign: 'center',
          }}
        >
          <Typography textAlign='center' id="modal-modal-title" variant="h6" component="h2">
            TOMA FISICA INVENTARIO CIEGO
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Divider>INFORMACION PRODUCTO</Divider>
            </Grid>
            <Grid item sm={6}></Grid>
            <Grid item sm={6}>
              <FormGroup>
                <FormControlLabel
                  required
                  onChange={checkProductExist}
                  control={<Checkbox checked={existProduct} />}
                  label="PRODUCTO NO IDENTIFICADO"
                />
              </FormGroup>
            </Grid>

            <Grid item sm={6}>
              {!existProduct ? (
                <DescripcionItem
                  key={counterComponent}
                  organizations={organizations}
                  setOrganizations={setOrganizations}
                  setCodProducto={setCodProducto}
                  setDescriptionProduct={setDescripcion}
                />
              ) : (
                <>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={esSobrante}
                        onChange={(e) => generarSobrante(e.target.checked)} />}
                      label="SOBRANTE"
                    />
                  </FormGroup>
                  <TextField
                    id="codProducto"
                    label="CODIGO PRODUCTO"
                    variant="outlined"
                    value={codigoProducto}
                    sx={{ display: esSobrante ? "none" : "block" }}
                    onChange={(e) => setCodigoProducto(e.target.value)}
                    fullWidth
                  />
                </>
              )}
            </Grid>

            <Grid item sm={6}>
              <Stack spacing={3} direction="row">
                <TextField
                  id="CANTIDAD_BUEN_ESTADO"
                  label="CANTIDAD BUEN ESTADO"
                  variant="standard"
                  value={cantidadBuenEstado}
                  onChange={(e) => setCountProduct(e, setCantidadBuenEstado)}
                  fullWidth
                  autoComplete="off"
                  inputProps={{
                    autoComplete: 'off',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                  sx={estiloLaberBuenMalEstado("#4CAF50")}
                />
                <TextField
                  id="CANTIDAD MAL ESTADO"
                  label="CANTIDAD MAL ESTADO"
                  variant="standard"
                  value={cantidadMalEstado}
                  onChange={(e) => setCountProduct(e, setCantidadMalEstado)}
                  fullWidth
                  sx={estiloLaberBuenMalEstado("#FF5733")}
                />
                <TextField
                  id="CANTIDAD TOTAL"
                  label="CANTIDAD"
                  variant="standard"
                  value={cantidad}
                  disabled={true}
                  fullWidth
                />
              </Stack>
            </Grid>

            {existProduct && (
              <Grid item sm={6}>
                <TextField
                  id="DESCRIPCION"
                  label="DESCRIPCION"
                  variant="outlined"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  fullWidth
                />
              </Grid>
            )}

            <Grid item sm={12} sx={{ display: "none" }}>
              <InformationMoto
                setMotor={setMotor}
                setChasis={setChasis}
                chasis={chasis}
                motor={motor}
                setColor={setColor}
                color={color}
                getCountGoodOrBatStatus={getCountGoodOrBatStatus}
                setTypeDamageMotocycle={setTypeDamageMotocycle}
                typeDamageMotocycle={typeDamageMotocycle}
                typeSelectionMotoCount={typeSelectionMotoCount}
              />
            </Grid>

            <Grid item sm={12} sx={{ display: "none" }}>
              <KitMotoinformacion
                setIsConsignado={setIsConsignado}
                setSelectedKitMoto={setSelectedKitMoto}
                setllaves={setllaves}
                baterias={baterias}
                llaves={llaves}
                setmanual={setmanual}
                selectedKitMoto={selectedKitMoto}
                manual={manual}
                setherramientas={setherramientas}
                herramientas={herramientas}
                setretrovisores={setretrovisores}
                retrovisores={retrovisores}
                setapoyaPies={setapoyaPies}
                apoyaPies={apoyaPies}
                setportaPlacas={setportaPlacas}
                portaPlacas={portaPlacas}
                setportaMaleteros={setportaMaleteros}
                portaMaleteros={portaMaleteros}
                setaguaBateria={setaguaBateria}
                aguaBateria={aguaBateria}
                haveAllKitMoto={haveAllKitMoto}
                blockSectionKits={blockSectionKits}
                setbaterias={setbaterias}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth disabled={!(cantidadMalEstado>0)}>
                <InputLabel id="observaciones-label">OBSERVACIONES</InputLabel>
                <Select
                  labelId="observaciones-label"
                  id="observaciones"
                  label="OBSERVACIONES"
                  fullWidth
                  value={observationSelection}
                  sx={{ width: '100%' }}
                  onChange={(e) => SelectObservation(e.target.value)}
                >
                  <MenuItem value={0}>-- ESTADO --</MenuItem>
                  <MenuItem value="OBSOLETO">OBSOLETO</MenuItem>
                  <MenuItem value="CADUCADO">CADUCADO</MenuItem>
                  <MenuItem value="USADO">USADO</MenuItem>
                  <MenuItem value="RAYADO">RAYADO</MenuItem>
                  <MenuItem value={5}>OTROS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}></Grid>

            <Grid item xs={6}>
              <FormGroup sx={{ textAlign: 'center', alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isKit}
                      onChange={CheckIsKit}
                    />
                  }
                  label="ES KIT ?"
                />
                {isKit && (
                  <FormControl fullWidth>
                    <InputLabel id="estado-kit-label">ESTADO DEL KIT</InputLabel>
                    <Select
                      labelId="estado-kit-label"
                      id="estado-kit"
                      label="ESTADO DEL KIT"
                      fullWidth
                      value={estadoKit}
                      sx={{ width: '100%' }}
                      onChange={(e) => handleKitStateChange(e.target.value)}
                    >
                      <MenuItem value={0}>-- ESTADO --</MenuItem>
                      <MenuItem value="COMPLETO">COMPLETO</MenuItem>
                      <MenuItem value="INCOMPLETO">INCOMPLETO</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </FormGroup>
            </Grid>

            <Grid item lg={6} sm={6}>
              <TextField
                fullWidth
                id="observacion-kit"
                label="ESCRIBIR OBSERVACION KIT..."
                placeholder="Escribir...."
                multiline
                disabled={activarObservacionesKit}
                rows={4}
                variant="standard"
                value={observacionesKit}
                onChange={(e) => setObservacionesKit(e.target.value)}
                sx={{ display: (activarObservacionesKit !== true ? "block" : "none") }}
              />
            </Grid>

            <Grid item sm={12}>
              <Divider>OBSERVACIONES</Divider>
            </Grid>

            <Grid item sm={12}>
              <TextField
                fullWidth
                id="observacion-general"
                label="ESCRIBIR OBSERVACION ..."
                placeholder="Escribir...."
                multiline
                disabled={habiliatObsercacion}
                rows={4}
                variant="standard"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </Grid>

            <Grid item sm={12}>
              <Button variant="contained" size='large' fullWidth onClick={grabarItem}>
                GRABAR ITEM
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </>
  );

}

export default InventarioCiego