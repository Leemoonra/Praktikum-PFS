import React, { useState } from "react";
import { Container, Button, Form, Badge } from "react-bootstrap";
import { Plus, Search, ListTodo, CheckCircle2, Clock } from "lucide-react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    const date = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setTasks([...tasks, { ...task, id: Date.now(), createdAt: date }]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || task.status === filter;
    return matchSearch && matchFilter;
  });

  const completed = tasks.filter((task) => task.status === "Done").length;
  const pending = tasks.length - completed;

  return (
    <div className="app-background">
      <Container className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">MY PRODUCTIVITY SPACE</p>
            <h1>
              Daily Tasks<span>.</span>
            </h1>
            <p className="subtitle">Organize your day, one task at a time.</p>
          </div>
          <div className="header-icon">
            <ListTodo size={30} />
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <ListTodo size={22} />
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card completed-stat">
            <CheckCircle2 size={22} />
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card pending-stat">
            <Clock size={22} />
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <section className="task-section">
          <div className="section-heading">
            <div>
              <h2>My Task List</h2>
              <p>Manage your daily activities here.</p>
            </div>

            <Button className="add-button" onClick={handleShowForm}>
              <Plus size={18} /> Add Task
            </Button>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <Form.Control
                placeholder="Cari tugas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Form.Select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </div>

          <div className="task-summary">
            <span>
              Showing {filteredTasks.length} of {tasks.length} tasks
            </span>
            <Badge bg="dark">Daily Planner</Badge>
          </div>

          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            showEditForm={showEditForm}
          />
        </section>

        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />

        <footer className="dashboard-footer">
          Made for better productivity | 2026
        </footer>
      </Container>
    </div>
  );
}

export default App;
