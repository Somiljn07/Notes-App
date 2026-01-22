import { useState } from 'react';
import { APP_INFO } from '../constants';

const About = () => {
  const [showFeatureIdeas, setShowFeatureIdeas] = useState(false);

  const appInfo = {
    name: APP_INFO.NAME,
    version: APP_INFO.VERSION,
    description: "A comprehensive productivity app for managing notes, tasks, and goals",
    author: "SJ",
    buildDate: APP_INFO.BUILD_DATE,
    phase: APP_INFO.PHASE
  };

  const features = [
    "📝 Rich Notes Management",
    "✅ Task Management with Due Dates", 
    "🎯 Goal Tracking with Progress",
    "🔍 Global Search Functionality",
    "🎨 Color Coding System",
    "⌨️ Keyboard Shortcuts",
    "🔄 Drag & Drop Reordering",
    "💾 Auto-save Functionality",
    "🔔 Smart Notifications",
    "📱 Responsive Design"
  ];

  const upcomingFeatures = [
    "🌙 Dark Mode Theme",
    "📊 Analytics Dashboard", 
    "🔗 Task Dependencies",
    "📅 Calendar Integration",
    "🏷️ Advanced Tag System",
    "📤 Export/Import Data",
    "🔄 Cloud Sync",
    "👥 Collaboration Features",
    "🎵 Focus Mode with Sounds",
    "📈 Productivity Insights"
  ];

  const keyboardShortcuts = [
    { keys: "Ctrl+Alt+N", action: "Create new item" },
    { keys: "Ctrl+K", action: "Focus search" },
    { keys: "Ctrl+Alt+→", action: "Next tab" },
    { keys: "Ctrl+Alt+←", action: "Previous tab" },
    { keys: "Enter", action: "Quick submit (in title fields)" },
    { keys: "Escape", action: "Cancel editing" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pb-12">
      {/* App Info Card */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {appInfo.name}
            </h1>
            <p className="text-slate-600 text-lg">{appInfo.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div><span className="font-semibold">Version:</span> {appInfo.version}</div>
            <div><span className="font-semibold">Author:</span> {appInfo.author}</div>
            <div><span className="font-semibold">Phase:</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{appInfo.phase}</span></div>
          </div>
          <div className="space-y-2">
            <div><span className="font-semibold">Build Date:</span> {appInfo.buildDate}</div>
            <div><span className="font-semibold">Platform:</span> Web Application</div>
          </div>
        </div>
      </div>

      {/* Beta Testing Info */}
      <div className="bg-blue-50 rounded-xl shadow-lg border border-blue-200 p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          🧪 <span>Beta Testing Phase</span>
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Current Testing Period</h3>
            <p className="text-blue-700 text-sm">
              This app is currently in Beta testing phase. Your feedback and user experience notes 
              during the next 7-10 days will help improve the application before the stable release.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800">What to Test:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Daily note-taking workflow</li>
                <li>• Task management efficiency</li>
                <li>• Goal tracking usability</li>
                <li>• Search and filter functionality</li>
                <li>• Keyboard shortcuts effectiveness</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800">Focus Areas:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Performance and responsiveness</li>
                <li>• UI/UX comfort and intuitiveness</li>
                <li>• Feature completeness</li>
                <li>• Bug identification</li>
                <li>• Workflow optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Current Features */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          ✨ <span>Current Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-700">
              <span className="text-green-500">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          ⌨️ <span>Keyboard Shortcuts</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
              <span className="text-slate-700">{shortcut.action}</span>
              <kbd className="bg-slate-200 px-2 py-1 rounded text-xs font-mono">
                {shortcut.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Ideas */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            💡 <span>Upcoming Feature Ideas</span>
          </h2>
          <button
            onClick={() => setShowFeatureIdeas(!showFeatureIdeas)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            {showFeatureIdeas ? 'Hide' : 'Show'} Ideas
          </button>
        </div>
        
        {showFeatureIdeas && (
          <div className="space-y-3">
            <p className="text-slate-600 text-sm mb-4">
              These are potential features being considered for future releases. 
              Your feedback and suggestions are welcome!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {upcomingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 p-2 bg-slate-100 rounded">
                  <span className="text-blue-500">🔮</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          🛠️ <span>Tech Stack</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-2xl mb-1">⚛️</div>
            <div className="text-sm font-semibold">React</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-2xl mb-1">🐍</div>
            <div className="text-sm font-semibold">FastAPI</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-2xl mb-1">🎨</div>
            <div className="text-sm font-semibold">Tailwind</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-lg">
            <div className="text-2xl mb-1">🗄️</div>
            <div className="text-sm font-semibold">SQLite</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-500 text-sm py-4">
        <p>Made with ❤️ for productivity enthusiasts</p>
        <p className="mt-1">© 2024 SJ Notes. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;