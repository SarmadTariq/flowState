import { useState } from "react";
import TaskCard from "../components/TaskCard";
import type { Task } from "../types/task";

function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design login flow",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Set up backend API",
      status: "Done",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const backlogTasks = tasks.filter(
    (task) => task.status === "Backlog"
    );
    const InProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
    );
    const DoneTasks = tasks.filter(
    (task) => task.status === "Done"
    );

  function handleUpdateStatus(id: number) {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, status: "Done" }
        : task
        ));
    }
  function handleDeleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleAddTask() {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: "Backlog",
    };

    setTasks([...tasks, newTask]);

    setNewTaskTitle("");
  }

  return (
    <div>
      <h1>Board</h1>

      <input
        type="text"
        placeholder="Enter task title"
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
      />

      <button onClick={handleAddTask}>Add Task</button>

        <div className="board-columns">

        <div className="board-column">
            <h2>Backlog</h2>

            {backlogTasks.map((task) => (
            <TaskCard
            id={task.id}
            title={task.title}
            status={task.status}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
            />
            ))}
        </div>

        <div className="board-column">
            <h2>In Progress</h2>

            {InProgressTasks.map((task) => (
            <TaskCard
            id={task.id}
            title={task.title}
            status={task.status}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
            />
            ))}
        </div>

        <div className="board-column">
          <h2>Done</h2>

          {DoneTasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              status={task.status}
              onDelete={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default BoardPage;