import { useEffect, useState } from 'react';
import { getBooks } from '../api';
import './Page.css';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBooks()
      .then((data) => setBooks(data.data || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <h2>Books</h2>
      {error && <p className="error">{error}</p>}
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
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BooksPage;
