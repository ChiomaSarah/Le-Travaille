import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "./Login";
import Register from "./Register";

const AuthForms = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = {
    width: 380,
    margin: "3em auto",
    height: "79vh",
    borderRadius: "0.5rem",
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        style={{background: "rgb(247, 230, 218)" }}
      >
        <Tab label="Register" style={{ margin: "0rem auto", width: "50%" }} />
        <Tab label="Login" style={{ margin: "0rem auto", width: "50%" }} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Register handleChange={handleChange} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Login />
      </TabPanel>
    </Paper>
  );
};
export default AuthForms;
