import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField, Container, Typography } from "@mui/material";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const validatePhoneNumber = (phone: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone" && phoneError) {
      setPhoneError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }

    const userDetails = { ...formData };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="98vh"
    >
      <Container
        maxWidth="xs"
        style={{
          backgroundColor: "rgb(250 250 250 )",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center">
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="tel"
            required
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            required
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
