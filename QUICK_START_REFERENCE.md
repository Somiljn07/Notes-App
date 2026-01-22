# 🚀 SJ Notes - Quick Start Reference Card

## ⚡ Daily Startup Commands

### **🎯 Super Easy Method (Recommended)**
```bash
# Windows - Double-click this file:
start_app.bat

# Mac/Linux - Run this command:
./start_app.sh
```
**Result**: Both servers start automatically, browser opens to your app!

---

### **🔧 Manual Method (Step by Step)**

#### **Windows**
```batch
REM Terminal 1 - Backend
start_backend.bat

REM Terminal 2 - Frontend (wait 5 seconds after backend)
start_frontend.bat

REM Then open: http://localhost:5174
```

#### **Mac/Linux**
```bash
# Terminal 1 - Backend
./start_backend.sh

# Terminal 2 - Frontend (wait 5 seconds after backend)
./start_frontend.sh

# Then open: http://localhost:5174
```

---

## 🛑 Daily Shutdown

### **Proper Shutdown**
1. Press `Ctrl+C` in backend terminal
2. Press `Ctrl+C` in frontend terminal
3. Close terminal windows
4. Shutdown laptop normally

### **Quick Shutdown**
- Just close terminals or shutdown laptop
- **Your data is safe!** It's saved in `backend/sj_notes.db`

---

## 📊 Data Persistence - YES!

### **✅ Your Data WILL Survive:**
- Closing the app
- Stopping servers
- Laptop shutdown/restart
- Computer crashes
- Terminal crashes

### **📍 Where Your Data Lives:**
```
your-project/
└── backend/
    └── sj_notes.db  ← ALL YOUR DATA IS HERE
```

---

## 🔧 Troubleshooting

### **Problem: Port Already in Use**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <NUMBER> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### **Problem: Virtual Environment Missing**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### **Problem: Node Modules Missing**
```bash
cd frontend
npm install
```

---

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Main App** | http://localhost:5174 | Your SJ Notes interface |
| **API Docs** | http://localhost:8000/docs | Backend API documentation |
| **Backend** | http://localhost:8000 | Backend server (JSON data) |

---

## ⚡ Quick Commands Reference

### **Check if Running**
```bash
# Windows
netstat -ano | findstr :5174
netstat -ano | findstr :8000

# Mac/Linux
lsof -ti:5174
lsof -ti:8000
```

### **Force Stop Everything**
```bash
# Windows
taskkill /f /im python.exe
taskkill /f /im node.exe

# Mac/Linux
pkill -f "python main.py"
pkill -f "npm run dev"
```

### **Backup Your Data**
```bash
# Windows
copy backend\sj_notes.db backup\sj_notes_%date:~-4,4%%date:~-10,2%%date:~-7,2%.db

# Mac/Linux
cp backend/sj_notes.db backup/sj_notes_$(date +%Y%m%d).db
```

---

## 🎯 Daily Workflow

### **Morning (2 minutes)**
1. **Navigate to project folder**
2. **Double-click `start_app.bat`** (Windows) or **run `./start_app.sh`** (Mac/Linux)
3. **Wait 15 seconds**
4. **Browser opens automatically**
5. **Start being productive!**

### **Evening (30 seconds)**
1. **Press `Ctrl+C`** in both terminals
2. **Close terminals**
3. **Shutdown laptop**
4. **Your data is automatically saved!**

---

## 🚨 Emergency Recovery

### **If Something Goes Wrong:**
1. **Check `backend/sj_notes.db` exists** (your data)
2. **Run setup script again**: `setup_second_laptop.bat`
3. **Clear browser cache**: `Ctrl+Shift+R`
4. **Try startup scripts again**

### **Nuclear Option (Start Fresh):**
```bash
# Keep your data safe first!
copy backend\sj_notes.db safe_backup.db

# Then reinstall everything
setup_second_laptop.bat  # Windows
./setup_second_laptop.sh # Mac/Linux
```

---

## ✅ Success Indicators

### **Backend Started Successfully:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### **Frontend Started Successfully:**
```
  Local:   http://localhost:5174/
  Network: http://192.168.x.x:5174/
```

### **App Working:**
- Browser opens to SJ Notes
- You can see your previous notes/tasks/goals
- You can create new items
- No error messages in browser console (F12)

---

## 📞 Need Help?

### **Check These First:**
1. **Console errors**: Press F12 in browser, check Console tab
2. **Terminal errors**: Look at error messages in terminals
3. **File permissions**: Make sure you can read/write in project folder
4. **Disk space**: Ensure you have at least 100MB free space

### **Common Solutions:**
- **Restart terminals** and try again
- **Clear browser cache** (Ctrl+Shift+R)
- **Check internet connection** (for npm install)
- **Run as administrator** (Windows) if permission issues

---

**🎉 Remember: Your data persists automatically! Just start the servers and your notes will be there waiting for you.**