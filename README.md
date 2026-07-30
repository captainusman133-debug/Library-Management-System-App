# Library Management System

This repository contains a Node.js backend API and a React frontend.

## Run locally

1. Install backend dependencies:

```bash
npm install
```

2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Build frontend and start backend:

```bash
cd client
npm run build
cd ..
npm start
```

4. Open the app in the browser:

```text
http://localhost:5000/
```

## Production

The backend serves the React build from `/client/build`.

- API base: `/api`
- App root: `/`
