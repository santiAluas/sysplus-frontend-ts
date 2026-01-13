import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import debounce from 'lodash/debounce';
import { All_DESCRIPTIONS_PRODUCTS_ACTIVE } from '../../services/Api_Inventario/Api_TomaFisicaInventario';

const DescripcionItem = ({ setDescriptionProduct, organizations, setOrganizations, setCodProducto, categoria = "" }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // 👈 guardamos la opción seleccionada (objeto)

  const debouncedFetch = useCallback(
    debounce(async (value) => {
      setLoading(true);
      const response = await All_DESCRIPTIONS_PRODUCTS_ACTIVE(value, categoria);
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
    if (inputValue) debouncedFetch(inputValue);
    else setOrganizations([]);
  }, [inputValue, debouncedFetch, setOrganizations]);

  const handleSelect = (event, newValue) => {
    // newValue aquí es tu objeto {value,label} o null
    if (newValue) {
      setSelectedOption(newValue);
      setDescriptionProduct(newValue.label);
      setCodProducto(newValue.value);
      setInputValue(newValue.label); // para que el input muestre lo seleccionado
    } else {
      setSelectedOption(null);
    }
  };

  const handleBlur = () => {
    // ✅ Si NO seleccionó nada, borrar lo escrito al perder foco
    if (!selectedOption) {
      setInputValue('');
      setDescriptionProduct('');
      setCodProducto('');
      setOrganizations([]);
    }
  };

  return (
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
        value={selectedOption}               // 👈 controlamos el valor seleccionado
        inputValue={inputValue}             // 👈 controlamos lo que se escribe
        onChange={handleSelect}
        onInputChange={(event, newInputValue, reason) => {
          // reason: 'input' | 'reset' | 'clear'
          setInputValue(newInputValue);
          if (reason === 'input') setSelectedOption(null); // si escribe, ya no hay selección válida
        }}
        filterOptions={(options) => options}
        getOptionLabel={(option) => option?.label ?? ''}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Descripcion Producto"
            onBlur={handleBlur} // 👈 aquí está la magia
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
};

export default DescripcionItem;
