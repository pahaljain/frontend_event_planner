import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import img1 from "../assets/images_folder/category_image_1.avif";
import img2 from "../assets/images_folder/category_image_5.avif";
import img3 from "../assets/images_folder/movie5.avif";
import img4 from "../assets/images_folder/category_image_4.avif";
import img5 from "../assets/images_folder/category_image_6.avif";
import img6 from "../assets/images_folder/category_image_2.avif";
import img7 from "../assets/images_folder/category_image_7.avif";
import img8 from "../assets/images_folder/category_image_8.avif";

// Array of images
const images = [img1, img2, img3, img4, img5, img6, img7, img8];
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

import Carousal from "./static_pages/Carousal";
import RecommendedMovies from "./static_pages/RecommendedMovies";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      if (!localStorage.getItem("userId")) {
        navigate("/login");
      }

      try {
        const response = await axios.get(
          "https://backend-event-planner-wecj.onrender.com/api/categories"
        );
        console.log(response);

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [navigate]);

  return (
    <Container sx={{ mt: 4 }}>
      <Carousal />
      <RecommendedMovies />
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item key={category._id} xs={12} sm={6} md={3}>
            <Card sx={{ minHeight: 200, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="280"
                image={images[index % images.length]}
                alt={category.name}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {category.description}
                </Typography>
                <Button
                  component={Link}
                  to={`/categories/${category._id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
