import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InformeColeccion from '../components/InformeColeccion';


function Reports() {
  const [tableDataC, setTableDataC] = useState([])
  const [pic, setPicado] = useState(false);

  const fetchItems = () => {
    fetch("http://localhost:3030/getItems")
      .then((response) => response.json())
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data);
        setTableDataC(response.data);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const picado = () => {
    setPicado(true);
  };

  return (
    <>
        <Menu/>
        <Grid container spacing={2} sx={{margin:"0 auto", width:"200px", marginTop:"20px"}}>
          <Button id='but' onClick={picado} type="submit" variant='contained' fullWidth>INFORME COLECCION</Button>
        </Grid>
        {(pic === true) && (
          <InformeColeccion data={tableDataC}/>
        )} 
    </>
  );
}

export default Reports;