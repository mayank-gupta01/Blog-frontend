import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/blogs?author=${user.name}`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const deleteBlog = async (id) => {
    await api.delete(`/blogs/${id}`);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  return (
    <>
      {blogs.map((blog) => (
        <Card key={blog._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{blog.title}</Typography>
            <Typography variant="body2">{blog.category}</Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <IconButton
                color="primary"
                onClick={() => navigate(`/edit/${blog._id}`)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => deleteBlog(blog._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MyBlogs;
