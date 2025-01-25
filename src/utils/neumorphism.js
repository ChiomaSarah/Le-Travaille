export const neumorphismInputStyle = {
  backgroundColor: "#e0e5ec",
  borderRadius: "10px",
  border: "none",
  boxShadow: "inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff",
  width: "100%",
};

export const neumorphismButtonStyle = {
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
