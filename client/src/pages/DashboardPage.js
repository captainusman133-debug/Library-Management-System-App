import { useEffect, useState } from 'react';
import {
  getDashboard,
  getBorrowHistory,
  borrowBook,
  returnBook,
  getUsers,
  getBooks,
} from '../api';
import './Page.css';

const initialBorrowForm = {
  userId: '',
  bookId: '',
  dueDate: '',
};

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialBorrowForm);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setError(null);
    try {
      const [dashboardData, historyData, usersData, booksData] = await Promise.all([
        getDashboard(),
        getBorrowHistory(),
        getUsers(),
        getBooks(),
      ]);

      setDashboard(dashboardData.dashboard);
      setBorrowHistory(historyData.data || []);
      setUsers(usersData.data || []);
      setBooks(booksData.data || []);

      const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      setForm((prev) => ({ ...prev, dueDate: prev.dueDate || defaultDueDate }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBorrowSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.userId || !form.bookId || !form.dueDate) {
      setError('Please select a user, a book, and a due date.');
      return;
    }

    try {
      await borrowBook({
        userId: form.userId,
        bookId: form.bookId,
        dueDate: form.dueDate,
      });
      setMessage('Book borrowed successfully.');
      setForm(initialBorrowForm);
      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReturn = async (recordId) => {
    setError(null);
    setMessage(null);
    try {
      await returnBook(recordId);
      setMessage('Book returned successfully.');
      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {dashboard ? (
        <div className="grid">
          <div className="stat-card">
            <span>Total Books</span>
            <strong>{dashboard.totalBooks}</strong>
          </div>
          <div className="stat-card">
            <span>Total Users</span>
            <strong>{dashboard.totalUsers}</strong>
          </div>
          <div className="stat-card">
            <span>Total Categories</span>
            <strong>{dashboard.totalCategories}</strong>
          </div>
          <div className="stat-card">
            <span>Borrowed Books</span>
            <strong>{dashboard.borrowedBooks}</strong>
          </div>
          <div className="stat-card">
            <span>Returned Books</span>
            <strong>{dashboard.returnedBooks}</strong>
          </div>
        </div>
      ) : (
        <div className="loading">Loading dashboard...</div>
      )}

      <div className="dashboard-section">
        <h3>Borrow / Return Books</h3>
        <form className="book-form" onSubmit={handleBorrowSubmit}>
          <div className="form-row">
            <label>
              User
              <select name="userId" value={form.userId} onChange={handleChange} required>
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Book
              <select name="bookId" value={form.bookId} onChange={handleChange} required>
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} — {book.availableCopies} available
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Due Date
              <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} required />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Borrow Book</button>
          </div>
        </form>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowHistory.map((record) => (
                <tr key={record._id}>
                  <td>{record.user?.name || '—'}</td>
                  <td>{record.book?.title || '—'}</td>
                  <td>{record.dueDate ? new Date(record.dueDate).toLocaleDateString() : '—'}</td>
                  <td>{record.status}</td>
                  <td>
                    {record.status === 'Returned' ? (
                      <span className="tag">Returned</span>
                    ) : (
                      <button className="action-button" onClick={() => handleReturn(record._id)}>
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
