import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";

function UpdateProfile({ profile }) {
  const [username] = useState(profile.username);
  const [email] = useState(profile.email);
  const [password] = useState(profile.password);
  const [age, setAge] = useState(profile.age);
  const [degree, setDegree] = useState(profile.degree);
  const [experience, setExperience] = useState(profile.experience);
  const [location, setLocation] = useState(profile.location);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShow] = useState(false);

  async function saveChanges(e) {
    try {
      e.preventDefault();
      const body = {
        username: username,
        email: email,
        password: password,
        age: age,
        degree: degree,
        experience: experience,
        location: location,
      };

      const response = await fetch(
        `https://le-travaille-backend.up.railway.app/user/dashboard/${profile.user_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        toast.success("Profile Updated!");
        // console.log(response)
        window.location = "/user/dashboard";
      }
    } catch (err) {
      console.error(err.message);
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
            name="username"
            value={username}
            type="text"
            disabled={true}
            className="form-control"
            placeholder="Username"
            style={{ background: "#f7e6da" }}
          ></input>
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
          ></input>
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
          ></input>
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
          ></input>
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
          ></input>
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
          ></input>
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
          ></input>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="modal-btn"
            type="button"
            variant="success"
            onClick={(e) => saveChanges(e)}
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
}
export default UpdateProfile;
