import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const history = useHistory();

  const handleConfirmLogout = () => {
    sessionStorage.removeItem("token");
    toast.success("You have been logged out!");

    setTimeout(() => {
      history.push("/job_seeker");
    }, 1000);
  };

  const handleCancelLogout = () => {
    history.push("/");
  };

  return (
    <div className="text-center mt-5">
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleConfirmLogout} className="btn btn-danger mr-2">
        Yes, Logout
      </button>
      <button onClick={handleCancelLogout} className="btn btn-secondary">
        Cancel
      </button>
    </div>
  );
};

export default Logout;
