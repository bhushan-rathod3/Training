import React, { useState } from "react";
import { useTaskContext } from "./TaskContext";

const TaskForm: React.FC = React.memo(() => {
  //console.log("📝 TaskForm rendered!");

  const { addTask } = useTaskContext();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addTask(text);
      setText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
});

export default TaskForm;
