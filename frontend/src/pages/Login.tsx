import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

function Login() {
  const [data, setData] = useState({ usuario: '', contraseña: '', corresponden: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.usuario === '' || data.contraseña === '') {
      setData({ ...data, corresponden: -1 });
      return;
    }
    fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.contraseña}`)
      .then(response => response.json())
      .then(response => {
        if (response.data.length !== 0) {
          dispatch(authActions.login({
            userName: data.usuario,
            userRol: response.data.rol
          }));
          setData({ ...data, corresponden: 1 });
          navigate("/Home");
        } else {
          setData({ ...data, corresponden: 2 });
        }
      })
      .catch(() => {
        setData({ ...data, corresponden: 2 });
      });
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, usuario: e.target.value });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, contraseña: e.target.value });
  };

  return (
    <Container sx={{ marginTop: "30px" }}>
      <Paper elevation={3} square={true} sx={{ textAlign: 'center', padding: "7px" }}>
        <Typography variant='h5'>Sistema de acceso</Typography>
        <IconButton>
          <LockIcon />
        </IconButton>
        <Box component='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <TextField
                required
                label="Usuario"
                variant='outlined'
                fullWidth
                value={data.usuario}
                onChange={handleChangeUser}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <TextField
                required
                label="Contraseña"
                variant='outlined'
                fullWidth
                value={data.contraseña}
                type='password'
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button sx={{ padding: "10px", marginTop: "10px" }} variant='contained' fullWidth type='submit'>
            Acceder
          </Button>
          {data.corresponden === 1 && (
            <Alert severity="success">Acceso concedido</Alert>
          )}
          {data.corresponden === 2 && (
            <Alert severity="error">Usuario y/o contraseña incorrecta</Alert>
          )}
          {data.corresponden === -1 && (
            <Alert severity="warning">Por favor, complete todos los campos</Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;