import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBlobal from '../../../components/SearchBlobal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ModalListaItems from '../../../components/ModalListaItems';
import VisualizacionInfoFactura from './VisualizacionInfoFactura';
import {
  BUSCAR_INFORMACION_FACTURA,
  BUSCAR_INFORMACION_RETENCIONES,
  BUSCAR_INFORMACION_EXTRACTO
} from '../../../services/ContabilidadServicesWeb/Contabilidad_SW';
import VizualizarInfoRetencion from './VizualizarInfoRetencion';
import VizualizacionInfoExtracto from './VizualizacionInfoExtracto';
import { ToastContainer, toast } from 'react-toastify';
import AcordeonInformacionDocumentos from './AcordeonInformacionDocumentos';
import { GenerarNombreColumnas } from '../class/MetodosLiquidaciones';
import TextFielCustom from '../../../components/TextFielCustom';

const DocumentosComponents = ({
  facturas,
  setFactura,
  extractosBancarios,
  setExtractosBancarios,
  retenciones,
  setRetenciones,
  valorTotalDocumentos,
  setValorTotalDocumentos
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [numeroBuscar, setNumeroBuscar] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('factura');
  const [tituloBuscador, setTituloBuscador] = useState('BUSCAR POR # FACTURA');
  const [valorDebitoCredito, setValorDebitoCredito] = useState(0);

  const actualizarTotalLiquidar = (id, nuevoValor) => {
    setFactura(prev =>
      prev.map(f => f.id === id ? { ...f, totalLiquidar: nuevoValor } : f)
    );
  };

  const buscarResultados = async () => {
    let respuesta;
    switch (tipoBusqueda) {
      case 'factura':
        respuesta = await BUSCAR_INFORMACION_FACTURA(numeroBuscar);
        break;
      case 'retencion':
        respuesta = await BUSCAR_INFORMACION_RETENCIONES(numeroBuscar);
        break;
      case 'extracto':
        respuesta = await BUSCAR_INFORMACION_EXTRACTO(numeroBuscar, valorDebitoCredito);
        break;
    }

    if (respuesta.length > 1) {
      GenerarNombreColumnas(respuesta, setColumns);
      setData(respuesta);
      setOpen(true);
    } else if (respuesta.length === 1) {
      switch (tipoBusqueda) {
        case 'factura':
          agregarFactura(respuesta[0]);
          break;
        case 'retencion':
          agregarRetenciones(respuesta[0]);
          break;
        case 'extracto':
          agregarExtracto(respuesta[0]);
          break;
      }
    }
  };

  /*const agregarFactura = (nuevaFactura) => {
    setFactura(prevFacturas => {
      nuevaFactura.totalLiquidar = parseFloat(nuevaFactura.total) || 0;
      if (prevFacturas.some(factura => factura.id === nuevaFactura.id)) {
        toast.warn(`Factura ya agregada: ${nuevaFactura.fact_proveedor}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        return prevFacturas;
      }
      return [...prevFacturas, nuevaFactura];
    });
  };*/

 const agregarFactura = (nuevaFactura) => {
  setFactura(prevFacturas => {
    const saldo = parseFloat(nuevaFactura.saldo_total);
    const total = parseFloat(nuevaFactura.total);

    const facturaConLiquidar = {
      ...nuevaFactura,
      totalLiquidar: saldo > 0 ? saldo : total,
      esNuevo: true  // ← aquí agregas correctamente la propiedad
    };

    if (prevFacturas.some(factura => factura.id === nuevaFactura.id)) {
      toast.warn(`Factura ya agregada: ${nuevaFactura.fact_proveedor}`, {
        position: toast.POSITION.TOP_RIGHT
      });
      return prevFacturas;
    }

    return [...prevFacturas, facturaConLiquidar];
  });
};


  const agregarExtracto = (nuevoExtracto) => {
    setExtractosBancarios([nuevoExtracto]);
  };

  /*
  const agregarRetenciones = (nuevaRetencion) => {
    setRetenciones(prevRetenciones => {
      if (prevRetenciones.some(retencionP => retencionP.id === nuevaRetencion.id)) {
        toast.warn(`Retención ya agregada: ${nuevaRetencion.serie_comprobante_tx}`, {
          position: toast.POSITION.TOP_RIGHT
        });
        return prevRetenciones;
      }

      return [
        ...prevRetenciones,
        {
          ...nuevaRetencion,
          renta_liquidar: nuevaRetencion.renta_nr,
          iva_liquidar: nuevaRetencion.iva_nr
        }
      ];
    });
  };*/

  const agregarRetenciones = (nuevaRetencion) => {
  setRetenciones(prevRetenciones => {
    if (prevRetenciones.some(retencionP => retencionP.id === nuevaRetencion.id)) {
      toast.warn(`Retención ya agregada: ${nuevaRetencion.serie_comprobante_tx}`, {
        position: toast.POSITION.TOP_RIGHT
      });
      return prevRetenciones;
    }

    const renta_liquidar = parseFloat(nuevaRetencion.saldo_renta_nr) > 0
      ? nuevaRetencion.saldo_renta_nr
      : nuevaRetencion.renta_nr;

    const iva_liquidar = parseFloat(nuevaRetencion.saldo_iva_nr) > 0
      ? nuevaRetencion.saldo_iva_nr
      : nuevaRetencion.iva_nr;


    return [
      ...prevRetenciones,
      {
        ...nuevaRetencion,
        renta_liquidar,
        iva_liquidar,
        esNuevo: true 
      }
    ];
  });
};



  const seleccionarTipoBusqueda = (e) => {
    setTipoBusqueda(e);
    switch (e) {
      case 'factura':
        setTituloBuscador('BUSCAR POR # FACTURA');
        break;
      case 'retencion':
        setTituloBuscador('BUSCAR POR # RETENCION');
        break;
      case 'extracto':
        setTituloBuscador('BUSCAR POR # EXTRACTO');
        break;
    }
  };

  const seleccionaSET = (item) => {
    switch (tipoBusqueda) {
      case 'factura':
        agregarFactura(item);
        break;
      case 'retencion':
        agregarRetenciones(item);
        break;
      case 'extracto':
        agregarExtracto(item);
        break;
      default:
        console.warn('Tipo de búsqueda no válido');
    }
  };

  const eliminarItem = (itemBorrar, setLista) => {
    setLista((prevLista) => prevLista.filter(item => item.id !== itemBorrar.id));
  };

  useEffect(() => {
    sumarValoresdocumentos();
  }, [facturas, extractosBancarios, retenciones]);

  //  usar renta_liquidar y iva_liquidar en lugar de los originales
  const sumarValoresdocumentos = () => {
    const valorFacturas = facturas.reduce((total, item) => total + parseFloat(item.totalLiquidar), 0);
    const valorExtractos = extractosBancarios.reduce((total, item) => total + parseFloat(item.credito), 0);
    const valorRetenciones = retenciones.reduce((total, item) =>
      total +
      (parseFloat(item.renta_liquidar) || 0) +
      (parseFloat(item.iva_liquidar) || 0), 0
    );

    const total = (valorFacturas + valorExtractos + valorRetenciones).toFixed(2);
    setValorTotalDocumentos(total);
  };

  const styleCheck = {
    '& .MuiFormControlLabel-label': { fontSize: '12px' }
  };

  const ocultarColumnas = ['Id', 'Fact_proveedor', 'autorización', 'clave_acceso_tx', 'isd', 'Linea_extracto', 'tipo_relacion', 'concepto_contable'];

  return (
    <>
      <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
        <legend>DOCUMENTOS</legend>
        <ToastContainer />
        <Grid container spacing={2} alignContent={'center'}>
          <Grid item lg={12}>
            <SearchBlobal
              title={tituloBuscador}
              parameterSearch={numeroBuscar}
              setParameterSearch={setNumeroBuscar}
              functionExecute={buscarResultados}
            />
          </Grid>

          {tipoBusqueda === 'extracto' && (
            <Grid item lg={12}>
              <TextFielCustom
                title="Valor Debito o Credito Buscar"
                value={valorDebitoCredito}
                setValue={setValorDebitoCredito}
                type="number"
              />
            </Grid>
          )}

          <Grid item lg={12}>
            <Typography>BUSCAR POR:</Typography>
            <FormControl sx={{ marginBottom: '12px' }}>
              <RadioGroup
                defaultValue="factura"
                name="radio-buttons-group"
                row
                onChange={(e) => seleccionarTipoBusqueda(e.target.value)}
              >
                <FormControlLabel sx={styleCheck} value="factura" control={<Radio />} label="FACTURA" />
                <FormControlLabel sx={styleCheck} value="retencion" control={<Radio />} label="RETENCION" />
                <FormControlLabel sx={styleCheck} value="extracto" control={<Radio />} label="EXTRACTO" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <AcordeonInformacionDocumentos
          title="INFORMACION FACTURAS"
          lista={facturas}
          funcionEliminar={eliminarItem}
          setLista={setFactura}
          DetallesComponente={(props) => {
    const currentItem = facturas.find(f => f.id === props.Item.id);
    return (
      <VisualizacionInfoFactura
        {...props}
        actualizarTotalLiquidar={actualizarTotalLiquidar}
        esNuevo={currentItem?.esNuevo ?? false}
      />
    );
  }}
          camposASumar={['totalLiquidar']}
          tituloCamposSumar={['Factura']}
        />

        {/* CAMBIO AQUÍ: pasar onUpdateField y usar campos_liquidar */}
        <AcordeonInformacionDocumentos
          title="INFORMACION RETENCIONES"
          lista={retenciones}
          funcionEliminar={eliminarItem}
          setLista={setRetenciones}
          DetallesComponente={(props) => {
              const currentItem = retenciones.find(r => r.id === props.Item.id);
              return (
                <VizualizarInfoRetencion
                  {...props}
                  esNuevo={currentItem?.esNuevo ?? false}
                  onUpdateField={(id, key, value) => {
                    setRetenciones(prev =>
                      prev.map(ret => ret.id === id ? { ...ret, [key]: value } : ret)
                    );
                  }}
                />
              );
            }}
          camposASumar={['renta_liquidar', 'iva_liquidar']}
          tituloCamposSumar={['Renta', 'Iva']}
        />

        <AcordeonInformacionDocumentos
          title="INFORMACION  EXTRACTOS"
          lista={extractosBancarios}
          funcionEliminar={eliminarItem}
          setLista={setExtractosBancarios}
          DetallesComponente={VizualizacionInfoExtracto}
          camposASumar={['credito']}
          tituloCamposSumar={['Credito']}
        />

        <ModalListaItems
          data={data}
          columns={columns}
          open={open}
          setOpen={setOpen}
          mensaje="SELECCIONE UN ITEM"
          titulo="RESULTADOS DE LA BUSQUEDA"
          setItemSeleccionado={(item) => seleccionaSET(item)}
          nombreColumnasOcultar={ocultarColumnas}
        />
      </Box>
    </>
  );
};

export default DocumentosComponents;