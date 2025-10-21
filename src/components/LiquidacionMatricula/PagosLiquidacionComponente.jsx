import { Button, Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SubirValores from './SubirValores';
import Liquidacion from '../../Models/ValorLiquidacion';
const PagosLiquidacionComponente = (props) => {
    const { valoresLiquidacion, setValoresLiquidacion, setmodificcion, pagosExtraordinario } = props
    // const [valoresLiquidacion, setValoresLiquidacion] = React.useState({
    //                                                     Placas:  new Liquidacion('PLACAS', 0, null),
    //                                                     ImpuestosMunicipales:  new Liquidacion('IMPUESTOS MUNICIPALES', 0, null),
    //                                                     ImpuestosProvinciales:  new Liquidacion('IMPUESTOS PROVINCIALES', 0, null),
    //                                                     RodajeMunicipal:  new Liquidacion('RODAJE MUNICIPAL', 0, null),
    //                                                     RodajeProvincial:  new Liquidacion('RODAJE PROVINCIAL', 0, null),
    //                                                     RevicionVehicular:  new Liquidacion('REVICION VEHICULAR', 0, null),
    //                                                     Stiker:  new Liquidacion('STIKER', 0, null),
    //                                                     CertificadoNoAdeudar:  new Liquidacion('CERTIFICDO NO ADEUDAR', 0, null),
    //                                                     PagosExtraordinarios:  new Liquidacion('PAGOS EXTRAORDINARIOS', 0, null),
    //                                                     AdicionalValorFactura:  new Liquidacion('ADICIONAL POR VALOR DE FACTURA', 0, null),
    //                                                     GestorVarios:  new Liquidacion('GESTOR VARIOS', 0, null),
    //                                                 })
    return (
        <div style={{ paddingLeft: 5, paddingRight: 5, textAlign: 'left' }}>
            <SubirValores titulo="Placas" liquidacion={valoresLiquidacion.Placas} setmodificcion={setmodificcion} />
            <SubirValores titulo="Impuestos Municipales" liquidacion={valoresLiquidacion.ImpuestosMunicipales} setmodificcion={setmodificcion} />
            <SubirValores titulo="Impuestos Provinciales" liquidacion={valoresLiquidacion.ImpuestosProvinciales} setmodificcion={setmodificcion} />
            <SubirValores titulo="Rodaje Municipal" liquidacion={valoresLiquidacion.RodajeMunicipal} setmodificcion={setmodificcion} />
            <SubirValores titulo="Rodaje Provincial" liquidacion={valoresLiquidacion.RodajeProvincial} setmodificcion={setmodificcion} />
            <SubirValores titulo="Revision Vehicular" liquidacion={valoresLiquidacion.RevicionVehicular} setmodificcion={setmodificcion} />
            <SubirValores titulo="Sticker" liquidacion={valoresLiquidacion.Stiker} setmodificcion={setmodificcion} />
            <SubirValores titulo="Certificado no adeudar" liquidacion={valoresLiquidacion.CertificadoNoAdeudar} setmodificcion={setmodificcion} />
            <SubirValores titulo="Pagos Extraordinarios" pagosExtraordinario={pagosExtraordinario} liquidacion={valoresLiquidacion.PagosExtraordinarios} setmodificcion={setmodificcion} />
            <SubirValores titulo="Adicional por valor de factura" liquidacion={valoresLiquidacion.AdicionalValorFactura} setmodificcion={setmodificcion} />
            <SubirValores titulo="Gestor varios"  liquidacion={valoresLiquidacion.GestorVarios} setmodificcion={setmodificcion} />
        </div>
    )
}

export default PagosLiquidacionComponente