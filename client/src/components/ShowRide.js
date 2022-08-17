import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RideDetails from "./RideDetails";

let url = "http://localhost:5000/show_rides";

const ShowRide = () => {
  let navigate = useNavigate();

  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [ride, setRide] = useState([]);

  const handleShowAllRides = () => {
    axios.get(url).then((response) => {
      setRides(response.data);
      setFilteredRides(response.data);
      setShow(!show);
    });
  };

  const handleShowRides = (place) => {
    let ridesData = [];
    switch (place) {
      case "To Infosys": {
        ridesData = rides.filter((ride) => ride.destination === "Infosys");
        break;
      }
      case "From Infosys": {
        ridesData = rides.filter((ride) => ride.pickUp === "Infosys");
        break;
      }
      case "Others": {
        ridesData = rides.filter(
          (ride) =>
            !(ride.destination === "Infosys") && !(ride.pickUp === "Infosys")
        );
        break;
      }
      default:
        return [];
    }

    setFilteredRides(ridesData);
  };

  const handleShowDetail = (ride) => {
    setShowDetail(!showDetail);
    setRide(ride);
  };

  const clickBookRideHandler = (toggleValue) => {
    setShow(toggleValue);
  };

  const handleOfferRide = () => {
    navigate("/offer_ride");
  };

  return (
    <div>
      <button type="button" onClick={handleShowAllRides}>
        Show All Rides
      </button>

      {show && (
        <>
          <button type="button" onClick={() => handleShowRides("To Infosys")}>
            To Infosys
          </button>
          <button type="button" onClick={() => handleShowRides("From Infosys")}>
            From Infosys
          </button>
          <button type="button" onClick={() => handleShowRides("Others")}>
            Others
          </button>
          <table>
            <thead>
              <tr>
                <th>Start Point</th>
                <th>End Point</th>
                <th>Seats Available</th>
              </tr>
            </thead>
            <tbody>
              {filteredRides.map((ride) => {
                return (
                  <tr key={ride.id} onClick={() => handleShowDetail(ride)}>
                    <td>{ride.pickUp}</td>
                    <td>{ride.destination}</td>
                    <td>{ride.seatsLeft}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {showDetail && (
        <RideDetails ride={ride} onClickBookRide={clickBookRideHandler} />
      )}
      <button type="button" onClick={handleOfferRide}>
        Offer A Ride!
      </button>
    </div>
  );
};

export default ShowRide;
