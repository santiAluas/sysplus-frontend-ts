import { Box,  Grid } from '@mui/material'
import React, { useState } from 'react'
import SearchBlobal from '../../../components/SearchBlobal'
import TablaLotesResultado from './TablaLotesResultado'
import { BUSQUEDA_LOTE } from '../../../services/ContabilidadServicesWeb/Contabilidad_SW'
import ModalListaItems from '../../../components/ModalListaItems'
import { GenerarNombreColumnas } from '../class/MetodosLiquidaciones'
import AcordeonInformacionDocumentos from './AcordeonInformacionDocumentos'
import VizualizarInfoLotes from './VizualizarInfoLotes'
import { sonObjetosIguales } from '../class/MetodosLiquidaciones'
const LotesComponents = ({ dataLotes,
  setDataLotes,
  setValorTotalLote,
  valorTotalLote,
  setSelectedLotes,
  selectedLotes,
  selectedRows,
  setSelectedRows }) => {

  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState([])
  const [numeroLote, setNumeroLote] = useState("")

  const buscarLote = async () => {
    const respuesta = await BUSQUEDA_LOTE(numeroLote)
    GenerarNombreColumnas(respuesta, setColumns)
    setDataLotes(respuesta)
    setOpen(true)
  }
  
  const eliminarItem = (itemBorrar, setLista) => {
    setLista((prevLista) => prevLista.filter(item => !sonObjetosIguales(item, itemBorrar,["valorcomisionfactura", "valorretencioniva", "valorretencionrenta", "valorextracto"])));
};

  return (
    <>
      <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
        <legend>DOCUMENTOS DE LOTES</legend>
        <Grid container spacing={3} alignContent={'center'}>
          <Grid item lg={12} xs={12} sm={12} >
            <SearchBlobal title='BUSCAR NUMERO DE LOTE'
              parameterSearch={numeroLote}
              setParameterSearch={setNumeroLote}
              functionExecute={buscarLote} />
          </Grid>
        </Grid>

        <AcordeonInformacionDocumentos
          title="INFORMACION LOTES SELECCIONADOS"
          setValorTotalLote={setValorTotalLote}
          valorTotalLote={valorTotalLote}
          lista={selectedLotes}
          setLista={setSelectedLotes}
          DetallesComponente={VizualizarInfoLotes}
          camposASumar={[]}
          tituloCamposSumar={[]}
          funcionEliminar={eliminarItem}

        />

        <ModalListaItems data={dataLotes}
          columns={columns}
          open={open}
          setOpen={setOpen}
          mensaje='SELECCIONE LOTE'
          titulo='RESULTADOS DE LA BUSQUEDA DE LOTES'
          CustomComponent={TablaLotesResultado}
          customComponentProps={{
            selectedRows: selectedRows,
            setSelectedRows:setSelectedRows,
            data:dataLotes,
            setValorTotalLote:setValorTotalLote,
            setSelectedLotes:setSelectedLotes,
            selectedLotes:selectedLotes
          }}
        />
      </Box>
    </>
  )
}

export default LotesComponents