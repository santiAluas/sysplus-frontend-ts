import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import dayjs from 'dayjs';
import { Button, Grid, Paper, TextField, Tooltip } from '@mui/material';
import NavbarMasterMoto from '../../components/NavbarMasterMoto';
import { Decrypt_User } from '../../services/Storage_Service'
import { useNavigate } from 'react-router-dom';
import { manejoMensajes } from '../../helpers/ManejoExcepciones'
import { DESCARGAR_EXTRACTO_OPEN } from '../../services/ContabilidadServicesWeb/Contabilidad_SW'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import excel_image from '../../assets/images/excel_image.png'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import RefreshIcon from '@mui/icons-material/Refresh';
import BasePage from '@/componentesCommons/BasePage';
dayjs.extend(customParseFormat);
const TransformarExtractoExcelToCsv = () => {
    let navigate = useNavigate();
    // const [excelData, setExcelData] = useState([]);
    const [dataItems, setDataItems] = useState([]);
    const [numberRows, setNumberRows] = useState(0);
    const [numberColumn, setNumberColumn] = useState(0);
    const [fileName, setFileName] = useState("");
    const [userLogin, setUserLogin] = React.useState({});
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedBank, setSelectedBank] = useState(""); // Estado para almacenar el banco seleccionado



    const resetComponent = () => {
        setDataItems([])
        setFileName("")
        setNumberColumn(0)
        setNumberRows(0)
    }

    const handleFileUpload = (acceptedFiles) => {
        if (!selectedBank) {
            toast.error('Debe seleccionar un banco antes de subir el archivo');
            return;
        }

        const fileReader = new FileReader();
        const file = acceptedFiles[0];
        setFileName(file.name)
        setUploadedFile(file)

        fileReader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const range = XLSX.utils.decode_range(worksheet['!ref']);
            setNumberRows(range.e.r - range.s.r + 1);
            setNumberColumn(range.e.c - range.s.c + 1);

            const excel = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setDataItems(transformToCustomObjects(excel, selectedBank));
        };
        setUploadedFile(acceptedFiles[0]);
        fileReader.readAsBinaryString(acceptedFiles[0]);
    };
    const convertirFechaDesdeExcel = (valor) => {
        // Caso 1: número serial Excel
        if (typeof valor === 'number') {
            const utc_days = valor - 25569;
            const utc_value = utc_days * 86400;
            const fecha = new Date(utc_value * 1000);

            const dia = String(fecha.getUTCDate()).padStart(2, '0');
            const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
            const anio = fecha.getUTCFullYear();
            return `${mes}/${dia}/${anio}`; //invertir mes y dia por que si no no salia
        }

        if (typeof valor === 'string') {
            const fechaTrim = valor.trim().split(' ')[0];
            const parsed = dayjs(fechaTrim, "DD/MM/YYYY", true);

            if (parsed.isValid()) return parsed.format("DD/MM/YYYY");
            const parsedISO = dayjs(fechaTrim, "YYYY-MM-DD", true);

            if (parsedISO.isValid()) return parsedISO.format("DD/MM/YYYY");
            return "Invalid Date";
        }

        return "Invalid Date";
    };

    const mapRowByBank = (row, bank) => {
        if (!row || !row.length || row.every(cell => cell === null || cell === undefined || cell === "")) {
            return null;
        }

        const encabezadoDetectado = ["fecha", "comprobante", "transacción", "concepto", "tipo"].some(keyword =>
            String(row[0]).toLowerCase().includes(keyword) ||
            String(row[1]).toLowerCase().includes(keyword) ||
            String(row[2]).toLowerCase().includes(keyword));

        if (encabezadoDetectado) {
            return null;
        }

        switch (bank) {
            case "Banco Pichincha":
                const fechap = convertirFechaDesdeExcel(row[0]);
                const tipoMovimiento = row[3]; // D o C
                const referencia = row[4]; // código transacción
                const descripcion = row[2]; // concepto
                let monto = row[6];

                if (tipoMovimiento === 'D') {
                    return {
                        TransactionDate: fechap,
                        ReferenceNo: referencia,
                        BusinessPartnerName: descripcion,
                        AmountOUT: monto,
                        AmountIN: 0,
                    };
                } else if (tipoMovimiento === 'C') {
                    return {
                        TransactionDate: fechap,
                        ReferenceNo: referencia,
                        BusinessPartnerName: descripcion,
                        AmountOUT: 0,
                        AmountIN: monto,
                    };
                }
                return null;

            case "Banco Guayaquil":
                return {
                    TransactionDate: row[2],
                    ReferenceNo: row[4],
                    BusinessPartnerName: row[5],
                    AmountOUT: row[13] === '-'
                        ? parseFloat(row[7].replace(/\$/g, '').replace(',', '')) || 0
                        : 0,
                    AmountIN: row[13] === '+'
                        ? parseFloat(row[7].replace(/\$/g, '').replace(',', '')) || 0
                        : 0,
                };

            case "Fideicomisio":
                return {
                    TransactionDate: row[2], // Fecha contable
                    ReferenceNo: row[4],     // Documento
                    BusinessPartnerName: row[5], // Concepto
                    AmountOUT: row[13] === '-'
                        ? parseFloat(row[7].replace(/\$/g, '').replace(',', '')) || 0
                        : 0,
                    AmountIN: row[13] === '+'
                        ? parseFloat(row[7].replace(/\$/g, '').replace(',', '')) || 0
                        : 0,
                };
            case "Jardin Azuayo":
                const parseAmount = (val) => {
                    if (val === undefined || val === null || val === "") return 0;
                    const num = parseFloat(val.toString().replace(/,/g, ""));
                    return isNaN(num) ? 0 : num;
                };
                // Asegurar formato solo de fecha sin hora
                let fecha = row[0];
                if (fecha instanceof Date) {
                    fecha = dayjs(fecha).format("DD/MM/YYYY");
                } else if (typeof fecha === "string") {
                    const soloFecha = fecha.split(" ")[0]; // separa por espacio y toma solo la fecha
                    fecha = dayjs(soloFecha, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY");
                }
                return {
                    TransactionDate: fecha,
                    ReferenceNo: row[2] || 'SIN COMPROBANTE',
                    BusinessPartnerName: row[1] || 'SIN TRANSACCIÓN',
                    AmountOUT: parseAmount(row[7]) + parseAmount(row[8]),
                    AmountIN: parseAmount(row[3]) + parseAmount(row[6]),
                };

            case "JEP":
                if (row[2] === undefined || row[2] === null || row[2] === "") {
                    return null;
                }
                const DC = row[1]; // Tipo ('DEBITO' o 'CREDITO')
                const montoJEP = parseFloat(row[5].toString().replace(/,/g, '')) || 0;

                return {
                    TransactionDate: row[0],         // Fecha
                    ReferenceNo: row[2],             // Codigo
                    BusinessPartnerName: row[3],     // Concepto
                    AmountOUT: DC === 'DEBITO' ? montoJEP : 0,
                    AmountIN: DC === 'CREDITO' ? montoJEP : 0,
                };
            case "JEP faster":
                const parseAmount1 = (val) => {
                    if (val === undefined || val === null || val === "") return 0;
                    const num = parseFloat(val.toString().replace(",", "."));
                    return isNaN(num) ? 0 : num;
                };

                // Asegurar formato solo de fecha sin hora
                let fecha1 = row[12];
                if (fecha1 instanceof Date) {
                    fecha1 = dayjs(fecha1).format("DD/MM/YYYY");
                } else if (typeof fecha1 === "string") {
                    const soloFecha = fecha1.split(" ")[0]; // separa por espacio y toma solo la fecha
                    fecha1 = dayjs(soloFecha, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY");
                }

                return {
                    TransactionDate: fecha1,
                    ReferenceNo: row[3] || 'SIN COMPROBANTE',
                    BusinessPartnerName: row[5] || 'SIN TRANSACCIÓN',
                    AmountOUT: 0,
                    AmountIN: parseAmount1(row[2]),
                };

            case "Banco Bolivariano":
                let fechaBolivariano = row[1];
                if (typeof fechaBolivariano === "string" && fechaBolivariano.includes("/")) {
                    const [dia, mes, anio] = fechaBolivariano.split("/");
                    fechaBolivariano = `${mes}/${dia}/${anio}`;
                }

                return {
                    TransactionDate: fechaBolivariano,
                    ReferenceNo: row[5],
                    BusinessPartnerName: row[10],
                    AmountOUT: row[6] === '-' ? parseFloat(row[7]) : 0,
                    AmountIN: row[6] === '+' ? parseFloat(row[7]) : 0,
                };
            // Agrega más bancos aquí...
            default:
                return null;
        }
    };

    const transformToCustomObjects = (excelData, bank) => {
        return excelData
            .filter(row =>
                row &&
                row.length > 0 &&
                row.some(cell => cell !== undefined && cell !== null && cell !== ""))
            .map(row => mapRowByBank(row, bank))
            .filter(Boolean); // Elimina filas no mapeadas
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

    const InsertExcelListPrice = async () => {
        try {
            setIsProcessing(true); // Iniciamos el proceso
            toast.info('Procesando archivo...', {
                position: "top-center",
                autoClose: false, // No se cerrará automáticamente
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            //Normalizamos todas las fechas antes de deduplicar
            const dataItemsNormalizados = dataItems.map(item => ({
                ...item,
                TransactionDate: (() => {
                    const raw = item.TransactionDate;
                    if (typeof raw === "number") {
                        return dayjs(new Date((raw - 25569) * 86400 * 1000)).format("DD/MM/YYYY");
                    }

                    if (typeof raw === "string") {
                        const parsed = dayjs(raw, ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"], true);
                        return parsed.isValid() ? parsed.format("DD/MM/YYYY") : "Invalid Date";
                    }
                    return "Invalid Date";
                })()
            }));
            const listaSinDuplicados = dataItemsNormalizados.filter((obj, index, arr) => {
                const noUndefined = Object.values(obj).every(value => value !== undefined);
                const isUnique = index === arr.findIndex((t) =>
                    Object.keys(obj).every(key => obj[key] === t[key]));

                return noUndefined && isUnique;
            });

            const transformacion = listaSinDuplicados.map(item => {
                let jsDate = item.TransactionDate;
                if (typeof jsDate === "string") {
                    // Si tiene formato DD/MM/YYYY, convertirlo a fecha real
                    jsDate = dayjs(jsDate, ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"]).toDate();
                } else if (typeof jsDate === "number") {
                    // Si es número de Excel
                    jsDate = new Date((jsDate - 25569) * 86400 * 1000);
                }
                return {
                    TransactionDate: dayjs(jsDate).format('DD/MM/YYYY'),
                    ReferenceNo: String(item.ReferenceNo ?? ""),
                    BusinessPartnerName: item.BusinessPartnerName,
                    AmountOUT: String(item.AmountOUT ?? "0"),
                    AmountIN: String(item.AmountIN ?? "0"),

                }
            })

                .filter(item => item.TransactionDate !== 'Invalid Date');

            const chunkSize = 300;
            let datosExportar = [];
            for (let i = 0; i < transformacion.length; i += chunkSize) {
                const chunk = transformacion.slice(i, i + chunkSize);
                try {
                    const respuesta = await DESCARGAR_EXTRACTO_OPEN(chunk);
                    if (Array.isArray(respuesta)) {
                        datosExportar.push(...respuesta);
                    }
                } catch (err) {
                    console.error("❌ Error al enviar chunk:", err);
                    toast.error("Error al procesar un bloque de datos. Revisa la consola.");
                }
            }
            descargarCSV(datosExportar);

            // Cerramos el toast de "procesando" y mostramos el de éxito
            toast.dismiss();
            toast.success('Proceso completado exitosamente', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            // En caso de error, mostramos un toast de error
            toast.dismiss();
            toast.error('Error al procesar el archivo', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Error:', error);
        } finally {
            setIsProcessing(false); // Finalizamos el proceso
        }
    }

    const descargarCSV = (data) => {
        const headers = ['Transaction Date', 'Reference No.', 'Reference Bank', 'Business Partner Name', 'Amount OUT', 'Amount IN', 'Description'];
        const csv = [
            headers.join(','),
            ...data.map(row => [
                row.transactionDate ?? 'N/A',
                row.referenceNo,
                row.referenceNo,
                row.businessPartnerName,
                row.amountOUT === "0" ? 0 : `"${row.amountOUT}"`,
                row.amountIN === "0" ? 0 : `"${row.amountIN}"`,
                ""
            ].join(','))

        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv; charset=UTF-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Extracto_Open_${dayjs().format('DD_MM_YYYY hh:mm:ss')}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <BasePage title='SUBIR ESTRACTO BANCARIA'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid container spacing={2} style={{ marginBottom: 16 }}>
                <Grid item xs={8}>
                    <TextField
                        select
                        label="Selecciona el banco"
                        value={selectedBank}
                        onChange={e => setSelectedBank(e.target.value)}
                        SelectProps={{ native: true }}
                        fullWidth
                    >
                        <option value="">Selecciona...</option>
                        <option value="Banco Pichincha">Banco Pichincha</option>
                        <option value="Banco Guayaquil">Banco Guayaquil</option>
                        <option value="Fideicomisio">Fideicomisio</option>
                        <option value="Jardin Azuayo">Jardin Azuayo</option>
                        <option value="JEP">JEP</option>
                        <option value="JEP faster">JEP faster</option>
                        <option value="Banco Bolivariano">Banco Bolivariano</option>
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                            setSelectedBank("");
                            setDataItems([]);
                            setFileName("");
                            setNumberRows(0);
                            setNumberColumn(0);
                        }}
                    >
                        Subir otro documento
                    </Button>
                </Grid>
            </Grid>
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
                            {dataItems.length === 0 ? (<div className="excel-uploader-container">
                                <h1 style={{ fontWeight: 'bold' }}>TRANSFORMAR EXTRATO A FORMATO OPEN BRAVO </h1>
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
                                {dataItems.length > 0 && (
                                    <div className="excel-data-container">
                                        <Button
                                            variant="contained"
                                            onClick={InsertExcelListPrice}
                                            disabled={isProcessing || !selectedBank}
                                            fullWidth
                                        >
                                            {isProcessing ? 'PROCESANDO...' : 'TRANSFORMAR DOCUMENTO'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </BasePage>
    )
}

export default TransformarExtractoExcelToCsv