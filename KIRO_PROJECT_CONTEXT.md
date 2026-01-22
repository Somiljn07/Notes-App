# 🤖 Kiro Project Context - SJ Notes

> **For Future Kiro Sessions**: This file contains everything you need to understand this project instantly.

## 🎯 **Project Overview**

**SJ Notes** is a **production-ready, full-stack personal productivity application** built collaboratively between the user and Kiro AI. It's a modern, feature-rich notes/todos/goals manager.

### **Current Status: ✅ PRODUCTION READY - BETA TESTING PHASE**
- **Version**: 1.1.0-beta
- **Phase**: Ready for daily use and beta testing
- **Quality**: Professional-grade code with comprehensive features
- **Last Updated**: January 2026

## 🏗️ **Architecture & Tech Stack**

### **Backend (FastAPI + SQLite)**
- **Framework**: FastAPI (Python)
- **Database**: SQLite (`backend/sj_notes.db`)
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic schemas
- **API**: RESTful with auto-documentation

### **Frontend (React + Tailwind)**
- **Framework**: React 19 (functional components + hooks)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite (with Rolldown)
- **PWA**: Progressive Web App with offline support
- **State**: Local state with custom hooks

### **Key Features Implemented**
- ✅ **CRUD Operations**: Create, Read, Update, Delete for all items
- ✅ **Advanced Search**: Global search across all content
- ✅ **Filter & Sort**: Multiple filter/sort options per section
- ✅ **Auto-Save**: Automatic saving during editing
- ✅ **Drag & Drop**: Reorder items with visual feedback
- ✅ **Keyboard Shortcuts**: Power-user navigation
- ✅ **Notifications**: User feedback system
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **PWA Support**: Installable as desktop app
- ✅ **Offline Mode**: View cached data without internet
- ✅ **Color Coding**: Visual organization system
- ✅ **Progress Tracking**: For goals with visual progress bars

## 📁 **Project Structure**

```
sj-notes/
├── backend/                 # FastAPI backend
│   ├── main.py             # API endpoints + server startup
│   ├── models.py           # SQLAlchemy database models
│   ├── schemas.py          # Pydantic validation schemas
│   ├── database.py         # Database configuration
│   ├── constants.py        # Backend configuration constants
│   ├── requirements.txt    # Python dependencies
│   └── sj_notes.db        # SQLite database (user data)
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Notes.jsx   # Notes management
│   │   │   ├── Todo.jsx    # Todo management
│   │   │   ├── Goals.jsx   # Goals management
│   │   │   ├── About.jsx   # App information
│   │   │   ├── FilterSortBar.jsx # Filter/sort UI
│   │   │   └── NotificationContainer.jsx # Notifications
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useAutoSave.js # Auto-save functionality
│   │   │   ├── useDragAndDrop.js # Drag & drop logic
│   │   │   ├── useKeyboardShortcuts.js # Keyboard navigation
│   │   │   └── useNotifications.js # Notification system
│   │   ├── utils/          # Utility functions
│   │   │   └── filterSort.js # Filter/sort logic
│   │   ├── api/            # API integration
│   │   │   └── api.js      # Backend communication
│   │   ├── constants/      # Frontend configuration
│   │   │   └── index.js    # All constants and config
│   │   ├── pages/          # Page components
│   │   │   └── Dashboard.jsx # Main application page
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles + animations
│   ├── public/             # Static assets
│   │   ├── manifest.json   # PWA configuration
│   │   └── sw.js          # Service worker (offline support)
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js     # Vite configuration (flexible ports)
└── Documentation/          # Comprehensive documentation
    ├── README.md           # Main project documentation
    ├── DAILY_COMMANDS.md   # Daily startup commands
    ├── DAILY_USAGE_GUIDE.md # How to use the app
    ├── CODE_REVIEW_SUMMARY.md # Code quality analysis
    ├── TECHNICAL_SUMMARY.md # Technical details
    ├── CONTRIBUTING.md     # Development guidelines
    ├── CHANGELOG.md        # Version history
    ├── OFFLINE_MODE_SETUP.md # PWA setup guide
    ├── MULTI_LAPTOP_SETUP_GUIDE.md # Multi-device setup
    └── BETA_TESTING_CHECKLIST.md # Testing guidelines
```

## 🚀 **Daily Startup (Copy-Paste Ready)**

### **Development Mode (Recommended)**
```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev

# URLs:
# Backend: http://127.0.0.1:8000
# Frontend: http://localhost:5174 (or next available port)
```

### **Production Mode**
```bash
# Terminal 1 - Backend (same as above)
cd backend
venv\Scripts\activate
python main.py

# Terminal 2 - Frontend (optimized build)
cd frontend
npm run build
serve -s dist -l 5174
```

## 🎨 **User Experience Design**

### **Design Philosophy**
- **Minimalist & Functional**: Clean UI without unnecessary elements
- **Consistent**: All 3 sections (Notes/Todos/Goals) have identical features
- **Responsive**: Mobile-first design, works on all screen sizes
- **Accessible**: Keyboard navigation, proper contrast, semantic HTML
- **Eye-Friendly**: Subtle colors, comfortable for extended use

