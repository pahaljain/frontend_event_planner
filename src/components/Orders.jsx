import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

import img1 from "../assets/images_folder/comedy1.avif";
import img2 from "../assets/images_folder/music1.avif";
import img3 from "../assets/images_folder/movie6.avif";
import img4 from "../assets/images_folder/comedy2.avif";
import img5 from "../assets/images_folder/movie1.avif";
import img7 from "../assets/images_folder/movie2.avif";
import img8 from "../assets/images_folder/movie3.avif";

// Array of images for orders
const orderImages = [img1, img2, img3, img4, img5, img7, img8];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://backend-event-planner-wecj.onrender.com/api/orders/${user}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order, index) => (
          <Grid item key={order._id} xs={12} sm={6} md={4}>
            <Card sx={{ minHeight: 400, maxWidth: 280, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={orderImages[index % orderImages.length]} // Assign an image based on the index
                alt={order.event_id.name_of_event}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {order.event_id.name_of_event}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {order.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Price: ₹{order.total_price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Order Date: {new Date(order.order_date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
