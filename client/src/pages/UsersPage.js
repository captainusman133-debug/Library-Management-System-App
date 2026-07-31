import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import './Page.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.data || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      {users.length ? (
        <ul className="list">
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersPage;
