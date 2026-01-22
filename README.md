# 📝 SJ Notes - Personal Productivity App

> **Development Disclaimer**: This application was developed with assistance from AI (Kiro Assistant). The AI helped with code architecture, implementation, debugging, and documentation. While the core ideas, requirements, and testing were human-driven, significant portions of the codebase and documentation were generated or enhanced through AI collaboration.

> **Version**: 1.1.0-beta | **Status**: Beta Testing Phase | **Build**: January 2026

A comprehensive productivity application for managing notes, tasks, and goals with advanced features like drag & drop, auto-save, offline support, and keyboard shortcuts.

![SJ Notes](https://img.shields.io/badge/Version-1.1.0--beta-blue)
![Status](https://img.shields.io/badge/Status-Beta%20Testing-orange)
![Platform](https://img.shields.io/badge/Platform-Web%20App-green)
![Offline](https://img.shields.io/badge/Offline-Supported-purple)

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)

### Installation
```bash
# 1. Clone or copy the project
cd sj-notes

# 2. Setup backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

# 3. Setup frontend
cd ../frontend
npm install

# 4. Start the application
# Terminal 1 - Backend
cd backend && venv\Scripts\activate && python main.py

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Access Your App
- **Frontend**: http://localhost:5174
- **API Docs**: http://localhost:8000/docs

---

## ✨ Features

### 📝 **Notes Management**
- Rich text notes with titles and content
- Color coding system for organization
- Tag-based categorization
- Advanced search and filtering

### ✅ **Task Management**
- Tasks with due dates and descriptions
- Completion tracking and status updates
- Priority-based color coding
- Date-based sorting and filtering

### 🎯 **Goal Tracking**
- Progress tracking with visual indicators
- Percentage-based goal completion
- Color-coded progress levels
- Achievement celebrations

### 🔧 **Advanced Features**
- **Drag & Drop**: Reorder items with visual feedback
- **Auto-save**: Automatic saving during editing
- **Keyboard Shortcuts**: Fast navigation and actions
- **Search**: Global search across all content
- **Filters & Sorting**: Multiple organization options
- **Notifications**: Smart success/error messages
- **Offline Support**: Works without internet connection
- **PWA Ready**: Install as desktop/mobile app

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Alt+N` | Create new item |
| `Ctrl+K` | Focus search |
| `Ctrl+Alt+→` | Next tab |
| `Ctrl+Alt+←` | Previous tab |
| `Enter` | Quick submit (in title fields) |
| `Escape` | Cancel editing |

---

## 📱 Offline Support

SJ Notes works offline! Features include:
- **Service Worker**: Caches app for offline use
- **PWA Support**: Install as desktop/mobile app
- **Data Persistence**: View cached data when offline
- **Background Sync**: Updates when connection restored

### Enable Offline Mode
```bash
cd frontend
npm run build
npm install -g serve
serve -s dist -l 5174
```

---

## 🖥️ Multi-Device Setup

### Setting Up on Second Laptop
1. **Clone repository**: `git clone https://github.com/Somiljn07/Notes-App.git`
2. **Install prerequisites** (Python 3.8+, Node.js 16+)
3. **Setup backend**:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. **Setup frontend**:
   ```bash
   cd frontend
   npm install
   npm install -g serve  # For production builds
   ```
5. **Start application** using the commands in Quick Start section

Each laptop maintains independent data - perfect for work/personal separation.

---

## 📊 Usage Guides

### 📅 Daily Workflow
1. **Morning**: Review goals, plan tasks, create daily notes
2. **During Day**: Capture ideas, update progress, manage tasks
3. **Evening**: Review completion, plan tomorrow

### 🎯 Best Practices
- **Consistent Tags**: Use #work, #personal, #urgent, #ideas
- **Color System**: Red (urgent), Yellow (important), Green (regular)
- **Regular Reviews**: Daily wrap-up, weekly planning
- **Search Effectively**: Use tags, dates, and keywords

### 📈 Productivity Tips
- Use keyboard shortcuts for speed
- Drag & drop for quick prioritization
- Auto-save prevents data loss
- Offline mode for distraction-free work

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite
- **Backend**: FastAPI, Python 3.8+
- **Database**: SQLite
- **PWA**: Service Workers, Web App Manifest
- **Build**: Vite, PostCSS, ESLint

---

## 📁 Project Structure

```
sj-notes/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # Database configuration
│   ├── constants.py         # Backend constants
│   ├── requirements.txt     # Python dependencies
│   └── sj_notes.db         # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── constants/      # Frontend constants
│   │   └── api/           # API integration
│   ├── public/
│   │   ├── sw.js          # Service Worker
│   │   └── manifest.json  # PWA Manifest
│   └── package.json       # Node.js dependencies
├── CONTRIBUTING.md          # Contribution guidelines
├── CHANGELOG.md            # Version history
├── LICENSE                 # MIT License
└── README.md              # This file
```

---

## 🧪 Beta Testing

**Current Phase**: Beta Testing (7-10 days)

### Testing Focus
- Daily workflow integration
- Feature completeness and usability
- Performance and reliability
- UI/UX comfort and efficiency
- Bug identification and reporting

### Feedback Areas
- Productivity improvement
- Feature requests
- User experience issues
- Performance concerns
- Workflow optimization

---

## 🚀 Quick Commands

### Development
```bash
# Start development servers
npm run dev          # Frontend development
python main.py       # Backend development

# Build for production
npm run build        # Create production build
serve -s dist        # Serve production build
```

### Maintenance
```bash
# Update dependencies
pip install -r requirements.txt  # Backend
npm install                      # Frontend

# Database backup
cp backend/sj_notes.db backup/   # Backup database
```

---

## 📞 Support & Documentation

### Getting Help
- **GitHub Issues**: Report bugs or request features
- **Documentation**: All essential information is in this README
- **Code Comments**: Detailed inline documentation in source code

### Troubleshooting
- Check console for errors (F12 → Console)
- Verify all dependencies installed
- Ensure correct ports (5174 frontend, 8000 backend)
- Clear browser cache if issues persist

### Common Issues
- **Port conflicts**: App will auto-use next available port (5175, 5176, etc.)
- **Virtual environment**: Always activate with `venv\Scripts\activate`
- **Database locked**: Stop backend and restart to auto-repair
- **Module not found**: Ensure virtual environment is activated and dependencies installed

---

## 🎯 Roadmap

### Upcoming Features
- 🌙 Dark mode theme
- 📊 Analytics dashboard
- 🔗 Task dependencies
- 📅 Calendar integration
- 🏷️ Advanced tag system
- 📤 Export/import functionality
- 🔄 Cloud synchronization
- 👥 Collaboration features

---

## 📄 License

© 2026 SJ Notes. All rights reserved.

---

**Made with ❤️ for productivity enthusiasts**

*Ready to boost your productivity? Start your beta testing journey today!* 🚀