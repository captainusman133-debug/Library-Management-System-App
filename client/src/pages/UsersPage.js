import { useEffect, useState } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../api';
import './Page.css';

const initialFormState = {
  name: '',
  email: '',
  role: 'Student',
};

const roles = ['Admin', 'Librarian', 'Student'];

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.name || !form.email) {
      setError('Please fill in both name and email.');
      return;
    }

    try {
      if (editingId) {
        await updateUser(editingId, form);
        setMessage('User updated successfully.');
      } else {
        await addUser(form);
        setMessage('User added successfully.');
      }
      setForm(initialFormState);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'Student',
    });
    setError(null);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this user?');
    if (!confirmed) return;

    setError(null);
    setMessage(null);
    try {
      await deleteUser(id);
      setMessage('User deleted successfully.');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(initialFormState);
    setError(null);
    setMessage(null);
  };

  return (
    <div className="page">
      <h2>Users</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange}>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Update User' : 'Add User'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {users.length ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="action-button" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersPage;
