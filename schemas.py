from pydantic import BaseModel

class CreateNote(BaseModel):
    title: str
    description: str