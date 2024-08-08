import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventCategoryId, setEventCategoryId] = useState("");
  const [noOfTickets, setNoOfTickets] = useState(0);
  const [pricePerTicket, setPricePerTicket] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://backend-event-planner-wecj.onrender.com/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backend-event-planner-wecj.onrender.com/api/categories",
        {
          name: categoryName,
          description: categoryDescription,
        }
      );
      fetchCategories();
      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backend-event-planner-wecj.onrender.com/api/events",
        {
          name_of_event: eventName,
          category_id: eventCategoryId,
          no_of_tickets: noOfTickets,
          price_per_ticket: pricePerTicket,
          description_of_event: eventDescription,
          event_date: eventDate,
          event_venue: eventVenue,
        }
      );
      setEventName("");
      setEventCategoryId("");
      setNoOfTickets(0);
      setPricePerTicket(0);
      setEventDescription("");
      setEventDate("");
      setEventVenue("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Category
        </Typography>
        <form onSubmit={handleAddCategory}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category Description"
                variant="outlined"
                fullWidth
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Category
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Add Event
        </Typography>
        <form onSubmit={handleAddEvent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={eventCategoryId}
                  onChange={(e) => setEventCategoryId(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Tickets"
                type="number"
                variant="outlined"
                fullWidth
                value={noOfTickets}
                onChange={(e) => setNoOfTickets(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price per Ticket"
                type="number"
                variant="outlined"
                fullWidth
                value={pricePerTicket}
                onChange={(e) => setPricePerTicket(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Venue"
                variant="outlined"
                fullWidth
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Admin;
