import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Fetch users from backend
  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/users", form);
    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>MERN Azure Users App</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users List</h2>
      {users.map((u) => (
        <div key={u._id} className="card">
          <p>
            <strong>{u.name}</strong>
          </p>
          <p>{u.email}</p>
          <p>Age: {u.age}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
