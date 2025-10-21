import React, { useState, useEffect } from 'react'
import LotesInit from '../class/LotesInit';
import { Chip, Grid } from '@mui/material'
import LabelInfo from './LabelInfo';
import Divider from '@mui/material/Divider';
import TextFielCustom from '../../../components/TextFielCustom';
import { sonObjetosIguales } from '../class/MetodosLiquidaciones';

const VizualizarInfoLotes = ({ Item = LotesInit, index = '', 
    setLista, 
    lista, 
    setValorTotalLote }) => {
    const [totalValoresLotes, setTotalValoresLotes] = useState(0);
    const [esIgualValorCuotaTotal, setEsIgualValorCuotaTotal] = useState(true);

    const handleTotalDestinoUpdate = (item, newValue, tipoTotal) => {
        const updatedLista = lista.map(lote =>
            sonObjetosIguales(lote, item, ["valorcomisionfactura", "valorretencioniva", "valorretencionrenta", "valorextracto"])? { ...lote, [tipoTotal]: newValue } : lote
        );
        setLista(updatedLista);
    };

    useEffect(() => {
        const total = (parseFloat(Item.valorcomisionfactura || 0) + parseFloat(Item.valorretencioniva || 0) + parseFloat(Item.valorretencionrenta || 0) + parseFloat(Item.valorextracto || 0)).toFixed(2);
        setTotalValoresLotes(total);
        const totalGlobal = lista.reduce((sum, lote) => {
            return sum + (parseFloat(lote.totalcuota || 0));
        }, 0).toFixed(2);
        setEsIgualValorCuotaTotal( parseFloat(Item.totalcuota || 0)  === parseFloat(total || 0) ? true : false )
        setValorTotalLote(totalGlobal);
    }, [lista]);

    return (
        <>
            <div>
                <Divider textAlign="left"
                    sx={{
                        "&::before, &::after": {
                            borderColor: "#eeeae9",
                            borderWidth: "2px",
                        },
                    }}>
                    <Chip label={`RETENCION #${index}`} size="small" />
                </Divider>
                <Grid container spacing={2}>

                    <Grid item lg={4}>
                        <LabelInfo title="LOTE:" information={Item.lote} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="FECHA CONTABLE:" information={Item.f_contable} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="CUOTA:" colorLetters={!esIgualValorCuotaTotal ? '#FF4136': "#FFD700" }  information={`${Item.totalcuota} (${Item.cuotas})`} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="CLIENTE:" information={Item.cliente} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="TARJETA:" information={Item.tarjeta} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="USUARIO 1:" information={Item.usuario1} />
                    </Grid>
                    <Grid item lg={4}>
                        <TextFielCustom
                            title="TOTAL COMISION:"
                            value={Item.valorcomisionfactura}
                            functionCustom={(newValue) => handleTotalDestinoUpdate(Item, newValue, "valorcomisionfactura")}
                            enable={true}
                            type='number'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextFielCustom
                            title="VALOR RETENCION IVA:"
                            value={Item.valorretencioniva}
                            functionCustom={(newValue) => handleTotalDestinoUpdate(Item, newValue, "valorretencioniva")}
                            enable={true}
                            type='number'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextFielCustom
                            title="VALOR RETENCION RENTA:"
                            value={Item.valorretencionrenta}
                            functionCustom={(newValue) => handleTotalDestinoUpdate(Item, newValue, "valorretencionrenta")}
                            enable={true}
                            type='number'
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <TextFielCustom
                            title="VALOR ACREDITADO:"
                            value={Item.valorextracto}
                            functionCustom={(newValue) => handleTotalDestinoUpdate(Item, newValue, "valorextracto")}
                            enable={true}
                            type='number'
                        />
                    </Grid>
                    <Grid item lg={4} >
                        <LabelInfo title="TOTAL:" colorLetters={!esIgualValorCuotaTotal ? '#FF4136': "#FFD700" }  information={totalValoresLotes} />
                    </Grid>
                </Grid>
            </div>


        </>
    )
}
export default VizualizarInfoLotes