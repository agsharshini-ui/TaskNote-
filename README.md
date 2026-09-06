# TaskNote - Professional To-Do List and Notes Web App

## Overview

TaskNote is a full-stack productivity application combining a task manager and a personal notepad. It provides a minimal black-and-white design system, responsive UI, and a REST API backed by MongoDB.
                                                                                                                         ##Live Demo

🌐 **Application:** task-note-8zuo9a0oa-gowri-todo-app.vercel.app


## Repository layout

- `src/` — React client (`Vite`)
- `public/` — static assets for the client
- `server/` — Node/Express API and Mongoose models
- `README.md` — this file

## Key features

- Notes with save and a distraction‑free editor
- Responsive, accessible UI with dark/light theme support
- Centralized backend error handling and input validation
- Create, edit, and delete tasks
- Mark tasks as completed or pending
- Search, filter, and sort tasks
- Organize tasks based on priority and status
- Create, edit, and delete notes
- Notes with save functionality and a distraction-free editor
- Responsive, accessible UI with dark/light theme support
- Centralized backend error handling and input validation

## Tech stack

- Frontend: `React`, `Vite`, `React Router`, modern CSS
- Backend: `Node.js`, `Express`, `Mongoose` (MongoDB)
- Dev: `dotenv`, `nodemon`, `eslint` (optional)

## Quick start

### Table of contents

- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [API (examples)](#api-examples)

### Server

#### Windows (PowerShell)

```powershell
cd server
copy .env.example .env
# edit server\.env and add MONGO_URI
npm install
npm run dev
```

#### macOS / Linux

```bash
cd server
cp .env.example .env
# edit server/.env and add MONGO_URI
npm install
npm run dev
```

### Client (from repository root)

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env` file in `server/` with the values below (see `server/.env.example`):

- `MONGO_URI` — MongoDB Atlas connection string
- `PORT` — optional server port (default 5000)
- MONGO_URI=your_mongodb_connection_string PORT=5000
- VITE_API_URL=https://tasknote-1v4l.onrender.com

## API (examples)

### Tasks

- `GET /api/tasks` — list user tasks 
- `POST /api/tasks` — create task
- `GET /api/tasks/:id` — get task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task

### Notes

- `GET /api/notes` — list notes (search)
- `POST /api/notes` — create note
- `GET /api/notes/:id` — get note
- `PUT /api/notes/:id` — update note
- `DELETE /api/notes/:id` — delete note

## Deployment notes

- Frontend: deploy the client to `Vercel` (set API base URL to the Render service)
- Backend: deploy the `server/` to Render (set `MONGO_URI` in env)
- Database: MongoDB with Mongoose

## Repository hygiene

- Do not commit `.env` or any secrets
- `node_modules/` and `.env` are excluded by `.gitignore`

## What I learned

- Building RESTful APIs with `Express` and `Mongoose`
- Designing a responsive, accessible React UI with `Vite`
- Structuring a full‑stack project for deployment and maintainability

## Next steps

- Add tests and CI, then deploy to `Vercel` (client) + Render (server)
