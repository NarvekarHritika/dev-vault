from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import CreateNote
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_async_session, Note, create_db_and_tables

# import time
app = FastAPI()

# IMPORTANT: This allows your JS frontend to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

notes = {
    "Buy groceries": "Buy chicken, eggs, flour, etc",
    "Dance": "Dance on Aespa Drama song",
    "Play a Game": "Play Ludo with friends",
}


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()


@app.get("/notes")
async def get_notes(session: AsyncSession = Depends(get_async_session)):
    # time.sleep(2)
    result = await session.execute(select(Note))
    dbnotes = result.scalars().all()
    return {notes.title: notes.description for notes in dbnotes}


@app.get("/")
def root():
    return {"message": "Vault API is running!"}


@app.post("/add_note")
async def add_note(
    params: CreateNote, session: AsyncSession = Depends(get_async_session)
):
    # print(params)
    # if params.title in notes:
    #     return {"status": "error", "message": "Note title already exists"}
    # notes[params.title]= params.description
    # return {"status": "success", "data": params}
    new_note = Note(title=params.title, description=params.description)
    session.add(new_note)
    await session.commit()
    return {"status": "success", "data": params}


@app.delete("/delete_note")
async def delete_note(title: str, session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Note).where(Note.title == title))
    note_to_delete = result.scalars().first()
    if not note_to_delete:
        return {"status": "error", "message": "Note not found"}
    await session.delete(note_to_delete)
    await session.commit()
    return {"status": "success", "message": "Note deleted successfully"}
