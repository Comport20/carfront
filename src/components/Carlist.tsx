import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/carapi";
import { CarResponse } from "../types";

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
      <table>
        <tbody>
          {data.map((car: CarResponse) => (
            <tr key={car._links.self.href}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.modelYear}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Carlist;
