import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { styled } from "@mui/system";
import { Box, Fade, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

export const AuthFormsContainer = styled(Box)({
  background: "linear-gradient(135deg, #6C63FF, #3A8DFF)",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

export const FormCard = styled(Paper)({
  maxWidth: 400,
  width: "100%",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

const AuthForms = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/auth/login";

  return (
    <Fade in={true} timeout={1000}>
      <div>{isLogin ? <Login /> : <SignUp />}</div>
    </Fade>
  );
};

export default AuthForms;
