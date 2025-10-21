import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import PersistentShell from '../components/PersistentShell';



export const Dashboard = () => {

  const[selectMenu, setSelectMenu] = React.useState("")
  React.useEffect(() => {
    
  },[selectMenu]);
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
      <PersistentShell/>
    </Box>
    </>
  )
}
