import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user details are stored in localStorage
  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (!userDetailsString) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  // Fetch posts data from API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setLoading(false);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "body", headerName: "Body", flex: 1 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "20px", minHeight: "400px" }}>
          <Typography variant="h6" gutterBottom>
            Posts Data
          </Typography>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={posts}
                columns={columns}
                // pageSize={5}
                // rowsPerPageOptions={[5, 10, 20]}
                // pageSizeOptions={[5, 10, 25, 50]}
              />
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SecondPage;
