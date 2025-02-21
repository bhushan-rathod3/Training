import React from "react";
import { useTaskContext } from "./TaskContext";

interface TaskProps {
  task: { id: number; text: string; completed: boolean };
}

const TaskItem: React.FC<TaskProps> = React.memo(
  ({ task }) => {
    //console.log(`🟢 TaskItem rendered: ${task.text}`);

    const { toggleTask, removeTask } = useTaskContext();

    return (
      <div>
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.text}
        </span>
        <button onClick={() => toggleTask(task.id)}>Toggle</button>
        <button onClick={() => removeTask(task.id)}>Remove</button>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.task === nextProps.task
);
export default TaskItem;
