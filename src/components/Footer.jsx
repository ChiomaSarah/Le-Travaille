import React from "react";
import { Button, Typography, Box, Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/job-seeker");
  };

  return (
    <Box sx={{ backgroundColor: "#414E70", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" sx={{ py: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
              New here? Create an account to view current job listings.
            </Typography>

            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{
                  backgroundColor: "#FFD700",
                  mt: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    fontWeight: "bold",
                    backgroundColor: "#FFB800",
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                SIGN UP HERE
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="center" sx={{ py: 4 }}>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              About Us
            </Typography>
            <Link
              href="/jobs"
              variant="body2"
              sx={{
                color: "#f7e6da",
                padding: "8px 16px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f7e6da",
                  borderRadius: "50px",
                  textDecoration: "none",
                  opacity: 0.8,
                },
              }}
            >
              Jobs
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
              Contact Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/sarah-osuji-a5821b121/"
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "#f7e6da",
                  "&:hover": {
                    backgroundColor: "#f7e6da",
                    opacity: 0.8,
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/Honeylyte"
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: "#f7e6da",
                  "&:hover": {
                    backgroundColor: "#f7e6da",
                    opacity: 0.8,
                  },
                  ml: 2,
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body2" color="#A9A9A9">
            Le-Travaille™ © 2021, 2024. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
