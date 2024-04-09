import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import AddCar from "./AddCar";

function Carlist() {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setOpen(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });
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
        <button
          onClick={() => {
            if (
              confirm(
                `Are you sure you want to delete ${param.row.brand} ${param.row.model}?`
              )
            ) {
              mutate(param.row._links.car.href);
            }
          }}
        >
          delete
        </button>
      ),
    },
  ];
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
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={column}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }
}

export default Carlist;
