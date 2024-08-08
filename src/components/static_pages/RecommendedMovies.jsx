import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

import img1 from "../../assets/images_folder/movie1.avif";
import img2 from "../../assets/images_folder/movie2.avif";
import img3 from "../../assets/images_folder/movie3.avif";
import img4 from "../../assets/images_folder/movie4.avif";
import img5 from "../../assets/images_folder/movie5.avif";

const movies = [
  {
    id: 1,
    name: "ANDHAGAN",
    rating: "8.5",
    image: img4,
    description:
      "Andhagan is a drama film directed by Thyagarajan, featuring Prashanth and Simran in prominent roles.",
  },
  {
    id: 2,
    name: "AURON MEIN KAHA DUM THA",
    rating: "7.8",
    image: img2,
    description: "Dushman the hum hi apne, auron mein kahan dum tha. Bound by fate. Defined by love!",
  },
  {
    id: 3,
    name: "GHUSPAITHIYA",
    rating: "9.0",
    image: img3,
    description:
      "The story revolves around a cop, his enthusiastic housewife with a social media obsession.",
  },
  {
    id: 4,
    name: "DEADPOOL AND WOLVERINE",
    rating: "9.0",
    image: img1,
    description:
      "Wolverine is recovering from his injuries when he meets the loudmouth, Deadpool. They team up to defeat a common enemy.",
  },
  {
    id: 5,
    name: "RAAYAN",
    rating: "9.0",
    image: img5,
    description:
      "Dushman the hum hi apne, auron mein kahan dum tha. Bound by fate. Defined by love!",
  },
];

const RecommendedMovies = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recommended Movies
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          gap: 2,
          p: 2,
        }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            sx={{
              maxWidth: 300,
              minWidth: 250,
              borderRadius: 2,
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              height="490" // Increased height by 10px
              image={movie.image}
              alt={movie.name}
              sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {movie.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedMovies;
