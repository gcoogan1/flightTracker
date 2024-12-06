import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useQuery } from "react-query";

import { FlightContext } from "../state/FlightContext";
import { useScreen } from "../state/ScreenContext";

function FlightSearchForm() {
  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dateInputRef = useRef(null);
  const { setFlightData } = useContext(FlightContext);
  const { switchToResult } = useScreen();

  const baseUrl = "https://boiling-shelf-83756-11096d55fca5.herokuapp.com";

  const fetchAirlines = async() => {
    try {
      const response = await axios.get(`${baseUrl}/api/airlines`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airlines:", error);
      throw error; // Ensure the error is thrown so React Query can handle it
    }
  };

  const {
    data: airlines,
  } = useQuery({
    queryKey: ["airlines"],
    queryFn: fetchAirlines,
  });

  const handleAirlineChange = (e) => {
    const value = e.target.value;
    setAirline(value);

    if (value.length > 1 && airlines && Array.isArray(airlines)) {
      const filteredSuggestions = airlines
        .filter((airline) =>
          airline.toLowerCase().includes(value.toLowerCase())
        )
        .map((airline) => airline);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAirline(suggestion);
    setSuggestions([]);
  };

  const handleGetFlightDetails = async(airline, flightNumber, date) => {
    try {
      if (!airline || !flightNumber) {
        return;
      }

      const newDate = date ? new Date(date).toISOString() : null;
      const response = await axios.post(`${baseUrl}/api/flight`, {
        flightNumber,
        day: newDate,
      });
      return response.data?.flights[0];
    } catch (error) {
      console.log("err", error);
      return error;
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const flightDetails = await handleGetFlightDetails(airline, flightNumber, date);
    setSuggestions([]);
    setFlightData(flightDetails);
    switchToResult();
  };

  const openCalendar = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.showPicker(); // Use the showPicker() method (depends on browser)
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ overflow: "hidden", width: "100vw" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Find Your Flight</Card.Title>
          <Form onSubmit={handleSubmit}>
            {/* Airline Input with Autofill */}
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Airline</Form.Label>
              <Form.Control
                type="text"
                value={airline}
                onChange={handleAirlineChange}
                placeholder="Search for an airline"
              />
              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{
                    top: "100%",
                    zIndex: 1050,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: "pointer", backgroundColor: "#f0f0f0" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="Enter flight number"
              />
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Label>Date of Flight</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ paddingLeft: "30px", textTransform: "uppercase" }}
                placeholder="MM/D/YYYY"
                ref={dateInputRef}
              />
              <FaCalendarAlt
                style={{
                  position: "absolute",
                  top: "73%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                  cursor: "pointer",
                }}
                onClick={openCalendar} // Trigger the input click when the icon is clicked
              />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FlightSearchForm;
