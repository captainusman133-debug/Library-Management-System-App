import { useEffect, useState } from 'react';
import { getCategories } from '../api';
import './Page.css';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.data || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="page">
      <h2>Categories</h2>
      {error && <p className="error">{error}</p>}
      {categories.length ? (
        <ul className="list">
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

export default CategoriesPage;
