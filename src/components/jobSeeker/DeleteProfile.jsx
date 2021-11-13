import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import useToken from "../../useToken";
import MuiAlert from "@material-ui/lab/Alert";
import { Modal } from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DeleteProfile = ({ profile }, props) => {
  const { token } = useToken();
  const [profiles, setProfiles] = useState([]);
  let [error, setError] = useState("");
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function removeProfile(e, id) {
    try {
      e.preventDefault();
      await fetch(
        `https://le-travaille-server.herokuapp.com/user/dashboard/${profile.user_id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      setProfiles(profiles.filter((profile) => profile.user_id !== id));
      sessionStorage.removeItem("token");
      toast.success("Profile deleted!");
      window.location = "/auth/register";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {props.error || error}
        </Alert>
      )}
      <Button className="delete-btn" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Body>All registered data will be discarded</Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            className="btn btn-warning"
            onClick={(e) => removeProfile(e, profile.user_id)}
          >
            Delete
          </Button>

          <Button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProfile;