### **Color Scheme**
- **Background**: Soft slate gradient (`from-slate-100 to-slate-200`)
- **Cards**: Light slate (`bg-slate-50`) with subtle borders
- **Accent Colors**: Blue (Notes), Green (Todos), Purple (Goals)
- **User Colors**: 6 color options for visual organization

### **Navigation**
- **Tab-based**: Notes, Todos, Goals, About
- **Persistent**: Remembers last active tab
- **Keyboard**: Ctrl+Alt+Arrow keys for tab switching
- **Mobile**: Responsive tab bar with icons

## 🔧 **Development Context**

### **Code Quality Standards**
- **Backend**: Modern FastAPI patterns, proper error handling, validation
- **Frontend**: Functional React, custom hooks, TypeScript-ready
- **Consistency**: Uniform naming, file structure, coding patterns
- **Performance**: Optimized renders, efficient state management
- **Security**: Input validation, CORS configuration, sanitization

### **Configuration Management**
- **No Hardcoded Values**: All config in constants files
- **Environment Variables**: Flexible API URLs and ports
- **Flexible Ports**: Auto-fallback if ports are busy
- **Docker Ready**: Complete containerization setup

### **Testing & Quality**
- **Code Review**: Comprehensive analysis completed (see CODE_REVIEW_SUMMARY.md)
- **Error Handling**: Robust error recovery and user feedback
- **Validation**: Both frontend and backend input validation
- **Performance**: Optimized for daily use

## 📊 **Data Management**

### **Database Schema**
```sql
-- Notes Table
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    tags TEXT,
    color VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

-- Todos Table  
CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date VARCHAR(10) NOT NULL,  -- YYYY-MM-DD
    tags TEXT,
    color VARCHAR(50),
    done BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

-- Goals Table
CREATE TABLE goals (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    comment TEXT,
    progress INTEGER DEFAULT 0,  -- 0-100
    color VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);
```

### **Data Persistence**
- **Location**: `backend/sj_notes.db`
- **Backup**: Copy this file to backup all user data
- **Survives**: Restarts, crashes, shutdowns
- **Migration**: SQLAlchemy handles schema changes

## 🎯 **User Workflow**

### **Typical Daily Use**
1. **Morning**: Start app with daily commands
2. **Planning**: Create todos for the day, update goals
3. **Work**: Take notes, check off completed todos
4. **Review**: Update goal progress, add reflections
5. **Evening**: Shutdown app (data auto-saved)

### **Power User Features**
- **Keyboard Shortcuts**: Ctrl+Alt+N (new), Ctrl+K (search), etc.
- **Drag & Drop**: Reorder items within sections
- **Auto-Save**: Changes saved automatically during editing
- **Global Search**: Find anything across all sections
- **Filter/Sort**: Organize by status, date, color, etc.

## 🚨 **Common Issues & Solutions**

### **Port Conflicts**
- **Problem**: "Port already in use"
- **Solution**: App auto-uses next available port (5175, 5176, etc.)
- **Manual Fix**: `taskkill /f /im node.exe` then restart

### **Virtual Environment**
- **Problem**: "Module not found"
- **Solution**: Always activate venv: `venv\Scripts\activate`
- **Reset**: Delete venv folder, recreate with `python -m venv venv`

### **Database Issues**
- **Problem**: "Database locked" or corruption
- **Solution**: Stop backend, restart. Database auto-repairs.
- **Backup**: Copy `sj_notes.db` before major changes

## 🎉 **Project Achievements**

### **What We Built Together**
- ✅ **Full-Stack Application**: Complete backend + frontend
- ✅ **Production Quality**: Professional code standards
- ✅ **Feature Complete**: All requested functionality implemented
- ✅ **Well Documented**: Comprehensive guides and documentation
- ✅ **User Tested**: Ready for beta testing phase
- ✅ **Deployment Ready**: Docker, PWA, flexible configuration

### **Code Quality Highlights**
- **Backend**: Modern FastAPI with proper validation and error handling
- **Frontend**: React 19 with custom hooks and optimized performance
- **Architecture**: Clean separation of concerns, scalable structure
- **UX**: Intuitive interface with advanced features
- **Documentation**: Complete guides for development and usage

## 📞 **For Future Kiro Sessions**

### **Quick Context Sharing**
When starting a new session, share this file first:
```
"Hi Kiro! I have a SJ Notes project. Please read KIRO_PROJECT_CONTEXT.md first to understand what we've built."
```

### **Key Files to Reference**
- **This file**: Complete project context
- **README.md**: User-facing documentation
- **DAILY_COMMANDS.md**: Startup commands
- **CODE_REVIEW_SUMMARY.md**: Code quality analysis
- **Any specific file**: For targeted help

### **Common Requests**
- **New Features**: "Add [feature] to SJ Notes"
- **Bug Fixes**: "Fix [issue] in [component]"
- **Improvements**: "Optimize [aspect] of the app"
- **Documentation**: "Update [guide] with [information]"

---

**This project represents a successful collaboration between human creativity and AI assistance, resulting in a professional-grade productivity application ready for real-world use.**

*Last Updated: January 23, 2026*
*Status: Production Ready - Beta Testing Phase*