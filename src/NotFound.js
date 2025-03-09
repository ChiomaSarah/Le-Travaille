import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={2}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Box
          component="video"
          src="/not-found-error.webm"
          autoPlay
          loop
          muted
          playsInline
          width={500}
        />
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography variant="h6" color="#fff" mt={2}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
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
          Go Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFound;
