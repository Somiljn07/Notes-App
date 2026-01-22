from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from database import Base
from constants import FIELD_LIMITS, DEFAULTS


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(FIELD_LIMITS["TITLE_MAX_LENGTH"]), nullable=False)
    content = Column(Text)
    tags = Column(Text)
    color = Column(String(FIELD_LIMITS["COLOR_MAX_LENGTH"]))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(FIELD_LIMITS["TITLE_MAX_LENGTH"]), nullable=False)
    description = Column(Text)
    date = Column(String(FIELD_LIMITS["DATE_MAX_LENGTH"]), nullable=False)  # YYYY-MM-DD format
    tags = Column(Text)
    color = Column(String(FIELD_LIMITS["COLOR_MAX_LENGTH"]))
    done = Column(Boolean, default=DEFAULTS["DONE"])
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(FIELD_LIMITS["TITLE_MAX_LENGTH"]), nullable=False)
    comment = Column(Text)
    progress = Column(Integer, default=DEFAULTS["PROGRESS"])
    color = Column(String(FIELD_LIMITS["COLOR_MAX_LENGTH"]))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
