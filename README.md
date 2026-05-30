# 💬 AI Customer Support Assistant (Llama 3)

A modern AI-powered customer support chatbot built using **Next.js (App Router)** and **Llama 3 via Groq API**.  
It provides intelligent, fast, and human-like responses for customer queries.

---

## 🎯 Project Overview

This project simulates a real-world **AI customer support system** where users can ask questions and receive instant AI-generated responses powered by **Llama 3**.

It demonstrates full-stack development using:
- Frontend (React / Next.js UI)
- Backend API routes
- LLM integration (Groq + Llama 3)

---

## ✨ Features

- 💬 Real-time chatbot interface
- 🤖 Llama 3 AI responses
- ⚡ Fast API responses using Groq
- 🧠 Context-aware customer support replies
- 📱 Clean and responsive UI
- 🔁 Chat history during session

---

## 🧠 Tech Stack

- Next.js (App Router)
- React / TypeScript
- Groq API (Llama 3 model)
- Node.js
- CSS / Basic styling

---

## 🏗️ Project Structure
customer-support-ai/
│
├── app/
│ ├── page.tsx # Chat UI (Frontend)
│ └── api/
│ └── chat/
│ └── route.ts # Backend API (LLM call)
│
├── public/
├── package.json
├── tsconfig.json
├── next.config.js
└── .gitignore


---

## ⚙️ How It Works

1. User types a message in the chat UI
2. Frontend sends request to `/api/chat`
3. API route sends prompt to Llama 3 (Groq API)
4. AI generates a response
5. Response is returned and displayed in UI

---

## 🔑 Environment Variables

Create a `.env.local` file in root:

```env
GROQ_API_KEY=your_api_key_here

▶️ Run Locally
1. Install dependencies

npm install
2. Run development server

npm run dev

3. Open in browser
http://localhost:3000

📌 API Route

POST /api/chat

Request Body:

{
  "message": "Hello, I need help with my order"
}
Response:

{
  "reply": "Sure! I'd be happy to help you with your order..."
}

🚀 Key Highlights
Full-stack AI chatbot
Real-world customer support simulation
Llama 3 integration
Clean Next.js App Router architecture
Production-ready API structure
🔮 Future Improvements
Chat history database (MongoDB / Firebase)
User authentication
Ticket creation system
FAQ knowledge base (RAG system)
Multi-agent support system
👨‍💻 Author

Built as an AI portfolio project demonstrating full-stack development + LLM integration.

📜 License

Free to use for learning and portfolio purposes.

