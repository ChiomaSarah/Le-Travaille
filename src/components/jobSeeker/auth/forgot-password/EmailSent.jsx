import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { toast } from "react-toastify";
import axios from "axios";

const EmailSent = () => {
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const email = sessionStorage.getItem("forgot-email");

  const redactEmail = (email) => {
    const emailParts = email.split("@");
    if (emailParts.length === 2) {
      const username = emailParts[0];
      const domain = emailParts[1];

      // Keep the first 4 characters of the username and redact the rest.
      const redactedUsername =
        username.slice(0, 4) + "*".repeat(username.length - 4);

      return `${redactedUsername}@${domain}`;
    }
    return email; // Return the email as is if it's not in the correct format.
  };

  const redactedEmail = redactEmail(email);

  const openEmailService = () => {
    const domain = email.split("@")[1].toLowerCase();

    let url = "";

    switch (domain) {
      case "gmail.com":
        url = "https://mail.google.com/mail/";
        break;
      case "yahoo.com":
        url = "https://mail.yahoo.com/";
        break;
      case "outlook.com":
        url = "https://outlook.live.com/";
        break;
      case "hotmail.com":
        url = "https://outlook.live.com/";
        break;
      case "aol.com":
        url = "https://mail.aol.com/";
        break;
      case "icloud.com":
        url = "https://www.icloud.com/mail";
        break;
      default:
        url = `mailto:${email}`;
        break;
    }

    window.open(url, "_blank");
  };

  const handleResendEmail = async (e) => {
    e.preventDefault();

    setIsResendDisabled(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIsLoading(true);

    try {
      await axios.post(
        "https://le-travaille-server.onrender.com/auth/forgot-password",
        { email }
      );

      toast.success("Password reset email has been resent!");
      sessionStorage.setItem("forgot-email", email);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f0f0",
        padding: "20px",
      }}
    >
      {/* Animate card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
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
          <CardContent>
            {/* Animate mail icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FFD700",
                  borderRadius: "50%",
                  padding: "16px",
                  display: "inline-block",
                }}
              >
                <MailOutlineIcon fontSize="large" sx={{ color: "#346B92" }} />
              </Box>
            </motion.div>

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Check Your Email
            </Typography>

            <Typography
              variant="body2"
              sx={{ marginBottom: 3, color: "#B0B0B0" }}
            >
              We've sent a password reset link to{" "}
              <strong>{redactedEmail}</strong>. Please check your inbox for
              instructions.
            </Typography>

            <Button
              variant="contained"
              onClick={openEmailService}
              sx={{
                backgroundColor: "#FFD700",
                "&:hover": { backgroundColor: "#FFB800" },
                marginBottom: 2,
              }}
            >
              Go to Your Email
            </Button>

            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
              }}
            >
              Didn’t receive the email?{" "}
              <span
                onClick={handleResendEmail}
                style={{
                  color: "#FFD700",
                  cursor:
                    isResendDisabled || isLoading ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  opacity: isResendDisabled || isLoading ? 0.6 : 1,
                  marginLeft: "2px",
                }}
              >
                {isResendDisabled || isLoading
                  ? isLoading
                    ? "Resending..."
                    : `Resend Email in ${countdown}s`
                  : "Resend Email"}
              </span>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default EmailSent;
