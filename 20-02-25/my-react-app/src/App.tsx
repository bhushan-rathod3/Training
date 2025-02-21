import React from "react";
import { TaskProvider } from "./components/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  //console.log("🌟 App rendered!");

  return (
    <TaskProvider>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
