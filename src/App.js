import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import AuthForms from "./components/jobSeeker/AuthForms";
import Register from "./components/jobSeeker/Register";
import Login from "./components/jobSeeker/Login";
import Dashboard from "./components/jobSeeker/Dashboard";
import useToken from "./useToken";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Logout from "./components/jobSeeker/Logout";
import Footer from "./components/Footer";

toast.configure();

function App(props) {
  const { setToken } = useToken();

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/jobs" exact component={Jobs} />

          <Route path="/job_seeker" component={AuthForms} />

          <Route
            path="/auth/register"
            component={() => <Register setToken={setToken} />}
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
    </>
  );
}

export default App;
