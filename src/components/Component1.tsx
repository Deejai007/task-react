import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Component1: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "body", headerName: "Body", flex: 1 },
  ];
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10, // Default number of rows per page
    page: 0, //initial page number
  });
  return (
    <Grid container spacing={2} marginBottom="16px">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "20px", minHeight: "400px" }}>
          <Typography variant="h4" gutterBottom align="center">
            Posts Data
          </Typography>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <CircularProgress size={56} />
            </div>
          ) : (
            <div style={{ height: "80vh", width: "100%" }}>
              <DataGrid
                rows={posts}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => setPaginationModel(model)}
                pageSizeOptions={[10, 25, 50]}
              />
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Component1;
