import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Component1 from "./../../components/Component1";
import Component2 from "./../../components/Component2";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (!userDetailsString) {
      toast.error("Please login first!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
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
    );
  }

  return (
    <Container>
      <Component1 />
      <Component2 />
    </Container>
  );
};

export default Home;
