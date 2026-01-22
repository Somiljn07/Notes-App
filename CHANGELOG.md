# Changelog

All notable changes to SJ Notes will be documented in this file.

## [1.1.0-beta] - 2026-01-23 🧪

### Beta Testing Phase
- **Status**: Entering Beta testing phase for 7-10 days
- **Focus**: Real-world usage testing and user experience optimization
- **Goal**: Identify any remaining issues before stable release

### Recent Fixes
- **Scrolling**: Fixed scrolling issues across all components and browser window sizes
- **Navigation**: Removed redundant keyboard shortcuts overlay (now in About tab)
- **About Tab**: Added comprehensive app information and beta testing guidelines
- **UI Polish**: Enhanced visual comfort with subtle color scheme

## [1.1.0] - 2024-01-23

### Added
- **Advanced Features**
  - Filter system with multiple filter options for all sections
  - Sorting system with specialized options (date, progress, status, etc.)
  - Drag & drop reordering with visual feedback and animations
  - Auto-save functionality with manual save option
  - Comprehensive notification system with success/error messages
  - Enhanced search with global results and counters

- **Keyboard Shortcuts**
  - `Ctrl+Alt+N` - Create new item (focus on title input)
  - `Ctrl+K` - Focus search bar
  - `Ctrl+Alt+→` - Switch to next tab
  - `Ctrl+Alt+←` - Switch to previous tab
  - Visual feedback notifications when shortcuts are used

- **Navigation Improvements**
  - Tab persistence - remembers last active tab on browser refresh
  - Clickable app name to quickly navigate to Notes tab
  - Enhanced keyboard shortcuts that don't conflict with browser shortcuts

- **UI/UX Enhancements**
  - CSS animations for drag-drop interactions
  - Progress bar animations for goals
  - Card hover effects and smooth transitions
  - Enhanced focus states for better accessibility
  - Notification slide-in/out animations

### Fixed
- Keyboard shortcuts no longer conflict with browser shortcuts
- Tab state persists across browser refreshes
- Improved event handling for drag-and-drop operations

## [1.0.0] - 2024-01-22

### Added
- **Core Features**
  - Notes management with rich text content
  - Todo/Task management with due dates and completion tracking
  - Goals management with progress tracking
  - Real-time search functionality across notes
  
- **UI/UX Enhancements**
  - Modern, responsive design that works on all devices
  - Beautiful gradient app icon with animations
  - Color-coding system for notes, todos, and goals
  - Smooth transitions and hover effects
  - Custom scrollbars for better visibility
  
- **Technical Features**
  - FastAPI backend with SQLAlchemy ORM
  - React frontend with Vite build system
  - SQLite database for data persistence
  - RESTful API with full CRUD operations
  - Pydantic validation for data integrity
  - Environment configuration support
  
- **Developer Experience**
  - Hot reload for both frontend and backend
  - Comprehensive error handling and loading states
  - Clean project structure and documentation
  - Easy setup with batch scripts
  
### Technical Stack
- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Pydantic
- **Frontend**: React 19, Vite, Tailwind CSS, JavaScript ES6+
- **Development**: Hot reload, ESLint, PostCSS, Autoprefixer

### Features
- ✅ Create, edit, delete notes with color coding
- ✅ Manage todos with due dates and completion status
- ✅ Track goals with progress indicators
- ✅ Search functionality across all notes
- ✅ Responsive design for all screen sizes
- ✅ Modern UI with smooth animations
- ✅ Data persistence with SQLite
- ✅ RESTful API with comprehensive validation