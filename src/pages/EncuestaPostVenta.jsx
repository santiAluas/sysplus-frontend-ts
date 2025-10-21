import React from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Button, Divider, FormControlLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DatosClienteMoto from '../components/EncuestraPostVentaComp/DatosClienteMoto';
import Calificacion from '../components/EncuestraPostVentaComp/Calificacion';
import CalificacionComp from '../components/EncuestraPostVentaComp/CalificacionComp';
import { useNavigate } from 'react-router-dom';
import { SEARCH_CLIENTE, GRABAR_ENCUESTA } from '../services/Service_Post_Venta';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
const estiloParrafo = {
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: 0,
  marginBottom: 0,
}


const EncuestaPostVenta = () => {
  const [cedula, setCedula] = React.useState("")
  const encerradoEncuesta = {
    documentno: "",
    nombre: "",
    apellido: "",
    cedula: "",
    celular: "",
    direccion: "",
    marca: "",
    modelo: "",
    fecha: dayjs().format('DD-MM-YYYY'),
    fechaentrega: dayjs().format('DD-MM-YYYY'),
    email:"",
    motc_clt_ciudad:"",
    numerochasis:"",
    motc_des_producto:"",
    numeromotor:""
  }

  const [ordenTrabajo, setOrdenTrabajo] = React.useState(encerradoEncuesta)
  let navigate = useNavigate();
  const [encuesta, setEncuesta] = React.useState({
    documentno: "",
    ciudad:"",
    cedula: cedula,
    fechaEntregaMoto: "",
    fechaRegistro: "",
    recomendacionSTM: -1,
    problemaResuelto: "",
    amabilidadTecnico: -1,
    explicacionTecnico: -1,
    tiempoReparacion: -1,
    email:"",
    motc_clt_ciudad:"",
    modelo:"",
    marca:"",
    numerochasis:"",
    motc_des_producto:"",
    nombre:"",
    apellido:"",
    numeromotor:"",
    celular:""
  })


  const enviarRespuestas = () => {
    encuesta.cedula = cedula
  }

  const buscarMantenimiento = async (e) => {
    e.preventDefault()
    const functionThatReturnPromise = async () => {
      try {
        const respuesta = await SEARCH_CLIENTE(cedula);
        if (respuesta.length !== 0)
          setOrdenTrabajo(respuesta[0])
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise,"VIZUALIZANDO DATOS DEL CLIENTE")
  }

  

  const grabarEncuesta = (e) =>{
    e.preventDefault()
    encuesta.cedula = cedula
    encuesta.fechaEntregaMoto= ordenTrabajo.fechaentrega
    encuesta.fechaRegistro= ordenTrabajo.fecha
    encuesta.ciudad= (ordenTrabajo.motc_clt_ciudad ?? "") === "" ? (ordenTrabajo.direccion?? "") : (ordenTrabajo.motc_clt_ciudad?? "") 
    encuesta.motc_des_producto= ordenTrabajo.motc_des_producto
    encuesta.email= ordenTrabajo.email
    encuesta.modelo= ordenTrabajo.modelo ?? ""
    encuesta.marca= ordenTrabajo.marca ?? ""
    encuesta.numerochasis= ordenTrabajo.numerochasis?? ""
    encuesta.nombre= ordenTrabajo.nombre?? ""
    encuesta.apellido= ordenTrabajo.apellido?? ""
    encuesta.numeromotor= ordenTrabajo.numeromotor?? ""
    encuesta.celular= ordenTrabajo.celular?? ""
    encuesta.documentno= ordenTrabajo.documentno?? ""

    let msj = verificarCamposLLenos()
    if ( msj!== ""){
      return toast.warn(msj, { position: toast.POSITION.TOP_CENTER })
    }     
    const functionThatReturnPromise = async () => {
      try {
        const respuesta = await GRABAR_ENCUESTA(encuesta);
        if (respuesta.length !== 0){
          setOrdenTrabajo(respuesta[0])
          setOrdenTrabajo(encerradoEncuesta)
          navigate(`/GRACIAS`)
        }
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise,"LA ENCUESTA SE GRABO CORRECTAMENTE")
  }

  const verificarCamposLLenos = () =>{
    if (ordenTrabajo.cedula === "")
        return "BUSQUE UN CLIENTE"
    if (encuesta.recomendacionSTM === -1)
        return "PORFAVOR CALIFIQUE '¿Qué tan probable es que recomiende el Servicio Técnico de Mastermoto?'"
    if (encuesta.amabilidadTecnico === -1)
        return "PORFAVOR CALIFIQUE 'Amabilidad del técnico'"
    if (encuesta.explicacionTecnico === -1)
        return "PORFAVOR CALIFIQUELE 'Explicación del Técnico'"
    if (encuesta.tiempoReparacion === -1)
        return "CONTESTE PORFAVOR LA PREGUNTA 'Tiempo de la reparación 1 al 5. Siendo 1 muy lento y 5 muy ágil.' "
    if (encuesta.problemaResuelto === "")
        return "CONTESTE LA PREGUNTA '¿El problema por el cual llegó su motocicleta fue resuelto?'"
    return ""
  }


  const handleCalificacionChange = (campo, nuevaCalificacion) => {
    setEncuesta((prevEncuesta) => ({
      ...prevEncuesta,
      [campo]: nuevaCalificacion
    }));
  };


  const manejoMensajes = (funcion,mensaje) =>{
    toast.promise(
      funcion,
      {
        pending: {
          render({ data }) {
            return "CONSULTANDO ..."
          },
          position: toast.POSITION.TOP_CENTER
        },
        success: {
          render({ data }) {
            return mensaje
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

  return (
    <>
      <ToastContainer />
      <NavbarMasterMoto titulo="ENCUESTA POST-VENTA" />
      <Divider textAlign="right"></Divider>
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
        }}>!YA ERES UN MASTER¡</p>
        <p style={estiloParrafo}> Gracias por ser parte de Yellow Team &#128993;</p>
        <p style={estiloParrafo}>  &#128077;¡Tu opinión es importante para nosotros! </p>
        <p style={estiloParrafo}>  Por favor califica el servicio recibido en nuestros talleres. </p>
      </Paper>
      <Divider textAlign="right"></Divider>
      <br></br>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent="center" alignItems="center">
        <Paper elevation={3}
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#e2e2e2',
            color: 'black',
            width: '90%',
            textAlign: 'center'
          }}>
          <Grid container spacing={4} style={{ color: 'black' }}>
            <Grid item sx={12} md={12} sm={12}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent="center" alignItems="center">
                <p style={{
                  paddingBottom: 0,
                  marginBottom: 0,
                }}>
                  Número de Cedula
                </p>

                <TextField id="standard-basic"
                  label=""
                  variant="standard"
                  onChange={(e) => setCedula(e.target.value)}

                />
                <SearchIcon />
                <Button onClick={(e) => buscarMantenimiento(e)}> consultar</Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Stack>

      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <DatosClienteMoto ordenTrabajo={ordenTrabajo} />
      </Stack>
      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Calificacion
          setCalificacion={(calificacion) => handleCalificacionChange("recomendacionSTM", calificacion)} />
      </Stack>
      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Paper
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#e2e2e2',
            color: 'black',
            width: "90%",
          }}>
          <Typography variant="h6" align='center'>¿El problema por el cual llegó su motocicleta fue resuelto? </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            align='center'
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
          >
            <FormControlLabel value="SI" onChange={(e) => handleCalificacionChange("problemaResuelto", "SI")} control={<Radio />} label="SI" />
            <FormControlLabel value="NO" onChange={(e) => handleCalificacionChange("problemaResuelto", "NO")} control={<Radio />} label="NO" />
          </RadioGroup>
          <Typography style={{ fontSize: '16px' }} align='center'>Por favor, califique su experiencia con nuestro Servicio Técnico.   </Typography>
        </Paper>
      </Stack>
      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <CalificacionComp pregunta="Amabilidad del técnico"
          setCalificacion={(calificacion) => handleCalificacionChange("amabilidadTecnico", calificacion)}
          calificacion={encuesta.fechaEntregaMoto}></CalificacionComp>
      </Stack>
      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <CalificacionComp pregunta="Explicación del Técnico"
          setCalificacion={(calificacion) => handleCalificacionChange("explicacionTecnico", calificacion)}
          calificacion={encuesta.fechaEntregaMoto}></CalificacionComp>
      </Stack>
      <Divider textAlign="right"></Divider>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <CalificacionComp pregunta="Tiempo de reparación. Del 1 al 5, siendo 5 MUY AGIL y 1 MUY LENTO."
          setCalificacion={(calificacion) => handleCalificacionChange("tiempoReparacion", calificacion)}
          calificacion={encuesta.fechaEntregaMoto}
        ></CalificacionComp>
      </Stack>
      <br></br>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button onClick={grabarEncuesta} variant="contained" fullWidth size="large">ENVIAR ENCUESTA</Button>
      </Stack>
      <br></br>
    </>
  )
}

export default EncuestaPostVenta