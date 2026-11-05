import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import CourseList from "./components/CourseList";
import TaskSection from "./components/TaskSection";

const initialCourses = [
  { name: "Web Technology", progress: 80 },
  { name: "Database Management", progress: 65 },
  { name: "Machine Learning", progress: 40 },
  { name: "Computer Networks", progress: 90 },
];

const initialNotifications = [
  "Assignment 3 due tomorrow",
  "New material added: Machine Learning",
  "Lab exam on Friday",
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "WT Experiment 8", done: false },
    { id: 2, text: "MongoDB Schema Design", done: false },
  ]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredCourses = initialCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const completion = Math.round(
    initialCourses.reduce((sum, c) => sum + c.progress, 0) / initialCourses.length
  );

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        search={search}
        onSearchChange={setSearch}
        notifications={initialNotifications}
        showNotifications={showNotifications}
        toggleNotifications={toggleNotifications}
        toggleSidebar={toggleSidebar}
      />

      <div className="layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="dashboard" id="home">
          <section className="welcome">
            <h1>Welcome URK24CS1163!!!</h1>
            <p>Here is your academic overview.</p>
          </section>

          <section className="cards">
            <StatCard title="Courses" value={initialCourses.length} />
            <StatCard title="Assignments" value="12" />
            <StatCard title="Attendance" value="92%" />
            <StatCard title="Completion" value={`${completion}%`} />
          </section>

          <CourseList courses={filteredCourses} />

          <TaskSection
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
