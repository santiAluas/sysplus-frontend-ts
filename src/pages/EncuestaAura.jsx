
import React, { useEffect } from 'react'
import Logo from '../assets/images/Logo.png'
import Box from '@mui/material/Box';
import { ACTUALIZAR_CALIFICACION } from '../services/Aura_Api'
import { ToastContainer, toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import './css/AuraPage.css'
import Typography from '@mui/material/Typography';
import { Rating } from 'react-simple-star-rating'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useSearchParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';

const EncuestaAura = (props) => {
    let navigate = useNavigate();
    const {codDocumento} = props;
    const [botonActivado, setBotonActivaro] = React.useState(true);
    const [rating, setRating] =  React.useState(0)
    const [statusRanking, setStatusRanking] =  React.useState(0)
    const [selectedIndex, setSelectedIndex] = React.useState(7);
    const [otrosMedios, setOtrosMedios] = React.useState("");
    const [params, setParams] = useSearchParams();
    const codigoDocumento = codDocumento === undefined ? params.get('codigoDocumento') : codDocumento;
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    const handleRating = (rate) => {
        setRating(rate)
        setStatusRanking(rate)
      }

       const onPointerLeave = () =>  ""
       const onPointerMove = (value, index) => setStatusRanking(value)
    

    const Actualizar_Calificacion = (e) =>{
        e.preventDefault()
        if (selectedIndex === 7){
            return toast.warn("PORFAVOR ELIGA UN MOTIVO DE LA CALIFICACION", { position: toast.POSITION.TOP_CENTER })
        }
        if (selectedIndex === 4 && otrosMedios.trim() ===""){
            return toast.warn("PORFAVOR LLENE SU MOTIVO", { position: toast.POSITION.TOP_CENTER })
        }
        let razon = "";
        switch (selectedIndex) {
            case 0:
                razon="ASESORAMIENTO";
                break;
            case 1:
                razon="PROCESO DE CREDITO";
                break;
            case 2:
                razon="TIEMPO DE ENTREGA DE MOTOCICLETA";
                break;
            case 3:
                razon="MOMENTO DE LA ENTREGA DE LA MOTOCICLETA";
                break;
            case 4:
                razon="OTROS";
                break;
        }
        const calificacion = {
            "numeroDocumento":codigoDocumento,
            "calificacion":rating.toString(),
            "razonCalificacion":razon,
            "razonOtrosCalificacion":otrosMedios
        }

        const functionThatReturnPromise = async () => {
            try {
              const result = await ACTUALIZAR_CALIFICACION(calificacion);
              navigate(`/GRACIAS`)
            } catch (error) {
              throw error;
            }
          };
          toast.promise(
            functionThatReturnPromise,
            {
              pending: {
                render({ data }) {
                  return "ACTUALIZANDO ..."
                },
                position: toast.POSITION.TOP_CENTER
              },
              success: {
                render({ data }) {
                    setBotonActivaro(false)
                  return "SE ACTUALIZO CORRECTAMENTE"
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
    

    const estiloParrafo = {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 0,
        marginBottom: 0,
    }
    useEffect(() => {
        toast.success("POR FAVOR, ELIJA UN MOTIVO DE CALIFICACIÓN", { position: toast.POSITION.CENTER, icon: "🚀" });
      }, []);
    return (
        <div style={{ backgroundColor: '#696969', paddingBottom:15 }}>
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
                }}> BIENVENIDO - ENCUESTA MASTERMOTO</p>
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
                    {/* <p style={estiloParrafo}>A continuación, por favor ingresa tus datos en el formulario, y de esta manera puedas activar tu garantía.</p> */}
                </Paper>
                <br></br>
                <Paper elevation={3}>
                        <Typography variant="h6" 
                                    gutterBottom align='center'  >
                            Ayudamos llenando la siguiente encuesta.
                        </Typography>
                        <Typography fontSize={14} 
                                    textAlign={'justify'} 
                                    paddingLeft={2} 
                                    paddingRight={2} 
                                    gutterBottom 
                                    align='center' 
                                    fontWeight="bold"  >
                            1). En una escala del 0 al 10, en el cual 10 es SI RECOMENDARÍA Y 0 NO RECOMENDARÍA ¿Qué tan probable es que recomiendes a un amigo o familiar, comprar en Mastermoto?.
                        </Typography>
                        <div style={{display:'flex', 
                                     justifyContent:'center', 
                                     alignItems:'center', 
                                     paddingBottom:12, 
                                     paddingTop:12}}>
                            <Box component="span" 
                                 sx={{ p: 2, border: '2px dashed grey' }}>
                                <Button>CALIFICACION: {statusRanking}</Button>
                            </Box>
                        </div>
                        <div style={{display:'flex', 
                                     justifyContent:'center', 
                                     alignItems:'center'}}>
                            <Rating
                                onClick={handleRating}
                                iconsCount={10}
                                size={35}
                                // onPointerEnter={onPointerEnter}
                                onPointerLeave={onPointerLeave}
                                onPointerMove={onPointerMove}
                            />
                        </div>
                        <br></br>
                        <Divider variant="middle" />
                        <br></br>
                        <Typography fontSize={14} 
                                    textAlign={'justify'} 
                                    paddingLeft={2} 
                                    paddingRight={2} 
                                    gutterBottom 
                                    align='center' 
                                    fontWeight="bold"  >
                            2). Gracias por tu calificación, ¿nos podrías indicar por qué tu calificación fue de {statusRanking}?
                        </Typography>

                        <div style={{display:'flex', 
                                    justifyContent:'center', 
                                    alignItems:'center'}}>
                            <List component="nav" 
                                  aria-label="main mailbox folders">
                                <ListItemButton selected={selectedIndex === 0}
                                                onClick={(event) => handleListItemClick(event, 0)}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={selectedIndex === 0}
                                        />
                                    <ListItemText primary="Asesoramiento" />
                                </ListItemButton>
                                <ListItemButton
                                                selected={selectedIndex === 1}
                                                onClick={(event) => handleListItemClick(event, 1)}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={selectedIndex === 1}
                                        />
                                    <ListItemText primary="Proceso de Credito" />
                                </ListItemButton>
                                <ListItemButton
                                                selected={selectedIndex === 2}
                                                onClick={(event) => handleListItemClick(event, 2)}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={selectedIndex === 2}
                                        />
                                    <ListItemText primary="Tiempo de entrega de motocicleta" />
                                </ListItemButton>
                                <ListItemButton
                                                selected={selectedIndex === 3}
                                                onClick={(event) => handleListItemClick(event, 3)}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={selectedIndex === 3}
                                        />
                                    <ListItemText primary="Momento de la entrega de la motocicleta" />
                                </ListItemButton>
                                <ListItemButton
                                                selected={selectedIndex === 4}
                                                onClick={(event) => handleListItemClick(event, 4)}>
                                    <Checkbox
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<DoneAllIcon />}
                                        checked={selectedIndex === 4}
                                        />
                                    <ListItemText primary="Otros" />
                                </ListItemButton>
                            </List>
                    </div>
                    {selectedIndex === 4 ? (
                        <div style={{display:'flex', 
                                     justifyContent:'center', 
                                     alignItems:'center', 
                                     paddingLeft:2,
                                     paddingRight:2}}>
                                <TextField id="outlined-basic"
                                    label="Escriba su comentario"
                                    variant="filled"
                                    onChange={(e) => setOtrosMedios(e.target.value)}
                                    fullWidth />
                            </div>

                    ):" "}
                    <div style={{paddingLeft:12,
                            paddingRight:12, 
                            paddingBottom:20, 
                            paddingTop:20}}>
                        {botonActivado ? (
                                <Button variant="contained"
                                        onClick={(e) => Actualizar_Calificacion(e)}
                                        fullWidth >CONFIRMAR DATOS</Button>
                        ) :<Typography variant="h6" gutterBottom align='center'  >
                                SUS RESPUESTAS HAN SIDO GRABADAS EXITOSAMENTE. GRACIAS.
                            </Typography>}
                    </div>

                </Paper>
            </Box>
        </div>
    )
}

export default EncuestaAura

// import React from 'react'
// import { useSearchParams } from 'react-router-dom';

// const EncuestaAura = () => {

//     // Obtén los parámetros de búsqueda
//   const [params, setParams] = useSearchParams();

//   // Accede a los valores de los parámetros
//   const codigoDocumento = params.get('codigoDocumento');

//   // Función para actualizar los parámetros de búsqueda
  

//   return (
//      <div>
//       <h1>Parámetros de Búsqueda</h1>
//       <p>Color: {codigoDocumento}</p>
//     </div>
//   )
// }

// export default EncuestaAura