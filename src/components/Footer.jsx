import React from "react";
import {
  Button,
  Grid2,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#414E70", py: 4 }}>
      {" "}
      <Container maxWidth="lg">
        <Grid2 container spacing={4} justifyContent="center" sx={{ py: 4 }}>
          <Grid2 item xs={12} md={6}>
            <Typography
              variant="h6"
              fontWeight="bold"
              align="center"
              sx={{ color: "#fff" }}
            >
              New here? Create an account to view current job listings.
            </Typography>

            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/job_seeker"
                sx={{
                  backgroundColor: "#f7e6da",
                  mt: 2,
                  color: "#000",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#f7e6da",
                    opacity: 0.8,
                  },
                }}
              >
                REGISTER HERE
              </Button>
            </Box>
          </Grid2>
        </Grid2>

        <Grid2
          container
          spacing={6}
          justifyContent="center"
          // mt={4}
          sx={{ py: 4 }}
        >
          <Grid2 item xs={12} sm={4} textAlign="center">
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
          </Grid2>

          <Grid2 item xs={12} sm={4} textAlign="center">
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
          </Grid2>
        </Grid2>

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
