import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InformeColeccion from '../components/InformeColeccion';
import InformeDevaluacion from '../components/InformeDevaluacion';

function Reports() {
  const [tableDataC, setTableDataC] = useState([]);
  const [tableDataD, setTableDataD] = useState([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const fetchItems = () => {
    fetch("http://localhost:3030/getItems")
      .then((response) => response.json())
      .then((response) => {
        setTableDataC(response.data);
      });
  };

  const fetchDeval = () => {
    fetch("http://localhost:3030/getdeval")
      .then((response) => response.json())
      .then((response) => {
        setTableDataD(response.data);
      });
  };

  useEffect(() => {
    fetchItems();
    fetchDeval();
  }, []);

  const showReport = (reportType: string) => {
    setSelectedReport(reportType);
  };

  return (
    <>
      <Menu />
      <Grid container spacing={2} sx={{ margin: "0 auto", width: "200px", marginTop: "20px" }}>
        <Button id='but' onClick={() => showReport('coleccion')} type="submit" variant='contained' fullWidth>INFORME COLECCION</Button>
      </Grid>
      {selectedReport === 'coleccion' && (
        <InformeColeccion data={tableDataC} />
      )}

      <Grid container spacing={2} sx={{ margin: "0 auto", width: "200px", marginTop: "20px" }}>
        <Button id='but' onClick={() => showReport('devaluacion')} type="submit" variant='contained' fullWidth>INFORME DEVALUACION</Button>
      </Grid>
      {selectedReport === 'devaluacion' && (
        <InformeDevaluacion data={tableDataD} />
      )}
    </>
  );
}

export default Reports;