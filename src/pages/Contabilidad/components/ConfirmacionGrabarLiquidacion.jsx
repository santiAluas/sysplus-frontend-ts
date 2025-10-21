import { Grid, Typography } from '@mui/material'
import React from 'react'
import LabelInfo from './LabelInfo'
import InfofacturaConfimacion from './InfofacturaConfimacion'
import InfoRetencionesConfimacion from './InfoRetencionesConfimacion'
import InfoExtractoConfimacion from './InfoExtractoConfimacion'
import InfoLoteConfimacion from './InfoLoteConfimacion'

const ConfirmacionGrabarLiquidacion = ({ facturas = [],
                                         retenciones = [],
                                         extractos = [],
                                         dataLotes = [],
                                         valorTotalDocumentos,
                                         valorTotalLote,
                                         codigoLiquidacion,
                                         esLiquidacionParcial,
                                         esLiquidacionXCentavos }) => {
    return (
        <>
            <Typography variant='h4' sx={{ color: '#ffe800' }} marginBottom={2}>
                INFORMACION LIQUIDACION
            </Typography>
            <Grid container spacing={1}>
                <Grid item lg={6} sx={{ paddingRight: '0px', marginRight: '0px' }}>
                    <Grid container spacing={1} >
                        <Grid item lg={4}>
                            <LabelInfo title='Codigo Liquidacion' information={codigoLiquidacion} colorTitle='#ffe800'></LabelInfo>
                        </Grid>
                        <Grid item lg={4}>
                            <LabelInfo title='Es liquidacion Parcial' information={esLiquidacionParcial} colorTitle='#ffe800'></LabelInfo>
                        </Grid>
                        <Grid item lg={4}>
                            <LabelInfo title='Es liquidacion por CTV' information={esLiquidacionXCentavos} colorTitle='#ffe800'></LabelInfo>
                        </Grid>
                        <Grid item lg={4}>
                            <LabelInfo title='Valor total Doc. Electronico' information={valorTotalDocumentos} colorTitle='#ffe800'></LabelInfo>
                        </Grid>
                        <Grid item lg={4}>
                            <LabelInfo title='Valor total lote' information={valorTotalLote} colorTitle='#ffe800'></LabelInfo>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant='h6' sx={{ color: '#ffe800' }} >
                                FACTURAS
                            </Typography>
                            <InfofacturaConfimacion datafacturas={facturas} />
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant='h6' sx={{ color: '#ffe800' }} >
                                RETENCIONES
                            </Typography>
                            <InfoRetencionesConfimacion dataRetenciones={retenciones} />
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant='h6' sx={{ color: '#ffe800' }} >
                                EXTRACTOS
                            </Typography>
                            <InfoExtractoConfimacion dataExtractos={extractos} />
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item lg={5}>
                    <Typography variant='h6' sx={{ color: '#ffe800' }} >
                        LOTES
                    </Typography>
                    <InfoLoteConfimacion dataLotes={dataLotes} />
                </Grid>
            </Grid>

        </>
    )
}

export default ConfirmacionGrabarLiquidacion