import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";

const column: GridColDef[] = [
  { field: "brand", headerName: "Brand", width: 200 },
  { field: "model", headerName: "Model", width: 200 },
  { field: "color", headerName: "Color", width: 200 },
  { field: "registrationNumber", headerName: "Reg.nr.", width: 150 },
  { field: "modelYear", headerName: "Model year", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "delete",
    headerName: "",
    width: 90,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (param: GridCellParams) => (
      <button onClick={() => alert(param.row._links.car.href)}>delete</button>
    ),
  },
];

function Carlist() {
  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });
  if (!isSuccess) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>Error...</p>;
  } else {
    return (
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row._links.self.href}
      />
    );
  }
}

export default Carlist;
