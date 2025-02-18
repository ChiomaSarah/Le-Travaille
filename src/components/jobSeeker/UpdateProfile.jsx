import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Modal,
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ profile }) => {
  const [username, setUsername] = useState(profile.username);
  const [email] = useState(profile.email);
  const [age, setAge] = useState(profile.age);
  const [degree, setDegree] = useState(profile.degree);
  const [experience, setExperience] = useState(profile.experience);
  const [location, setLocation] = useState(profile.location);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function saveChanges(e) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const payload = {
        username,
        email,
        age,
        degree,
        experience,
        location,
      };

      const { data, status } = await axios.patch(
        `https://le-travaille-server.onrender.com/user/${profile.user_id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);

      if (status === 200) {
        toast.success(data.message);
        navigate("/user/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            margin: "auto",
            marginTop: "3%",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
            Edit Profile
          </Typography>

          <form onSubmit={saveChanges}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              disabled
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              helperText="This field cannot be changed."
            />

            <TextField
              fullWidth
              label="Email"
              value={email}
              disabled
              margin="normal"
              variant="outlined"
              helperText="This field cannot be changed."
            />

            <TextField
              fullWidth
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              slotProps={{
                input: {
                  min: 18,
                },
              }}
            />

            <TextField
              fullWidth
              label="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />

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

            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
                sx={{ marginRight: 2 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save Changes"
                )}
              </Button>

              <Button variant="outlined" color="primary" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateProfile;
