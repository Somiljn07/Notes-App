# SJ Notes - Multi-Laptop Setup Guide

## 🎯 Overview
This guide will help you set up SJ Notes on your second laptop (office/home) so you can use it independently on both machines.

---

## 📋 Prerequisites

### Required Software
1. **Python 3.8+** - [Download from python.org](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download from nodejs.org](https://nodejs.org/)
3. **Git** (optional but recommended) - [Download from git-scm.com](https://git-scm.com/)

### Check if Already Installed
```bash
# Check Python
python --version
# or
python3 --version

# Check Node.js
node --version

# Check npm
npm --version
```

---

## 🚀 Method 1: Copy Existing Project (Recommended)

### Step 1: Copy Project Files
1. **From Current Laptop**: Copy the entire project folder to a USB drive or cloud storage
   - Copy the whole `SJ-Notes` or `notes-app` folder
   - Include all files and subfolders

2. **To New Laptop**: 
   - Paste the folder to your desired location (e.g., `Desktop`, `Documents`)
   - Navigate to the folder in terminal/command prompt

### Step 2: Install Dependencies

#### Backend Setup
```bash
# Navigate to project root
cd path/to/your/notes-app

# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

#### Frontend Setup
```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install Node.js dependencies
npm install
```

### Step 3: Test the Setup
```bash
# Terminal 1 - Start Backend
cd backend
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux
python main.py

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

### Step 4: Verify Everything Works
- Open browser to `http://localhost:5174`
- Test creating notes, tasks, and goals
- Verify all features work as expected

---

## 🔄 Method 2: Fresh Installation (Alternative)

### Step 1: Create Project Structure
```bash
mkdir sj-notes
cd sj-notes
mkdir backend frontend
```

### Step 2: Copy Source Code Files
Copy these files from your working laptop:

#### Backend Files to Copy:
- `backend/main.py`
- `backend/models.py`
- `backend/schemas.py`
- `backend/database.py`
- `backend/constants.py`
- `backend/requirements.txt`
- `backend/Dockerfile` (optional)

#### Frontend Files to Copy:
- `frontend/src/` (entire folder)
- `frontend/public/` (entire folder)
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/index.html`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`
- `frontend/eslint.config.js`

### Step 3: Follow Installation Steps from Method 1

---

## 🔧 Configuration & Customization

### Port Configuration (if needed)
If you need to run on different ports:

#### Backend Port Change:
```python
# In backend/main.py, change the last line:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Change from 8000 to 8001
```

#### Frontend Port Change:
```javascript
// In frontend/vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,  // Change from 5174 to 5175
    host: true
  }
})
```

### Database Location
Each laptop will have its own independent database:
- Database file: `backend/sj_notes.db`
- This ensures data independence between laptops

---

## 🚀 Quick Start Scripts

Create these batch files for easy startup:

### Windows - `start_sj_notes.bat`
```batch
@echo off
echo Starting SJ Notes...

echo Starting Backend...
start cmd /k "cd /d backend && venv\Scripts\activate && python main.py"

timeout /t 3

echo Starting Frontend...
start cmd /k "cd /d frontend && npm run dev"

echo SJ Notes is starting up!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5174
pause
```

### Mac/Linux - `start_sj_notes.sh`
```bash
#!/bin/bash
echo "Starting SJ Notes..."

echo "Starting Backend..."
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/backend && source venv/bin/activate && python main.py"'

sleep 3

echo "Starting Frontend..."
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/frontend && npm run dev"'

echo "SJ Notes is starting up!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5174"
```

---

## 📊 Data Management Between Laptops

### Independent Usage (Recommended)
- Each laptop maintains its own database
- No synchronization between laptops
- Use each for different contexts (work vs personal)

### Manual Data Transfer (if needed)
If you want to transfer data between laptops:

1. **Export Data** (from source laptop):
   - Copy `backend/sj_notes.db` file

2. **Import Data** (to target laptop):
   - Replace `backend/sj_notes.db` with the copied file
   - Restart the backend

### Backup Strategy
```bash
# Create backup of database
cp backend/sj_notes.db backend/sj_notes_backup_$(date +%Y%m%d).db

# Restore from backup
cp backend/sj_notes_backup_YYYYMMDD.db backend/sj_notes.db
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. "Python not found"
```bash
# Try these alternatives:
python3 --version
py --version
```

#### 2. "npm not found"
- Reinstall Node.js from nodejs.org
- Restart terminal after installation

#### 3. "Port already in use"
- Change ports in configuration
- Or kill existing processes:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

#### 4. "Module not found" errors
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend  
cd frontend
npm install
```

#### 5. Database issues
- Delete `backend/sj_notes.db` to start fresh
- Backend will recreate it automatically

---

## ✅ Verification Checklist

After setup, verify these work:
- [ ] Backend starts without errors (`http://localhost:8000`)
- [ ] Frontend loads properly (`http://localhost:5174`)
- [ ] Can create notes, tasks, and goals
- [ ] Search functionality works
- [ ] Keyboard shortcuts work
- [ ] Drag & drop works
- [ ] Auto-save functions properly
- [ ] All tabs (Notes, Todo, Goals, About) accessible

---

## 🎯 Best Practices

### 1. **Folder Organization**
```
Documents/
├── SJ-Notes-Home/     # Home laptop
└── SJ-Notes-Office/   # Office laptop
```

### 2. **Regular Backups**
- Weekly backup of database files
- Keep project files in cloud storage

### 3. **Version Control** (Advanced)
- Use Git to track changes
- Sync code changes between laptops
- Keep databases separate

### 4. **Environment Separation**
- Use different color schemes or themes
- Different default tags for work vs personal

---

## 🚀 Success Indicators

You'll know the setup is successful when:
- ✅ App loads in under 3 seconds
- ✅ All features work identically to original
- ✅ No console errors in browser
- ✅ Database persists data between sessions
- ✅ Both backend and frontend start reliably

---

## 📞 Quick Reference

### Start Commands
```bash
# Backend
cd backend && venv\Scripts\activate && python main.py

# Frontend  
cd frontend && npm run dev
```

### URLs
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### File Locations
- **Database**: `backend/sj_notes.db`
- **Config**: `frontend/vite.config.js`
- **Dependencies**: `backend/requirements.txt`, `frontend/package.json`