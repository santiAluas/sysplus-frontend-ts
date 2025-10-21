import { Box, Button, Grid, Paper, TextField, Typography, IconButton, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavbarMasterMoto from '../../components/NavbarMasterMoto'
import SearchBlobal from '../../components/SearchBlobal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Decrypt_User } from '../../services/Storage_Service'
import { GET_ALL_PEDIDOS_VENTA, GET_SEARCH_PEDIDO_VENTA, SAVE_PEDIDO_COMPRA } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion'
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import BasePage from '@/componentesCommons/BasePage';
import AddTaskIcon from '@mui/icons-material/AddTask';

const RecepcionBodegaConsignacion = () => {

    const pedidoEncerrado = {
        codigoproducto: "",
        tt_detallepedidocompra_id: "",
        tt_pedidocompra_id: "",
        cantidad: "0",
        costo_unitario: "0",
        descripcion: "",
        descripcion_attributos: "",
        producto: "",
        proveedor: "",
        nameagency: "",
        nameagencyorig: ""
    }

    const savePedidoCompra = {
        pedidoDetalleId: "",
        usuario: "",
        observaciones: ""
    }


    const [parameterSearch, setParameterSearch] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [userLogin, setUserLogin] = React.useState({});
    const [pedidoVenta, setPedidoVenta] = useState(pedidoEncerrado)
    const [newPedidoCompra, setNewPedidoCompra] = useState(savePedidoCompra)
    const [pedidosDeVenta, setPedidosDeVenta] = useState([])
    const [open, setOpen] = React.useState(false);

    const OnInitPage = async () => {
        const user = await Decrypt_User();
        if (user === null) {
            return;
        }
        setUserLogin(user)
        return user
    }

    const functionExecuteSearch = async () => {
        try {
            setPedidosDeVenta([])
            if (parameterSearch.trim() === "") {
                await GET_ALL_PEDIDOCOMPRA(userLogin.OrganizationId)
                setPedidoVenta(pedidoEncerrado)
                return
            }
            const respuesta = await GET_SEARCH_PEDIDO_VENTA(parameterSearch, userLogin.OrganizationId);
            // if (respuesta.length === 1){
            //     setPedidoVenta(respuesta[0])
            //     setPedidosDeVenta([])
            // }else{
            setPedidosDeVenta(respuesta)
            setPedidoVenta(pedidoEncerrado)
            // }
        } catch (error) {
            throw error;
        }
    };

    const GET_ALL_PEDIDOCOMPRA = (agencyId) => {
        const functionThatReturnPromise = async () => {
            try {
                const respuesta = await GET_ALL_PEDIDOS_VENTA(agencyId);
                setPedidosDeVenta(respuesta)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "CARGANDO ....")
    }


    const seleccionarPedidoCompra = (e, item) => {
        e.preventDefault()
        setOpen(true)
        setPedidoVenta(item)
    }

    const handleClose = () => {
        setOpen(false)
        setPedidoVenta(pedidoEncerrado)
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

    const CreateNewPedidoCompra = () => {
        newPedidoCompra.pedidoDetalleId = pedidoVenta.tt_detallepedidocompra_id
        newPedidoCompra.usuario = userLogin.User
        newPedidoCompra.observaciones = observaciones

        const functionThatReturnPromise = async () => {
            try {
                await SAVE_PEDIDO_COMPRA(newPedidoCompra);
                setNewPedidoCompra({
                    pedidoDetalleId: "",
                    usuario: "",
                    observaciones: ""
                })
                setPedidoVenta(pedidoEncerrado)
                const respuesta = await GET_ALL_PEDIDOS_VENTA(userLogin.OrganizationId);
                setPedidosDeVenta(respuesta)
                setOpen(false)
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "CARGANDO ....")

    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usuario = await OnInitPage();
            if (usuario.OrganizationId !== undefined) {
                await GET_ALL_PEDIDOCOMPRA(usuario.OrganizationId);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#ffe800",
            color: "#171718",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        '&.customWidth': {
            width: '10px',  // Ajusta el ancho según tus necesidades
        },
    }));

    const handleCloseModal = () => {
        // setProductoApropiacion(productoencerado)
        setOpen(false)
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        width: '80%'
    };

    const styleCell = (width = 8) => {
        return {
            width: width,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    }

    const tableResult = () => {
        return (
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow key={2}>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>CODIGO PRODUCTO</StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>PRODUCTO</StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>PROVEEDOR</StyledTableCell>
                            <StyledTableCell align="center" style={{ display: 'none' }}>COSTO UNITARIO</StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>ATRIBUTO</StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>BODEG. ORIG.</StyledTableCell>
                            <StyledTableCell align="center" sx={styleCell(10)}>BOG. DEST.</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidosDeVenta.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell scope="row">
                                    <IconButton color="primary" onClick={(e) => seleccionarPedidoCompra(e, row)}>
                                        <AddTaskIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right"  width={50}>{row.codigoproducto}</TableCell>
                                <TableCell align="right" >{row.producto}</TableCell>
                                <TableCell align="right">{row.proveedor}</TableCell>
                                <TableCell align="right" style={{ display: 'none' }}>{row.costo_unitario}</TableCell>
                                <TableCell align="right" >{row.descripcion_attributos.replace('_', ' ')}</TableCell>
                                <TableCell align="right">{row.nameagencyorig}</TableCell>
                                <TableCell align="right">{row.nameagency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)
    }

    return (
        <BasePage title='RECEPCION DE PRODUCTOS CONSIGNADOS'>
            <ToastContainer />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 0,
                        height: '100%',
                    },
                }}
            >
                <Paper elevation={3}
                    style={{
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 10
                    }}>
                    <SearchBlobal parameterSearch={parameterSearch}
                        setParameterSearch={setParameterSearch}
                        functionExecute={functionExecuteSearch} ></SearchBlobal>

                    <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Paper
                            elevation={3}
                            sx={style}
                        >
                            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <Grid container pl={4} pb={3} spacing={2} mt={2}>
                                <Grid item sm={6}>
                                    <Typography>Producto: {pedidoVenta.producto}</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography>Proveedor: {pedidoVenta.proveedor}</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography>Cantidad: {pedidoVenta.cantidad}</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    {/* <Typography>Costo: {pedidoVenta.costo_unitario}</Typography> */}
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        label="OBSERVACIONES"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <Button variant="contained" fullWidth onClick={CreateNewPedidoCompra}>RECEPTAR</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Modal>
                    {pedidosDeVenta.length === 0 ? null : (
                        <div>
                            {tableResult()}
                        </div>
                    )}
                </Paper>
            </Box>
        </BasePage>
    )
}

export default RecepcionBodegaConsignacion