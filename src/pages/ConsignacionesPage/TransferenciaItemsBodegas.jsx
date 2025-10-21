import React, { useState } from 'react'
import NavbarMasterMoto from '../../components/NavbarMasterMoto'
import { Button, Grid, Paper, Typography } from '@mui/material'
import SearchAgencia from '../../components/SearchAgencia'
import SearchBlobal from '../../components/SearchBlobal'
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { SEARCH_PRODUCT_TRANSFER_WHEREHOUSE, UPDATE_ITEM_WHEREHOUSE } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion'
const TransferenciaItemsBodegas = () => {
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


    const searchItem = async () => {
        try {

            const respuesta = await SEARCH_PRODUCT_TRANSFER_WHEREHOUSE(motorOrChasis);
            setItem(respuesta[0])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const updateBodega =()=>{
        if (item.codigo === "")
            return toast.warn("NO HAY UN ITEM SELECCIONADO", { position: toast.POSITION.TOP_CENTER })
        if (codigoAgencia === "")
            return toast.warn("NO SELECCIONADO UNA AGENCIA", { position: toast.POSITION.TOP_CENTER })
        manejoMensajes(updateBodegafuncion,"ACTUALIZANDO...")
        resetComponent()
    }

    const updateBodegafuncion = async () =>{
        try {
            const respuesta = await UPDATE_ITEM_WHEREHOUSE(item.codigo, codigoAgencia);
            setItem(respuesta[0])
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const resetComponent = () =>{
        setItem(itemInit)
        setCodigoAgencia("")
        setMotorOrChases("")
    }


    return (
        <>
            <NavbarMasterMoto titulo="TRANSFERENCIA DE ITEMS ENTRE BODEGAS CONSIGNACION" />
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
                    <Grid item sm={6} lg={6}>
                        <SearchBlobal parameterSearch={motorOrChasis} setParameterSearch={setMotorOrChases} functionExecute={searchItem} />
                    </Grid>
                    <Grid item sm={6} lg={6} >
                        <SearchAgencia setCodAgencia={setCodigoAgencia} title='SELECCIONAR AGENCIA DESTINO'/>
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
                    {item.codigo === "" ? null : ( <Grid item sm={12} lg={12}>
                        <Button className='testWhite'variant="contained" fullWidth onClick={updateBodega}>ACTUALIZAR BODEGA</Button>
                    </Grid>)}
                </Grid>
            </Paper>
        </>
    )
}

export default TransferenciaItemsBodegas