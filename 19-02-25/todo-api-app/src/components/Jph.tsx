import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";

type PostType = {
  id?: number;
  title: string;
  body: string;
  userId?: number;
};

export default function App() {
  const [post, setPost] = useState<PostType | null>(null);
  const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    if (!postId.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (!res.ok) throw new Error("Post not Found!");
      const data = await res.json();
      setPost(data);
      setPostId("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const data = await res.json();

      setPost(data);
      setBody("");
      setTitle("");
      setPostId(data.id?.toString() || "");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    if (!post) return;
    setLoading(true);
    setError(null);

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "DELETE",
      });
      setError("Post deleted successfully!");
      setPost(null);
      setPostId("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Fetch Post
            </Typography>

            <TextField
              label="Post ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="Enter Post ID"
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={fetchPost}
            >
              Fetch Post
            </Button>

            {loading && (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {error}
              </Alert>
            )}

            {post && (
              <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
                <Typography variant="h6">Post Details</Typography>
                <Typography>ID: {post?.id}</Typography>
                <Typography>Title: {post?.title}</Typography>
                <Typography>Body: {post?.body}</Typography>
              </Paper>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create Post
            </Typography>

            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />

            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter Body"
            />

            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={createPost}
              sx={{ marginTop: 2 }}
            >
              Create
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          onClick={deletePost}
          disabled={!post}
        >
          Delete Fetched Post
        </Button>
      </Box>
    </Container>
  );
}
