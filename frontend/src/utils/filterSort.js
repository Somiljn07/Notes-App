import { FILTER_OPTIONS, SORT_OPTIONS } from '../constants';

// Filter functions
export const filterItems = (items, filterType, activeFilter, itemType) => {
  if (activeFilter === 'all') return items;

  switch (itemType) {
    case 'notes':
      return filterNotes(items, activeFilter);
    case 'todos':
      return filterTodos(items, activeFilter);
    case 'goals':
      return filterGoals(items, activeFilter);
    default:
      return items;
  }
};

const filterNotes = (notes, filter) => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  switch (filter) {
    case 'recent':
      return notes.filter(note => {
        const createdAt = new Date(note.created_at || note.id);
        return createdAt >= weekAgo;
      });
    case 'tagged':
      return notes.filter(note => 
        note.tags && (Array.isArray(note.tags) ? note.tags.length > 0 : note.tags.length > 0)
      );
    case 'untagged':
      return notes.filter(note => 
        !note.tags || (Array.isArray(note.tags) ? note.tags.length === 0 : note.tags.length === 0)
      );
    default:
      // Check if it's a color filter
      if (filter.startsWith('bg-')) {
        return notes.filter(note => note.color === filter);
      }
      return notes;
  }
};

const filterTodos = (todos, filter) => {
  const today = new Date().toISOString().split('T')[0];

  switch (filter) {
    case 'pending':
      return todos.filter(todo => !todo.done);
    case 'completed':
      return todos.filter(todo => todo.done);
    case 'overdue':
      return todos.filter(todo => !todo.done && todo.date < today);
    case 'today':
      return todos.filter(todo => todo.date === today);
    default:
      // Check if it's a color filter
      if (filter.startsWith('bg-')) {
        return todos.filter(todo => todo.color === filter);
      }
      return todos;
  }
};

const filterGoals = (goals, filter) => {
  switch (filter) {
    case 'not-started':
      return goals.filter(goal => goal.progress === 0);
    case 'in-progress':
      return goals.filter(goal => goal.progress > 0 && goal.progress < 100);
    case 'completed':
      return goals.filter(goal => goal.progress === 100);
    default:
      // Check if it's a color filter
      if (filter.startsWith('bg-')) {
        return goals.filter(goal => goal.color === filter);
      }
      return goals;
  }
};

// Sort functions
export const sortItems = (items, sortOption) => {
  const [field, direction] = sortOption.split('-');
  const isAsc = direction === 'asc';

  const sorted = [...items].sort((a, b) => {
    let aVal, bVal;

    switch (field) {
      case 'title':
        aVal = (a.title || '').toLowerCase();
        bVal = (b.title || '').toLowerCase();
        break;
      case 'created':
        aVal = new Date(a.created_at || a.id);
        bVal = new Date(b.created_at || b.id);
        break;
      case 'updated':
        aVal = new Date(a.updated_at || a.created_at || a.id);
        bVal = new Date(b.updated_at || b.created_at || b.id);
        break;
      case 'date':
        aVal = new Date(a.date);
        bVal = new Date(b.date);
        break;
      case 'progress':
        aVal = a.progress || 0;
        bVal = b.progress || 0;
        break;
      case 'status':
        aVal = a.done ? 1 : 0;
        bVal = b.done ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (aVal < bVal) return isAsc ? -1 : 1;
    if (aVal > bVal) return isAsc ? 1 : -1;
    return 0;
  });

  return sorted;
};

// Search function - enhanced to search across all fields
export const searchItems = (items, query) => {
  if (!query.trim()) return items;

  const searchTerm = query.toLowerCase();

  return items.filter(item => {
    // Search in title
    if (item.title && item.title.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in content/description/comment
    const content = item.content || item.description || item.comment || '';
    if (content.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in tags
    const tags = Array.isArray(item.tags) ? item.tags : 
                 typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()) : [];
    if (tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
      return true;
    }

    // Search in date (for todos)
    if (item.date && item.date.includes(searchTerm)) {
      return true;
    }

    return false;
  });
};

// Get available filter options for item type
export const getFilterOptions = (itemType) => {
  const baseOptions = FILTER_OPTIONS[itemType.toUpperCase()] || FILTER_OPTIONS.NOTES;
  const colorOptions = FILTER_OPTIONS.COLORS;
  
  return [
    ...baseOptions,
    { id: 'divider', label: '---', disabled: true },
    { id: 'color-header', label: 'By Color', disabled: true, header: true },
    ...colorOptions,
  ];
};

// Get available sort options for item type
export const getSortOptions = (itemType) => {
  const commonOptions = SORT_OPTIONS.COMMON;
  const specificOptions = SORT_OPTIONS[itemType.toUpperCase()] || [];
  
  return [...commonOptions, ...specificOptions];
};