import { TextField } from '@mui/material';
import React from 'react';

const TextFielCustom = ({ 
    title, 
    value, 
    enable = true, 
    setValue = null, 
    type = 'text', 
    functionCustom = null // Función opcional
}) => {


    const handleInputChange = (e) => {
        let inputValue = e.target.value;

        if (type === 'text') {
            if (functionCustom) {
                functionCustom(inputValue);
            } else if (setValue) {
                setValue(inputValue);
            }
            return;
        }

        if (type === 'number') {
            let filteredValue = inputValue.replace(/[^0-9]/g, ''); // Solo números

            if (functionCustom) {
                // Eliminar ceros a la izquierda sin perder formato decimal
                filteredValue = filteredValue.replace(/^0+/, '') || '0';
                
                // Formatear a moneda con dos decimales
                const length = filteredValue.length;
                let formattedValue;
                
                if (length > 2) {
                    formattedValue = `${filteredValue.slice(0, length - 2)}.${filteredValue.slice(length - 2)}`;
                } else if (length === 2) {
                    formattedValue = `0.${filteredValue}`;
                } else {
                    formattedValue = `0.0${filteredValue}`;
                }

                functionCustom(formattedValue);
            } else {
                if (filteredValue === '') {
                    inputValue = '0.00';
                } else {
                    const length = filteredValue.length;
                    if (length > 2) {
                        inputValue = `${filteredValue.slice(0, length - 2)}.${filteredValue.slice(length - 2)}`;
                    } else if (length === 2) {
                        inputValue = `0.${filteredValue}`;
                    } else {
                        inputValue = `0.0${filteredValue}`;
                    }
                }
                if (setValue) {
                    setValue(inputValue);
                }
            }
        }
    };

    return (
        <>
            <p style={{
                paddingBottom: 0,
                marginBottom: 0,
                marginTop: 0,
                fontSize: '10px'
            }}>
                {title}
            </p>
            <TextField 
                id="standard-basic"
                label=""
                value={value}
                onChange={handleInputChange} 
                variant="standard"
                disabled={!enable}
                fullWidth
                InputProps={{
                    sx: { fontSize: '12px' } 
                }}
                size="small"
            />
        </>
    );
};

export default TextFielCustom;
