import { Container, TextField, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/blogs").then((res) => {
      const found = res.data.find((b) => b._id === id);
      setBlog(found);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, blog);
      navigate("/my-blogs");
    } catch (err) {
      setError("Update failed");
    }
  };

  if (!blog) return null;

  return (
    <Container maxWidth="sm">
      <h2>Edit Blog</h2>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          value={blog.category}
          onChange={(e) => setBlog({ ...blog, category: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditBlog;
