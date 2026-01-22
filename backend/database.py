import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from constants import DATABASE_CONFIG

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, DATABASE_CONFIG["DB_NAME"])

DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": DATABASE_CONFIG["CHECK_SAME_THREAD"]}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
