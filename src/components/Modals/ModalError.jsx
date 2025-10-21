import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const ModalError = ({open,setOpen, titulo, mensaje}) => {
    const handleClose = () => setOpen(false);
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign='center' 
                      id="modal-modal-title" 
                      variant="h6" 
                      component="h2">
            {titulo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {mensaje}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default ModalError