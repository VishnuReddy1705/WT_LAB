import { useState } from "react";

function TaskSection({ tasks = [], onAddTask, onToggleTask, onDeleteTask }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAddTask(task.trim());
    setTask("");
  };

  return (
    <section className="task-section" id="tasks">
      <h2>Add Task</h2>
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleAdd()}
        />
        <button className="btn add-btn" onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((item) => (
          <li className="task-item" key={item.id}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggleTask(item.id)}
              />
              <span className={item.done ? "task-done" : ""}>{item.text}</span>
            </div>
            <button className="delete-btn" onClick={() => onDeleteTask(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskSection;
