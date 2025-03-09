import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DeleteProfile = ({ profile }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  async function removeProfile(e, id) {
    try {
      e.preventDefault();
      const { data, status } = await axios.delete(
        `https://le-travaille-server.onrender.com/user/${profile.user_id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (status === 200) {
        setProfiles(profiles.filter((profile) => profile.user_id !== id));
        sessionStorage.removeItem("token");
        toast.success(data.message);
        navigate("/auth/signup");
      }
    } catch (err) {
      setError(err.response?.data?.message);
    }
  }

  return (
    <>
      {error && (
        <Collapse in={Boolean(error)}>
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

      <Button variant="contained" color="error" onClick={handleShow}>
        Delete
      </Button>

      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary" paragraph>
            Are you sure you want to delete your profile? This action is
            irreversible and all your data will be lost.
          </Typography>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => removeProfile(e, profile.user_id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProfile;
