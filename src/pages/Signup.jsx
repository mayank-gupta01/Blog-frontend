import { TextField, Button, Container, Alert } from "@mui/material";
import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = new FormData(e.target);

    try {
      await api.post("/auth/signup", {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      });

      setSuccess("Signup successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Signup</h2>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Name" fullWidth margin="normal" />
        <TextField name="email" label="Email" fullWidth margin="normal" />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
