import React, { useState, useEffect } from "react";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";
import axios from "axios";
import {
  Avatar,
  Typography,
  Paper,
  Grid,
  Box,
  Collapse,
  Alert,
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import { Person } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("user id");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchProfile() {
      if (profile) return; // Prevent re-fetching if profile is already set.

      try {
        const { data, status } = await axios.get(
          `https://le-travaille-server.onrender.com/user/${userId}`,
          {
            headers: { token: token },
          }
        );

        if (status === 200) {
          setProfile(data);
        } else {
          toast.error(data.message || "Error fetching data");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Your session has expired! Please log in again.");
          setTimeout(() => {
            navigate("/auth/login", { replace: true });
          }, 3000);
        } else {
          setError(err.response?.data?.message);
        }
      }
    }

    if (userId) {
      fetchProfile();
    } else {
      setError("No user ID provided");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  return (
    <Box sx={{ padding: 3 }}>
      {error && (
        <Collapse in={Boolean(error)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
      )}

      {profile ? (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Welcome, {profile.username}!
              </Typography>

              <Avatar
                src={profile.image_url}
                alt={`${profile.username}`}
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 3,
                  marginX: "auto",
                }}
              >
                {!profile.image_url && <Person />}
              </Avatar>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <UpdateProfile profile={profile} />

                <DeleteProfile profile={profile} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 2 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center" }}
                gutterBottom
              >
                Profile Summary
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label="Email" color="textSecondary" />
                    <span>{profile.email}</span>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label="Age" color="textSecondary" />
                    <span>{profile.age}</span>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label="Degree" color="textSecondary" />
                    <span>{profile.degree}</span>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label="Experience" color="textSecondary" />
                    <span>{profile.experience}</span>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip label="Location" color="textSecondary" />
                    <span>{profile.location}</span>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
