import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      setError("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  // Add Todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo, completed: false }),
      });
      const data = await res.json();
      setTodos((prev) => [...prev, data]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  // Update Todo
  const updateTodo = async () => {
    if (!editingTodo) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingTodo),
        }
      );
      const data = await res.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === data.id ? data : todo))
      );
      setEditingTodo(null);
    } catch (error) {
      setError("Failed to update todo.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Todo
  const deleteTodo = async (id: number) => {
    setLoading(true);
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete todo.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Todo Completion
  const toggleCompletion = async (todo: TodoType) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...todo, completed: !todo.completed }),
        }
      );
      const data = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === data.id ? data : t)));
    } catch (error) {
      setError("Failed to update todo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Todo List
        </Typography>

        {/* Add / Edit Todo */}
        <Box display="flex" gap={1} mb={2}>
          <TextField
            label="Todo Title"
            variant="outlined"
            fullWidth
            value={editingTodo ? editingTodo.title : newTodo}
            onChange={(e) =>
              editingTodo
                ? setEditingTodo({ ...editingTodo, title: e.target.value })
                : setNewTodo(e.target.value)
            }
          />
          {editingTodo ? (
            <Button variant="contained" color="warning" onClick={updateTodo}>
              Update
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={addTodo}>
              Add
            </Button>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}

        {/* Todo List */}
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => setEditingTodo(todo)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleCompletion(todo)}
              />
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
