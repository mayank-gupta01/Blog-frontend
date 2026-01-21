import { Container, TextField, Button, Alert } from "@mui/material";
import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateBlog = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);

    try {
      await api.post("/blogs", {
        title: form.get("title"),
        category: form.get("category"),
        content: form.get("content"),
        image: form.get("image")
      });

      navigate("/my-blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Blog creation failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Create Blog</h2>

      {/* ✅ Error Alert */}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
        />
        <TextField
          name="category"
          label="Category"
          fullWidth
          margin="normal"
        />
        <TextField
          name="content"
          label="Content"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          name="image"
          label="Image URL (optional)"
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Blog
        </Button>
      </form>
    </Container>
  );
};

export default CreateBlog;
