import { useEffect, useState } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../api';
import './Page.css';

const initialFormState = {
  name: '',
  description: '',
};

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data.data || []);
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

    if (!form.name) {
      setError('Please enter a category name.');
      return;
    }

    try {
      if (editingId) {
        await updateCategory(editingId, form);
        setMessage('Category updated successfully.');
      } else {
        await addCategory(form);
        setMessage('Category added successfully.');
      }
      setForm(initialFormState);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name || '',
      description: category.description || '',
    });
    setError(null);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this category?');
    if (!confirmed) return;

    setError(null);
    setMessage(null);
    try {
      await deleteCategory(id);
      setMessage('Category deleted successfully.');
      fetchCategories();
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
      <h2>Categories</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Update Category' : 'Add Category'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {categories.length ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description || '—'}</td>
                  <td>
                    <button className="action-button" onClick={() => handleEdit(category)}>
                      Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(category._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

export default CategoriesPage;
