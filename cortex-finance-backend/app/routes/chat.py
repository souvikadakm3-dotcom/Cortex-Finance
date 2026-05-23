from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.chatbot import ask_question

router = APIRouter()


class ChatRequest(BaseModel):
    query: str


@router.post("/chat")
def chat(request: ChatRequest):

    response = ask_question(request.query)

    return {
        "response": response
    }