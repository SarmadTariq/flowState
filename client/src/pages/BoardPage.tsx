import { useState } from "react";
import TaskCard from "../components/TaskCard";
import type { Task } from "../types/task";
import { useEffect } from "react";

function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:5000/tasks");

      const data = await response.json();

      setTasks(data);
    }

    fetchTasks();
  }, []);

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

  async function handleUpdateStatus(id: number) {
    
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    let nextStatus = task.status;

    if (task.status === "Backlog") {
      nextStatus = "In Progress";
    } else if (task.status === "In Progress") {
      nextStatus = "Done";
    }
    
    const response = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      }
    );

    const updatedTask = await response.json();

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? updatedTask : task);

      return updatedTasks;
    });
  }

  async function handleDeleteTask(id: number) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  async function handleAddTask() {
    if (!newTaskTitle.trim()) return;

    const response = await fetch(
      "http://localhost:5000/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
        }),
      }
    );

    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
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