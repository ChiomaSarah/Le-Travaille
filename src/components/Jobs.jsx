import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  IconButton,
  InputBase,
  Pagination,
  Typography,
  Grid,
  Paper,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        const { status, data } = await axios.get(
          "https://le-travaille-server.onrender.com/api/jobs",
          {
            headers: {
              Accept: "application/json",
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

  const filteredJobs = jobs.filter((job) =>
    [job.position, job.company, job.contract, job.location]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom color="#FFD700">
        Job Listings
      </Typography>

      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <SearchIcon sx={{ mx: 1 }} />
        <InputBase
          placeholder="Search jobs..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 1 }}
        />
        {searchQuery && (
          <IconButton
            onClick={() => setSearchQuery("")}
            size="small"
            sx={{
              color: "#FFD700",
              "&:hover": { backgroundColor: "#FFF8DC" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Paper>

      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton size="small" onClick={() => setError("")}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>

      {loading ? (
        <Grid container spacing={4} justifyContent="center">
          {Array.from({ length: jobsPerPage }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={4} sx={{ borderRadius: 3, p: 3, width: "100%" }}>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="70%"
                    height={18}
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={40}
                    sx={{ mt: 2, borderRadius: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : currentJobs.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {currentJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  elevation={4}
                  sx={{ borderRadius: 3, p: 3, width: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {job.position}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {job.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {job.location} • {job.contract}
                    </Typography>
                    <Typography>
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
                      fullWidth
                      sx={{
                        backgroundColor: "#FFD700",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#FFB800" },
                        mt: 2,
                      }}
                      onClick={() => {
                        if (job.link) {
                          window.open(job.link, "_blank");
                        }
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="#fff" sx={{ mt: 4 }}>
          No jobs found matching your search.
        </Typography>
      )}

      {filteredJobs.length > jobsPerPage && (
        <Pagination
          count={Math.ceil(filteredJobs.length / jobsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "#FFD700", // Pagination items (unselected).
            },
            "& .Mui-selected": {
              backgroundColor: "#FFB800",
              color: "#fff",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#FFD700",
            },
          }}
        />
      )}
    </Container>
  );
}

export default Jobs;
