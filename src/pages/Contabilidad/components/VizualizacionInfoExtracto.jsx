import React from 'react'
import ExtractoB from '../class/ExtractoBancario';
import { Chip, Grid } from '@mui/material'
import LabelInfo from './LabelInfo';
import Divider from '@mui/material/Divider';

const VizualizacionInfoExtracto = ({ Item = ExtractoB, index='' }) => {
    return (
        <>
            <div style={{  }}>
                <Divider
                    textAlign="left"
                    sx={{
                        "&::before, &::after": {
                            borderColor: "#eeeae9",
                            borderWidth: "2px",
                        },
                    }}
                >
                    <Chip label={`EXTRACTO #${index}`} size="small" />
                </Divider>
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                        <LabelInfo title="REFERENCIAS:" information={Item.referenceno} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="DEBITO:" information={Item.debito} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="CREDITO:" information={Item.credito} />
                    </Grid>
                    <Grid item lg={4}>
                        <LabelInfo title="FECHA CONTABLE:" information={Item.fecha_contable} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default VizualizacionInfoExtracto