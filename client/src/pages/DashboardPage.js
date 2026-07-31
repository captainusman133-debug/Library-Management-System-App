import { useEffect, useState } from 'react';
import { getDashboard } from '../api';
import './Page.css';

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboard()
      .then((data) => setDashboard(data.dashboard))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
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
    </div>
  );
}

export default DashboardPage;
