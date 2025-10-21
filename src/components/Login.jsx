import React, { useState } from 'react';
import {
    Box,
    Paper,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Divider
} from '@mui/material';
import { Visibility, VisibilityOff, PersonOutline, LockOutlined } from '@mui/icons-material';
import LogoOriginal from '../assets/images/LogoOriginal.png';
import Usuario from '../Models/UsuarioLogin';
import { getLogin } from '../services/Service_Api_Login';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChanceStyle from './ChanceStyle';
import { showAlert } from '@/utils/modalAlerts';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const Enter_System = async (e) => {
        e?.preventDefault?.();
        if (!user?.trim() || !password) return;

        Usuario.user = user;
        Usuario.password = password;

        try {
            setIsLoading(true);
            const result = await getLogin(Usuario);
            // navigate('/');
            window.location.reload();
            return result;
        } catch (error) {
            const configAlert = {
                title: 'Error',
                message: `Error: <strong>${error}</strong>.`,
                type: 'error',
                callBackFunction: false,
            };
            showAlert(configAlert);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') Enter_System(e);
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100dvh',
                width: '100%',
                display: 'grid',
                placeItems: 'center',
                p: 2,
                // Fondo elegante con gradiente
                background:
                    'radial-gradient(1200px 600px at 10% 10%, rgba(25,118,210,0.08), transparent), radial-gradient(1200px 600px at 90% 90%, rgba(156,39,176,0.08), transparent)',
            }}
        >
            {/* Extra: tu componente ChanceStyle si dibuja un botón/tema */}
            <ChanceStyle />

            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 350,
                    backdropFilter: 'blur(10px)',
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow:
                        '0 10px 30px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    bgColor: 'background.paper',
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                            'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={LogoOriginal}
                        alt="Logo"
                        sx={{
                            height: 80,
                            width: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                        }}
                    />
                </Box>

                <Divider />

                <CardContent sx={{ pl: 4, pr: 4, pb: 4 }}>
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        sx={{ textAlign: 'center', letterSpacing: 0.5, mb: 0.5 }}
                    >
                        LOGIN
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center', mb: 2 }}
                    >
                        Ingresa tus credenciales para continuar
                    </Typography>

                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={Enter_System}
                    >
                        <TextField
                            label="USUARIO"
                            placeholder="tu.usuario"
                            fullWidth
                            required
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            onKeyDown={handleKeyDown}
                            size="small"
                            autoFocus
                            margin="normal"
                            variant='standard'
                            InputProps={{
                                sx: {
                                    fontSize: "0.8rem", // ⬅️ Ajusta aquí el tamaño de la fuente
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline fontSize="small" />
                                    </InputAdornment>
                                ),
                                
                            }}
                            InputLabelProps={{
                                sx: { fontSize: "0.75rem" }, // ⬅️ Reduce el tamaño del label
                            }}
                        />

                        <TextField
                            label="CONTRASEÑA"
                            placeholder="••••••••"
                            fullWidth
                            variant='standard'
                            required
                            type={showPass ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            size="small"
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                      <LockOutlined fontSize="small" />
                                    </InputAdornment>
                                  ),
                                sx: {
                                    fontSize: "0.8rem", // ⬅️ Ajusta aquí el tamaño de la fuente
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mostrar/ocultar contraseña"
                                            onClick={() => setShowPass((s) => !s)}
                                            edge="end"
                                            size="small"
                                            tabIndex={-1}
                                        >
                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                sx: { fontSize: "0.75rem" }, // ⬅️ Reduce el tamaño del label
                            }}
                        />


                        <Button
                            variant="contained"
                            fullWidth
                            size='small'
                            type="submit"
                            onClick={Enter_System}
                            disabled={!user?.trim() || !password || isLoading}
                            sx={{
                                mt: 1,
                                py: 1.1,
                                fontWeight: 700,
                                letterSpacing: 0.4,
                                borderRadius: 2,
                                textTransform: 'none',
                                color: 'white',
                                height: 30
                            }}
                        >
                            {isLoading ? 'Ingresando…' : 'INGRESAR'}
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
                            <Typography variant='body1' >Version 2.0</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Paper>

            {/* Toastify container */}
            <ToastContainer />
        </Box>
    );
};

export default Login;
