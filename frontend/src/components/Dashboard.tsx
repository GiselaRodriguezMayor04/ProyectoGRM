import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import { Divider } from '@mui/material';

interface ItemType {
    id?: number;
    articulo: string;
    persona: string;
    fecha: string;
  }
  
  const itemInitialState: ItemType = {
    articulo: '',
    persona: '',
    fecha: '',
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
        const response = await fetch(`http://localhost:3030/addItem?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`);
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
                  label='Articulo'
                  variant='outlined'
                  fullWidth
                  value={item.articulo}
                  onChange={(e) => setItem({ ...item, articulo: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  label='Persona'
                  variant='outlined'
                  fullWidth
                  value={item.persona}
                  onChange={(e) => setItem({ ...item, persona: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  type='date'
                  label='Fecha'
                  variant='outlined'
                  fullWidth
                  value={item.fecha}
                  onChange={(e) => setItem({ ...item, fecha: e.target.value })}
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
                <TableCell sx={{ color: "white" }}>Articulo</TableCell>
                <TableCell sx={{ color: "white" }}>Persona</TableCell>
                <TableCell sx={{ color: "white" }}>Fecha</TableCell>
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
                  <TableCell component="th" scope="row">{row.articulo}</TableCell>
                  <TableCell>{row.persona}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };
  
  export default Dashboard;