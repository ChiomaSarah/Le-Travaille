import React, { useState, useEffect } from "react";
import useToken from "../../useToken";
import MuiAlert from "@material-ui/lab/Alert";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteAccount";

import "./Dashboard.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Dashboard = (props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  let [profiles, setProfiles] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    async function getName() {
      try {
        const response = await fetch(`https://le-travaille-server.herokuapp.com/user/dashboard/`, {
          method: "GET",
          headers: { token: token },
        });
        const result = await response.json();

        // console.log(result);

        if (response.ok) {
          setName(result[0].username);

          setProfiles(result);
        } else {
          throw Error(result.error);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getName();
  }, [token]);

  return (
    <div className="text-center mt-5" >
      <div className="container">
        {error && (
          <Alert severity="error" onClick={() => setError(null)}>
            {props.error || error}
          </Alert>
        )}
      </div>
      <h1>Welcome, {name}</h1>

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
                  <div className="title">{profile.username}</div>
                  <div className="desc">{profile.age}</div>
                  <div className="desc">{profile.degree}</div>
                  <div className="desc">{profile.experience}</div>
                  <div className="desc">{profile.location}</div>
                  <div className="desc">{profile.email}</div>
                  <div className="desc">{profile.user_id}</div>
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
