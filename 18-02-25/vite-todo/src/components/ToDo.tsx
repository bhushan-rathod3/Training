import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

function ToDo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, isEditing: false }]);
    setNewTodo("");
  };

  const editTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const saveTodo = (id: number, newText: string) => {
    if (newText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAllTodos = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all todos?"
    );
    if (confirmClear) {
      setTodos([]);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id?: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (id !== undefined) {
        saveTodo(id, (e.target as HTMLInputElement).value);
      } else {
        addTodo();
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo App
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" color="primary" onClick={addTodo}>
            Add
          </Button>
        </Box>

        {todos.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<ClearAllIcon />}
            onClick={clearAllTodos}
            sx={{ mb: 2 }}
          >
            Clear All
          </Button>
        )}

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                py: 1,
              }}
            >
              {todo.isEditing ? (
                <TextField
                  fullWidth
                  defaultValue={todo.text}
                  onBlur={(e) => saveTodo(todo.id, e.target.value)}
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e as React.KeyboardEvent<HTMLInputElement>,
                      todo.id
                    )
                  }
                  autoFocus
                />
              ) : (
                <Typography sx={{ flexGrow: 1 }}>{todo.text}</Typography>
              )}

              <Box display="flex" gap={1}>
                {todo.isEditing ? (
                  <IconButton onClick={() => saveTodo(todo.id, todo.text)}>
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => editTodo(todo.id)}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => deleteTodo(todo.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ToDo;
