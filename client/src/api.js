const API_BASE = process.env.REACT_APP_API_BASE || 'https://library-management-system-app-production-cc36.up.railway.app/api';

async function fetchJson(path, options = {}) {
  const url = `${API_BASE}${path}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Unable to load data (${response.status}): ${errorText}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (err) {
    throw new Error(`Network request failed for ${url}: ${err.message}`);
  }
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function getDashboard() {
  return fetchJson('/dashboard');
}

export async function getBooks() {
  return fetchJson('/books');
}

export async function addBook(book) {
  return fetchJson('/books', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(book),
  });
}

export async function updateBook(id, book) {
  return fetchJson(`/books/${id}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(book),
  });
}

export async function deleteBook(id) {
  return fetchJson(`/books/${id}`, {
    method: 'DELETE',
  });
}

export async function getUsers() {
  return fetchJson('/users');
}

export async function addUser(user) {
  return fetchJson('/users', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(user),
  });
}

export async function getCategories() {
  return fetchJson('/categories');
}

export async function addCategory(category) {
  return fetchJson('/categories', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(category),
  });
}
