import React, { useState } from "react";

function UpdateProfile({ profile }) {
  const [user_id] = useState(profile.user_id);
  const [username] = useState(profile.username);
  const [email] = useState(profile.book_email);
  const [password, setPassword] = useState(profile.password);
  const [age, setAge] = useState(profile.age);
  const [degree, setDegree] = useState(profile.degree);
  const [experience, setExperience] = useState(profile.experience);
  const [location, setLocation] = useState(profile.location);

  // function to save Changes onclick of the update button
  async function saveChanges(e) {
    try {
      e.preventDefault();
      const body = {
        user_id: user_id,
        username: username,
        email: email,
        password: password,
        age: age,
        degree: degree,
        experience: experience,
        location: location,
      };

       await fetch(
        `https://le-travaille-server.herokuapp.com/user/dashboard/${profile.user_id}`,{
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      alert("Success: Account Updated!");
      window.location = "/user/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      {/* create a modal for the update window */}
      <button type="button" className="btn btn-sm btn-info" data-toggle="modal" data-target={`#id${profile.user_id}`}>
        Update
      </button>

      <div className="modal" id={`id${profile.user_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* modal header */}
            <div className="modal-header">
              <h4 className="modal-title" style={{ color: "#262626" }}>
                Edit Book
              </h4>
              <button type="button" className="close" data-dismiss="modal">&times;
              </button>
            </div>

            {/* modal body: create input tags for all fields*/}
            <div className="modal-body">
              <input className="form-control" name="user_id" defaultValue={user_id} type="number" min="1" placeholder="User id"></input>
            </div>
            <div className="modal-body">
              <input className="form-control" name="username" defaultValue={username} type="text" placeholder="Username"></input>
            </div>
            <div className="modal-body">
              <input name="email" defaultValue={email} type="email" className="form-control" placeholder="Email"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" className="form-control" placeholder="Book Rating"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setAge(e.target.value)} name="age" value={age} type="text" min="18" className="form-control" placeholder="Age"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setDegree(e.target.value)} name="degree" value={degree} className="form-control" placeholder="Degree"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setExperience(e.target.value)} name="experience" value={experience} className="form-control" placeholder="Experience"></input>
            </div>
            <div className="modal-body">
              <input onChange={(e) => setLocation(e.target.value)} name="location" value={location} className="form-control" placeholder="Location"></input>
            </div>

            {/* modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => saveChanges(e)}>
                Save Changes
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
