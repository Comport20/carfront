import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addCar } from "../api/carapi";
import { Car } from "../types";
import CarDialogContent from "./CarDialogContent";

function AddCar() {
  const [open, setOpen] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleSave = () => {
    mutate(car);
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };
  return (
    <>
      <button onClick={handleClickOpen}>New car</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleSave}>save</button>
          <button onClick={handleClose}>cancel</button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AddCar;
