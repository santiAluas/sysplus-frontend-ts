import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import NavbarMasterMoto from '../../components/NavbarMasterMoto';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import SearchBlobal from '../../components/SearchBlobal';
import TextField from '@mui/material/TextField';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { SEARCH_ANTICIPO_MATRICULACION, UPDATE_VALUE_ANTICIPO_MATRICULACION } from '../../services/Api_Matriculacion/ServicesWebMatriculacion'
const UpdateValueMatriculacion = () => {
    const anticipo = {
        id:"",
        codAnticipoAura: "",
        organizacion: "",
        apellidoUsuarioCobra: "",
        nombreCliente: "",
        valorTotalMatric: ""
    }
    const [codAnticipo, setCodigoAnticipo] = useState("")
    const [respAnticipo, setRespAnticipo] = useState(anticipo)
    const [newPriceMatricula, setNewPriceMatricula] = useState(0.0)

    const searchAnticipoMatriculacion = async () => {
        setRespAnticipo(anticipo)
        const respuesta = await SEARCH_ANTICIPO_MATRICULACION(codAnticipo);
        setRespAnticipo(respuesta[0])
    }

    const updateNewValue = async () => {
        if(respAnticipo.codAnticipoAura === ""){
            return toast.warn("NO HA SELECCIONADO UN ANTICIPO", { position: toast.POSITION.TOP_CENTER });
        }
        if(parseFloat(newPriceMatricula) === 0 || parseFloat(newPriceMatricula) === parseFloat(respAnticipo.valorTotalMatric)){
            return toast.warn("EL NUEVO VALOR NO PUEDE SER CERO O IGUAL AL ANTERIOR", { position: toast.POSITION.TOP_CENTER });
        }
        await UPDATE_VALUE_ANTICIPO_MATRICULACION(respAnticipo.id,newPriceMatricula); 
        setNewPriceMatricula(0.0)
        setRespAnticipo(anticipo)
        setCodigoAnticipo("")
    }

    const feacht_UPDATE = () =>{
        manejoMensajes(updateNewValue, "SE ACTUALIZO CORRECTAMENTE....")
    }

    const setValueMatriculacionMetod = (e) => {
        const inputValue = e.target.value;
        const filteredValue = inputValue.replace(/[^0-9.]/g, '');
        const parts = filteredValue.split('.');
        const isValid = parts.length <= 2 &&
            (parts.length === 1 ||
                (parts[0] !== '' && parts[1] !== '') ||
                (parts[0] !== '' && parts[1] === ''));
        if (isValid) {
            setNewPriceMatricula(filteredValue);
        } 
    };
    return (
        <>
            <ToastContainer />
            <NavbarMasterMoto titulo="CAMBIAR EL VALOR DE MATRICULACION DEL ANTICIPO" />
            <br />
            <Paper elevation={3}
                style={{
                    marginRight: 20,
                    marginLeft: 20,
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20
                }}>
                <Container>
                    Buscar Anticipo (ultimos digitos del anticipo)
                    <SearchBlobal parameterSearch={codAnticipo} setParameterSearch={setCodigoAnticipo} functionExecute={searchAnticipoMatriculacion} />
                </Container>
                <Container sx={{ marginTop: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item sx={6} lg={6}>
                            NOMBRE CLIENTE: <bold style={{ fontWeight: 'bold' }}>{respAnticipo.nombreCliente}</bold>
                        </Grid>
                        <Grid item sx={6} lg={6}>
                            CODIGO ANTICIPO: <bold style={{ fontWeight: 'bold' }}>{respAnticipo.codAnticipoAura}</bold>
                        </Grid>
                        <Grid item sx={6} lg={6}>
                            VALOR MATRICULACION: <bold style={{ fontWeight: 'bold' }}>{respAnticipo.valorTotalMatric}</bold>
                        </Grid>
                        <Grid item sx={6} lg={6}>
                            GESTOR MATRICULACION: <bold style={{ fontWeight: 'bold' }}>{respAnticipo.apellidoUsuarioCobra}</bold>
                        </Grid>
                        <Grid item sx={6} lg={6}>
                            AGENCIA: <bold style={{ fontWeight: 'bold' }}>{respAnticipo.organizacion}</bold>
                        </Grid>
                    </Grid>
                </Container>
                <Container>

                    <Grid container spacing={2} mt={2}>
                        <Grid item sx={12} lg={8}>
                            <TextField id="filled-basic"
                                fullWidth
                                label="NUEVO VALOR TOTAL DE MATRICULA"
                                variant="filled"
                                value={newPriceMatricula}
                                onChange={(e) => setValueMatriculacionMetod(e)} />
                        </Grid>
                        <Grid item sx={12} lg={4}>
                            <Button fullWidth size="large" variant="contained" onClick={feacht_UPDATE}>CAMBIAR VALOR</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

export default UpdateValueMatriculacion