import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import dayjs from 'dayjs';
import { Button, Grid, Paper, TextField, Tooltip } from '@mui/material';
import { Decrypt_User } from '../services/Storage_Service';
import { useNavigate } from 'react-router-dom';
import { manejoMensajes } from '../helpers/ManejoExcepciones';
import { ToastContainer, toast } from 'react-toastify';
import excel_image from '../assets/images/excel_image.png';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import RefreshIcon from '@mui/icons-material/Refresh';

dayjs.extend(customParseFormat);

const UploadExcelDinamico = ({ sendFunction, model, tamanio = 200 }) => {
  let navigate = useNavigate();
  const [DataFacturas, setDataFacturas] = useState([]);
  const [fileName, setFileName] = useState("");
  const [nameListPrice, setNameListPrice] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const parseDate = (dateString) => dayjs(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const transformToCustomObjects = (excelData, model) => {
    if (!excelData || excelData.length < 2) {
      toast.error("El archivo no tiene datos válidos.", { position: toast.POSITION.TOP_CENTER });
      return [];
    }
    const headers = excelData[0];
    const transformedData = [];

    for (let i = 1; i < excelData.length; i++) {
      const row = excelData[i];
      let transformedObject = {};
      let hasEmptyFields = false;

      headers.forEach((header, index) => {
        if (model[header]) {
          let value = row[index];

          if (value === undefined || value === null || value === "") {
            hasEmptyFields = true;
          }

          if (model[header] === 'date') {
            transformedObject[header] = parseDate(value);
          } else if (model[header] === 'number') {
            transformedObject[header] = value ? parseFloat(value) : 0;
          } else {
            transformedObject[header] = value ? value.toString() : "";
          }
        }
      });

      if (!hasEmptyFields) {
        transformedData.push(transformedObject);
      }
    }

    if (transformedData.length === 0) {
      toast.warn("El archivo contiene solo datos vacíos o inválidos.", { position: toast.POSITION.TOP_CENTER });
    }
    return transformedData;
  };

  const handleFileUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setUploadedFile(file);

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const transformedData = transformToCustomObjects(excelData, model);
      setDataFacturas(transformedData); // 💡 Aquí se almacena correctamente la lista
    };

    fileReader.readAsBinaryString(file);
  };

  useEffect(() => {
    const user = Decrypt_User();
    if (user === null) {
      navigate('/');
    }
  }, [navigate]);
  const Ejecutar_funcion = () => {
    manejoMensajes(InsertExcelListPrice, "SE INSERTO CORRECTAMENTE EL ARCHIVO DE VALORES LOTES....")
    setDataFacturas([])
  }

  const InsertExcelListPrice = async () => {
    await sendFunction(DataFacturas);
  };

  const resetComponent = () => {
    setDataFacturas([]);
    setNameListPrice("");
    setFileName("");
  };

  return (
    <>
      <ToastContainer />
      <br />

      <Grid container>
        <Grid item xs={DataFacturas.length > 0 ? 4 :12} lg={DataFacturas.length > 0 ? 4 :12} >
          {DataFacturas.length === 0 ? (
            <div className="excel-uploader-container">
              <Dropzone onDrop={handleFileUpload} accept=".xlsx">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #aaa',
                    borderRadius: '10px',
                    width: '100%',
                    minHeight: '150px',
                    cursor: 'pointer',
                  }}>
                    <input {...getInputProps()} />
                    <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar un archivo</p>
                  </div>
                )}
              </Dropzone>
            </div>
          ) : (
            <img src={excel_image} 
                 width={tamanio} 
                 height={tamanio} 
                 style={{ marginLeft: 120 }}
                 alt='logo de la empresa master moto'></img>
          )}

        </Grid>
        <Grid item sx={8} lg={8}>
            {DataFacturas.length > 0 && (
              <div className="excel-data-container">
                <Button variant="contained" onClick={Ejecutar_funcion} fullWidth>SUBIR RETENCIONES</Button>
              </div>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default UploadExcelDinamico;
