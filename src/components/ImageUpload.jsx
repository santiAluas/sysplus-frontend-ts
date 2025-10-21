import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

// Crear el tema oscuro
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
        },
    },
});

const PdfUpload = ({pdfFile, setPdfFile}) => {
    const [pdfFileName, setPdfFileName] = useState(null);

    // Callback para manejar el archivo cuando es soltado en la zona
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            setPdfFileName(file.name);
        } else {
            alert('Por favor, selecciona un archivo PDF.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pdfFile) {
            const formData = new FormData();
            formData.append('file', pdfFile);

            try {
                const response = await axios.post('https://your-server.com/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Error subiendo el PDF:', error);
            }
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                <Grid item xs={pdfFileName === null ? 12 : 6} lg={pdfFileName === null ? 12 : 6}>
                    <div>
                        <h2 style={{ color: '#90caf9' }}>Subir PDF</h2>
                        <div
                            {...getRootProps()}
                            style={{
                                border: '2px dashed #90caf9',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: '#1e1e1e',
                                color: '#ffffff',
                            }}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p style={{ color: '#90caf9' }}>Suelta el archivo PDF aquí...</p>
                            ) : (
                                <p>Arrastra un archivo PDF o haz clic para seleccionar uno</p>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={pdfFileName === null ? 12 : 6} lg={pdfFileName === null ? 12 : 6}>
                    {pdfFileName && (
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                            {/* Icono PDF */}
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                alt="PDF Icon"
                                style={{ width: '50px', marginRight: '10px' }}
                            />
                            <span>{pdfFileName}</span>
                        </div>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default PdfUpload;
