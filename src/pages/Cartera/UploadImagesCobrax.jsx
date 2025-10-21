import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import BasePage from "@/componentesCommons/BasePage";


const UploadImagesCobrax = () => {
    const [images, setImages] = useState([]);
    const [codigoVerificacion, setCodigoVerificacion] = useState("");
    const [numeroCedula, setNumeroCedula] = useState("");
    const [tipoVerificacion, setTipoVerificacion] = useState("VL");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // Manejar la carga de imágenes
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
        setImages((prev) => [...prev, ...newImages]);
    };

    // Actualizar nombres de archivos cuando cambian los datos
    const getUpdatedImages = () => {
        return images.map((image) => {
            const random = Math.floor(10000 + Math.random() * 90000);
            return {
                ...image,
                fileName: `${tipoVerificacion}_${numeroCedula}_${codigoVerificacion}_${random}.jpg`
            };
        });
    };

    // Enviar imagen al servidor
    const uploadImage = async (imageData) => {
        const formData = new FormData();
        formData.append("cedula", numeroCedula);
        formData.append("empresa", "2");
        formData.append("cod_comprobante", codigoVerificacion);
        formData.append("file", imageData.file, imageData.fileName);

        try {
            const response = await axios.post("https://comprobantes.unnoparts.com.ec/api/UploadImage", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleSubmit = async () => {
        const updatedImages = getUpdatedImages();
        setIsProcessing(true);
        toast.info('Procesando archivo...', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
        for (const imageData of updatedImages) {
            await uploadImage(imageData);
        }
        toast.dismiss();
        toast.success('Proceso completado exitosamente', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    // Navegación del carrusel
    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (

        <BasePage title="SUBIR IMAGENES COBRAX">
            <Box sx={{ textAlign: "center", p: 0, mt: -3 }}>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
               
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <TextField
                        label="Número de Cédula"
                        variant="outlined"
                        value={numeroCedula}
                        onChange={(e) => setNumeroCedula(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Código de Verificación"
                        variant="outlined"
                        value={codigoVerificacion}
                        onChange={(e) => setCodigoVerificacion(e.target.value)}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Tipo de Verificación</InputLabel>
                        <Select
                            value={tipoVerificacion}
                            onChange={(e) => setTipoVerificacion(e.target.value)}
                        >
                            <MenuItem value="VL">Verificación Laboral</MenuItem>
                            <MenuItem value="VD">Verificación Domiciliaria</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" component="label">
                        Seleccionar Imágenes
                        <input type="file" multiple hidden onChange={handleImageUpload} accept="image/*" />
                    </Button>
                    {images.length > 0 && (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
                            <IconButton onClick={prevImage}><ArrowBack /></IconButton>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <img src={images[currentIndex].url} alt={`Imagen ${currentIndex}`} width={300} />
                            </Box>
                            <IconButton onClick={nextImage}><ArrowForward /></IconButton>
                        </Box>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Subir Imágenes
                    </Button>
                </Box>
            </Box>
        </BasePage>
    );
};

export default UploadImagesCobrax;
