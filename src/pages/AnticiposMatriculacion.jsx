import React, { useEffect } from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Button, Divider, Paper, Stack } from '@mui/material'
import DatosEmpleadoAnticipo from '../components/AnticipoMatriculacionComp/DatosEmpleadoAnticipo'
import DatosClienteAnticipo from '../components/AnticipoMatriculacionComp/DatosClienteAnticipo'
import ValoresAnticipo from '../components/AnticipoMatriculacionComp/ValoresAnticipo'
import { Decrypt_User } from '../services/Storage_Service'
import { useNavigate } from 'react-router-dom';
import { OBTENER_VALORES_MATRICULA, DESCARGAR_DOCUMENTO_ANTICIPO } from '../services/AnticiposMatricula'
import { ToastContainer, toast } from 'react-toastify';
import { GRABAR_ANTICIPO } from '../services/AnticiposMatricula'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '../assets/images/Logo.png'
import DevolucionAnticipo from '../components/AnticipoMatriculacionComp/DevolucionAnticipo'
import DescargarActaDevolucion from '../components/AnticipoMatriculacionComp/DescargarActaDevolucion'


const AnticiposMatriculacion = () => {
  let navigate = useNavigate();
  const valorMatriculaVacio = {
    id: '',
    agencia: '',
    gestor: '',
    ciudad: '',
    totalmatriculacion: 0,
  }
  const clienteVacio = {
    email: '',
    nombres: '',
    cedula: '',
    telefono: ''
  }
  const [userLogin, setUserLogin] = React.useState({});
  const [codigoAnticipo, setCodigoAnticipo] = React.useState("");
  const [valorMatricula, setValorMatricula] = React.useState(valorMatriculaVacio)
  const [cliente, setCliente] = React.useState(clienteVacio)
  const [valoresMatriculacion, setValoresMatriculacion] = React.useState([]);
  const [seed, setSeed] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const OnInitPage = async () => {
    const user = Decrypt_User();
    const respuesta = await OBTENER_VALORES_MATRICULA()
    if (respuesta.length !== 0) {
      setValoresMatriculacion(respuesta)
    }
    if (user === null) {
      navigate('/')
      return;
    }
    setUserLogin(user)

  }

  function generarCodigoAleatorio(longitud) {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
  }

  function validarCorreoElectronico(correo) {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegular.test(correo);
  }

  function validarTelefonoEcuador(telefono) {
    const regex = /^(593|0|\+593)?[1-9]\d{8}$/;
    return regex.test(telefono);
  }


  const grabar_Anticipo_Aura = (e) => {
    e.preventDefault()
    let message = `Se ha detectado que la informacion del cliente es incorrecto: <br/> &nbsp;&nbsp; • [TIPOERROR] <br/> Editar la informacion desde OPENBRAVO para poder continuar.`;
    if (cliente.cedula.trim() === "") {
      return toast.warn("NO HA SELECCIONADO EL CLIENTE AUN", { position: toast.POSITION.TOP_CENTER })
    }
    // if (!validarCorreoElectronico(cliente.email)){
    //   message = message.replace("[TIPOERROR]","CORREO")
    //   return toast.warn(<div dangerouslySetInnerHTML={{ __html: message }}></div>, { position: toast.POSITION.TOP_CENTER })
    // }

    if (cliente.nombres.split(" ").length < 3 && cliente.cedula == 10) {
      message = message.replace("[TIPOERROR]", "NOMBRE DEL CLIENTE")
      return toast.warn(<div dangerouslySetInnerHTML={{ __html: message }}></div>, { position: toast.POSITION.TOP_CENTER })
    }

    // if(!validarTelefonoEcuador(cliente.telefono)){
    //   message = message.replace("[TIPOERROR]","TELEFONO")
    //   return toast.warn(<div dangerouslySetInnerHTML={{ __html: message }}></div>, { position: toast.POSITION.TOP_CENTER })
    // }

    const nuevoAnticipo = {
      CodAura: generarCodigoAleatorio(12),
      organizacion: userLogin.OrganizationName,
      nombreUsuarioCobra: userLogin.Name,
      apellidoUsuarioCobra: userLogin.Name,
      tipoDocumento: "",
      numDocumento: cliente.cedula,
      nombreCliente: cliente.nombres,
      apellidoCliente: cliente.nombres,
      celularCliente: cliente.telefono,
      email: cliente.email ?? "",
      numFactura: "",
      gestMatricula: valorMatricula.gestor,
      orgGestMatricula: "",
      valorTotalMatric: valorMatricula.totalmatriculacion,
      placas: 0,
      impMunicipal: 0,
      impProvincial: 0,
      rodajeMunicipal: 0,
      rodajeProvincial: 0,
      revisionVehicular: 0,
      stiker: 0,
      certNoadeudar: 0,
      pagosExtraOrdi: 0,
      adicioValorFact: 0,
      gestVarios: 0,
      ramv: "",
      ciudadMatriculacion: valorMatricula.ciudad
    }
    const functionThatReturnPromise = async () => {

      try {
        const result = await GRABAR_ANTICIPO(nuevoAnticipo);
        setCodigoAnticipo(result.COD_COMPROBANTE)
      } catch (error) {
        throw error;
      }
    };
    toast.promise(
      functionThatReturnPromise,
      {
        pending: {
          render({ data }) {
            return "REGISTRANDO ..."
          },
          position: toast.POSITION.TOP_CENTER
        },
        success: {
          render({ data }) {
            setOpen(true)
            return "SE REGISTRO CORRECTAMENTE"
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

  const descargarDocumentoAnticipo = (e) => {
    e.preventDefault()
    const functionThatReturnPromise = async () => {
      try {
        await DESCARGAR_DOCUMENTO_ANTICIPO(codigoAnticipo, "NOTALL");
      } catch (error) {
        throw error;
      }
    };
    toast.promise(
      functionThatReturnPromise,
      {
        pending: {
          render({ data }) {
            return "DESCARGANDO ..."
          },
          position: toast.POSITION.TOP_CENTER
        },
        success: {
          render({ data }) {
            setOpen(false)
            setSeed(Math.random());
            setCliente(clienteVacio)
            return "SE DESCARGO CORRECTAMENTE"
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    OnInitPage()
  }, []);

  const modalDocumentoAnticipo = () => {
    return (<div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
            <img src={Logo}
              width={120}
              height={80}
              alt='logo de la empresa master moto'></img>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            CODIGO ANTICIPO: {codigoAnticipo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained"
              fullWidth
              onClick={(e) => descargarDocumentoAnticipo(e)}
            >DESCARGAR COMPROBANTE</Button>
          </Typography>
        </Box>
      </Modal>
    </div>)
  }

  return (
    <div>
      <ToastContainer />
      <NavbarMasterMoto titulo="ANTICIPO MATRICULACION" />
      <br></br>
      <Paper elevation={3}
        style={{
          marginRight: 20,
          marginLeft: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}>
        <Stack direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}>
          <Typography variant="h5"
            gutterBottom
            align='left'
            fontWeight="bold"
            color='#D9BD30'
            style={{
              textShadow: '2px 1px 33px rgba(0, 0, 0, 0.5)'
            }}>
            SOLICITAR DEVOLUCION
          </Typography>
          <DevolucionAnticipo />
          <DescargarActaDevolucion/>
        </Stack>
      </Paper>
      <br></br>
      <Paper elevation={3}
        style={{
          marginRight: 20,
          marginLeft: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}>
        <DatosEmpleadoAnticipo datosEmpleado={userLogin} />
        <br />
        <Divider orientation="horizontal" variant="middle" />
        <br />
        <DatosClienteAnticipo setCliente={setCliente} cliente={cliente} />
        <br />
        <Divider orientation="horizontal" variant="middle" />
        <br />
        <ValoresAnticipo key={seed} usuario={userLogin.User} valorMatricula={valorMatricula} setValorMatricula={setValorMatricula} valoresMatriculacion={valoresMatriculacion} valorMatriculaActual={userLogin ?? userLogin.OrganizationName.split('-')[2]} />
        <br />
        <Button variant="contained"
                fullWidth
                onClick={(e) => grabar_Anticipo_Aura(e)}
        >GENERAR</Button>
        {modalDocumentoAnticipo()}
      </Paper>
    </div>
  )
}

export default AnticiposMatriculacion