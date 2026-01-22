# 🚀 SJ Notes - Daily Commands

## ⚡ **Every Morning - Copy & Paste These Commands**

### **Step 1: One-Time Setup (Only if virtual environment doesn't exist)**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### **Step 2: Daily Startup Commands**

#### **Terminal 1 - Backend**
```bash
cd backend
venv\Scripts\activate
python main.py
```

#### **Terminal 2 - Frontend (Development Mode)** 
```bash
cd frontend
npm run dev
```

#### **Terminal 2 - Frontend (Production Mode - Optional)** 
```bash
cd frontend
npm run build
serve -s dist -l 5174
```

#### **Step 3: Open Browser**
```
Check terminal output for the correct URL:
- Usually: http://localhost:5174
- If busy: http://localhost:5175 (or next available)
```

## 🏭 **Production vs Development Mode**

### **Development Mode (Recommended for Daily Use):**
- **Frontend**: `npm run dev` - Hot reload, debugging tools
- **Backend**: `python main.py` - Auto-restart on changes
- **Best for**: Daily coding, testing, development

### **Production Mode (For Performance Testing):**
- **Frontend**: `npm run build` then `serve -s dist -l 5174` - Optimized build
- **Backend**: `python main.py` - Same as development
- **Best for**: Testing final performance, deployment simulation

### **Installing serve (One-time setup for production mode):**
```bash
npm install -g serve
```

---

## 🛑 **Evening Shutdown**

1. Press `Ctrl+C` in backend terminal
2. Press `Ctrl+C` in frontend terminal
3. Close terminals
4. Shutdown laptop

---

## 🔧 **Optional: Clean Up Ports (If You Want Consistency)**

### **If you want to always use port 5174:**
```bash
# Kill existing processes first
taskkill /f /im node.exe
taskkill /f /im python.exe

# Then start normally
```

### **Check What's Using Ports:**
```bash
netstat -ano | findstr :5174  # Frontend
netstat -ano | findstr :8000  # Backend
```

---

## 📊 **Your Data**

- **Location**: `backend/sj_notes.db`
- **Safe**: Survives shutdowns, restarts, crashes
- **Backup**: Just copy this file

---

## 🔧 **If Something Goes Wrong**

### **"Port in use" - Don't worry!**
- Frontend will automatically use next available port (5175, 5176, etc.)
- Check terminal output for the actual URL
- Your app will work the same regardless of port

### **Virtual Environment Issues:**
```bash
cd backend
rmdir /s venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### **Want to force specific port:**
```bash
# Kill processes and restart
taskkill /f /im node.exe
cd frontend
npm run dev
```

---

## ✅ **Success Indicators**

### **Backend Started:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### **Frontend Started:**
```
Local:   http://localhost:5174/  (or 5175, 5176 if 5174 busy)
Network: http://192.168.x.x:5174/
```

### **App Working:**
- Browser shows SJ Notes at the URL shown in terminal
- Your data is visible
- Can create new items

---

**Flexible and forgiving - just like a good daily tool should be!** 🎉