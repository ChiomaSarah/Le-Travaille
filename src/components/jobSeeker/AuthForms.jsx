import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Fade } from "@mui/material";

const AuthFormsContainer = styled(Box)({
  background: "linear-gradient(135deg, #6C63FF, #3A8DFF)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const FormCard = styled(Paper)({
  maxWidth: 500,
  width: "100%",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <AuthFormsContainer>
      <FormCard sx={{ background: "#346B92" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#fff" }}
        >
          {isLogin ? "Login" : "Register"}
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
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={handleToggleForm}
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={handleToggleForm}
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Login
              </span>
            </>
          )}
        </Typography>

        <Fade in={true} timeout={500}>
          <div>{isLogin ? <Login /> : <Register />}</div>
        </Fade>
      </FormCard>
    </AuthFormsContainer>
  );
};

export default AuthForms;
