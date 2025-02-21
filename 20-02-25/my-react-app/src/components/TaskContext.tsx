import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
} from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type TaskAction =
  | { type: "ADD_TASK"; text: string }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_TASK"; id: number };

const TaskContext = createContext<{
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
} | null>(null);

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  console.log("🔄 TaskProvider rendered!");

  const addTask = useCallback((text: string) => {
    console.log("➕ addTask called");
    dispatch({ type: "ADD_TASK", text });
  }, []);

  const removeTask = useCallback((id: number) => {
    console.log("❌ removeTask called");
    dispatch({ type: "REMOVE_TASK", id });
  }, []);

  const toggleTask = useCallback((id: number) => {
    console.log("✔️ toggleTask called");
    dispatch({ type: "TOGGLE_TASK", id });
  }, []);

  const completedTaskCount = useMemo(() => {
    console.log("🔢 Calculating completed task count...");
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
      <p>Completed Tasks: {completedTaskCount}</p>
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};
