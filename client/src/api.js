const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

async function fetchJson(path) {
  const url = `${API_BASE}${path}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error(`Unable to load data (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  } catch (err) {
    throw new Error(`Network request failed for ${url}: ${err.message}`);
  }
}

export async function getDashboard() {
  return fetchJson('/dashboard');
}

export async function getBooks() {
  return fetchJson('/books');
}

export async function getUsers() {
  return fetchJson('/users');
}

export async function getCategories() {
  return fetchJson('/categories');
}
