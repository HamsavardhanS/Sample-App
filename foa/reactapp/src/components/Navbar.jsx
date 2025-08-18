import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    alert("You have been logged out successfully!");
    localStorage.clear();
    navigate("/");
  };

  // Navigate home based on role
  const goHome = () => {
    if (role === "APP_ADMIN") navigate("/adminhome");
    else if (role === "HOTEL_ADMIN") navigate("/hoteladmin");
    else if (role === "USER") navigate("/userhome");
    else navigate("/"); // fallback
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#d219b6ff" }}>
      <Toolbar>
        {/* Logo & Title */}
        <FastfoodIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={goHome}
        >
          Food Ordering App
        </Typography>

        {/* Common Home Button */}
        <Button color="inherit" onClick={goHome}>
          Home
        </Button>

        {/* Role-specific navigation */}
        {role === "APP_ADMIN" && (
          <>
            <Button color="inherit" onClick={() => navigate("/adminhome/manage-restaurants")}>
              Manage Restaurants
            </Button>
            <Button color="inherit" onClick={() => navigate("/adminhome/feedbacks")}>
              Feedbacks
            </Button>
            <Button color="inherit" onClick={() => navigate("/adminhome/add-restaurant")}>
              Add Restaurant
            </Button>
          </>
        )}

        {role === "HOTEL_ADMIN" && (
          <>
            <Button color="inherit" onClick={() => navigate("/hoteladmin/orders")}>
              Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/hoteladmin/inventory")}>
              Inventory
            </Button>
            <Button color="inherit" onClick={() => navigate("/hoteladmin/add-food")}>
              Add Food
            </Button>
          </>
        )}

        {/* ================== USER NAVIGATION ================== */}
        {role === "USER" && (
          <>
            <Button color="inherit" onClick={() => navigate("/userhome")}>
              Menu
            </Button>
            <Button color="inherit" onClick={() => navigate("/userhome/orders")}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/userhome/reviews")}>
              Reviews
            </Button>
            <Button color="inherit" onClick={() => navigate("/userhome/payments")}>
              Payments
            </Button>
          </>
        )}

        {/* User Info & Logout */}
        {username && (
          <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              Hi, <strong>{username}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
