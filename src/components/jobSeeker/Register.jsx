import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid2,
  Box,
  InputAdornment,
  IconButton,
  Collapse,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import useToken from "../../useToken";
import { useHistory } from "react-router";

const Register = () => {
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
  const { setToken } = useToken();
  const history = useHistory();

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
        "https://le-travaille-server.onrender.com/auth/register",
        formData
      );

      // console.log(data);
      setToken(data);

      if (status === 201) {
        toast.success("Welcome onboard! Please, login to continue.");
        history.push("/auth/login");
      } else {
        toast.error(error.response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
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
        {["Account Info", "Personal Info", "Location & Image"].map((label) => (
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
                marginBottom: "3rem",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {currentStep === 0 && (
        <>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={payload.username}
            onChange={handleChange("username")}
            required
            InputLabelProps={{
              shrink: Boolean(payload.username),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
                transition: "top 0.2s ease, font-size 0.2s ease",
                color: payload.username ? "#F0F0F0" : "black",
                top:
                  payload.password ||
                  document.activeElement ===
                    document.querySelector('input[name="username"]')
                    ? "-10px"
                    : "40%",
                transform: "translateY(-40%)",
              },
              "& .Mui-focused .MuiInputLabel-root": {
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "1.5rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
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
            InputLabelProps={{
              shrink: Boolean(payload.email),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "1.5rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
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
            InputLabelProps={{
              shrink: Boolean(payload.password),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
                top: "-10px",
                fontSize: "0.75rem",
              },
              marginBottom: "3rem",
            }}
            InputProps={{
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
            }}
          />
        </>
      )}

      {currentStep === 1 && (
        <>
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            margin="normal"
            value={payload.age}
            onChange={handleChange("age")}
            type="number"
            required
            InputLabelProps={{
              shrink: Boolean(payload.age),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
              marginBottom: "1.5rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
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
            InputLabelProps={{
              shrink: Boolean(payload.degree),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
              marginBottom: "1.5rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
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
            InputLabelProps={{
              shrink: Boolean(payload.experience),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
              marginBottom: "3rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
            }}
          />
        </>
      )}

      {currentStep === 2 && (
        <>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={payload.location}
            onChange={handleChange("location")}
            required
            InputLabelProps={{
              shrink: Boolean(payload.location),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "14px",
                fontSize: "0.875rem",
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
              marginBottom: "1.5rem",
            }}
            InputProps={{
              style: neumorphismInputStyle,
            }}
          />
          <Box sx={{ marginBottom: "3rem" }}>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={handleChange("image")}
              style={neumorphismFileInputStyle}
            />
          </Box>
        </>
      )}

      <Grid2
        container
        justifyContent="space-between"
        style={{ marginTop: "20px" }}
      >
        <Grid2 item>
          {currentStep > 0 && (
            <Button
              variant="outlined"
              onClick={handlePrevStep}
              sx={neumorphismButtonStyle}
            >
              Previous
            </Button>
          )}
        </Grid2>
        <Grid2 item>
          {currentStep < 2 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextStep}
              sx={neumorphismButtonStyle}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={neumorphismButtonStyle}
            >
              Register
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

const neumorphismInputStyle = {
  backgroundColor: "#e0e5ec",
  borderRadius: "10px",
  border: "none",
  boxShadow: "inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff",
  width: "100%",
};

const neumorphismFileInputStyle = {
  display: "block",
  margin: "20px 0",
  borderRadius: "10px",
  padding: "10px",
  backgroundColor: "#e0e5ec",
  boxShadow: "inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff",
  width: "100%",
};

const neumorphismButtonStyle = {
  borderRadius: "10px",
  backgroundColor: "#4C85B7",
  padding: "10px 20px",
  boxShadow:
    "8px 8px 20px rgba(0, 0, 0, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.1)",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    boxShadow:
      "4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.1)",
    backgroundColor: "#346B92",
  },
};

export default Register;
