import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SelectChips = ({ data = [], title = 'Select Items', chipData, setChipData}) => {
  const [selectedValue, setSelectedValue] = useState(''); // Valor temporal del Select

  // Manejar la selección de elementos
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Agregar el elemento al listado de chips si no está ya presente
    if (!chipData.includes(value)) {
      setChipData([...chipData, value]);
    }

    // Limpiar el valor del Select
    setSelectedValue('');
  };

  // Manejar la eliminación de un chip
  const handleDelete = (chipToDelete) => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Select para seleccionar elementos */}
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="select-chip-label">{title}</InputLabel>
        <Select
          labelId="select-chip-label"
          id="select-chip"
          value={selectedValue}
          onChange={handleChange}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.description}>
              {item.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Visualización de Chips */}
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        {chipData.map((data) => (
          <ListItem key={data}>
            <Chip label={data} onDelete={() => handleDelete(data)} />
          </ListItem>
        ))}
      </Paper>
    </Box>
  );
};

export default SelectChips;
