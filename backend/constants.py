# Database Configuration
DATABASE_CONFIG = {
    "DB_NAME": "sj_notes.db",
    "CHECK_SAME_THREAD": False,
}

# Field Limits
FIELD_LIMITS = {
    "TITLE_MAX_LENGTH": 255,
    "CONTENT_MAX_LENGTH": 5000,
    "COMMENT_MAX_LENGTH": 2000,
    "COLOR_MAX_LENGTH": 50,
    "DATE_MAX_LENGTH": 10,
    "PROGRESS_MIN": 0,
    "PROGRESS_MAX": 100,
}

# Default Values
DEFAULTS = {
    "PROGRESS": 0,
    "DONE": False,
    "TAGS": "",
    "COLOR": None,
}

# HTTP Status Messages
HTTP_MESSAGES = {
    "NOT_FOUND": "Item not found",
    "CREATED": "Item created successfully",
    "UPDATED": "Item updated successfully", 
    "DELETED": "Item deleted successfully",
    "VALIDATION_ERROR": "Invalid input data",
    "SERVER_ERROR": "Internal server error",
    "DUPLICATE_ERROR": "Item already exists",
}

# CORS Configuration
CORS_CONFIG = {
    "ALLOW_ORIGINS": ["*"],
    "ALLOW_CREDENTIALS": True,
    "ALLOW_METHODS": ["*"],
    "ALLOW_HEADERS": ["*"],
}

# API Configuration
API_CONFIG = {
    "TITLE": "SJ Notes API",
    "DESCRIPTION": "A modern personal productivity API for managing notes, todos, and goals",
    "VERSION": "1.0.0",
    "HOST": "127.0.0.1",
    "PORT": 8000,
}