import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Collapse,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Typography,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CloudUpload, Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthFormsContainer } from "./AuthForms";
import { neumorphismInputStyle } from "../../../utils/neumorphism";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setAuth } from "../../../app-store/authSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    degree: "",
    experience: "",
    location: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setPayload({ ...payload, [name]: value });
  };

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep((prevStep) => prevStep - 1);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
      formData.append("username", payload.username);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("age", payload.age);
      formData.append("degree", payload.degree);
      formData.append("experience", payload.experience);
      formData.append("location", payload.location);
      formData.append("image", payload.image);

      const { data, status } = await axios.post(
        "https://le-travaille-server.onrender.com/auth/signup",
        formData
      );

      if (status === 201) {
        dispatch(setAuth({ token: data.token }));

        toast.success(
          "Welcome onboard! You will be redirected to the login screen in a moment."
        );
        navigate("/auth/login");
      } else {
        toast.error(error.response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  // Check if all fields for the current steps are filled.
  const isComplete = () => {
    if (currentStep === 0) {
      return !(payload.username && payload.email && payload.password);
    }
    if (currentStep === 1) {
      return !(payload.age && payload.degree && payload.experience);
    }
    if (currentStep === 2) {
      return !(payload.location && payload.image);
    }
    return false;
  };

  return (
    <AuthFormsContainer>
      <Card
        sx={{
          maxWidth: 400,
          padding: 3,
          backgroundColor: "#346B92",
          color: "#fff",
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#FFD700" }}
        >
          Sign Up
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{
            marginBottom: "20px",
            color: "#d7c7bb",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/auth/login")}
            style={{
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Login
          </span>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Collapse in={Boolean(error)}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setError("")}
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

          <Stepper activeStep={currentStep} alternativeLabel>
            {["Account Info", "Personal Info", "Location & Image"].map(
              (label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        color: "white !important",
                      },
                      "& .Mui-active .MuiStepLabel-label": {
                        color: "white",
                      },

                      "& .Mui-completed .MuiStepLabel-label": {
                        color: "white",
                      },
                      "& .Mui-completed .MuiStepIcon-root": {
                        color: "white", // Keeps checkmark white when step is completed.
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "#FFD700",
                      },
                      marginBottom: "3rem",
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              )
            )}
          </Stepper>

          {/* Step 1: Account Info */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.username}
                onChange={handleChange("username")}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.username),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.username ? "#F0F0F0" : "black",
                    top:
                      payload.username ||
                      document.activeElement ===
                        document.querySelector('input[name="username"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "#F0F0F0",
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.email}
                onChange={handleChange("email")}
                type="email"
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.email),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.email ? "#F0F0F0" : "black",
                    top:
                      payload.email ||
                      document.activeElement ===
                        document.querySelector('input[name="email"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "#F0F0F0",
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.password}
                onChange={handleChange("password")}
                type={showPassword ? "text" : "password"}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.password),
                  },
                  input: {
                    style: neumorphismInputStyle,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ padding: 0 }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.password ? "#F0F0F0" : "black",
                    top:
                      payload.password ||
                      document.activeElement ===
                        document.querySelector('input[name="password"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    color: "#F0F0F0",
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "1.5rem",
                }}
              />
            </motion.div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.age}
                onChange={handleChange("age")}
                type="number"
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.age),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.age ? "#F0F0F0" : "black",
                    top:
                      payload.age ||
                      document.activeElement ===
                        document.querySelector('input[name="age"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />

              <TextField
                label="Degree"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.degree}
                onChange={handleChange("degree")}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.degree),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.degree ? "#F0F0F0" : "black",
                    top:
                      payload.degree ||
                      document.activeElement ===
                        document.querySelector('input[name="degree"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />

              <TextField
                label="Experience"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.experience}
                onChange={handleChange("experience")}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.experience),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.experience ? "#F0F0F0" : "black",
                    top:
                      payload.experience ||
                      document.activeElement ===
                        document.querySelector('input[name="experience"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />
            </motion.div>
          )}

          {/* Step 3: Location & Image */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payload.location}
                onChange={handleChange("location")}
                required
                slotProps={{
                  inputLabel: {
                    shrink: Boolean(payload.location),
                  },
                  input: {
                    style: neumorphismInputStyle,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "40px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    position: "absolute",
                    left: "14px",
                    fontSize: "0.8rem",
                    transition: "top 0.2s ease, font-size 0.2s ease",
                    color: payload.location ? "#F0F0F0" : "black",
                    top:
                      payload.location ||
                      document.activeElement ===
                        document.querySelector('input[name="location"]')
                        ? "-10px"
                        : "40%",
                    transform: "translateY(-40%)",
                  },
                  "& .Mui-focused .MuiInputLabel-root": {
                    top: "-10px",
                    fontSize: "0.75rem",
                  },
                  marginBottom: "0.75rem",
                }}
              />
              <Box
                sx={{
                  marginBottom: "3rem",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUpload />}
                  sx={{
                    backgroundColor: "#4C85B7",
                    boxShadow:
                      "8px 8px 20px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "#346B92",
                      boxShadow:
                        "4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={handleChange("image")}
                    style={{
                      display: "none",
                    }}
                  />
                </Button>

                {payload.image && (
                  <Box
                    sx={{
                      marginTop: "10px",
                      fontSize: "14px",
                      color: "#d7c7bb",
                      fontStyle: "italic",
                    }}
                  >
                    Selected File: {payload.image.name}
                  </Box>
                )}
              </Box>
            </motion.div>
          )}

          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item xs={5}>
              {currentStep !== 0 && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handlePrevStep}
                  disabled={loading}
                  sx={{
                    color: "#FFF",
                    backgroundColor: "#4C85B7",
                    boxShadow:
                      "8px 8px 20px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.1)",
                    fontWeight: "bold",
                    my: 2,
                    "&:hover": {
                      backgroundColor: "#346B92",
                      boxShadow:
                        "4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Previous
                </Button>
              )}
            </Grid>

            <Grid item xs={5}>
              {currentStep === 2 ? (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isComplete() || loading}
                  sx={{
                    backgroundColor: "#FFD700",
                    marginBottom: 2,
                    "&:hover": { backgroundColor: "#FFB800" },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Sign Up"}
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNextStep}
                  disabled={isComplete()}
                  sx={{
                    backgroundColor: "#FFD700",
                    marginBottom: 2,
                    fontWeight: "bold",
                    my: 2,
                    "&:hover": {
                      backgroundColor: "#FFB800",
                      transform: "scale(1.05)",
                    },
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  Next
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </AuthFormsContainer>
  );
};

export default SignUp;
