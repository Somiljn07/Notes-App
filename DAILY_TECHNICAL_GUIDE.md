# SJ Notes - Daily Technical Usage Guide

## 🔄 Daily Startup & Shutdown Scenarios

### 📊 **Data Persistence - YES, Your Data is Safe!**

**✅ Your data WILL be retained when you:**
- Close the app (browser tabs)
- Stop backend/frontend servers
- Shut down your laptop
- Restart your computer
- Close terminal windows

**📍 Why? Your data is stored in:**
- **Database File**: `backend/sj_notes.db` (SQLite database)
- **Location**: Permanently saved on your hard drive
- **Persistence**: Survives restarts, shutdowns, crashes

---

## 🚀 Daily Startup Commands

### **Method 1: Manual Startup (Recommended for Learning)**

#### **Step 1: Start Backend**
```bash
# Navigate to project folder
cd path/to/your/sj-notes

# Go to backend folder
cd backend

# Activate virtual environment
# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

# Start backend server
python main.py
```

#### **Step 2: Start Frontend (New Terminal)**
```bash
# Navigate to project folder (new terminal window)
cd path/to/your/sj-notes

# Go to frontend folder
cd frontend

# Start frontend server
npm run dev
```

#### **Step 3: Access App**
- Open browser: `http://localhost:5174`
- Your data will be there automatically!

---

### **Method 2: Quick Startup Scripts (Automated)**

I'll create startup scripts for you:

#### **Windows - `start_app.bat`**
```batch
@echo off
echo Starting SJ Notes...

echo [1/3] Starting Backend...
start "SJ Notes Backend" cmd /k "cd /d backend && venv\Scripts\activate && python main.py"

echo [2/3] Waiting for backend to initialize...
timeout /t 5

echo [3/3] Starting Frontend...
start "SJ Notes Frontend" cmd /k "cd /d frontend && npm run dev"

echo.
echo ========================================
echo    SJ Notes is Starting Up!
echo ========================================
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5174
echo.
echo Press any key to open the app in browser...
pause >nul
start http://localhost:5174
```

#### **Mac/Linux - `start_app.sh`**
```bash
#!/bin/bash
echo "Starting SJ Notes..."

echo "[1/3] Starting Backend..."
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/backend && source venv/bin/activate && python main.py"'

echo "[2/3] Waiting for backend to initialize..."
sleep 5

echo "[3/3] Starting Frontend..."
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/frontend && npm run dev"'

echo
echo "========================================"
echo "    SJ Notes is Starting Up!"
echo "========================================"
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5174"
echo
echo "Opening app in browser..."
sleep 3
open http://localhost:5174
```

---

## 🛑 Daily Shutdown Process

### **Proper Shutdown (Recommended)**
1. **Save any open edits** (auto-save should handle this)
2. **Stop Frontend**: Press `Ctrl+C` in frontend terminal
3. **Stop Backend**: Press `Ctrl+C` in backend terminal
4. **Close terminals**
5. **Shut down laptop normally**

### **Quick Shutdown (Also Safe)**
- Just close terminal windows or shut down laptop
- Data is automatically saved to database
- No data loss will occur

---

## 📁 Data Storage Details

### **Where Your Data Lives**
```
your-project-folder/
├── backend/
│   └── sj_notes.db          ← YOUR DATA IS HERE
├── frontend/
└── other files...
```

### **Database File Info**
- **File**: `backend/sj_notes.db`
- **Type**: SQLite database (single file)
- **Size**: Starts ~50KB, grows with your data
- **Backup**: Copy this file to backup your data
- **Restore**: Replace this file to restore data

---

## 🔧 Troubleshooting Startup Issues

### **Problem 1: "Port already in use"**
```bash
# Check what's using the ports
# Windows:
netstat -ano | findstr :8000
netstat -ano | findstr :5174

# Mac/Linux:
lsof -ti:8000
lsof -ti:5174

# Kill processes if needed
# Windows:
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
kill -9 <PID_NUMBER>
```

### **Problem 2: "Virtual environment not found"**
```bash
# Recreate virtual environment
cd backend
python -m venv venv

# Activate and reinstall
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### **Problem 3: "npm command not found"**
```bash
# Reinstall Node.js dependencies
cd frontend
npm install
```

### **Problem 4: "Database file missing"**
- Don't worry! The backend will create a new empty database
- Your old data might be in a backup or different location
- Check for `sj_notes.db` files in your system

---

## 🚀 Quick Reference Commands

### **Daily Startup (Copy-Paste Ready)**

#### **Windows Commands**
```batch
REM Terminal 1 - Backend
cd backend
venv\Scripts\activate
python main.py

