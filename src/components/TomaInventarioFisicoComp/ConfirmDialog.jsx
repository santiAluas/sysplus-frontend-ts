import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const ConfirmDialog = ({ title, open, setOpen, functionConfirm, functionCancel }) => {

    const confirmDialog = async () => {
        await functionConfirm()
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);
        functionCancel()
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{color:'black'}}>
                    {title}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={confirmDialog}>ACEPTAR</Button>
                    <Button onClick={handleClose} autoFocus>
                        CANCELAR
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ConfirmDialog