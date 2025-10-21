import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import login from '../assets/images/login.png';
import Login from '../components/Login';
import { Box, Hidden } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export const Index = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    justifyContent: 'center',
    width: '100%',
  }));

  return (
    <>
      <CssBaseline />
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        <Hidden smDown>
          <Grid item xs={0} sm={7} md={7} sx={{ height: '100%' }}>
            <Box
              component="img"
              src={login}
              alt="Login Empresa"
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', 
              }}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={5} sm={5} sx={{ height: '100vh' }}>
          <Item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Login />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
