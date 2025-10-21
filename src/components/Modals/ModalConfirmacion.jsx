import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
  };
const ModalConfirmacion = ({open,setOpen, titulo, mensaje, setConfirmacion}) => {
  
  const handleClose = () => {
    setOpen(false)
    setConfirmacion("NO")
  };
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            {titulo}
          </Typography>
          <Typography id="modal-modal-description" textAlign='center' sx={{ mt: 2 }}>
            {mensaje}
          </Typography>
          <Stack direction="row"
                 justifyContent="center"
                 alignItems="center"
                 flexWrap='wrap'
                 spacing={2}
                 mt={2}>
            <Button variant="outlined" color="success" sx={{width: '40%'}} onClick={(e) => setConfirmacion("SI")}>SI</Button>
            <Button variant="outlined" color="error" sx={{width: '40%'}}  onClick={handleClose}>NO</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default ModalConfirmacion
