import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export const AuthFormsContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const AuthForms = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/auth/login";

  return <div>{isLogin ? <Login /> : <SignUp />}</div>;
};

export default AuthForms;
