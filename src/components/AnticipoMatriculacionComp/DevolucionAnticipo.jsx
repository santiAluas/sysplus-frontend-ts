import { Button, TextField } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import {
  OBTENER_ANTICIPO_ANULAR,
  GRABAR_ANTICIPO_DEVOLUCION
} from '../../services/Devolucion_Api'
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { ToastContainer, toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
// '../../helpers/ManejoExcepciones.js'
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

const DevolucionAnticipo = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anticipos, setAnticipos] = useState([])
  const [codigoAnticipo, setCodigoAnticipo] = useState("")
  const [observacion, setObservacion] = useState("")
  const [motivoDevolucion, setMotivoDevolucion] = React.useState('');
  const [statusSave, setStatusSave] = useState(true)
  const handleChangeMotivoDevolucion = (event) => {
    setMotivoDevolucion(event.target.value);
  };
  const OBTENER_ANTICPO_DEVOLUCION = () => {
    const functionThatReturnPromise = async () => {
      try {
        const respuesta = await OBTENER_ANTICIPO_ANULAR(codigoAnticipo);
        setAnticipos(respuesta)
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
  }

  const grabar_devolucionAnticipo = () => {
    let mensaje = "";
    if (motivoDevolucion.trim().length === 0) {
      mensaje = "El campo observacion no puede estar vacio"
      setStatusSave(false)
    }else{
      setStatusSave(true)
    }

    if (observacion.trim().length === 0 && motivoDevolucion.trim() === "Otros") {
      mensaje = "El campo observacion no puede estar vacio"
    }
    if (anticipos.length === 0) {
      mensaje = "No ha seleccionado ningun anticipo"
    }
    if (mensaje !== "") {
      return toast.warn(mensaje, { position: toast.POSITION.TOP_CENTER })
    }

    const functionThatReturnPromise = async () => {
      try {
        await GRABAR_ANTICIPO_DEVOLUCION({
          codigoAnticipo: anticipos[0].codAnticipoAura,
          observacion: observacion,
          motivoDevolucion
        });
        setObservacion("")
        setAnticipos([])
        setCodigoAnticipo("")
        setMotivoDevolucion("")
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "SE GRABO EXITOSAMENTE ....")
  }
  return (
    <>
      <ToastContainer />
      <Button variant="contained" onClick={handleOpen}>SOLICITAR DEVOLUCION</Button>
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
              BUSCAR ANTICIPO
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
            <Button variant="text"
              startDecorator={<SearchIcon />}
              startIcon={<SearchIcon />}
              onClick={OBTENER_ANTICPO_DEVOLUCION}
            >BUSCAR</Button>
          </div>
          <br></br>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell align="right">DNI Cliente</TableCell>
                    <TableCell align="right">Gestor Matricula</TableCell>
                    <TableCell align="right">Organizacion</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {anticipos.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{row.nombreCliente}</TableCell>
                      <TableCell >{row.numDocumento}</TableCell>
                      <TableCell align="right">{row.gestMatricula}</TableCell>
                      <TableCell align="right">{row.organizacion}</TableCell>
                      <TableCell align="right">${row.valorTotalMatric}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <br></br>
          <div>
            <FormControl sx={{ m: 1, minWidth: '100%' }}>
              <InputLabel id="demo-simple-select-autowidth-label">MOTIVO DEVOLUCION</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={motivoDevolucion}
                onChange={handleChangeMotivoDevolucion}
                autoWidth
                label="Motivo Devolucion"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Desiste de la compra">Desiste de la compra</MenuItem>
                <MenuItem value="Credito negado">Crédito negado</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </Select>
            </FormControl>
            {motivoDevolucion === "Otros" ? 
            (<TextField
              id="filled-textarea"
              label="Ingrese la observacion"
              placeholder="ESCRIBIR ..."
              multiline
              variant="filled"
              rows={4}
              fullWidth
              onChange={(e) => setObservacion(e.target.value)}
              value={observacion}
            />)
            : ""}

            {statusSave?"":<Alert severity="warning">SELECCIONE UN MOTIVO DE DEVOLUCION</Alert>}
            
          </div>
          <br></br>
          <Button variant="contained" fullWidth onClick={grabar_devolucionAnticipo}>SOLICITAR APROBACION</Button>
        </Box>
      </Modal>
    </>
  )
}

export default DevolucionAnticipo