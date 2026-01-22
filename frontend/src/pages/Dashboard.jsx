import { useEffect, useState, useRef } from "react";
import Notes from "../components/Notes";
import Todo from "../components/Todo";
import Goals from "../components/Goals";
import About from "../components/About";
import NotificationContainer from "../components/NotificationContainer";
import { TABS, DEFAULTS, ERROR_MESSAGES } from "../constants";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useNotifications } from "../hooks/useNotifications";
import { searchItems } from "../utils/filterSort";

import {
  getNotes,
  getTodos,
  getGoals,
} from "../api/api";

export default function Dashboard() {
  // Load active tab from localStorage or default to first tab
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('sj-notes-active-tab');
    return savedTab && TABS.find(tab => tab.id === savedTab) ? savedTab : TABS[0].id;
  });

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchInputRef = useRef(null);
  const { notifications, success, error: notifyError, removeNotification } = useNotifications();

  // Enhanced search across all items
  const [globalSearchResults, setGlobalSearchResults] = useState({
    notes: [],
    todos: [],
    goals: [],
    total: 0
  });

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sj-notes-active-tab', activeTab);
  }, [activeTab]);

  // Handle app name click - navigate to notes tab
  const handleAppNameClick = () => {
    setActiveTab('notes');
    success("Welcome to Notes! 📝");
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    NEW_ITEM: () => {
      // Focus on the first input of the current tab
      const firstInput = document.querySelector(`input[placeholder*="title"]`);
      if (firstInput) {
        firstInput.focus();
        success("Ready to create new item! 📝");
      }
    },
    SEARCH: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        success("Search activated! 🔍");
      }
    },
    NEXT_TAB: () => {
      const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % TABS.length;
      setActiveTab(TABS[nextIndex].id);
      success(`Switched to ${TABS[nextIndex].label} 🔄`);
    },
    PREV_TAB: () => {
      const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
      const prevIndex = currentIndex === 0 ? TABS.length - 1 : currentIndex - 1;
      setActiveTab(TABS[prevIndex].id);
      success(`Switched to ${TABS[prevIndex].label} 🔄`);
    },
  });

  // Enhanced search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setGlobalSearchResults({ notes: [], todos: [], goals: [], total: 0 });
      return;
    }

    const searchResults = {
      notes: searchItems(notes, searchQuery, 'notes'),
      todos: searchItems(todos, searchQuery, 'todos'),
      goals: searchItems(goals, searchQuery, 'goals'),
    };

    searchResults.total = searchResults.notes.length + searchResults.todos.length + searchResults.goals.length;
    setGlobalSearchResults(searchResults);
  }, [searchQuery, notes, todos, goals]);

  // 🔑 RE-HYDRATION FROM BACKEND (ON LOAD)
  useEffect(() => {
    const hydrate = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [notesData, todosData, goalsData] = await Promise.all([
          getNotes().catch(err => {
            console.error("Failed to load notes:", err);
            notifyError("Failed to load notes");
            return [];
          }),
          getTodos().catch(err => {
            console.error("Failed to load todos:", err);
            notifyError("Failed to load todos");
            return [];
          }),
          getGoals().catch(err => {
            console.error("Failed to load goals:", err);
            notifyError("Failed to load goals");
            return [];
          })
        ]);

        setNotes(Array.isArray(notesData) ? notesData : []);
        setTodos(Array.isArray(todosData) ? todosData : []);
        setGoals(Array.isArray(goalsData) ? goalsData : []);
        
        success("Data loaded successfully!");
      } catch (error) {
        console.error("Dashboard hydration failed:", error);
        setError(ERROR_MESSAGES.NETWORK);
        notifyError(ERROR_MESSAGES.NETWORK);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, [success, notifyError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-center bg-slate-50 p-8 rounded-xl shadow-lg border border-red-200">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Connection Error</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Notifications */}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Header */}
      <header className="bg-slate-50 shadow-lg border-b border-slate-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Logo and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Beautiful App Icon */}
                <div className="relative">
                  <div 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-300 cursor-pointer hover:scale-110 select-none"
                    onClick={handleAppNameClick}
                    title="Click to go to Notes tab"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                
                <h1 
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-all duration-200 select-none"
                  onClick={handleAppNameClick}
                  title="Click to go to Notes tab"
                >
                  SJ Notes
                </h1>
              </div>
              
              {/* Enhanced Search */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={DEFAULTS.SEARCH_PLACEHOLDER}
                  className="w-full sm:w-80 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-slate-400">
                  🔍
                </div>
                
                {/* Search Results Indicator */}
                {searchQuery && globalSearchResults.total > 0 && (
                  <div className="absolute right-3 top-2.5 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    {globalSearchResults.total}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex bg-slate-100 rounded-lg p-1 overflow-x-auto">
              {TABS.map(tab => {
                const searchCount = searchQuery && tab.id !== 'about' ? globalSearchResults[tab.id]?.length || 0 : 0;
                return (
                  <button
                    key={tab.id}
                    className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap text-sm sm:text-base relative ${
                      activeTab === tab.id
                        ? `bg-${tab.color}-600 text-white shadow-md`
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    {searchQuery && searchCount > 0 && tab.id !== 'about' && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {searchCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === "notes" && (
            <Notes
              notes={notes}
              setNotes={setNotes}
              searchQuery={searchQuery}
              onNotify={success}
              onError={notifyError}
            />
          )}

          {activeTab === "todo" && (
            <Todo
              todos={todos}
              setTodos={setTodos}
              searchQuery={searchQuery}
              onNotify={success}
              onError={notifyError}
            />
          )}

          {activeTab === "goals" && (
            <Goals
              goals={goals}
              setGoals={setGoals}
              searchQuery={searchQuery}
              onNotify={success}
              onError={notifyError}
            />
          )}

          {activeTab === "about" && (
            <About />
          )}
        </div>
      </main>
    </div>
  );
}
