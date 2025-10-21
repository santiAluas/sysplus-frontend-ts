import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'

export const SelectSINO = ({titulo, setSelect, itemSelect}) => {

    
   
    
    return (
        <>
            <FormControl fullWidth>
                <InputLabel htmlFor="grouped-native-select">{titulo}</InputLabel>
                <Select native defaultValue="" 
                        id="grouped-native-select" 
                        label="Grouping"
                        value={itemSelect}
                        onChange={(e) => setSelect(e.target.value)}>
                    <option value={0}>--SELECT--</option>
                    <option value={1}>SI TIENE</option>
                    <option value={2}>Faltante</option>
                    <option value={3}>Dañado-Roto</option>
                    <option value={4}>NO APLICA</option>
                </Select>
            </FormControl>
        </>
    )
}
