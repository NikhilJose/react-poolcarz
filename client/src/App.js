import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import OfferRide from "./components/OfferRide";
import ShowRide from "./components/ShowRide";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route exact path="/show_rides" element={<ShowRide />} />
        <Route exact path="/offer_ride" element={<OfferRide />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
