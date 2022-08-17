import axios from "axios";
import { useState } from "react";

let url = "http://localhost:5000/offer_ride";

const OfferRide = () => {
  const [name, setName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [car, setCar] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const [seatErrorMessage, setSeatErrorMessage] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const startLocationHandler = (event) => {
    setStartLocation(event.target.value);
  };

  const destinationHandler = (event) => {
    setDestination(event.target.value);
  };

  const carChangeHandler = (event) => {
    setCar(event.target.value);
  };

  const seatsAvailableChangeHandler = (event) => {
    let availableSeats = parseInt(event.target.value);
    if (availableSeats < 0 || availableSeats > 8) {
      setSeatErrorMessage("Seats should be greater 0 and less than 8");
    } else {
      setSeatErrorMessage("");
    }
    setSeatsAvailable(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      pickUp: startLocation,
      destination: destination,
      car: car,
      seatsLeft: seatsAvailable,
    };

    axios.post(url, formData).then((response) => {
      setSuccesMessage("Added Successfully!");
    });

    setName("");
    setStartLocation("");
    setDestination("");
    setCar("");
    setSeatsAvailable("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={nameChangeHandler} />
        </div>
        <div>
          <label>Start Location</label>
          <input
            type="text"
            value={startLocation}
            onChange={startLocationHandler}
          />
        </div>
        <div>
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={destinationHandler}
          />
        </div>
        <div>
          <label>Car</label>
          <input type="text" value={car} onChange={carChangeHandler} />
        </div>
        <div>
          <label>Seats Available</label>
          <input
            type="text"
            value={seatsAvailable}
            onChange={seatsAvailableChangeHandler}
          />
          {seatErrorMessage && <span>{seatErrorMessage}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <span>{successMessage}</span>
    </>
  );
};

export default OfferRide;
