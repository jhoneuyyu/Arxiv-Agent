# Arxiv Research Agent

A powerful AI agent designed to research scientific papers from Arxiv. This project consists of a Python-based agent utilizing LangGraph and Groq, coupled with a modern, responsive Next.js frontend.

## 🚀 Features

- **Intelligent Research**: Uses LangGraph to orchestrate a research agent that can "think" and search Arxiv.
- **Modern UI**: A sleek chat interface built with Next.js and Tailwind CSS.
- **FastAPI Backend**: Robust Python backend serving the agent via REST API.
- **Interactive**: Real-time streaming-like experience (simulated via API responses).

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

### Backend
- **Core**: [LangGraph](https://langchain-ai.github.io/langgraph/) & [LangChain](https://www.langchain.com/)
- **LLM**: Groq (Moonshot AI models)
- **API**: [FastAPI](https://fastapi.tiangolo.com/)
- **Search**: Arxiv Retriever

## 🏁 Getting Started

### Prerequisites

- Node.js & npm
- Python 3.10+
- A Groq API Key

### 1. Backend Setup

Navigate to the root directory `sample/`:

```bash
# Install dependencies (ensure you have a virtual environment)
pip install -r requirements.txt

# Create a .env file
# GROQ_API_KEY=your_api_key_here

# Run the server
python server.py
```

The backend runs on `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the `my-chat-ui` directory:

```bash
cd my-chat-ui

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the agent.

## 📝 Usage

1.  Start both the backend and frontend servers.
2.  Open the web interface.
3.  Ask a research question (e.g., "What are the latest advancements in Multi-Agent Systems?").
4.  The agent will "think" using its internal tools and then query Arxiv to provide a realized answer.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
