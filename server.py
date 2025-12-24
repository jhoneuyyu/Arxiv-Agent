from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main import agent
import uvicorn

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    messages: list

@app.post("/chat")
async def chat(query: Query):
    # Expecting the last message content to be the user's prompt
    user_message = query.messages[-1]['content']
    response = agent.invoke({"messages": [{"role": "user", "content": user_message}]},
    config={"configurable":{"thread_id":"1"}})
    return {"message": response["messages"][-1].content}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
