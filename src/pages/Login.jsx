import { TextField, Button, Container, Alert } from "@mui/material";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);

    try {
      const res = await api.post("/auth/login", {
        email: form.get("email"),
        password: form.get("password")
      });

      login(res.data);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" fullWidth margin="normal" />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          fullWidth
          sx={{ mt: 1 }}
        >
          Don't have an account? Sign up
        </Button>
      </form>
    </Container>
  );
};

export default Login;
