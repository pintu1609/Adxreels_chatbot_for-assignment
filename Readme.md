# AI Chatbot Assignment  
A simple full-stack AI chatbot built using **React**, **Node.js (Express)**, and **FastAPI**.  
The project sends user messages from React → Node Gateway → FastAPI → Groq LLM and returns the bot response.

---

## 🚀 Features
- Chat interface with bot & user messages  
- Loading indicator ("Thinking…")  
- Node.js gateway to avoid exposing API keys  
- FastAPI backend calling **Groq Llama-3.1-8B**  
- Clean UI and simple architecture  

---

## 🏗 Project Structure

ADXREELS
│── frontend/ → React UI
│── node-backend/ → Express gateway
└── fastapi-service/ → FastAPI + Groq LLM


---

## 📦 1. Install & Run React Frontend

cd react-frontend
npm install
npm start


Runs on: **http://localhost:3000**

---

## 📦 2. Install & Run Node.js Gateway

cd node-backend
npm install
node index.js


Runs on: **http://localhost:5000/chat**

This forwards requests to the FastAPI server.

---

## 📦 3. Install & Run FastAPI Server

cd fastapi-service
pip install fastapi uvicorn requests pydantic
uvicorn main:app --host 0.0.0.0 --port 8000


FastAPI endpoint: **POST http://localhost:8000/generate**

---

## 🔑 Environment Variables (Optional)

In `node-backend/.env`:

FASTAPI_URL=http://localhost:8000/generate


In `fastapi-service/`:

GROQ_API_KEY=your_groq_key

React → Node Backend → FastAPI → Groq API → FastAPI → Node → React


---

## 📡 API Description

### **POST /chat** (Node Gateway)
Request:
```json
{ "message": "Hello" }

Response:

{ "reply": "Hi! How can I help?" }

POST /generate (FastAPI)

Sends message to Groq Model (llama-3.1-8b-instant)


Tech Stack

React.js (Frontend)

Express.js (API Gateway)

FastAPI (LLM service)

Groq LLM API

JavaScript + Python