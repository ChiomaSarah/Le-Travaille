import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import useToken from "../../useToken";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      await axios.delete(
        `https://le-travaille-server.onrender.com/user/dashboard/${profile.user_id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      setProfiles(profiles.filter((profile) => profile.user_id !== id));
      sessionStorage.removeItem("token");
      toast.success("Your profile has been deleted!");
      window.location = "/auth/register";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
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
      <Button className="delete-btn" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
        <Modal.Body>All registered data will be discarded.</Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            className="btn-warning modal-btn"
            onClick={(e) => removeProfile(e, profile.user_id)}
          >
            Delete
          </Button>

          <Button
            type="button"
            className="btn-secondary modal-btn"
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
