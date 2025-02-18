import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const userToken = JSON.parse(sessionStorage.getItem("token"));
    const isAuthenticated = userToken && userToken.token;

    if (isAuthenticated) {
      navigate("/jobs");
    } else {
      navigate("/job_seeker");
    }
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(90deg, #346B94, #B3E5E0)",
          minHeight: "90vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          maxWidth: "980px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1, pr: 4, maxWidth: "600px" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(to right, #000000, #4caf50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
            }}
          >
            Looking for a new job? We’ve got you covered.
          </Typography>

          <Typography variant="body1" sx={{ color: "#eee", mb: 4 }}>
            Create a free profile by signing up to view open positions and start
            browsing jobs today.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
                borderRadius: "8px",
              }}
              onClick={handleButtonClick}
            >
              Start Searching for Jobs
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2))",
              zIndex: 1,
            }}
          />
          <img
            src="https://i.ibb.co/mh7GRRf/Man-Searching-for-a-Job-removebg.png"
            alt="A professional man searching for a job, representing career opportunities"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
