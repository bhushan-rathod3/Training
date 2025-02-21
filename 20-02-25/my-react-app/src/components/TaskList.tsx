import React from "react";
import { useTaskContext } from "./TaskContext";
import TaskItem from "./TaskItem";

const TaskList: React.FC = React.memo(() => {
  console.log("📜 TaskList rendered!");

  const { tasks } = useTaskContext();

  return (
    <div>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
});

export default TaskList;
