import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/Delete';

interface ItemType {
  id?: number;
  nombre: string;
  login: string;
  password: string;
  rol: string;
}

const itemInitialState: ItemType = {
  nombre: '',
  login: '',
  password: '',
  rol: '',
};

const Dashboard: React.FC = () => {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [tableData, setTableData] = useState<ItemType[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3030/getItems`);
      const data = await response.json();
      setTableData(data.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`);
      const result = await response.json();
      if (result > 0) {
        alert("Datos guardados con éxito");
        fetchItems();
        setItem(itemInitialState);
      } else {
        alert("Los datos no se han guardado");
      }
    } catch (error) {
      console.error("Error inserting item:", error);
      alert("Error al guardar los datos");
    }
  };

  const handleDeleteItem = async (item: ItemType) => {
    try {
      const response = await fetch(`http://localhost:3030/deleteItem?id=${item.id}`);
      const result = await response.json();
      if (result > 0) {
        alert("Elemento eliminado con éxito");
        fetchItems();
      } else {
        alert("Error al eliminar el elemento");
      }
    } catch (error) {
      console.error("Error in deletion:", error);
      alert("Error en la eliminación");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container sx={{ marginBottom: "70px" }}>
      <Paper elevation={3} square sx={{ textAlign: 'center', marginTop: "20px" }}>
        <Box sx={{ padding: "20px" }} component='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='Nombre'
                variant='outlined'
                fullWidth
                value={item.nombre}
                onChange={(e) => setItem({ ...item, nombre: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='login'
                variant='outlined'
                fullWidth
                value={item.login}
                onChange={(e) => setItem({ ...item, login: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='password'
                variant='outlined'
                fullWidth
                value={item.password}
                onChange={(e) => setItem({ ...item, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='rol'
                variant='outlined'
                fullWidth
                value={item.rol}
                onChange={(e) => setItem({ ...item, rol: e.target.value })}
              />
            </Grid>
          </Grid>
          <Divider sx={{ margin: "20px 0" }} />
          <Grid container spacing={2} sx={{ margin: "0 auto" }}>
            <Grid item xs={12}>
              <Button type="submit" variant='outlined' fullWidth>+ INSERTAR DATOS</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Tabla Colecciones">
          <TableHead sx={{ backgroundColor: "#d05eff" }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: "white" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white" }}>Login</TableCell>
              <TableCell sx={{ color: "white" }}>password</TableCell>
              <TableCell sx={{ color: "white" }}>rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: ItemType) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button onClick={() => handleDeleteItem(row)}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.rol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;