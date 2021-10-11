import React from "react";


const JobCard = ({ job }) => {
  return (
    <div className="card">
      <div className="card__body">
        <h4 className="card__title card-header">
          <b>{job.position}</b>
        </h4>
        <p className="card__description">
          <b>Company: </b>
          {job.company}
        </p>
        <p className="card__description">
          <b>Experience: </b>
          {job.experience}
        </p>
        <p className="card__description">
          <b>Contract: </b>
          {job.contract}
        </p>
        <p className="card__description">
          <b>Location: </b>
          {job.location}
        </p>
        <p className="card__description">
          <b>Publication Date: </b>
          {job.pubDate}
        </p>
        <p className="card__description">
          <b>Deadline: </b>
          {job.expiryDate}
        </p>
      </div>
      <a
        className="text-center card-footer"
        href={job.link}
        target="_blank"
        rel="noreferrer"
      >
        <button className="card__btn ">View Job</button>
      </a>
    </div>
  );
};

export default JobCard;