REM Terminal 2 - Frontend  
cd frontend
npm run dev
```

#### **Mac/Linux Commands**
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### **One-Line Startup (Advanced)**
```bash
# Windows (PowerShell)
Start-Process cmd -ArgumentList '/k', 'cd backend && venv\Scripts\activate && python main.py'; Start-Sleep 3; Start-Process cmd -ArgumentList '/k', 'cd frontend && npm run dev'

# Mac/Linux
(cd backend && source venv/bin/activate && python main.py &) && sleep 3 && (cd frontend && npm run dev)
```

---

## 📊 Data Backup & Recovery

### **Daily Backup (Optional but Recommended)**
```bash
# Create backup with date
copy backend\sj_notes.db backup\sj_notes_backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%.db

# Mac/Linux
cp backend/sj_notes.db backup/sj_notes_backup_$(date +%Y%m%d).db
```

### **Restore from Backup**
```bash
# Replace current database with backup
copy backup\sj_notes_backup_YYYYMMDD.db backend\sj_notes.db

# Mac/Linux
cp backup/sj_notes_backup_YYYYMMDD.db backend/sj_notes.db
```

### **Export Data (Manual Backup)**
- Go to `http://localhost:8000/docs`
- Use API endpoints to export data
- Save responses as JSON files

---

## 🔄 Common Daily Scenarios

### **Scenario 1: Normal Day**
1. **Morning**: Run startup commands
2. **Use app**: Create notes, tasks, goals
3. **Evening**: Close terminals (Ctrl+C)
4. **Shutdown**: Turn off laptop
5. **Next day**: Run startup commands again
6. **Result**: All your data is there!

### **Scenario 2: Laptop Crash/Unexpected Shutdown**
1. **Restart laptop**
2. **Run startup commands**
3. **Result**: Data is safe (auto-saved to database)

### **Scenario 3: Forgot to Stop Servers**
1. **Shutdown laptop** (servers stop automatically)
2. **Next startup**: May need to kill old processes
3. **Use troubleshooting commands** above
4. **Result**: No data loss

### **Scenario 4: Moving Between Locations**
1. **Stop servers properly** (Ctrl+C)
2. **Close laptop**
3. **Move to new location**
4. **Open laptop and restart servers**
5. **Result**: Everything works normally

---

## ⚡ Performance Tips

### **Faster Startup**
- Keep terminal windows open (minimize instead of closing)
- Use startup scripts for automation
- Consider running as system services (advanced)

### **Resource Management**
- Backend uses ~50-100MB RAM
- Frontend uses ~200-300MB RAM
- Database file grows slowly (1MB per ~1000 items)

### **Battery Optimization**
- Stop servers when not using app
- Use offline mode for battery saving
- Close browser tabs when done

---

## 🎯 Best Practices for Daily Use

### **Morning Routine**
```bash
# 1. Navigate to project
cd path/to/sj-notes

# 2. Quick startup
start_app.bat  # Windows
./start_app.sh # Mac/Linux

# 3. Wait 10 seconds, then open browser
# http://localhost:5174
```

### **Evening Routine**
```bash
# 1. Finish your work in the app
# 2. Press Ctrl+C in both terminals
# 3. Close terminals
# 4. Shutdown laptop normally
```

### **Weekly Maintenance**
```bash
# 1. Backup database
copy backend\sj_notes.db backup\

# 2. Update dependencies (optional)
cd backend && pip install -r requirements.txt
cd frontend && npm install

# 3. Clear browser cache if needed
```

---

## ✅ Daily Checklist

### **Startup Verification**
- [ ] Backend terminal shows "Uvicorn running on http://0.0.0.0:8000"
- [ ] Frontend terminal shows "Local: http://localhost:5174"
- [ ] Browser opens to SJ Notes app
- [ ] Your previous data is visible
- [ ] Can create new items successfully

### **Shutdown Verification**
- [ ] Pressed Ctrl+C in both terminals
- [ ] Terminals show "Shutdown complete" or similar
- [ ] Closed terminal windows
- [ ] Ready for laptop shutdown

---

## 🚨 Emergency Recovery

### **If Everything Goes Wrong**
1. **Check database file exists**: `backend/sj_notes.db`
2. **Reinstall dependencies**: Run setup scripts again
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
4. **Restart from scratch**: Follow installation guide
5. **Your data is safe**: As long as `sj_notes.db` exists

### **Contact Points**
- Check console errors (F12 in browser)
- Look at terminal error messages
- Verify file permissions
- Check available disk space

---

**Remember**: Your data is stored in `backend/sj_notes.db` and will persist through any restarts, shutdowns, or crashes. The startup process just reconnects the app to your existing data!