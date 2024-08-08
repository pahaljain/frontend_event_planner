import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/categories"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Event Planner
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {userId && (
            <>
              <Button color="inherit" component={RouterLink} to="/orders">
                Orders
              </Button>
              <Button color="inherit" component={RouterLink} to="/about">
                About Us
              </Button>
              <Button color="inherit" component={RouterLink} to="/contact">
                Contact
              </Button>
              <Button color="inherit" component={RouterLink} to="/services">
                Services
              </Button>
            </>
          )}
          {!userId ? (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
