import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface InformeColeccionProps {
  data: Array<{
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
  }>;
}

function InformeColeccion({ data }: InformeColeccionProps) {
  const columns = [
    { title: "Nombre", field: "nombre" },
    { title: "Marca", field: "marca" },
    { title: "Tipo", field: "tipo" },
    { title: "Precio", field: "precio" },
  ];

  return (
    <div>
      <MaterialTable
        title="Informe de Colección"
        columns={columns}
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
          maxColumnSort: 10,
          columnsButton: true,
          filtering: true,
          headerStyle: {
            backgroundColor: "#d05eff",
            color: "white",
          },
          draggable: true,
        }}
        renderSummaryRow={({ column, data }) =>
          column.field === "precio"
            ? {
                value: data.reduce((agg, row) => agg + row.precio, 0),
                style: { background: "#d05eff", color: "white" },
              }
            : undefined
        }
      />
    </div>
  );
}

export default InformeColeccion;