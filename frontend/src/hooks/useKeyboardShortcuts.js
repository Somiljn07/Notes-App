import { useEffect } from 'react';
import { KEYBOARD_SHORTCUTS } from '../constants';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when typing in inputs, unless it's Escape
      if ((event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') && event.key !== 'Escape') {
        // Allow Escape to blur inputs
        if (event.key === 'Escape') {
          event.target.blur();
        }
        return;
      }

      for (const [action, handler] of Object.entries(shortcuts)) {
        const shortcut = KEYBOARD_SHORTCUTS[action];
        if (!shortcut) continue;

        const matches = 
          event.key === shortcut.key &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.altKey === !!shortcut.altKey;

        if (matches) {
          // Prevent browser default behavior
          event.preventDefault();
          event.stopPropagation();
          handler(event);
          break;
        }
      }
    };

    // Use capture phase to intercept events before they reach browser
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [shortcuts]);
};

export const getShortcutDisplay = (shortcutKey) => {
  const shortcut = KEYBOARD_SHORTCUTS[shortcutKey];
  if (!shortcut) return '';

  const parts = [];
  if (shortcut.ctrlKey) parts.push('Ctrl');
  if (shortcut.shiftKey) parts.push('Shift');
  if (shortcut.altKey) parts.push('Alt');
  
  // Handle special keys
  let keyDisplay = shortcut.key;
  if (shortcut.key === 'ArrowRight') keyDisplay = '→';
  if (shortcut.key === 'ArrowLeft') keyDisplay = '←';
  if (shortcut.key === 'ArrowUp') keyDisplay = '↑';
  if (shortcut.key === 'ArrowDown') keyDisplay = '↓';
  
  parts.push(keyDisplay.toUpperCase());

  return parts.join(' + ');
};