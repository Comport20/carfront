import { useState } from "react";
import { CarResponse, Car } from "../types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CarDialogContent from "./CarDialogContent";

type FormProp = {
  carData: CarResponse;
};

function EditCar({ carData }: FormProp) {
  const [open, setOpen] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });
  const handleClickOpen = () => {
    setCar({
      brand: carData.brand,
      model: carData.model,
      color: carData.color,
      registrationNumber: carData.registrationNumber,
      modelYear: carData.modelYear,
      price: carData.price,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setOpen(false);
  };
  return (
    <>
      <button onClick={handleClickOpen}>edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>cancel</button>
          <button onClick={handleSave}>save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCar;
