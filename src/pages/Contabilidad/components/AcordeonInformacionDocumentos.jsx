import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Fab } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
const AcordeonInformacionDocumentos = ({ title,
  lista,
  DetallesComponente,
  funcionEliminar,
  setLista,
  camposASumar = [],
  tituloCamposSumar = [],
  valorTotalLote,
  setValorTotalLote
}) => {


  const totales = camposASumar.reduce((acc, campo) => {
    const suma = lista.reduce((total, item) => total + (parseFloat(item[campo]) || 0), 0);
    acc[campo] = parseFloat(suma.toFixed(2));
    return acc;
  }, {});
  
  return (
    <Accordion sx={{
      borderRadius: 2,
      boxShadow: '0px 4px 10px rgba(200, 200, 191, 0.1)',
      marginTop: '6px',
    }}>
      <AccordionSummary expandIcon={<ExpandMore />}  sx={{
    minHeight: '34px', // Altura mínima de la cabecera
    '&.Mui-expanded': {
      minHeight: '34px', // Altura cuando está expandido
    },
    '.MuiAccordionSummary-content': {
      margin: '0', // Margen del contenido interno
    },
  }}>
        <Typography fontSize={14}>{title}</Typography>
      </AccordionSummary>
      {lista.map((item, index) => (
        <div key={index}>
          <AccordionDetails sx={{ position: 'relative', paddingBottom: '0px' }}>
            <Fab color="secundary"
              aria-label="add"
              onClick={(e) => funcionEliminar(item, setLista)}
              sx={{ position: 'absolute', top: 0, right: 5, width: 35, height: 15 }} >
              <DeleteIcon />
            </Fab>
            <DetallesComponente Item={item} index={index + 1} setLista={setLista} lista={lista} valorTotalLote={valorTotalLote} setValorTotalLote={setValorTotalLote} />
          </AccordionDetails>
        </div>
      ))}
      {camposASumar.length > 0 && (
        <AccordionDetails sx={{ paddingTop: '0px' }}>
          <Typography >Totales:</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {camposASumar.map((campo, index) => (
              <Typography key={campo}>
                 {tituloCamposSumar.length > 0 ? tituloCamposSumar[index] : campo}: {isNaN(totales[campo]) ? '$0.00' : `$ ${totales[campo]}`}
              </Typography>
            ))}
          </div>

        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default AcordeonInformacionDocumentos