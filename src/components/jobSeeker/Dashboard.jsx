import React, { useState, useEffect } from "react";
import useToken from "../../useToken";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";
import "./Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  let [profiles, setProfiles] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    async function getName() {
      try {
        const { data, status } = await axios.get(
          `https://le-travaille-server.onrender.com/user/dashboard/`,
          {
            headers: { token: token },
          }
        );

        if (status === 200) {
          setName(data[0].username);
          setProfiles(data);
        } else {
          toast.error(data.message || "Error fetching data");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Your session has expired! Please log in again.");
          setTimeout(() => {
            window.replace("/auth/login");
          }, 3000);
        } else {
          setError(err.message);
        }
      }
    }

    getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="text-center mt-5">
      <div className="container">
        {error && (
          <Collapse in={error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        )}
      </div>
      <h3 className="font-weight-bold">Welcome, {name}!</h3>

      <div className="container">
        {profiles?.map((profile) => (
          <div className="row mt-5" key={profile.user_id}>
            <div className="col-lg-3 col-sm-6">
              <div className="card hovercard">
                <div className="cardheader"></div>
                <div className="avatar">
                  <img src={profile.image_url} alt="user's avatar" />
                </div>
                <div className="info">
                  <div
                    className="title font-weight-bold"
                    style={{ textTransform: "capitalize" }}
                  >
                    {profile.username}
                  </div>

                  <div className="desc text-left">Email: {profile.email}</div>
                  <div className="desc text-left">Age: {profile.age}</div>
                  <div className="desc text-left">Degree: {profile.degree}</div>
                  <div className="desc text-left">
                    Experience: {profile.experience}
                  </div>
                  <div className="desc text-left">
                    Location: {profile.location}
                  </div>
                </div>
                <div className="bottom btn-group">
                  <UpdateProfile profile={profile} />

                  <DeleteProfile profile={profile} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
