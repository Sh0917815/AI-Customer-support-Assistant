# 💬 AI Customer Support Assistant (Llama 3)

A modern AI-powered customer support chatbot built using **Next.js (App Router)** and **Llama 3 (hosted model)**.  
It provides fast, intelligent, and human-like responses to customer queries through a clean chat interface.

---

## 🎯 Project Overview

This project simulates a real-world AI customer support system where users can interact with an AI chatbot and receive instant responses powered by Llama 3.

It demonstrates full-stack web development, API routing, and integration of AI models into a web application.

---

## ✨ Features

- 💬 Real-time chatbot interface  
- 🤖 Llama 3 AI responses  
- 🧠 Context-aware replies  
- 📱 Responsive UI design  
- 🔁 Session-based chat history  
- ⚡ Fast user interaction flow  

---

## 🧠 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- TypeScript

**Backend**
- Next.js API Routes
- Node.js

**AI Model**
- Llama 3 (hosted / online model)

**Styling**
- CSS

---

## 🏗️ Project Structure


customer-support-ai/
│
├── app/
│   ├── page.tsx        # Chat UI (Frontend)
│   └── api/
│       └── chat/
│           └── route.ts  # Backend API route
│
├── public/
├── package.json
├── tsconfig.json
├── next.config.js
└── .gitignore

---

## ⚙️ How It Works

1. User enters a message in the chat interface  
2. Frontend sends request to `/api/chat`  
3. Backend processes the request and sends it to Llama 3 (hosted model)  
4. AI generates a response  
5. Response is returned and displayed in the UI  

---

## ▶️ Run Locally

### 1. Install dependencies
```bash
npm install
2. Start development server
npm run dev
3. Open in browser
http://localhost:3000
📌 API Route
POST /api/chat

Request:

{
  "message": "Hello, I need help with my order"
}

Response:

{
  "reply": "Sure! I'd be happy to help you with your order..."
}
🚀 Key Highlights
Full-stack AI chatbot application
Integration of Llama 3 into a web app
Real-time conversational UI
Clean Next.js App Router architecture
Simple and production-style API structure
🔮 Future Improvements
Persistent chat history (database integration)
User authentication
FAQ knowledge base (RAG system)
Ticket creation system
Multi-agent support system
👨‍💻 Author

Built as a portfolio project demonstrating full-stack development + AI integration.

📜 License

Free to use for learning and portfolio purposes.

