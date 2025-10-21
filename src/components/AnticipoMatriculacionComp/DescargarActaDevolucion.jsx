import { Button, TextField } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import {
  DESCARGAR_ACTA_DEVOLUCION_ANTICIPO
} from '../../services/Devolucion_Api'
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const DescargarActaDevolucion = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [codigoAnticipo, setCodigoAnticipo] = useState("")

  const DESCARGAR_ACTA_DEVOLUCION = () => {
    const functionThatReturnPromise = async () => {
      try {
        await DESCARGAR_ACTA_DEVOLUCION_ANTICIPO(codigoAnticipo);
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
  }

  return (
    <>
    <ToastContainer />
    <Button variant="contained" onClick={handleOpen}>DESCARGAR DEVOLUCION</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <p style={{
            paddingBottom: 0,
            marginBottom: 0
          }}>
            BUSCAR ANTICIPO (CODIGO ANTICIPO)
          </p>
        </div>
        <div style={{ display: 'flex' }}>
          <TextField id="standard-basic"
            label=""
            variant="standard"
            fullWidth
            onChange={(e) => setCodigoAnticipo(e.target.value)}
            value={codigoAnticipo}
          />
        </div>
        <br></br>
        <Button variant="contained" fullWidth onClick={DESCARGAR_ACTA_DEVOLUCION}>DESCARGAR ACTA DEVOLUCION</Button>
      </Box>
    </Modal>
  </>
  )
}

export default DescargarActaDevolucion