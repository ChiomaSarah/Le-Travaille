import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Play", serif',
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        },
        notchedOutline: {
          borderColor: "transparent",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#F0F0F0",
          "&.Mui-focused": {
            color: "#F0F0F0",
          },
        },
      },
    },
  },
});

export default theme;
