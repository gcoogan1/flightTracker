import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";

import { FlightContext } from "../state/FlightContext";

const Result = () => {
  const { flightData } = useContext(FlightContext);

  if (!flightData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light" style={{ overflow: "hidden", width: "100vw", backgroundColor: "#E8E8E8" }}>
        <p>Loading flight details...</p>
      </div>
    );
  }

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const datePart = date.toLocaleDateString("en-US", options);

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} • ${timePart}`;

  };

  const arrivalDate = formatDateTime(flightData.arrival_time);
  const departureDate = formatDateTime(flightData.departure_time);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ overflow: "hidden", width: "100vw", backgroundColor: "#E8E8E8" }}
    >
      <Card className="shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Header style={{ fontWeight: 700, fontSize: "20px", textAlign: "center" }}>Flight Details</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Text style={{ margin: 0, fontWeight: 700 }}>
                {flightData.departure_airport}
              </Card.Text>
              <Card.Text
                style={{ margin: 0, fontSize: "12px" }}
              >
                {flightData.departure_city}
              </Card.Text>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <FaArrowRight style={{ color: "#888888" }} />
            </Col>
            <Col>
              <Card.Text style={{ margin: 0, fontWeight: 700 }}>
                {flightData.arrival_airport}
              </Card.Text>
              <Card.Text
                style={{ margin: 0, fontSize: "12px", color: "#888888" }}
              >
                {flightData.arrival_city}
              </Card.Text>
            </Col>
          </Row>
          <div style={{ padding: "10px 0px" }}>
            <Col style={{ padding: "10px 0px" }}>
              <Card.Text
                style={{ margin: 0, fontSize: "12px", fontWeight: 700 }}
              >
                DEPARTURE:
              </Card.Text>
              <Card.Text style={{ margin: 0, color: "#484848" }}>{departureDate}</Card.Text>
            </Col>
            <Col style={{ padding: "10px 0px" }}>
              <Card.Text
                style={{ margin: 0, fontSize: "12px", fontWeight: 700 }}
              >
                ARRIVAL:
              </Card.Text>
              <Card.Text style={{ margin: 0, color: "#484848" }}>{arrivalDate}</Card.Text>
            </Col>
            <Card.Text
              style={{
                margin: 0,
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#888888 ",
              }}
            >
              {flightData.airline} {flightData.flight_number}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Result;
