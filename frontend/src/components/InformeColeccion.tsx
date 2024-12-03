import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useState } from "react";
import { Button } from "@mui/material";

interface InformeColeccionProps {
  data: Array<{
    nombre: string;
    login: string;
    password: string;
    rol: string;
  }>;
}

function InformeColeccion({ data }: InformeColeccionProps) {
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  const columnasColeccion = [
    { title: "Nombre", field: "nombre" },
    { title: "Login", field: "login" },
    { title: "Password", field: "password" },
    { title: "Rol", field: "rol" },
  ];

  const columnasUsuario = [
    { title: "Nombre", field: "nombre", filtering: true },
    { title: "Login", field: "login", filtering: false },
    { title: "Password", field: "password", filtering: false },
    { title: "Rol", field: "rol", filtering: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Button
          variant="contained"
          color={!mostrarUsuarios ? "primary" : "secondary"}
          onClick={() => setMostrarUsuarios(false)}
        >
          Informe Colección
        </Button>
        <Button
          variant="contained"
          color={mostrarUsuarios ? "primary" : "secondary"}
          onClick={() => setMostrarUsuarios(true)}
          style={{ marginLeft: "1rem" }}
        >
          Informe Usuario
        </Button>
      </div>
      {mostrarUsuarios ? (
        <MaterialTable
          title="Informe Usuario"
          columns={columnasUsuario}
          data={data}
          options={{
            exportMenu: [
              {
                label: "Exportar a PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeUsuario"),
              },
              {
                label: "Exportar a CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeUsuario"),
              },
            ],
            paging: true,
            search: true,
            filtering: true,
            headerStyle: {
              backgroundColor: "#d05eff",
              color: "white",
            },
            draggable: true,
            columnsButton: true,
          }}
        />
      ) : (
        <MaterialTable
          title="Informe de Colección"
          columns={columnasColeccion}
          data={data}
          options={{
            exportMenu: [
              {
                label: "Exportar a PDF",
                exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeColeccion"),
              },
              {
                label: "Exportar a CSV",
                exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeColeccion"),
              },
            ],
            paging: true,
            search: true,
            filtering: true,
            headerStyle: {
              backgroundColor: "#d05eff",
              color: "white",
            },
            draggable: true,
          }}
          renderSummaryRow={({ column, data }) =>
            column.field === "rol"
              ? {
                  value: data.filter(row => row.rol === "admin").length,
                  style: { background: "#d05eff", color: "white" },
                }
              : undefined
          }
        />
      )}
    </div>
  );
}

export default InformeColeccion;
