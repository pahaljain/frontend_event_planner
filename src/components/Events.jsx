import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

// Placeholder images for events (Replace with actual event images)
import img1 from "../assets/images_folder/comedy1.avif";
import img2 from "../assets/images_folder/comedy2.avif";
import img3 from "../assets/images_folder/comedy3.avif";
import img4 from "../assets/images_folder/movie1.avif";
import img5 from "../assets/images_folder/movie5.avif";
import img6 from "../assets/images_folder/movie6.avif";
import img7 from "../assets/images_folder/movie4.avif";
import img8 from "../assets/images_folder/movie5.avif";

// Array of event images
const eventImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const Events = () => {
  const { categoryId } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://backend-event-planner-wecj.onrender.com/api/events/getEventByCategoryId/${categoryId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [categoryId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card sx={{ minHeight: 400, maxWidth: 280, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={eventImages[index % eventImages.length]}
                alt={event.name_of_event}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.name_of_event}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {event.description_of_event}
                </Typography>
                <Button
                  component={Link}
                  to={`/events/${event._id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events;
