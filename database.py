import datetime
import uuid

from collections.abc import AsyncGenerator
from sqlalchemy import String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)

# 1. Added +aiosqlite (Required for async)
DATABASE_URL = "sqlite+aiosqlite:///dev_vault.db"


# Create a base class for declarative models in SQLAlchemy.
# All ORM models in the application will inherit from this class, allowing them
# to be discovered and managed by SQLAlchemy's ORM system.
class Base(DeclarativeBase):
    """Base class for all SQLAlchemy ORM models."""

    pass


class Note(Base):
    __tablename__ = "notes"
    # Modern SQLAlchemy style uses Mapped and mapped_column
    id: Mapped[str] = mapped_column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )
    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc)
    )


# Create an asynchronous engine for the specified database URL.
# The engine manages the connection pool and dialect for the database.
engine = create_async_engine(DATABASE_URL)
# Create a session maker that will be used to create new asynchronous sessions.
# `expire_on_commit=False` is set to prevent SQLAlchemy from expiring loaded
# objects after a transaction is committed. This is important in an async
# context, especially with FastAPI, where you might access object properties
# after the session has been committed and closed.
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def create_db_and_tables():
    """
    Creates all database tables defined by the models that inherit from `Base`.

    This function should be called during application startup to ensure that the
    database schema is up-to-date.
    """
    async with engine.begin() as conn:
        # This command runs the SQLAlchemy `create_all` method, which generates
        # the necessary SQL to create all tables that do not already exist.
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    An asynchronous generator that provides a database session for a single request.

    This function is designed to be used as a FastAPI dependency. It creates a new
    `AsyncSession` for each incoming request and ensures that it is properly
    closed afterward.

    Yields:
        An `AsyncSession` object that can be used to interact with the database.
    """
    # A new session is created from the session maker for each request.
    async with async_session_maker() as session:
        # The session is yielded to the endpoint/calling function.
        yield session
        # The session is automatically closed when the `async with` block is exited.
