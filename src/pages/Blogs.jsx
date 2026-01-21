import { useEffect, useState } from "react";
import api from "../api/axios";
import BlogCard from "../components/BlogCard";
import { TextField, Container, Stack } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    api
      .get(`/blogs?category=${category}&author=${author}`)
      .then((res) => setBlogs(res.data));
  }, [category, author]);

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Filter by Category"
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />
        <TextField
          label="Filter by Author"
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
      </Stack>

      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </Container>
  );
};

export default Blogs;
