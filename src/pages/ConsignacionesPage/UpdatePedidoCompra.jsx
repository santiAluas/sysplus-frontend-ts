import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import '../css/UploadExcelListPrice.css';
import { Button, Grid, Paper, TextField, Tooltip } from '@mui/material';
import NavbarMasterMoto from '../../components/NavbarMasterMoto.jsx';
import { Decrypt_User } from '../../services/Storage_Service.js'
import { useNavigate } from 'react-router-dom';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'
import { UPLOAD_DATA_PEDIDO_COMPRA } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion.js'
import { ToastContainer, toast } from 'react-toastify';
import excel_image from '../../assets/images/excel_image.png'
import { PedidoCompraCabecera, PedidoCompraDetalle } from '../../Models/PedidoCompraInsert.js'
import RefreshIcon from '@mui/icons-material/Refresh';
const UpdatePedidoCompra = () => {

    let navigate = useNavigate();
    // const [excelData, setExcelData] = useState([]);
    const [DataFacturas, setDataFacturas] = useState([]);
    const [numberRows, setNumberRows] = useState(0);
    const [numberColumn, setNumberColumn] = useState(0);
    const [fileName, setFileName] = useState("");
    const [nameListPrice, setNameListPrice] = useState("");
    const [userLogin, setUserLogin] = React.useState({});
    const [uploadedFile, setUploadedFile] = React.useState(null);


    const handleFileUpload = (acceptedFiles) => {
        const fileReader = new FileReader();
        const file = acceptedFiles[0];
        setFileName(file.name)

        fileReader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const range = XLSX.utils.decode_range(worksheet['!ref']);
            setNumberRows(range.e.r - range.s.r + 1);
            setNumberColumn(range.e.c - range.s.c + 1);

            const excel = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setDataFacturas(transformToCustomObjects(excel));
        };
        setUploadedFile(acceptedFiles[0]);
        fileReader.readAsBinaryString(acceptedFiles[0]);
    };


    const groupByOrgIdAndProveedor = (data) => {
        return data.reduce((result, item) => {
            const { proveedor, ad_org_id, descripcion } = item;
            const existingGroup = result.find(
                (group) => group.proveedor === proveedor && group.ad_org_id === ad_org_id
            );
    
            if (existingGroup) {
                existingGroup.items.push(item);  
            } else {
                result.push({
                    proveedor,
                    ad_org_id,
                    descripcion: descripcion,
                    items: [item], 
                });
            }
            return result;
        }, []);
    };

    const transformToCustomObjects = (excelData) => {
        const transformedData = excelData.slice(1).map((row) => {
            return createData(row);
        });
    
        const groupedData = groupByOrgIdAndProveedor(transformedData);  // Usamos la nueva función de agrupación
        return groupedData.map((group) => {
            const { proveedor, ad_org_id, items } = group;
    
            const { descripcion } = items[0];
    
            const pedidoCompraDetalles = [];
    
            for (const product of items) {
                const atributoString = product.atributo.toString();
    
                if ((atributoString.match(/_/g) || []).length !== 3) {
                    setDataFacturas([]);
                    setFileName("");
                    setNumberColumn(0);
                    setNumberRows(0);
                    toast.warn("LOS ATRIBUTOS NO CUMPLEN CON EL FORMATO 'COLOR_CHASIS_MOTOR_RAMV'", { position: toast.POSITION.TOP_CENTER });
                    return;
                }
    
                pedidoCompraDetalles.push(new PedidoCompraDetalle(
                    product.producto,
                    product.cantidad.toString(),
                    atributoString,
                    product.organizaciónDestino
                ));
            }
    
            const obj = new PedidoCompraCabecera(
                proveedor,
                ad_org_id,
                descripcion,
                userLogin.User,
                pedidoCompraDetalles
            );
    
            return obj;
        }).filter(obj => obj !== undefined);
    };
    function createData(row) {
        return {
            proveedor: row[0],
            ad_org_id: row[1],
            descripcion: row[2],
            producto: row[3],
            cantidad: row[4].toString(),
            atributo: row[5].toString(),
            organizaciónDestino: row[6]
        };
    }

    const groupBySupplier = (data) => {
        return data.reduce((acc, item) => {
            if (!acc[item.proveedor]) {
                acc[item.proveedor] = [];
            }
            acc[item.proveedor].push(item);
            return acc;
        }, {});
    };



    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const OnInitPage = async () => {
        const user = Decrypt_User();
        if (user === null) {
            navigate('/')
            return;
        }
        setUserLogin(user)
    }

    useEffect(() => {
        OnInitPage()
    }, []);

    const InsertExcelListPrice = () => {
        // if (nameListPrice.trim() === "") {
        //     return toast.warn("ASIGNE UN NOMBRE A LA LISTA DE PRECIOS", { position: toast.POSITION.TOP_CENTER })
        // }
        const functionThatReturnPromise = async () => {
            try {
                await UPLOAD_DATA_PEDIDO_COMPRA(DataFacturas);
            } catch (error) {
                throw error;
            }
        };
        manejoMensajes(functionThatReturnPromise, "SE INSERTO CORRECTAMENTE EL INVENTARIO A CONSIGNACION ....")
    }


    const resetComponent = ()=>{
        setDataFacturas([])
        setNameListPrice("")
        setFileName("")
        setNumberColumn(0)
        setNumberRows(0)
    }
    return (
        <>
            <ToastContainer />
            <NavbarMasterMoto titulo="PEDIDO COMPRA" />
            <br />
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
                <Tooltip title='Volver a cargar'>
                    <RefreshIcon sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '94%',
                        right: '0px',
                        fontSize: '3rem'
                    }}  onClick={resetComponent}/>
                </Tooltip>


                <Grid container>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {DataFacturas.length === 0 ? (<div className="excel-uploader-container">
                                <h1 style={{ fontWeight: 'bold' }}>SUBIR EXCEL DE LAS PEDIDO DETALLE</h1>
                                <Dropzone onDrop={handleFileUpload} accept=".xlsx">
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()} className="dropzone" accept=".xlsx">
                                            <input {...getInputProps()} />
                                            <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar un archivo</p>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>) : (
                                <img src={excel_image}
                                    width={200}
                                    height={200}
                                    alt='logo de la empresa master moto'></img>)}
                            <div style={{ marginLeft: '19px', marginTop: '20px' }}>
                                <p><strong>NOMBRE ARCHIVO: </strong> {fileName}</p>
                                <p><strong>CANTIDAD FILAS: </strong> {numberRows} </p>
                                <p><strong>CANTIDAD COLUMNAS: </strong> {numberColumn}</p>
                                {DataFacturas.length > 0 && (
                                    <div className="excel-data-container">
                                        {/* <TextField id="filled-basic"
                                            label="Nombre Inventario Producto"
                                            variant="filled"
                                            value={nameListPrice}
                                            onChange={(e) => setNameListPrice(e.target.value)}
                                            sx={{ width: '100%', marginBottom: '2px' }}
                                        /> */}
                                        <Button variant="contained" onClick={InsertExcelListPrice} fullWidth>SUBIR LISTA PEDIDO COMPRA</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default UpdatePedidoCompra
