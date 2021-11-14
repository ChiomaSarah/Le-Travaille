import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import useToken from "../useToken";
import MuiAlert from "@material-ui/lab/Alert";
import JobCard from "./JobCard";
import Loader from "./ui/LoadingLoop";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Jobs(props) {
  const { token } = useToken();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  let [error, setError] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://le-travaille-server.herokuapp.com/api/jobs",

          {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const result = await response.json();
        setLoading(false);
        if (response.ok) {
          // console.log(result);
          setJobs(result.items);
        }

        if (!response.ok) {
          throw Error(result.error);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getJobs();
  }, [token]);

  // // create pagination for maximized viewing
  const indexOfLastPage = currentPage * jobsPerPage;
  const indexOfFirstPage = indexOfLastPage - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPage, indexOfLastPage);

  // // change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if page is loading, display a spinning wheel... else, render the jobs list
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mt-5 mb-5">
        <h3 className="text-center">JOBS</h3>

        {error && (
          <Alert severity="error" onClick={() => setError(null)}>
            {props.error || error}
          </Alert>
        )}

        <div>
          {/* create a search filter */}
          <input
            type="text"
            placeholder="Find a job..."
            className="form-control mt-5 mb-5"
            id="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="wrapper">
            {currentJobs
              .filter((val) => {
                if (searchQuery === " ") {
                  return val;
                }
                if (
                  val.position
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  val.company
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  val.contract
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  val.location.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return val;
                } else {
                  return "";
                }
              })
              .map((job) => (
                <JobCard key={job.id} job={job}></JobCard>
              ))}
          </div>
        </div>
      </div>

      <Pagination
        jobsPerPage={jobsPerPage}
        totalPage={jobs.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Jobs;
