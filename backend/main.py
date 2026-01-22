from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import Base, engine, SessionLocal
from constants import CORS_CONFIG, API_CONFIG, HTTP_MESSAGES
import models, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=API_CONFIG["TITLE"],
    description=API_CONFIG["DESCRIPTION"],
    version=API_CONFIG["VERSION"]
)

# CORS — REQUIRED FOR BROWSER + SWAGGER
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_CONFIG["ALLOW_ORIGINS"],
    allow_credentials=CORS_CONFIG["ALLOW_CREDENTIALS"],
    allow_methods=CORS_CONFIG["ALLOW_METHODS"],
    allow_headers=CORS_CONFIG["ALLOW_HEADERS"],
)


# ================= HEALTH CHECK =================
@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "version": API_CONFIG["VERSION"],
        "message": "SJ Notes API is running"
    }


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_item_exists(db: Session, model_class, item_id: int, item_name: str):
    """Helper function to validate if an item exists"""
    item = db.query(model_class).filter(model_class.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"{item_name} not found"
        )
    return item


# ================= NOTES =================
@app.post("/notes", response_model=schemas.Note)
def create_note(note: schemas.NoteBase, db: Session = Depends(get_db)):
    try:
        db_note = models.Note(
            title=note.title,
            content=note.content,
            tags=",".join(note.tags),
            color=note.color,
        )
        db.add(db_note)
        db.commit()
        db.refresh(db_note)
        return {**db_note.__dict__, "tags": note.tags}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.get("/notes", response_model=list[schemas.Note])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(models.Note).all()
    return [
        {**n.__dict__, "tags": n.tags.split(",") if n.tags else []}
        for n in notes
    ]


@app.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteBase, db: Session = Depends(get_db)):
    try:
        db_note = validate_item_exists(db, models.Note, note_id, "Note")
        
        db_note.title = note.title
        db_note.content = note.content
        db_note.tags = ",".join(note.tags)
        db_note.color = note.color
        
        db.commit()
        db.refresh(db_note)
        return {**db_note.__dict__, "tags": note.tags}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = validate_item_exists(db, models.Note, note_id, "Note")
    
    db.delete(db_note)
    db.commit()
    return {"message": HTTP_MESSAGES["DELETED"]}


# ================= TODOS =================
@app.post("/todos", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoBase, db: Session = Depends(get_db)):
    try:
        db_todo = models.Todo(
            title=todo.title,
            description=todo.description,
            date=todo.date,
            tags=",".join(todo.tags),
            color=todo.color,
            done=todo.done,
        )
        db.add(db_todo)
        db.commit()
        db.refresh(db_todo)
        return {**db_todo.__dict__, "tags": todo.tags}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.get("/todos", response_model=list[schemas.Todo])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return [
        {**t.__dict__, "tags": t.tags.split(",") if t.tags else []}
        for t in todos
    ]


@app.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(todo_id: int, todo: schemas.TodoBase, db: Session = Depends(get_db)):
    try:
        db_todo = validate_item_exists(db, models.Todo, todo_id, "Todo")
        
        db_todo.title = todo.title
        db_todo.description = todo.description
        db_todo.date = todo.date
        db_todo.tags = ",".join(todo.tags)
        db_todo.color = todo.color
        db_todo.done = todo.done
        
        db.commit()
        db.refresh(db_todo)
        return {**db_todo.__dict__, "tags": todo.tags}
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = validate_item_exists(db, models.Todo, todo_id, "Todo")
    
    db.delete(db_todo)
    db.commit()
    return {"message": HTTP_MESSAGES["DELETED"]}


# ================= GOALS =================
@app.post("/goals", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalBase, db: Session = Depends(get_db)):
    try:
        db_goal = models.Goal(
            title=goal.title,
            comment=goal.comment,
            progress=goal.progress,
            color=goal.color,
        )
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        return db_goal
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.get("/goals", response_model=list[schemas.Goal])
def get_goals(db: Session = Depends(get_db)):
    return db.query(models.Goal).all()


@app.put("/goals/{goal_id}", response_model=schemas.Goal)
def update_goal(goal_id: int, goal: schemas.GoalBase, db: Session = Depends(get_db)):
    try:
        db_goal = validate_item_exists(db, models.Goal, goal_id, "Goal")
        
        db_goal.title = goal.title
        db_goal.comment = goal.comment
        db_goal.progress = goal.progress
        db_goal.color = goal.color
        
        db.commit()
        db.refresh(db_goal)
        return db_goal
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=HTTP_MESSAGES["VALIDATION_ERROR"]
        )


@app.delete("/goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    db_goal = validate_item_exists(db, models.Goal, goal_id, "Goal")
    
    db.delete(db_goal)
    db.commit()
    return {"message": HTTP_MESSAGES["DELETED"]}


# ================= SERVER STARTUP =================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
