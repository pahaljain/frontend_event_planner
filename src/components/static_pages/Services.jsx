import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Services = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Services
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Event Planning"
                secondary="Comprehensive planning for any event type."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Venue Selection"
                secondary="Finding the perfect venue for your event."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Catering Services"
                secondary="Delicious food and beverage options."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Entertainment"
                secondary="Booking and managing entertainment options."
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Services;
