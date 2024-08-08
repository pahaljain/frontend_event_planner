import React from "react";
import { Container, Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import img1 from "../../assets/images_folder/carousal1.avif";
import img2 from "../../assets/images_folder/carousal2.avif";
import img3 from "../../assets/images_folder/carousal3.avif";


const recommendedMovies = [
  {
    name: "Movie 1",
    banner: img1,
  },
  {
    name: "Movie 2",
    banner: img2,
  },
  {
    name: "Movie 3",
    banner: img3,
  },
];

const Carousal = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Carousel>
        {recommendedMovies.map((movie, index) => (
          <Box key={index} sx={{ width: "100%", height: "auto" }}>
            <img
              src={movie.banner}
              alt={movie.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default Carousal;
