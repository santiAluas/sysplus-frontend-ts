import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'

const LotesSeleccionados = () => {
    return (
        <>
            <Accordion sx={{
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(200, 200, 191, 0.1)',
                marginTop: '6px'
            }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h8">LOTES SELECCIONADOS</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ position: 'relative', paddingBottom: '0px' }}>
                   
                   
                </AccordionDetails>

            </Accordion>
        </>
    )
}

export default LotesSeleccionados