import { useState } from "react";
import TaskCard from "../components/TaskCard";
import type { Task } from "../types/task";
import { getTasks, addTask, deleteTask, updateStatus, generateDescription } from "../services/taskAPI";
import { useEffect } from "react";
import Column from "../components/Column";

function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {

    async function fetchTasks() {
      const tasks = await getTasks();
      setTasks(tasks);
    }
  fetchTasks()
  }, []);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const backlogTasks = tasks.filter((task) => task.status === "Backlog");
  const InProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const DoneTasks = tasks.filter((task) => task.status === "Done");

  async function handleUpdateStatus(id: number) {
    
    const status = tasks.find((task) => task.id === id)?.status || "Backlog";

    let nextStatus = status;

    if (status === "Backlog") {
      nextStatus = "In Progress";
    }
    else if (status === "In Progress") {
      nextStatus = "Done";
    }
    
    const updatedTask = await updateStatus(id, nextStatus);

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? updatedTask : task);

      return updatedTasks;
    });
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  async function handleAddTask() {
    if (!newTaskTitle.trim()) return;
    const newTask = await addTask(newTaskTitle);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
  }

  async function handleGenerateDescription() {

  if (!newTaskTitle.trim()) return;
  
  const description = await generateDescription(newTaskTitle);

  setNewTaskDescription(description.description);
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

      <textarea
        placeholder="Task description"
        value={newTaskDescription}
        onChange={(event) => setNewTaskDescription(event.target.value)}
      />
      <button onClick={handleGenerateDescription}>Generate Description</button>

      <div className="board-columns">

        <Column title="Backlog">

            {backlogTasks.map((task) => (
            <TaskCard
            id={task.id}
            title={task.title}
            status={task.status}
            description={task.description}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
            />
            ))}
        </Column>

        <Column title="In Progress">

            {InProgressTasks.map((task) => (
            <TaskCard
            id={task.id}
            title={task.title}
            status={task.status}
            description={task.description}
            onDelete={handleDeleteTask}
            onUpdateStatus={handleUpdateStatus}
            />
            ))}
        </Column>

        <Column title="Done">

          {DoneTasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
              onDelete={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </Column>

      </div>
    </div>
  );
}

export default BoardPage;