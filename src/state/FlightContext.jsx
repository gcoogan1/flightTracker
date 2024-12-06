import { createContext, useState } from "react";

// Create the context
export const FlightContext = createContext();

// Create the provider component
// eslint-disable-next-line react/prop-types
export const FlightProvider = ({ children }) => {
  const [flightData, setFlightData] = useState({
    departureAirportCode: "",
    departureAirportCity: "",
    arrivalAirportCode: "",
    arrivalAirportCity: "",
    departureDateTime: "",
    arrivalDateTime: "",
    airlineName: "",
    flightNumber: "",
  });

  return (
    <FlightContext.Provider value={{ flightData, setFlightData }}>
      {children}
    </FlightContext.Provider>
  );
};
