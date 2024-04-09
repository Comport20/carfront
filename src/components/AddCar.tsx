import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { HtmlHTMLAttributes, useState } from "react";
import Car from "../types";

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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };
  return (
    <>
      <button onClick={handleClickOpen}></button>
      <Dialog open={open}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <input
            placeholder="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <input
            placeholder="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <input
            placeholder="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <input
            placeholder="Reg.nr"
            name="registrationNumber"
            value={car.registrationNumber}
            onChange={handleChange}
          />
          <input
            placeholder="Year"
            name="modelYear"
            value={car.modelYear}
            onChange={handleChange}
          />
          <input
            placeholder="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClickClose}></button>
          <button onClick={handleClickClose}></button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default AddCar;
