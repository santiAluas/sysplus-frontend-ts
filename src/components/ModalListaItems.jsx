import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ffe800',
    color: '#171718',
    fontWeight: 'bold',
    with: '100%'

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    with: '100%'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ModalListaItems = ({
  data = [],
  columns = [],
  setItemSeleccionado,
  titulo = '',
  mensaje = '',
  open = false,
  setOpen,
  nombreColumnasOcultar = [],
  CustomComponent = null,
  customComponentProps = {},
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const Elegir_Item = (item) => {
    setItemSeleccionado(item);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" textAlign="center" component="h2">
          {titulo}
        </Typography>
        <Typography id="modal-modal-description" textAlign="center" sx={{ mt: 1, mb: 1 }}>
          {mensaje}
        </Typography>

        {CustomComponent ? (
          <CustomComponent
            {...customComponentProps}
            data={data}
            onAction={Elegir_Item}
          />
        ) : (
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table stickyHeader sx={{ tableLayout: 'auto', minWidth: 650 }} size="small">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center" >Acción</StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      align={column.align || 'left'}
                      sx={{
                        display: nombreColumnasOcultar.some((col) => col.toLowerCase() === column.field.toLowerCase()) ? 'none' : 'table-cell',
                        width: `${100 / (columns.length - 2)}%`,
                        wordBreak: 'break-word',
                      }}
                    >
                      {column.headerName}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => Elegir_Item(row)}
                      >
                        seleccionar
                      </Button>
                    </StyledTableCell>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.field}
                        align={column.align || 'left'}
                        sx={{
                          display: nombreColumnasOcultar.some((col) => col.toLowerCase() === column.field.toLowerCase()) ? 'none' : 'table-cell',
                          wordBreak: 'break-word',
                        }}
                      >
                        {row[column.field]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

export default ModalListaItems;
