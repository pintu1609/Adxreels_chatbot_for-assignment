from fastapi import FastAPI
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env


app = FastAPI(title="FastAPI AI Service")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
url = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}

class Msg(BaseModel):
    message: str

@app.post("/generate")
def generate(req: Msg):
    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": req.message}
        ]
    }

    res = requests.post(url, json=payload, headers=headers)
    data = res.json()

    reply = data["choices"][0]["message"]["content"]
    return {"reply": reply}
