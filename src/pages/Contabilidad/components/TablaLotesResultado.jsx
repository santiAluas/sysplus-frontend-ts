import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { sonObjetosIguales } from '../class/MetodosLiquidaciones';
import dayjs from 'dayjs';
import { keyframes } from '@mui/system';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#ffe800',
      color: '#171718',
      fontWeight: 'bold',
      width: '50%',
      fontSize: '1em',
      textAlign: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '1em',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      width: '100%',
      textAlign: 'left'
    },
  }));

const TablaLotesResultado = ({
    data = [],
    setSelectedLotes,
    selectedLotes,
    selectedRows,
    setSelectedRows
}) => {
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);



    const handleNextPage = () => {
        if ((page + 1) * itemsPerPage < data.length) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleRowSelection = (index, row) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
            setSelectedLotes(selectedLotes.filter((selectedRow) => selectedRow !== row));
        } else {
            setSelectedRows([...selectedRows, index]);
            setSelectedLotes([...selectedLotes, row]);
        }
    };

    const estaSeleccionado = () => {
        const indicesSeleccionados = data
            .map((item, index) => {
                const loteExistente = selectedLotes.find(selectedLote => sonObjetosIguales(selectedLote, item, ["valorcomisionfactura", "valorretencioniva", "valorretencionrenta", "valorextracto"]));
                return loteExistente ? index : null;
            })
            .filter(index => index !== null);
        setSelectedRows(indicesSeleccionados);
    };


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
    };

    useEffect(() => {
        estaSeleccionado();
    }, [data]);

    const estiloFila = (padding, fontSize = '11') => {
        return {
            padding: padding,
            textAlign: 'left',
            fontSize: fontSize
        }
    }
    return (

        <Box sx={{
            width: '100%',
            overflowX: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>
                {`@keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }`}
            </style>
            <table className="styled-table" style={{
                borderCollapse: 'collapse',
                fontSize: '0.6em',
                fontFamily: 'sans-serif',
                width: '100%',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#3a3a3a',
                //tableLayout: 'fixed'
            }}>
                <thead>
                    <tr >
                        <StyledTableCell scope="col" style={{ width: '5%', fontSize: '11px' }}></StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '5%', fontSize: '11px' }}>LOTE</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '5%', fontSize: '11px' }}>RECAP</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '6%', fontSize: '11px' }}>FECHA CONTABLE</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '5%', fontSize: '11px' }}>DOC PAGO COBRO</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '6%', fontSize: '11px' }}>CLIENTE</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '6%', fontSize: '11px' }}>FACTURA</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '7%', fontSize: '11px' }}>TIPO CREDITO</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '7%', fontSize: '11px' }}>BANCO PROCES.</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '8%', fontSize: '11px' }}>BANCO EMISOR</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '8%', fontSize: '11px' }}>TARJETA</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '8%', fontSize: '11px' }}>USUARIO 1</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '6%', fontSize: '11px' }}>T.CUOTA</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '5%', fontSize: '11px' }}>#CUOTA</StyledTableCell>
                        <StyledTableCell scope="col" style={{ width: '8%', fontSize: '11px' }}>FECH. VENCIM</StyledTableCell>

                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => {
                        const globalIndex = startIndex + index;
                        const isSelected = selectedRows.includes(globalIndex);
                        return (
                            <tr key={globalIndex}
                                style={{
                                    position: 'relative',
                                    backgroundColor: isSelected ? '#4a4a4a' : '#3a3a3a',
                                    borderBottom: '1px solid #444444',
                                    color: '#ffffff',
                                    backgroundColor: dayjs(row.fechavencimientocuota).isBefore(dayjs(), 'day') ? '#4e0000' : 'inherit',
                                    animation: dayjs(row.fechavencimientocuota).isBefore(dayjs(), 'day') ? 'blink 1s infinite' : 'none'
                                }}>
                                <td data-label="SELECCIONAR" style={{ padding: '12px 15px', textAlign: 'left' }}>
                                    <Tooltip title={isSelected ? "Remover lote" : "Añadir lote"} arrow>
                                        <Box>
                                            <IconButton
                                                onClick={() => handleRowSelection(globalIndex, row)}
                                                sx={{
                                                    width: 25,
                                                    height: 25,
                                                    color: isSelected ? '#4CAF50' : '#ffe800'
                                                }}>
                                                <PlaylistAddCheckCircleIcon />
                                            </IconButton>
                                            {isSelected && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: '#ffffff',
                                                        fontSize: '0.5rem',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                    Añadido
                                                </Typography>
                                            )}
                                        </Box>
                                    </Tooltip>
                                </td>
                                <td data-label="LOTE" style={estiloFila('5px 10px')}>{row.lote}</td>
                                <td data-label="RECAP" style={estiloFila('5px 10px')}>{row.recap}</td>
                                <td data-label="FECHA" style={estiloFila('5px 10px')}>{(row.f_contable)}</td>
                                <td data-label="DOC PAGO COBRO" style={estiloFila('2px 2px')}>{row.doc_pago_cobro}</td>
                                <td data-label="CLIENTE" style={estiloFila('2px 2px', 9)}>{row.cliente}</td>
                                <td data-label="FACTURA" style={estiloFila('2px 2px')}>{row.factura}</td>
                                <td data-label="TIPO CREDITO" style={estiloFila('2px 5px')}>{row.tipo_credito}</td>
                                <td data-label="BANCO PROCESADOR" style={estiloFila('2px 2px', 8)}>{row.bco_procesador}</td>
                                <td data-label="BANCO EMISOR" style={estiloFila('2px 2px',8)}>{row.bco_emisor}</td>
                                <td data-label="TARJETA" style={estiloFila('2px 2px', 9)}>{row.tarjeta}</td>
                                <td data-label="USUARIO 1" style={estiloFila('2px 2px', 9)}>{row.usuario1}</td>
                                <td data-label="IMPORTE DEP" style={estiloFila('5px 2px')}>$ {row.totalcuota}</td>
                                <td data-label="USUARIO 1" style={estiloFila('2px 2px')}>{row.cuotas}</td>
                                <td data-label="USUARIO 1" style={estiloFila('2px 2px')}>{dayjs(row.fechavencimientocuota).format('YYYY-MM-DD')}</td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div style={{
                display: data.length === 0 ? 'none' : 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#3a3a3a',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                color: '#ffffff'
            }}>
                <Button
                    variant="contained"
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': { backgroundColor: '#3d8b40' },
                        '&:disabled': { backgroundColor: '#404040' }
                    }}>
                    Anterior
                </Button>
                <span style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ffffff' }}>
                    Página {page + 1} de {totalPages}
                </span>
                <Button
                    variant="contained"
                    onClick={handleNextPage}
                    disabled={(page + 1) * itemsPerPage >= data.length}
                    sx={{
                        backgroundColor: '#4CAF50',
                        '&:hover': { backgroundColor: '#3d8b40' },
                        '&:disabled': { backgroundColor: '#404040' }
                    }}>
                    Siguiente
                </Button>
            </div>
        </Box>
    );
};

export default TablaLotesResultado;
