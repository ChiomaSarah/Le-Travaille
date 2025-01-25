import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import AuthForms from "./components/jobSeeker/AuthForms";
import SignUp from "./components/jobSeeker/SignUp";
import Login from "./components/jobSeeker/Login";
import Dashboard from "./components/jobSeeker/Dashboard";
import useToken from "./utils/useToken";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Logout from "./components/jobSeeker/Logout";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";

toast.configure();

function App() {
  const { setToken } = useToken();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/jobs" exact component={Jobs} />

          <Route path="/job_seeker" component={AuthForms} />

          <Route
            path="/auth/signup"
            component={() => <SignUp setToken={setToken} />}
          />

          <Route
            path="/auth/login"
            component={() => <Login setToken={setToken} />}
          />

          <Route
            path="/auth/logout"
            component={() => <Logout setToken={setToken} />}
          />

          <Route
            path="/user/dashboard"
            component={() => <Dashboard setToken={setToken} />}
          />
        </Switch>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
