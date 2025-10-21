import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import dayjs from 'dayjs';
import { Button, Grid, Paper, TextField, Tooltip } from '@mui/material';
import NavbarMasterMoto from '../../components/NavbarMasterMoto';
import { Decrypt_User } from '../../services/Storage_Service'
import { useNavigate } from 'react-router-dom';
import { manejoMensajes } from '../../helpers/ManejoExcepciones'
import { UPLOAD_DOCUMENT_EXCEL_RETENCIONES_TC } from '../../services/ContabilidadServicesWeb/Contabilidad_SW'
import { ToastContainer, toast } from 'react-toastify';
import excel_image from '../../assets/images/excel_image.png'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import RefreshIcon from '@mui/icons-material/Refresh';

dayjs.extend(customParseFormat);
const UploadExcelRetencionestc = () => {
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

  const transformToCustomObjects = (excelData) => {
    return excelData.slice(1).map((row) =>
      createData(...row)
    );
  };


  const parseDate = (dateString) => {
    const format = "DD/MM/YYYY";
    return dayjs(dateString, format).isValid()
      ? dayjs(dateString, format).toISOString()
      : null;
  };


  const createData = (
    RUC_EMISOR,
    RAZON_SOCIAL_EMISOR,
    TIPO_COMPROBANTE,
    SERIE_COMPROBANTE,
    CLAVE_ACCESO,
    FECHA_AUTORIZACION,
    FECHA_EMISION,
    IDENTIFICACION_RECEPTOR,
    RENTA,
    IVA
  ) => {
    return {
      RUC_EMISOR,
      RAZON_SOCIAL_EMISOR,
      TIPO_COMPROBANTE,
      SERIE_COMPROBANTE,
      CLAVE_ACCESO,
      FECHA_AUTORIZACION: parseDate(FECHA_AUTORIZACION),
      FECHA_EMISION: parseDate(FECHA_EMISION),
      IDENTIFICACION_RECEPTOR,
      RENTA: RENTA ? parseFloat(RENTA) : 0,
      IVA: IVA ? parseFloat(IVA) : 0,
      IMPORTE_TOTAL: 0,
      NUMERO_DOCUMENTO_MODIFICADO: "0",
      ISD: nameListPrice,
    };
  };

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
    if (nameListPrice.trim() === "") {
      return toast.warn("ASIGNE UN NOMBRE AL ARCHIVO DE RETENCIONES", { position: toast.POSITION.TOP_CENTER })
    }
    const functionThatReturnPromise = async () => {
      try {
        await UPLOAD_DOCUMENT_EXCEL_RETENCIONES_TC(DataFacturas);
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "SE INSERTO CORRECTAMENTE EL ARCHIVO DE RETENCIONES ....")
  }

  const resetComponent = () => {
    setDataFacturas([])
    setNameListPrice("")
    setFileName("")
    setNumberColumn(0)
    setNumberRows(0)
  }

  return (
    <>
      <ToastContainer />
      <NavbarMasterMoto titulo="SUBIR RETENCIONES TC" />
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
          }} onClick={resetComponent} />
        </Tooltip>
        <Grid container>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {DataFacturas.length === 0 ? (<div className="excel-uploader-container">
                <h1 style={{ fontWeight: 'bold' }}>SUBIR EXCEL DE RETENCIONES</h1>
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
                    <TextField id="filled-basic"
                      label="Nombre Retenciones"
                      variant="filled"
                      value={nameListPrice}
                      onChange={(e) => setNameListPrice(e.target.value)}
                      sx={{ width: '100%', marginBottom: '2px' }}
                    />
                    <Button variant="contained" onClick={InsertExcelListPrice} fullWidth>SUBIR RETENCIONES</Button>
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

export default UploadExcelRetencionestc