# Maktabah Online

A fullstack CRUD application built with **React (TypeScript)** and **Node.js (Express)**.  
The project is fully **dockerized** and deployed with **GitHub Actions** at [pify.space](https://pify.space).

---

## Features
- User authentication with JWT  
- CRUD operations for items  
- React frontend with TypeScript  
- REST API with Express  
- Dockerized for local and production environments  
- Automated deployment via GitHub Actions  

---

## Tech Stack
- **Frontend:** React, TypeScript, Axios  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL 
- **Deployment:** Docker, GitHub Actions, Nginx  

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/)

### Run with Docker
```bash
git clone https://github.com/Pify/maktabah-online-dockerized.git
cd maktabah-online-dockerized
docker-compose up --build
```
- Frontend → http://localhost:3000
- Backend → http://localhost:5000

### Run without Docker
Backend
```bash
cd backend
npm install
npm run dev
```
Frontend
```bash
cd frontend
npm install
npm start
```

---

Deployment
- CI/CD handled with GitHub Actions
- On push to main, images are built and deployed to the server
- Live at [pify.space](https://pify.space)

