import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateProfile = ({ profile }) => {
  const [username, setUsername] = useState(profile.username);
  const [email] = useState(profile.email);
  const [password] = useState(profile.password);
  const [age, setAge] = useState(profile.age);
  const [degree, setDegree] = useState(profile.degree);
  const [experience, setExperience] = useState(profile.experience);
  const [location, setLocation] = useState(profile.location);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShow] = useState(false);

  async function saveChanges(e) {
    try {
      e.preventDefault();
      const body = {
        username,
        email,
        password,
        age,
        degree,
        experience,
        location,
      };

      const { status } = await axios.patch(
        `https://le-travaille-server.onrender.com/user/dashboard/${profile.user_id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        toast.success("Profile Updated!");
        window.location = "/user/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <Button className="update-btn" onClick={handleShow}>
        Update
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
            type="text"
            className="form-control"
            placeholder="Username"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>
        <Modal.Body>
          <input
            name="email"
            value={email}
            type="email"
            disabled={true}
            className="form-control"
            placeholder="Email"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>
        <Modal.Body>
          <input
            name="password"
            value={password}
            type="password"
            disabled={true}
            className="form-control"
            placeholder="Password"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>
        <Modal.Body>
          <input
            onChange={(e) => setAge(e.target.value)}
            name="age"
            value={age}
            type="number"
            min="18"
            className="form-control"
            placeholder="Age"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>

        <Modal.Body>
          <input
            type="text"
            onChange={(e) => setDegree(e.target.value)}
            name="degree"
            value={degree}
            className="form-control"
            placeholder="Degree"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>

        <Modal.Body>
          <input
            type="text"
            onChange={(e) => setExperience(e.target.value)}
            name="experience"
            value={experience}
            className="form-control"
            placeholder="Experience"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>

        <Modal.Body>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            value={location}
            className="form-control"
            placeholder="Location"
            style={{ background: "#f7e6da" }}
          />
        </Modal.Body>

        {error && (
          <Modal.Body>
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button
            className="modal-btn"
            type="button"
            variant="success"
            onClick={saveChanges}
          >
            Save Changes
          </Button>

          <Button
            className="modal-btn"
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProfile;
