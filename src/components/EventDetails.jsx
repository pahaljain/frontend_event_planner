import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://backend-event-planner-wecj.onrender.com/api/events/getEventById/${eventId}`
        );
        setEvent(response.data);
        setTotalPrice(response.data.price_per_ticket); // Initialize total price
        setAvailability(response.data.no_of_tickets > 0); // Set availability
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId, user, navigate]);

  const handleTicketChange = (e) => {
    const ticketCount = e.target.value;
    setTickets(ticketCount);
    setTotalPrice(ticketCount * event.price_per_ticket);
    setAvailability(ticketCount <= event.no_of_tickets);
  };

  const handlePurchase = async () => {
    if (tickets > event.no_of_tickets) {
      alert("Not enough tickets available");
      return;
    }

    try {
      // Update the number of tickets in the backend
      const response = await axios.put(
        `https://backend-event-planner-wecj.onrender.com/api/events/${eventId}`,
        {
          ...event,
          no_of_tickets: event.no_of_tickets - tickets,
        }
      );

      // Create an order
      await axios.post(
        "https://backend-event-planner-wecj.onrender.com/api/orders",
        {
          user_id: user,
          event_id: eventId,
          quantity: tickets,
          total_price: totalPrice,
        }
      );

      alert("Tickets purchased successfully");
      setEvent(response.data);
      setTickets(1);
      setTotalPrice(response.data.price_per_ticket);
    } catch (error) {
      console.error("Error purchasing tickets:", error);
      alert("Error purchasing tickets");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {event.name_of_event}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" gutterBottom>
            <strong>Category:</strong> {event.category_id.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {event.description_of_event}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Number of Tickets:</strong> {event.no_of_tickets}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Price per Ticket:</strong> ₹{event.price_per_ticket}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong>{" "}
            {new Date(event.event_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Venue:</strong> {event.event_venue}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Purchase Tickets</Typography>
            <TextField
              label="Number of Tickets"
              type="number"
              value={tickets}
              onChange={handleTicketChange}
              inputProps={{ min: 1, max: event.no_of_tickets }}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />
            <Typography variant="body1" gutterBottom>
              <strong>Total Price:</strong> ₹{totalPrice}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePurchase}
              disabled={!availability}
              fullWidth
            >
              Buy Tickets
            </Button>
            {!availability && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Not enough tickets available
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails;
