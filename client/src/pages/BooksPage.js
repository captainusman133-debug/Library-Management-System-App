import { useEffect, useState } from 'react';
import {
  getBooks,
  getCategories,
  addBook,
  updateBook,
  deleteBook,
} from '../api';
import './Page.css';

const initialFormState = {
  title: '',
  author: '',
  isbn: '',
  category: '',
  quantity: 0,
  availableCopies: 0,
};

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

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
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'availableCopies' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!form.title || !form.author || !form.isbn || !form.category) {
      setError('Please fill in all required book fields.');
      return;
    }

    try {
      if (editingId) {
        await updateBook(editingId, form);
        setMessage('Book updated successfully.');
      } else {
        await addBook(form);
        setMessage('Book added successfully.');
      }
      setForm(initialFormState);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title || '',
      author: book.author || '',
      isbn: book.isbn || '',
      category: book.category?._id || '',
      quantity: book.quantity || 0,
      availableCopies: book.availableCopies || 0,
    });
    setError(null);
    setMessage(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this book? This cannot be undone.');
    if (!confirmed) return;

    setError(null);
    setMessage(null);
    try {
      await deleteBook(id);
      setMessage('Book deleted successfully.');
      fetchBooks();
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
      <h2>Books</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Author
            <input name="author" value={form.author} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            ISBN
            <input name="isbn" value={form.isbn} onChange={handleChange} required />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Available Copies
            <input
              name="availableCopies"
              type="number"
              min="0"
              value={form.availableCopies}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {books.length ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Available</th>
                <th>Actions</th>
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
                  <td>
                    <button className="action-button" onClick={() => handleEdit(book)}>
                      Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BooksPage;
