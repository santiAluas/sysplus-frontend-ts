import React, { useState, useRef  } from 'react'
import DocumentosComponents from './components/DocumentosComponents'
import { Button, Grid, Paper } from '@mui/material'
import LotesComponents from './components/LotesComponents'
import CabeceraLiquidacionGrabar from './components/CabeceraLiquidacionGrabar';
import ConfirmacionGrabarLiquidacion from './components/ConfirmacionGrabarLiquidacion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  GRABAR_LIQUIDACION_TARJETAS,
  BUSCAR_LIQUIDACIONES_CODIGO,
  OBTENER_SECUENCIAL_LIQUIDACIONES,
  SUBIR_EXCEL_VALORES_LOTES_TEMPORALES
} from '../../services/ContabilidadServicesWeb/Contabilidad_SW'
import { manejoMensajes } from '../../helpers/ManejoExcepciones'
import { ToastContainer, toast } from 'react-toastify';
import './css/liquidacionesEstilos.css';
import { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext'
import { ModeloSubida } from './class/ModeloUploadExcelLoresExcel';
import UploadExcelDinamico from '../../components/UploadExcelDinamico';
import LiquidacionGrabarModel from '../../pages/Contabilidad/class/GrabarLiquidacion';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const LiquidacionesTarjetasCredito = () => {
  const modalRef = useRef(); 
  const { ObtenerUsuarioLogin } = useAuth();
  const [liquidaciongrabar, setLiquidacionGrabar] = useState(null)
  const [factura, setFactura] = useState([])
  const [extractoBancario, setExtractoBancario] = useState([])
  const [retencion, setRetencion] = useState([])
  const [dataLotes, setDataLotes] = useState([])
  const [valorTotalLote, setValorTotalLote] = useState(0)
  const [valorTotalDocumentos, setValorTotalDocumentos] = useState(0)
  const [esLiquidacionParcial, setEsLiquidacionParcial] = useState(false)
  const [esLiquidacionorCtv, setEsLiquidacionPorCtv] = useState(false)
  const [codigoLiquidacion, setCodigoLiquidacion] = useState("")
  const [selectedLotes, setSelectedLotes] = useState([]);
  const [observacionLiquidacion, setObservacionLiquidacion] = useState("")
  const [selectedRows, setSelectedRows] = useState([]);
  const [terminoBuscador, setTerminoBuscador] = useState("")
  const [codigoIDLiquidacion, setCodigoIDLiquidacion] = useState("")
  const [mostrarUpload, setMostrarUpload] = useState(false);

  const exportarPDF = () => {
    if (modalRef.current) {
      html2canvas(modalRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); 
        const pdf = new jsPDF("p", "mm", "a4"); 
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`Confirmacion_${codigoLiquidacion}.pdf` );
      });
    }
  };

  const handleConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div ref={modalRef} style={{
          backgroundColor: '#cccccc',
          borderRadius: '15px',
          boxShadow: '5px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          textAlign: 'center',
          maxWidth: '950px',
          margin: '0 auto',
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          color: 'red'
        }}>
          <ConfirmacionGrabarLiquidacion valorTotalDocumentos={valorTotalDocumentos}
            valorTotalLote={valorTotalLote}
            facturas={factura}
            retenciones={retencion}
            dataLotes={selectedLotes}
            extractos={extractoBancario}
            codigoLiquidacion={codigoLiquidacion}
            esLiquidacionParcial={esLiquidacionParcial === false ? "NO" : "SI"}
            esLiquidacionXCentavos={esLiquidacionorCtv === false ? "NO" : "SI"}
          />
          <div style={{ marginTop: '12px' }}>
            <Button
              sx={{ backgroundColor: '#a39e07' }}
              size='large'
              variant="contained"
              onClick={() => { GrabarLiquidacion(onClose); }}
            > Confirmar</Button>
            <Button sx={{ margin: '5px 5px 5px 5px', backgroundColor: '#a39e07' }}
              size='large'
              variant="contained" onClick={onClose}>Cancelar</Button>
          </div>
        </div>
      )
    });
  };


  const transformarLiquidacionGrabar = () => {
    const liquiGrabar = LiquidacionGrabarModel() ;
    liquiGrabar.numeroliquidacion = codigoLiquidacion;
    liquiGrabar.esliquidacionparcial = esLiquidacionParcial;
    liquiGrabar.esliquidacionporcentavos = esLiquidacionorCtv;
    liquiGrabar.valorlotetotal = valorTotalLote;
    liquiGrabar.valortotaldocumentos = valorTotalDocumentos;
    liquiGrabar.observaciones = observacionLiquidacion;
    liquiGrabar.codigocabeceraliquidacion = codigoIDLiquidacion;
    liquiGrabar.estadoliquidacion = esLiquidacionParcial ? "PARCIAL" : "LIQUIDADO";
    liquiGrabar.usuariograba = ObtenerUsuarioLogin().User;

    agregarDetalles(factura, "FACTURA", liquiGrabar);
    agregarDetalles(extractoBancario, "EXTRACTO", liquiGrabar);
    agregarDetalles(retencion, "RETENCIONES", liquiGrabar);
    agregarDetalles(selectedLotes, "LOTE", liquiGrabar);

    setLiquidacionGrabar(liquiGrabar);
    return liquiGrabar;
  };

  /*const agregarDetalles = (items, tipoDocumento, liquiGrabar) => {
    items.forEach((item) => {
      liquiGrabar.liquidacionesDetalles.push({
        codigoliquidaciondetalle: "",
        codigoliquidacioncabecera: codigoIDLiquidacion,
        tipodocumento: tipoDocumento,
        codigodocumento: retornarIdTipoDocumento(tipoDocumento, item),
        /*...(tipoDocumento === "LOTE" && {
          valorcomisionfactura: item.valorcomisionfactura,
          valorretencioniva: item.valorretencioniva,
          valorretencionrenta: item.valorretencionrenta,
          valorextracto: item.valorextracto
        })*-/
        valorcomisionfactura: item.valorcomisionfactura,
        valorretencioniva: item.valorretencioniva,
        valorretencionrenta: item.valorretencionrenta,
        valorextracto: item.valorextracto
      });
    });
  };*/

  const agregarDetalles = (items, tipoDocumento, liquiGrabar) => {
  items.forEach((item) => {
    const detalle = {
      codigoliquidaciondetalle: "",
      codigoliquidacioncabecera: codigoIDLiquidacion,
      tipodocumento: tipoDocumento,
      codigodocumento: retornarIdTipoDocumento(tipoDocumento, item),
      valorcomisionfactura: 0,
      valorretencioniva: 0,
      valorretencionrenta: 0,
      valorextracto: 0,
      saldocomisionfacrtura: 0,
      saldoretencioniva: 0,
      saldoretencionrenta: 0
    };

    switch (tipoDocumento) {
      case "FACTURA":
        detalle.valorcomisionfactura = parseFloat(item.totalLiquidar || 0);
        detalle.saldocomisionfactura = parseFloat(item.total - item.totalLiquidar || 0);
        break;

      case "RETENCIONES":
        detalle.valorretencioniva = parseFloat(item.renta_liquidar || 0);
        detalle.valorretencionrenta = parseFloat(item.iva_liquidar || 0);
        detalle.saldoretencioniva = parseFloat(item.renta_nr - item.renta_liquidar || 0);
        detalle.saldoretencionrenta = parseFloat(item.iva_nr - item.iva_liquidar || 0);
        break;

      case "LOTE":
        detalle.valorcomisionfactura = parseFloat(item.valorcomisionfactura || 0);
        detalle.valorretencioniva = parseFloat(item.valorretencioniva || 0);
        detalle.valorretencionrenta = parseFloat(item.valorretencionrenta || 0);
        detalle.valorextracto = parseFloat(item.valorextracto || 0);
        break;
    }

    liquiGrabar.liquidacionesDetalles.push(detalle);
  });
};

  const retornarIdTipoDocumento = (tipodocumento, item) => {
    switch (tipodocumento) {
      case "LOTE":
        return `${item.codigocobrotarjetacuotas}`
      case "EXTRACTO":
        return `${item.referenceno}${item.fecha_contable}${item.debito === 0 || item.debito === '0.00' || item.debito === '.00' ? '0' : item.debito}${item.credito === 0 || item.credito === '0.00' || item.credito === '.00' ? '0' : item.credito}`;
      default:
        return item.id
    }
  }

  const mensajesError = [
    {
      condicion: () => valorTotalDocumentos !== valorTotalLote && !esLiquidacionorCtv && !esLiquidacionParcial,
      mensaje: "EL VALOR DE DOCUMENTOS Y LOTES NO ES IGUAL",
    },
    {
      condicion: () => Math.abs(valorTotalDocumentos - valorTotalLote) > 0.05 && esLiquidacionorCtv && !esLiquidacionParcial,
      mensaje: "LA DIFERENCIA DEBE SER SOLO DE 0.05 CTV",
    },
    {
      condicion: () => factura.length === 0 && !esLiquidacionParcial,
      mensaje: "NO HA SELECCIONADO FACTURAS",
    },
    {
      condicion: () => extractoBancario.length === 0 && !esLiquidacionParcial,
      mensaje: "NO HA SELECCIONADO EXTRACTO BANCARIO",
    },
    {
      condicion: () => retencion.length === 0 && !esLiquidacionParcial,
      mensaje: "NO HA SELECCIONADO RETENCIONES",
    },
    {
      condicion: () => selectedLotes.length === 0 && !esLiquidacionParcial,
      mensaje: "NO HA SELECCIONADO LOTES",
    },
    {
      condicion: () => !verificarSaldosTotalCuotaTotal(),
      mensaje: "EL VALOR DE LA CUOTA CON EL TOTAL DE UN COBRO NO COINCIDEN",
    },
  ];

  const GrabarLiquidacion = (onClose) => {
    const error = mensajesError.find(({ condicion }) => condicion());
    if (error) {
      return toast.warn(error.mensaje, { position: toast.POSITION.TOP_CENTER });
    }
    const liquidacion = transformarLiquidacionGrabar()
    const functionThatReturnPromise = async () => {
      try {
        await GRABAR_LIQUIDACION_TARJETAS(liquidacion);
        exportarPDF(); 
        onClose();
        resetComponent();
      } catch (error) {
        throw error;
      }
    };
    manejoMensajes(functionThatReturnPromise, "SE GRABO EXITOSAMENTE LA LIQUIDACION ....")
  }

  const resetComponent = async () => {
    await Obtener_Secuencial();
    setLiquidacionGrabar(null);
    setFactura([]);
    setExtractoBancario([]);
    setRetencion([]);
    setDataLotes([]);
    setValorTotalLote(0);
    setValorTotalDocumentos(0);
    setEsLiquidacionParcial(false);
    setEsLiquidacionPorCtv(false);
    setSelectedLotes([]);
    setObservacionLiquidacion("");
    setSelectedRows([]);
    setCodigoIDLiquidacion("");
  };

  const BuscarLiquidacion = async () => {
    try {
      const liquidacion = await BUSCAR_LIQUIDACIONES_CODIGO(terminoBuscador);
      LLenarDocumentos(liquidacion[0])
    } catch (error) {
      throw error;
    }
  }

  const Obtener_Secuencial = async () => {
    try {
      const secuencial = await OBTENER_SECUENCIAL_LIQUIDACIONES();
      setCodigoLiquidacion(`LIQUI-${secuencial}`)
    } catch (error) {
      throw error;
    }
  }

  const verificarSaldosTotalCuotaTotal = () => {
    let validacion = true
    selectedLotes.forEach((item) => {
      const sumaTotal = (parseFloat(item.valorcomisionfactura || 0) +
        parseFloat(item.valorretencioniva || 0) +
        parseFloat(item.valorretencionrenta || 0) +
        parseFloat(item.valorextracto || 0));
      (sumaTotal !== parseFloat(item.totalcuota || 0)) ?? (validacion = false)
    })
    return validacion
  }

  useEffect(() => {
    Obtener_Secuencial();
  }, [])


  const LLenarDocumentos = (documentos) => {
    setCodigoIDLiquidacion(documentos.codigoliquidacioncabecera)
    setCodigoLiquidacion(documentos.numeroliquidacion)
    setFactura(documentos.facturas)
    setExtractoBancario(documentos.extractos)
    setSelectedLotes(documentos.lotes)
    setRetencion(documentos.retenciones)
    setObservacionLiquidacion(documentos.observaciones)
    setEsLiquidacionParcial(documentos.esliquidacionparcial)
    setEsLiquidacionPorCtv(documentos.esliquidacionporcentavos)
  }


  const SubirExcelLotesValores = async (DATA) => {
    try {
      await SUBIR_EXCEL_VALORES_LOTES_TEMPORALES(DATA);
    } catch (error) {
      throw error;
    }
  };

  const handleToggleUpload = () => {
    setMostrarUpload((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
      <Grid container>
        <Grid item lg={12} xs={12} sm={12}>
          <CabeceraLiquidacionGrabar valorTotalLote={valorTotalLote}
            valorTotalDocumentos={valorTotalDocumentos}
            setEsLiquidacionParcial={setEsLiquidacionParcial}
            esLiquidacionParcial={esLiquidacionParcial}
            setEsLiquidacionPorCtv={setEsLiquidacionPorCtv}
            esLiquidacionorCtv={esLiquidacionorCtv}
            codigoLiquidacion={codigoLiquidacion}
            setCodigoLiquidacion={setCodigoLiquidacion}
            funcionConfirm={handleConfirm}
            observacionLiquidacion={observacionLiquidacion}
            setObservacionLiquidacion={setObservacionLiquidacion}
            setTerminoBuscador={setTerminoBuscador}
            terminoBuscador={terminoBuscador}
            resetComponent={resetComponent}
            BuscarLiquidacion={BuscarLiquidacion}
            codigoIDLiquidacion={codigoIDLiquidacion}
          />
        </Grid>

        <Grid item lg={6}>
          < DocumentosComponents
            facturas={factura}
            setFactura={setFactura}
            extractosBancarios={extractoBancario}
            setExtractosBancarios={setExtractoBancario}
            retenciones={retencion}
            setRetenciones={setRetencion}
            valorTotalDocumentos={valorTotalDocumentos}
            setValorTotalDocumentos={setValorTotalDocumentos} />
        </Grid>
        <Grid item lg={6}>
          <Paper>
            <Button variant="contained" onClick={handleToggleUpload} fullWidth>
              {mostrarUpload ? 'Subir Upload' : 'Mostrar Upload'}
            </Button>
            {mostrarUpload && (
              <UploadExcelDinamico
                model={ModeloSubida}
                sendFunction={SubirExcelLotesValores}
                tamanio={100}
              />
            )}
          </Paper>
          <LotesComponents
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            dataLotes={dataLotes}
            setDataLotes={setDataLotes}
            setValorTotalLote={setValorTotalLote}
            valorTotalLote={valorTotalLote}
            setSelectedLotes={setSelectedLotes}
            selectedLotes={selectedLotes} />
        </Grid>
      </Grid>

    </>
  )
}

export default LiquidacionesTarjetasCredito