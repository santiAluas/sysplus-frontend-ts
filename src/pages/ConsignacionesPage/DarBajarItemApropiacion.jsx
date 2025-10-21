

import React, { useState } from 'react'
import NavbarMasterMoto from '../../components/NavbarMasterMoto'
import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import SearchAgencia from '../../components/SearchAgencia'
import SearchBlobal from '../../components/SearchBlobal'
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { SEARCH_ITEM_DAR_BAJA, CANCELAR_ITEM_APROPIACION } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion'
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css";
import ImageUpload from '../../components/ImageUpload.jsx'
const DarBajarItemApropiacion = () => {
    const itemInit = {
        codigo: "",
        descripcion: "",
        color: "",
        chasis: "",
        motor: "",
        ramv: "",
        bodega: "",
        ubicacion: "",
        codigoAgenciaDestino: ""
    }
    const [item, setItem] = useState(itemInit)
    const [codigoAgencia, setCodigoAgencia] = useState("")
    const [motorOrChasis, setMotorOrChases] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [pdfFile, setPdfFile] = useState(null);

    const searchItem = async () => {
        try {

            const respuesta = await SEARCH_ITEM_DAR_BAJA(motorOrChasis);
            setItem(respuesta[0])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const updateBodega = () => {
        if(item.codigo === "")
            return toast.warn("NO HAY UN ITEM SELECCIONADO", { position: toast.POSITION.TOP_CENTER })
        manejoMensajes(updateBodegafuncion,"PROCESO COMPLETADO...")
        resetComponent()
    }

    const updateBodegafuncion = async () => {
        try {
            await CANCELAR_ITEM_APROPIACION(pdfFile, item.codigo, observaciones);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const resetComponent = () => {
        setItem(itemInit)
        setCodigoAgencia("")
        setMotorOrChases("")
    }


    const handleClick = () => {
        confirmAlert({
            title: "Confirmar acción",
            message: "¿Estás seguro de que deseas continuar?",
            buttons: [
                {
                    label: "Sí",
                    onClick: () => updateBodega()
                },
                {
                    label: "No",
                    // onClick: () => alert("Hiciste clic en No")
                }
            ]
        });
    };



    return (
        <>
            <NavbarMasterMoto titulo="DAR DE BAJA ITEM SYSPLUS" />
            <br />
            <ToastContainer />
            <Paper elevation={3}
                style={{
                    marginRight: 20,
                    marginLeft: 20,
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20,
                    position: 'relative',
                }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} lg={12}>
                        <SearchBlobal
                            parameterSearch={motorOrChasis}
                            setParameterSearch={setMotorOrChases}
                            functionExecute={searchItem}
                            title='Buscar (Motor o Chasis)' />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                    <Grid item spacing={2} sm={6} lg={6}>
                        <Typography>MODELO: {item.descripcion}</Typography>
                        <Typography>COLOR: {item.color}</Typography>
                        <Typography>BODEGA ORIGEN: {item.bodega}</Typography>
                    </Grid>
                    <Grid item spacing={2} sm={6} lg={6}>
                        <Typography>MOTOR: {item.motor}</Typography>
                        <Typography>CHASIS: {item.chasis}</Typography>
                        <Typography>BODEGA DESTINO: {item.ubicacion}</Typography>
                    </Grid>
                    {item.codigo === "" ? null : (
                        <Grid item sm={12} lg={12} spacing={2}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="OBSERVACIONES"
                                multiline
                                rows={4}
                                fullWidth
                                value={observaciones}
                                onChange={e => setObservaciones(e.target.value)}
                            />
                            <Divider  />
                            <ImageUpload pdfFile={pdfFile} setPdfFile={setPdfFile}/>
                            <Button variant="contained" 
                                    fullWidth
                                    sx={{marginTop:'8px'}} 
                                    onClick={handleClick}>
                                DAR DE BAJA EL ITEM</Button>
                            
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    )
}

export default DarBajarItemApropiacion