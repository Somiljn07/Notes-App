// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  HEALTH_CHECK_INTERVAL: 30000, // 30 seconds
};

// Color Palette for Notes, Todos, and Goals
export const COLORS = [
  { name: "Blue", class: "bg-blue-100 border-blue-200", value: "bg-blue-100" },
  { name: "Green", class: "bg-green-100 border-green-200", value: "bg-green-100" },
  { name: "Yellow", class: "bg-yellow-100 border-yellow-200", value: "bg-yellow-100" },
  { name: "Purple", class: "bg-purple-100 border-purple-200", value: "bg-purple-100" },
  { name: "Pink", class: "bg-pink-100 border-pink-200", value: "bg-pink-100" },
  { name: "Orange", class: "bg-orange-100 border-orange-200", value: "bg-orange-100" },
];

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: "400px",
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 2000, // 2 seconds
  NOTIFICATION_DURATION: 3000, // 3 seconds
  MAX_TITLE_LENGTH: 255,
  MAX_CONTENT_LENGTH: 5000,
  MAX_TAGS: 10,
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  NEW_ITEM: { key: 'n', ctrlKey: true, altKey: true, description: 'Create new item' },
  SAVE: { key: 's', ctrlKey: true, altKey: true, description: 'Save current item' },
  SEARCH: { key: 'k', ctrlKey: true, description: 'Focus search' },
  ESCAPE: { key: 'Escape', description: 'Cancel current action' },
  DELETE: { key: 'Delete', description: 'Delete selected item' },
  NEXT_TAB: { key: 'ArrowRight', ctrlKey: true, altKey: true, description: 'Switch to next tab' },
  PREV_TAB: { key: 'ArrowLeft', ctrlKey: true, altKey: true, description: 'Switch to previous tab' },
};

// Filter Options
export const FILTER_OPTIONS = {
  NOTES: [
    { id: 'all', label: 'All Notes', icon: '📝' },
    { id: 'recent', label: 'Recent', icon: '🕒' },
    { id: 'tagged', label: 'Tagged', icon: '🏷️' },
    { id: 'untagged', label: 'Untagged', icon: '📄' },
  ],
  TODOS: [
    { id: 'all', label: 'All Tasks', icon: '📋' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
    { id: 'completed', label: 'Completed', icon: '✅' },
    { id: 'overdue', label: 'Overdue', icon: '🚨' },
    { id: 'today', label: 'Due Today', icon: '📅' },
  ],
  GOALS: [
    { id: 'all', label: 'All Goals', icon: '🎯' },
    { id: 'in-progress', label: 'In Progress', icon: '🔄' },
    { id: 'completed', label: 'Completed', icon: '🏆' },
    { id: 'not-started', label: 'Not Started', icon: '🚀' },
  ],
  COLORS: COLORS.map(color => ({
    id: color.value,
    label: color.name,
    icon: '🎨',
    colorClass: color.class
  })),
};

// Sort Options
export const SORT_OPTIONS = {
  COMMON: [
    { id: 'created-desc', label: 'Newest First', icon: '🆕' },
    { id: 'created-asc', label: 'Oldest First', icon: '📅' },
    { id: 'title-asc', label: 'Title A-Z', icon: '🔤' },
    { id: 'title-desc', label: 'Title Z-A', icon: '🔤' },
    { id: 'updated-desc', label: 'Recently Updated', icon: '✏️' },
  ],
  TODOS: [
    { id: 'date-asc', label: 'Due Date (Soon)', icon: '⏰' },
    { id: 'date-desc', label: 'Due Date (Later)', icon: '📆' },
    { id: 'status', label: 'By Status', icon: '✅' },
  ],
  GOALS: [
    { id: 'progress-desc', label: 'Most Progress', icon: '📈' },
    { id: 'progress-asc', label: 'Least Progress', icon: '📉' },
  ],
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

// Default Values
export const DEFAULTS = {
  COLOR: COLORS[0].value,
  PROGRESS: 0,
  DONE: false,
  TAGS: [],
  SEARCH_PLACEHOLDER: "Search across all items...",
  FILTER: 'all',
  SORT: 'created-desc',
  EMPTY_STATES: {
    NOTES: "No notes found",
    TODOS: "No tasks found", 
    GOALS: "No goals found",
  },
};

// Progress Color Thresholds
export const PROGRESS_COLORS = {
  LOW: { threshold: 25, color: "bg-red-500" },
  MEDIUM: { threshold: 50, color: "bg-orange-500" },
  HIGH: { threshold: 80, color: "bg-yellow-500" },
  COMPLETE: { threshold: 100, color: "bg-green-500" },
};

// Form Validation
export const VALIDATION = {
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 255,
    REQUIRED: true,
  },
  CONTENT: {
    MAX_LENGTH: 5000,
  },
  PROGRESS: {
    MIN: 0,
    MAX: 100,
  },
  DATE: {
    PATTERN: /^\d{4}-\d{2}-\d{2}$/,
  },
};

// Navigation Tabs
export const TABS = [
  { id: "notes", label: "📝 Notes", color: "blue", shortLabel: "Notes" },
  { id: "todo", label: "✅ To-Do", color: "green", shortLabel: "To-Do" },
  { id: "goals", label: "🎯 Goals", color: "purple", shortLabel: "Goals" },
  { id: "about", label: "ℹ️ About", color: "slate", shortLabel: "About" },
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: "Network error. Please check your connection.",
  SERVER: "Server error. Please try again later.",
  VALIDATION: "Please check your input and try again.",
  NOT_FOUND: "Item not found.",
  GENERIC: "Something went wrong. Please try again.",
  AUTO_SAVE_FAILED: "Auto-save failed. Please save manually.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Item created successfully!",
  UPDATED: "Item updated successfully!",
  DELETED: "Item deleted successfully!",
  AUTO_SAVED: "Auto-saved",
  COPIED: "Copied to clipboard!",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// App Information
export const APP_INFO = {
  NAME: "SJ Notes",
  VERSION: "1.1.0-beta",
  PHASE: "Beta Testing",
  BUILD_DATE: "January 2026"
};

// Drag and Drop
export const DRAG_TYPES = {
  NOTE: 'note',
  TODO: 'todo',
  GOAL: 'goal',
};