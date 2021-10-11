import React, { useState } from "react";
import { toast } from "react-toastify";
import useToken from "../../useToken";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DeleteAccount = ({ profile }, props) => {
  const { token } = useToken();
  const [profiles, setProfiles] = useState([]);
  let [error, setError] = useState("");

  async function removeProfile(id) {
    try {
      await fetch(`https://le-travaille-server.herokuapp.com/${profile.user_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          token: token,
        },
      });

      setProfiles(profiles.filter((profile) => profile.user_id !== id));
      toast.success("Success: Account deleted!");
      sessionStorage.removeItem("token");
      window.location = "/auth/register";
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }
  return (
    <div>
      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {props.error || error}
        </Alert>
      )}
      <button
        type="button"
        className="btn btn-sm  ml-3"
        style={{ backgroundColor: "#CC0000", color: "#fff" }}
        onClick={() => {
          const confirm = window.confirm(
            "Are you sure you want to delete this record?\n\nAll registered data will be discarded."
            );
          if (confirm === true) {
            removeProfile(profile.user_id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAccount;
