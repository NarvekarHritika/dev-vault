from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import CreateNote
# import time
app= FastAPI()

# IMPORTANT: This allows your JS frontend to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

notes= {
    "Buy groceries": "Buy chicken, eggs, flour, etc",
    "Dance": "Dance on Aespa Drama song",
    "Play a Game": "Play Ludo with friends"
}
@app.get("/notes")
def get_notes():
    # time.sleep(2)
    return notes

@app.get("/")
def root():
    return {"message": "Vault API is running!"}

@app.post("/add_note")
def add_note(params: CreateNote):
    print(params)
    if params.title in notes:
        return {"status": "error", "message": "Note title already exists"}
    notes[params.title]= params.description
    return {"status": "success", "data": params}