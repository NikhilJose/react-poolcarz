import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

let bookRideURL = "http://localhost:5000/book_ride";
let cancelRideURL = "http://localhost:5000/cancel_ride";

const RideDetails = (props) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const [toggle, setToggle] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [ride, setRide] = useState([]);

  const ridee = useSelector((state) => state.ridee);

  const handleBookRide = () => {
    const rideData = {
      rider: {
        name: props.ride.name,
        car: props.ride.car,
        seatsLeft: props.ride.seatsLeft,
        pickUp: props.ride.pickUp,
        destination: props.ride.destination,
      },
      ridee: ridee,
    };

    axios.post(bookRideURL, rideData).then((response) => {
      if (response) {
        setToggle(false);
        setRide(response.data);
        setSuccessMessage("Ride Booked, Id is " + response.data.id);
        props.onClickBookRide(false);
      }
    });
  };

  const handleCancelRide = () => {
    setShowTable(false);
    const rideData = {
      ride: ride,
    };
    axios.post(cancelRideURL, rideData).then((response) => {
      if (response) {
        setCancelMessage(response.data.message);
      }
    });
  };

  return (
    <>
      {showTable && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Point</th>
                <th>End Point</th>
                <th>Car</th>
                <th>Seats Available</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.ride.name}</td>
                <td>{props.ride.pickUp}</td>
                <td>{props.ride.destination}</td>
                <td>{props.ride.car}</td>
                <td>{props.ride.seatsLeft}</td>
              </tr>
            </tbody>
          </table>

          {toggle ? (
            <button type="button" onClick={handleBookRide}>
              Book Ride
            </button>
          ) : (
            <>
              <span>{successMessage}</span>
              <button type="button" onClick={handleCancelRide}>
                Cancel Ride
              </button>
            </>
          )}
        </>
      )}
      {cancelMessage ? <span>{cancelMessage}</span> : null}
    </>
  );
};

export default RideDetails;
