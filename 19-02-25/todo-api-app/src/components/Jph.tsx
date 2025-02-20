// import { useState, useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Box,
//   CircularProgress,
//   Alert,
//   Grid,
// } from "@mui/material";

// type PostType = {
//   id?: number;
//   title: string;
//   body: string;
//   userId?: number;
// };

// export default function Nph() {
//   const [post, setPost] = useState<PostType | null>(null);
//   const [postId, setPostId] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [body, setBody] = useState<string>("");
//   const [userId, setUserId] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch Post
//   const fetchPost = async () => {
//     if (!postId.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/posts/${postId}`
//       );
//       if (!res.ok) throw new Error("Post not Found!");
//       const data = await res.json();
//       setPost(data);
//       setTitle(data.title);
//       setBody(data.body);
//     } catch (error) {
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create Post
//   const createPost = async () => {
//     if (!title.trim() || !body.trim() || !userId.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, body, userId: Number(userId) }),
//       });
//       const data = await res.json();
//       setPost(data);
//       setPostId(data.id?.toString() || "");
//     } catch (error) {
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update Post
//   const updatePost = async () => {
//     if (!postId.trim() || !title.trim() || !body.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/posts/${postId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             id: Number(postId),
//             title,
//             body,
//             userId: Number(userId),
//           }),
//         }
//       );
//       const data = await res.json();
//       setPost(data);
//     } catch (error) {
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Post
//   const deletePost = async () => {
//     if (!postId.trim()) return;
//     setLoading(true);
//     setError(null);

//     try {
//       await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
//         method: "DELETE",
//       });
//       setPost(null);
//       setError("Post deleted successfully!");
//       setPostId("");
//       setTitle("");
//       setBody("");
//       setUserId("");
//     } catch (error) {
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (postId.trim()) {
//       const timer = setTimeout(fetchPost, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [postId]);

//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={3} sx={{ marginTop: 4 }}>
//         {/* Left Section - Fetching Posts */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Fetch Post
//             </Typography>

//             <TextField
//               label="Post ID"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={postId}
//               onChange={(e) => setPostId(e.target.value)}
//               placeholder="Enter Post ID"
//             />

//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={fetchPost}
//             >
//               Fetch Post
//             </Button>

//             {loading && (
//               <Box display="flex" justifyContent="center" mt={2}>
//                 <CircularProgress />
//               </Box>
//             )}

//             {error && (
//               <Alert severity="error" sx={{ marginTop: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             {post && postId && (
//               <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
//                 <Typography variant="h6">Post Details</Typography>
//                 <Typography>ID: {post?.id}</Typography>
//                 <Typography>Title: {post?.title}</Typography>
//                 <Typography>Body: {post?.body}</Typography>
//               </Paper>
//             )}
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Manage Post
//             </Typography>

//             <TextField
//               label="User ID"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               placeholder="Enter User ID"
//             />

//             <TextField
//               label="Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter Title"
//             />

//             <TextField
//               label="Body"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={3}
//               margin="normal"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               placeholder="Enter Body"
//             />

//             <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
//               <Button
//                 variant="contained"
//                 color="success"
//                 fullWidth
//                 onClick={createPost}
//               >
//                 Create
//               </Button>
//               <Button
//                 variant="contained"
//                 color="warning"
//                 fullWidth
//                 onClick={updatePost}
//                 disabled={!postId}
//               >
//                 Update
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 fullWidth
//                 onClick={deletePost}
//                 disabled={!postId}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

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

  // Create Post (Right Section)
  const createPost = async () => {
    if (!title.trim() || !body.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }), // Removed userId
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

  // Delete Post
  const deletePost = async () => {
    if (!post) return; // Only allow delete if post exists
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
        {/* Left Section - Fetching Posts */}
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

        {/* Right Section - Create Post */}
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

      {/* Delete Fetched Post (Bottom Section) */}
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="error"
          onClick={deletePost}
          disabled={!post} // Disable if no post is fetched
        >
          Delete Fetched Post
        </Button>
      </Box>
    </Container>
  );
}
