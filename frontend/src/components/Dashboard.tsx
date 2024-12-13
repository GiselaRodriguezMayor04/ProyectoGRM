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
  articulo: string;
  meses: string;
  devaluacion: string;
}

const itemInitialState: ItemType = {
  articulo: '',
  meses: '',
  devaluacion: '',
};

const Dashboard: React.FC = () => {
  const [item, setItem] = useState<ItemType>(itemInitialState);
  const [tableData, setTableData] = useState<ItemType[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3030/getdeval`);
      const data = await response.json();
      setTableData(data.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/adddeval?articulo=${item.articulo}&meses=${item.meses}&devaluacion=${item.devaluacion}`);
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
      const response = await fetch(`http://localhost:3030/deletedeval?id=${item.id}`);
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
                label='articulo'
                variant='outlined'
                fullWidth
                value={item.articulo}
                onChange={(e) => setItem({ ...item, articulo: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='meses'
                variant='outlined'
                fullWidth
                value={item.meses}
                onChange={(e) => setItem({ ...item, meses: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                required
                label='devaluacion'
                variant='outlined'
                fullWidth
                value={item.devaluacion}
                onChange={(e) => setItem({ ...item, devaluacion: e.target.value })}
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
        <Table sx={{ minWidth: 650 }} aria-label="Tabla Devaluacion">
          <TableHead sx={{ backgroundColor: "#d05eff" }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: "white" }}>articulo</TableCell>
              <TableCell sx={{ color: "white" }}>meses</TableCell>
              <TableCell sx={{ color: "white" }}>devaluacion</TableCell>
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
                <TableCell>{row.articulo}</TableCell>
                <TableCell>{row.meses}</TableCell>
                <TableCell>{row.devaluacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;