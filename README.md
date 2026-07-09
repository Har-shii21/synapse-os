# 🚀 Synapse OS

> **A Cognitive Coordination Platform for Autonomous AI Teams**

Synapse OS is a multi-agent AI platform that enables intelligent agents to collaborate, reason, analyze, review, and execute complex tasks together. The system integrates AI workflows, voice capabilities, cognitive memory, analytics, and a knowledge graph into a unified dashboard.

---

## ✨ Features

- 🤖 Multi-Agent AI Workflow
- 🧠 Cognitive Memory using Neo4j
- 🎤 Speech-to-Text
- 🔊 Text-to-Speech
- 📊 Real-Time Analytics Dashboard
- 📈 Workflow Monitoring
- 🌐 Knowledge Graph Visualization
- 📂 Project Management
- ⚡ FastAPI Backend
- 💻 Next.js + React Frontend
- 🎨 Modern Responsive UI

---

## 🏗️ Architecture

```
                User
                  │
                  ▼
        Next.js + React Dashboard
                  │
                  ▼
             FastAPI Backend
                  │
 ┌────────────────┼────────────────┐
 │                │                │
 ▼                ▼                ▼
Planner      Researcher       Engineer
 Agent          Agent           Agent

 │                │                │

 └────────────────┼────────────────┘
                  │
                  ▼
        Security & Review Agents
                  │
                  ▼
         Neo4j Knowledge Graph
                  │
                  ▼
          Analytics & Replay

                  │
                  ▼
          Sarvam AI Voice APIs
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python

### Database

- Neo4j Graph Database

### AI & Voice

- Sarvam AI
- Speech-to-Text
- Text-to-Speech

### Tools

- Git
- GitHub
- VS Code

---

## 🤖 AI Agents

- 📝 Planner Agent
- 🔍 Research Agent
- 💻 Engineer Agent
- 🔒 Security Agent
- 📊 Analyst Agent
- ✅ Reviewer Agent

Each agent performs a specialized task and contributes to the overall workflow.

---

## 📊 Dashboard Modules

- Home Dashboard
- Project Management
- Workflow Status
- Analytics
- Knowledge Graph
- Replay
- Voice Assistant
- Settings

---

## 🎤 Voice Features

- Speech-to-Text
- Text-to-Speech
- Multi-language Support
- AI Voice Playback

---

## 📁 Project Structure

```
Synapse-OS
│
├── backend/
│   ├── agents/
│   ├── api/
│   ├── services/
│   ├── generated_audio/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── app/
│   └── public/
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Har-shii21/synapse-os.git
```

### Backend

```bash
cd backend

python -m venv .venv

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
SARVAM_API_KEY=YOUR_API_KEY
NEO4J_URI=YOUR_NEO4J_URI
NEO4J_USERNAME=YOUR_USERNAME
NEO4J_PASSWORD=YOUR_PASSWORD
```

---

## 🚀 Future Enhancements

- Multi-user Authentication
- Cloud Deployment
- Agent Collaboration History
- Docker Support
- Real-Time Notifications
- Advanced Analytics
- Plugin Architecture

---

## 👩‍💻 Developer

**M Harshitha**

BCA Analytics Student

Passionate about AI, Full Stack Development, Data Analytics, and Intelligent Systems.

GitHub:
https://github.com/Har-shii21

LinkedIn:
https://www.linkedin.com/in/har-shitha28

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you like this project, consider giving it a star!