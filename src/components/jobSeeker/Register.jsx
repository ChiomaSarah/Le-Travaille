import React, { useState } from "react";
import { useHistory } from "react-router";
import useToken from "../../useToken";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = (props) => {
  const paperStyle = { width: 380, margin: "0 auto", height: "93vh" };

  let history = useHistory();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    degree: "",
    experience: "",
    location: "",
    image: "",
  });

  let [error, setError] = useState("");

  const { setToken } = useToken();

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("age", data.age);
      formData.append("degree", data.degree);
      formData.append("experience", data.experience);
      formData.append("location", data.location);
      formData.append("image", data.image);

      const response = await fetch(
        "https://le-travaille-server.herokuapp.com/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      // console.log(result);
      setToken(result);

      if (!response.ok) {
        throw Error(result.error);
      }

      if (response.ok) {
        toast.success("Welcome onboard! Please, login to continue.");
        history.push("/auth/login");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-12">
                <div
                  className="card bg-dark text-white"
                  style={{
                    borderRadius: "0.5rem",

                    height: "85vh",
                    marginTop: "-1.5rem",
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
                          REGISTER
                        </Typography>
                        <Typography className="text-white-50 mb-5">
                          Please create an account!
                        </Typography>

                        <div className="form-group form-white ">
                          <input
                            type="text"
                            className="form-control form-control-md"
                            name="username"
                            placeholder="Username"
                            value={data.username}
                            onChange={handleChange("username")}
                          />
                        </div>
                        <div className="form-group form-white ">
                          <input
                            type="email"
                            className="form-control form-control-md"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange("email")}
                          />
                        </div>

                        <div className="form-row">
                          <div className="form-group col-7 col-md-7 ">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              value={data.password}
                              onChange={handleChange("password")}
                            />
                          </div>
                          <div className="form-group col-5 col-md-5">
                            <input
                              type="number"
                              min="18"
                              className="form-control"
                              name="age"
                              placeholder="Age"
                              value={data.age}
                              onChange={handleChange("age")}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group col-6 col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              name="degree"
                              placeholder="Degree"
                              value={data.degree}
                              onChange={handleChange("degree")}
                            />
                          </div>
                          <div className="form-group col-6 col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              name="experience"
                              placeholder="Experience"
                              value={data.experience}
                              onChange={handleChange("experience")}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group col-5 col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              name="location"
                              placeholder="Location"
                              value={data.location}
                              onChange={handleChange("location")}
                            />
                          </div>
                          <div className="form-group col-7 col-md-8">
                            <input
                              type="file"
                              className="form-control"
                              accept=".jpg, .png, .jpeg"
                              name="image"
                              onChange={handleChange("image")}
                            />
                          </div>
                        </div>
                        <Button
                          className="btn text-light btn-md px-5 mt-4"
                          type="submit"
                          style={{ fontWeight: "bold" }}
                        >
                          Register
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Paper>
    </Grid>
  );
};

export default Register;
