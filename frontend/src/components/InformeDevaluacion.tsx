import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface InformeDevaluacionProps {
  data: Array<{
    articulo: string;
    meses: string;
    devaluacion: string;
  }>;
}

function InformeDevaluacion({ data }: InformeDevaluacionProps) {
  const columns = [
    { title: "articulo", field: "articulo" },
    { title: "meses", field: "meses" },
    { title: "devaluacion", field: "devaluacion" },
  ];

  return (
    <div>
      <MaterialTable
        title="Informe de Devaluacion"
        columns={columns}
        data={data}
        options={{
          exportMenu: [
            {
              label: "Exportar a PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeDevaluacion"),
            },
            {
              label: "Exportar a CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeDevaluacion"),
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
      />
    </div>
  );
}

export default InformeDevaluacion;