import React, { useState, useEffect } from "react";

import Loader from "./ui/LoadingLoop";
import axios from "axios";
import useToken from "../useToken";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Grid2,
  IconButton,
  InputBase,
  Pagination,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function Jobs() {
  const { token } = useToken();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        const { status, data } = await axios.get(
          "https://le-travaille-server.onrender.com/api/jobs",
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        setLoading(false);
        if (status === 200) {
          setJobs(data.items);
        } else {
          throw new Error(
            data.error || "An error occurred while fetching jobs"
          );
        }
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.error || "An unknown error occurred");
      }
    }

    getJobs();
  }, [token]);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.contract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2em", marginBottom: "2em" }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        Job Listings
      </Typography>

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

      {/* <TextField
        variant="outlined"
        placeholder="Search for a job..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "1.5em" }}
      /> */}

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a job..."
        inputProps={{ "aria-label": "Search for a job..." }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid2 container spacing={3}>
        {currentJobs.map((job) => (
          <Grid2 item xs={12} sm={6} md={6} key={job.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {job.position}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {job.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.contract} | {job.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: "0.5em" }}
                >
                  Deadline:{" "}
                  {job.expiryDate
                    ? new Date(job.expiryDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Not Specified"}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "1em",
                    textDecoration: "none",
                  }}
                  fullWidth
                  component="a"
                  href={job.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={!job.link}
                  onMouseOver={(e) => {
                    e.target.style.fontWeight = "bold";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.fontWeight = "normal";
                    e.target.style.color = "white";
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Pagination
        count={Math.ceil(filteredJobs.length / jobsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "2em", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}

export default Jobs;
