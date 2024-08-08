import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1">
            Welcome to Event Planner! We are dedicated to helping you plan and
            manage your events seamlessly. Our team of professionals ensures
            that every event is a memorable and successful experience. Thank you
            for choosing us!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutUs;
