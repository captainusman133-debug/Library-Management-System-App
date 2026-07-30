import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard`)
      .then((res) => res.json())
      .then((data) => setDashboard(data.dashboard))
      .catch(console.error);

    fetch(`${API_BASE}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data.data || []))
      .catch(console.error);

    fetch(`${API_BASE}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data || []))
      .catch(console.error);

    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Library Management</h1>
        <p>Backend API: {API_BASE}</p>
      </header>

      <section className="dashboard">
        <h2>Dashboard</h2>
        {dashboard ? (
          <div className="cards">
            <div className="card">Total Books: {dashboard.totalBooks}</div>
            <div className="card">Total Users: {dashboard.totalUsers}</div>
            <div className="card">Total Categories: {dashboard.totalCategories}</div>
            <div className="card">Borrowed Books: {dashboard.borrowedBooks}</div>
            <div className="card">Returned Books: {dashboard.returnedBooks}</div>
          </div>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </section>

      <section>
        <h2>Books</h2>
        {books.length ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category?.name || '—'}</td>
                  <td>{book.availableCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books available.</p>
        )}
      </section>

      <section>
        <h2>Users</h2>
        {users.length ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </section>

      <section>
        <h2>Categories</h2>
        {categories.length ? (
          <ul>
            {categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </section>
    </div>
  );
}

export default App;
