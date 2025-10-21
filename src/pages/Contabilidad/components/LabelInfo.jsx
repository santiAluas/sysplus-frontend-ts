import { Box, Typography } from '@mui/material'
import React from 'react'

const LabelInfo = ({ title = "", information = "", fontSize = 11, colorTitle = 'textSecondary', colorLetters = "#ffe800" }) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Cambia a columna si necesitas ajustar la línea
                    overflow: 'hidden', // Maneja el desbordamiento
                    wordWrap: 'break-word', // Ajusta el texto en palabras
                    wordBreak: 'break-word', // Rompe palabras largas si es necesario
                    whiteSpace: 'normal', // Permite saltos de línea
                }}
            >
                <Typography
                    color= {colorTitle}
                    fontSize={12}
                    sx={{
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        color:colorLetters
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    color= {colorTitle}
                    fontSize={fontSize}
                    sx={{
                        whiteSpace: 'normal', // Permite que el texto se envuelva
                        wordWrap: 'break-word', // Ajusta palabras largas al ancho
                        wordBreak: 'break-word', // Rompe palabras largas si es necesario
                        color:colorLetters
                    }}
                >
                    {information}
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#93943e', // Color rojo para la línea
                        marginTop: '8px',
                        
                    }}
                />
            </Box>
        </>

    )
}

export default LabelInfo