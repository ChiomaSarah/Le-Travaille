import React, { useState } from "react";
import useToken from "../../useToken";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const { setToken } = useToken();

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const body = {
        email,
        password,
      };

      const response = await fetch("https://le-travaille-server.herokuapp.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(body),
      });

      const result = await response.json();
      // console.log(result);
      setToken(result);

      if (!response.ok) {
        throw Error(result.error);
      }

      if (response.ok) {
        toast.success("Login Successful!");
        window.location = "/user/dashboard";
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    
      <Grid>
      <Paper style={{ height: "95vh" }}>
        <div>
          <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div
                  className="card bg-dark text-white"
                  style={{
                    borderRadius: "0.2rem",
                    width: "480px",
                    height: "90vh",
                    marginTop: "-2rem",
                  }}
                >
                  <div className="card-body p-5 text-center">
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <Alert severity="error" onClick={() => setError(null)}>
                          {props.error || error}
                        </Alert>
                      )}
                      <div className="mb-md-5 mt-md-4 pb-5">
                        <Typography className="fw-bold mb-2 text-uppercase">
                          LOGIN
                        </Typography>
                        <Typography className="text-white-50 mb-5">
                          Please enter your email and password!
                        </Typography>

                        
                        <div className="form-group form-white ">
                          <input
                            type="email"
                            className="form-control form-control-md"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group form-white ">
                          <input
                            type="password"
                            className="form-control form-control-md"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        

                        
                        <Button
                          className="btn text-light btn-md px-5 mt-4"
                          type="submit"
                          style={{fontWeight: "bold"}}
                        >
                          Login
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
      </Paper>
    </Grid>
  );
};

export default Login;
