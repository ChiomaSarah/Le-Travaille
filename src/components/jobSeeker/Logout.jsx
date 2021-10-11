import React from "react";
import { toast } from "react-toastify";

const Logout = () => {
  
  const check = window.confirm("You are about to logout.");
  if (check) {
    sessionStorage.removeItem("token");
  }

  window.location = "/job_seeker";
  toast.success("You have been logged out!");

  return (
    <div className="text-center mt-5">
      <h2>Please, login to access your account.</h2>
    </div>
  );
};

export default Logout;
