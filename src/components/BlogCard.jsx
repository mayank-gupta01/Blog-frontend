import { Card, CardContent, Typography } from "@mui/material";

const BlogCard = ({ blog }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{blog.title}</Typography>
        <Typography variant="subtitle2">
          {blog.author} • {blog.category}
        </Typography>
        <Typography sx={{ mt: 1 }}>{blog.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
