import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectOneItem = ({title = '', items = [], itemSeleccionado, setItemSelecionato}) => {
    
  const handleChange = (event) => {
    setItemSelecionato(event.target.value);
  };
  return (
    <>
 <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemSeleccionado}
          label={title}
          onChange={handleChange}
        >
            {items.map(item => (
                <MenuItem value={item.id}>{item.descripcion}</MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Box>

    </>
  )
}

export default SelectOneItem