import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './css/DatosEmpleado.css'
import {OBTENER_INFO_CLIENTE_OPEN_BRAVO} from '../../services/AnticiposMatricula'
import { ToastContainer, toast } from 'react-toastify';


const DatosClienteAnticipo = (props) => {
    const {cliente, setCliente} = props
    const [identificacion, setIdentificacion] = React.useState("")
    // const [cliente, setCliente] = React.useState({
    //     email:'',
    //     nombres:'',
    //     cedula:'',
    //     telefono:''
    // })

    const Actualizar_Calificacion = (e) =>{
        e.preventDefault()
        if (identificacion.trim() === ""){
            return toast.warn("PORFAVOR INGRESE UN NUMERO DE IDENTIFICADOR VALIDO", { position: toast.POSITION.TOP_CENTER })
        }
        const functionThatReturnPromise = async () => {
            try {
              const result = await OBTENER_INFO_CLIENTE_OPEN_BRAVO(identificacion);
              if (result.length !== 0) {
                    setCliente(result[0])
                } else {
                    throw "NO SE ENCONTRO EL CLIENTE";
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
                  return "BUSCANDO ..."
                },
                position: toast.POSITION.TOP_CENTER
              },
              success: {
                render({ data }) {
                  return "MOSTRANDO LOS DATOS DEL CLIENTE"
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
    return (
        <div>
            <ToastContainer/>
            <Grid container spacing={4} style={{ color: '#2196f3' }}>
                <Grid item sx={12} md={4} sm={12}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Numero de documento
                    </p>
                    <div style={{ display: 'flex' }}>
                        <TextField id="standard-basic"
                            label=""
                            variant="standard"
                            fullWidth
                            value={identificacion}
                            onChange={e => setIdentificacion(e.target.value)}
                        />
                        <Button variant="text" 
                                startDecorator={<SearchIcon/>} 
                                startIcon={<SearchIcon/>}
                                onClick={Actualizar_Calificacion}>BUSCAR</Button>
                    </div>
                </Grid>
                <Grid item sx={12} md={8} sm={6}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Nombres Y Apellido
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                        value={cliente.nombres}
                    />
                </Grid>
              
                <Grid item sx={12} md={4} sm={6}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Celular
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                        value={cliente.telefono}
                    />
                </Grid>
                <Grid item sx={12} md={4} sm={6}>
                    <p style={{
                        paddingBottom: 0,
                        marginBottom: 0
                    }}>
                        Correo Electronico
                    </p>
                    <TextField id="standard-basic"
                        label=""
                        variant="standard"
                        fullWidth
                        className='TexfieldEmpleado'
                        value={cliente.email}
                    />
                </Grid>
                <Grid item sx={12} md={4} sm={4}>
                </Grid>
            </Grid>
        </div>
    )
}

export default DatosClienteAnticipo