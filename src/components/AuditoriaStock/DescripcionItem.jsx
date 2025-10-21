import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import debounce from 'lodash/debounce';
import { All_DESCRIPTIONS_PRODUCTS_ACTIVE } from '../../services/Api_Inventario/Api_TomaFisicaInventario';

const DescripcionItem = ({ setDescriptionProduct, organizations, setOrganizations, setCodProducto, categoria = "" }) => {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(''); // Estado para el texto del input
    const [selectedValue, setSelectedValue] = useState(null); // Estado para el valor seleccionado

    const debouncedFetch = useCallback(
        debounce(async (value) => {
            setLoading(true);
            const response = await All_DESCRIPTIONS_PRODUCTS_ACTIVE(value,categoria);
            const uniqueResponse = response.reduce((acc, current) => {
                const x = acc.find(item => item.ad_org_id === current.ad_org_id);
                return !x ? acc.concat([current]) : acc;
            }, []);
            setOrganizations(uniqueResponse);
            setLoading(false);
        }, 500),
        []
    );

    useEffect(() => {
        if (inputValue) {
            debouncedFetch(inputValue);
        } else {
            setOrganizations([]); 
        }
    }, [inputValue, debouncedFetch]);

    const handleSelect = (event, newValue) => {
        event.preventDefault();
        if (newValue) {
            setSelectedValue(newValue.label); // Guardar el valor seleccionado de la lista
            setDescriptionProduct( newValue.label);
            setCodProducto(newValue.value)
        } else {
            setSelectedValue(inputValue); // Guardar el valor manualmente ingresado
            setDescriptionProduct(inputValue);
        }
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Autocomplete
                    freeSolo
                    id="autocomplete-organization"
                    disableClearable
                    loading={loading}
                    options={organizations.map((org) => ({
                        value: org.ad_org_id,
                        label: org.name,
                    }))}
                    isOptionEqualToValue={(option, value) => option.value === value}
                    filterOptions={(options) => options} // Deshabilitar el filtro local, lo haces con la API
                    onChange={handleSelect}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue); // Actualizar el inputValue para disparar el debounce
                    }}
                    getOptionLabel={(option) => option.label || inputValue}
                    renderOption={(props, option) => (
                        <li {...props} key={option.value}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Buscar Descripcion Producto"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>
        </>
    );
};

export default DescripcionItem;
