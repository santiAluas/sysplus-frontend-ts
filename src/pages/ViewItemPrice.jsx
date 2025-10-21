import React, { useState } from 'react'
import NavbarMasterMoto from '../components/NavbarMasterMoto'
import { Alert, Box, Button, Grid, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import DetailProductPrice from '../components/ListPriceFolderComponent/DetailProductPrice';
import { GET_ITEM_PRICE } from '../services/ApiListPice'
import { ToastContainer } from 'react-toastify';
import { manejoMensajes } from '../helpers/ManejoExcepciones.js'
import { SixMothPlaceLimit } from '../components/ListPriceFolderComponent/SixMothPlaceLimit.jsx';
import DetailsLimitAndQuota from '../components/ListPriceFolderComponent/DetailsLimitAndQuota.jsx';
import CountedPromo from '../components/ListPriceFolderComponent/CountedPromo.jsx';

const ViewItemPrice = () => {

  const [parameterSearch, setParameterSearch] = useState("")
  const [itemsPrice, setItemsPrice] = useState([])
  const [itemPrice, setItemPrice] = useState({})
  const [open, setOpen] = React.useState(false);
  const [aletEmpySearch, setAletEmpySearch] = React.useState(false);

  
  const getItemsPrice = () => {
    if (parameterSearch.trim() === "") {
      setAletEmpySearch(true)
      return ("")
    }
    const functionThatReturnPromise = async () => {
      try {
        const respuesta = await GET_ITEM_PRICE(parameterSearch);
        setItemsPrice(respuesta)
        if (respuesta.length > 1) {
          setOpen(true)
          setItemPrice({})
        } else {
          setItemPrice(respuesta[0])
        }
      } catch (error) {
        setItemPrice({})
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => setOpen(false);

  const selectItem = (item) => {
    setItemPrice(item)
    setOpen(false)
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      getItemsPrice()
    }
  };


  const modalItemsList = () => {
    return (<div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <div style={{ overflowY: 'auto', maxHeight: '520px', position: 'relative' }}>
            {itemsPrice.length > 0 ? (
              <TableContainer sx={{
                width: '100%',
                borderRadius: 2,
                border: 1,
              }}>
                <Table sx={{
                  borderCollapse: "collapse", marginTop: 0,
                  borderStyle: "hidden",
                  "& td": {
                    border: 1
                  }
                }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">MARCA</TableCell>
                      <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">CODIGO</TableCell>
                      <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center">DESCRIPCION</TableCell>
                      <TableCell sx={{ backgroundColor: '#5477d9', color: 'white' }} align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemsPrice.map(item => {
                      return (<TableRow >
                        <TableCell align="center">{item.marca}</TableCell>
                        <TableCell align="center">{item.codigo}</TableCell>
                        <TableCell align="center">{item.descripcion}</TableCell>
                        <TableCell align="center">
                          <Button variant="outlined" onClick={(e) => selectItem(item)}> SELECCIONAR</Button>
                        </TableCell>
                      </TableRow>)
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : ""}
          </div>

        </Box>
      </Modal>
    </div>)
  }

  return (
    <>
      <ToastContainer />
      <NavbarMasterMoto titulo="LISTA DE PRECIOS" />
      <Paper elevation={3}
        style={{
          marginTop: 10,
          marginRight: 20,
          marginLeft: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20
        }}>
        <br />
        {aletEmpySearch ? <Alert variant="filled" severity="warning"  >
          NO SE HA INGRESADO CAMPO DE BÚSQUEDA
        </Alert> : null}

        <Grid container>
          <Grid item sm={12} xs={12}>
            <p style={{
              paddingBottom: 0,
              marginBottom: 0,
            }}>
              BUSCADOR PRODUCTO (CÓDIGO, DESCRIPCIÓN)
            </p>
            <Stack direction="flex"
              justifyContent="center"
              alignItems="center">
              <TextField id="standard-basic"
                onKeyDown={handleEnterKeyPress}
                label=""
                variant="standard"
                value={parameterSearch}
                onChange={(e) => setParameterSearch(e.target.value)}
                sx={{ width: '90%' }}
              />
              <SearchIcon />
              <Button onClick={getItemsPrice} > BUSCAR PRODUCTO</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      {Object.keys(itemPrice).length !== 0 ? (

        <Paper elevation={3}
          style={{
            marginTop: 10,
            marginRight: 20,
            marginLeft: 20,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20
          }}>
          <Typography variant="h5"
            gutterBottom
            align='left'
            fontWeight="bold"
            color='rgb(217, 189, 48)'
            style={{
              textShadow: '2px 1px 33px rgba(10, 0, 0, 0.5)',
              textAlign: 'center'
            }}>
            INFORMACION DE PRECIOS
          </Typography>
          <br />
          <Grid container>
            <Grid item sm={6} xs={6} pt={2} pl={2} pr={2}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25px' }}>
                <DetailProductPrice item={itemPrice} />
              </div>
            </Grid>
            <Grid item sm={6} xs={6} pt={2} pl={2} pr={2}>
              <SixMothPlaceLimit item={itemPrice} />
            </Grid>
            <Grid item sm={6} xs={6} pt={2} pl={2} pr={2}>
              <DetailsLimitAndQuota title="PLAZO" color="#ba6868" pc_36={itemPrice["36_plazo"]} pc_30={itemPrice["30_plazo"]} pc_24={itemPrice["24_plazo"]} pc_18={itemPrice["18_plazo"]} />
            </Grid>
            <Grid item sm={6} xs={6} pt={2} pl={2} pr={2}>
              <DetailsLimitAndQuota title="CUOTA" color="#91c09e" pc_36={itemPrice["36_couta"]} pc_30={itemPrice["30_couta"]} pc_24={itemPrice["24_couta"]} pc_18={itemPrice["18_couta"]} />
            </Grid>
            <Grid item sm={6} xs={6} pt={2} pl={2} pr={2}>
              <CountedPromo title="PROMO AL CONTADO" dctoMax={itemPrice.dcto_max_promo_contado} newPOE={itemPrice.nuevo_poe_promo_contado} />
            </Grid>
          </Grid>

        </Paper>
      ) : ""}
      {modalItemsList()}
    </>
  )
}

export default ViewItemPrice