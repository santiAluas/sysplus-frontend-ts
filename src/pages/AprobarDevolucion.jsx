import React, { useState, useEffect } from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Box, Button, Divider, Grid, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OBTENER_DEVOLUCIONESxAPROBAR, UPDATE_ANTICIPO_DEVOLUCION } from '../services/Devolucion_Api'
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';

import IconButton from '@mui/material/IconButton';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&.customWidth': {
    width: '12px',  // Ajusta el ancho según tus necesidades
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const AprobarDevolucion = () => {
  const [codigoAnticipo, setCodigoAnticipo] = useState("SN")
  const [anticiposXAprobar, setAnticipoXAprobar] = useState([])

  const obtener_devoluciones_X_aprobar = () => {
    const functionThatReturnPromise = async () => {
      try {
        const respuesta = await OBTENER_DEVOLUCIONESxAPROBAR(codigoAnticipo === "" ? "SN" :codigoAnticipo);
        setAnticipoXAprobar(respuesta)
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
  }

  const manejoMensajes = (funcion, mensaje) => {
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

  const updateStatusAnticipoDevolucion = (codigoanticipo, status) => {
    const functionThatReturnPromise = async () => {
      try {
        await UPDATE_ANTICIPO_DEVOLUCION(codigoanticipo,status);
        obtener_devoluciones_X_aprobar()
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
  }

  useEffect(() => {
    obtener_devoluciones_X_aprobar()
  }, []); 

  return (
    <>
      <ToastContainer />
      <NavbarMasterMoto titulo="APROBAR DEVOLUCION" />
      <Box sx={{
        flexGrow: 1,
        paddingRight: 2,
        paddingLeft: 2,
        paddingTop: 3
      }}>
        <Grid container>
          <Grid item sm={12} xs={12}>
            <p style={{
              paddingBottom: 0,
              marginBottom: 0,
            }}>
              BUSCADOR (AGENCIA, ANTICIPO, CEDULA)
            </p>


            <Stack direction="flex"
              justifyContent="center"
              alignItems="center">
              <TextField id="standard-basic"
                label=""
                variant="standard"
                sx={{ width: '90%' }}
                onChange={(e)=>setCodigoAnticipo(e.target.value)}
              />
              <SearchIcon />
              <Button onClick={obtener_devoluciones_X_aprobar}> BUSCAR ANTICIPO</Button>
            </Stack>
          </Grid>
          <Grid item sm={12}>
            <Divider style={{ height: '1px', marginTop: '9px', marginBottom: '9px', backgroundColor: 'black' }} />
          </Grid>
          <Grid item sx={12} sm={12} >
            {
              anticiposXAprobar.length > 0 ?
              (<TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>CODIGO ANTICIPO</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>NOMBRE CLIENTE</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>NOMBRE GESTOR</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>GESTOR MATRICULACION</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>FECHA CREACION</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>AGENCIA</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>CEDULA CLIENTE</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>CIUDAD</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }}>VALOR TOTAL MATRICULA</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }} >OBSERVACION</StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 5, maxWidth: 5 }} >APROBAR</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {anticiposXAprobar.map((row) => (
                      <StyledTableRow key={row.name} >
                        <StyledTableCell style={{ width: 5, maxWidth: 5 }} >
                          {row.codAnticipoAura}
                        </StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 45, maxWidth: 45 }}>{row.nombreCliente} </StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 45, maxWidth: 45 }}>{row.nombreUsuarioCobra} </StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 45, maxWidth: 45 }}>{row.gestMatricula}</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 30, maxWidth: 30 }}> {dayjs(row.fechaGeneracion).format("YYYY-MM-DD HH:mm:ss") }</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 5, maxWidth: 5 }}>{row.organizacion}</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 2, maxWidth: 2 }}>{row.numDocumento}</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 2, maxWidth: 2 }}>{row.ciudadMatriculacion}</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 2, maxWidth: 2 }}>{row.valorTotalMatric}</StyledTableCell>
                        <StyledTableCell align="right" style={{ width: 2, maxWidth: 2 }}>{row.observacion}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: 5, maxWidth: 2 }}>
                          <Stack direction="flex"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                              <IconButton aria-label="add" onClick={(e) =>updateStatusAnticipoDevolucion(row.codAnticipoAura,"4")}>
                                <CheckBoxIcon  color='success' style={{ fontSize: '40px' }} />
                              </IconButton>
                              <IconButton aria-label="delete" onClick={(e) => updateStatusAnticipoDevolucion(row.codAnticipoAura,"5")}>
                                <ErrorIcon color='error' style={{ fontSize: '40px' }}/>
                              </IconButton>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>): "NO EXISTEN ANTICIPOS POR ANULAR"
            }
          </Grid>
        </Grid>
      </Box >
    </>
  )
}

export default AprobarDevolucion