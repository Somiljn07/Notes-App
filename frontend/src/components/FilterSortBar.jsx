import { useState } from 'react';
import { getFilterOptions, getSortOptions } from '../utils/filterSort';

const FilterSortBar = ({ 
  itemType, 
  activeFilter, 
  onFilterChange, 
  activeSort, 
  onSortChange,
  itemCount,
  onClearFilters 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filterOptions = getFilterOptions(itemType);
  const sortOptions = getSortOptions(itemType);

  const activeFilterLabel = filterOptions.find(f => f.id === activeFilter)?.label || 'All';
  const activeSortLabel = sortOptions.find(s => s.id === activeSort)?.label || 'Newest First';

  return (
    <div className="flex items-center justify-between gap-4 mb-4 p-3 bg-slate-100 rounded-lg border border-slate-300">
      <div className="flex items-center gap-3">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <span>🔍</span>
            <span>Filter: {activeFilterLabel}</span>
            <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showFilters && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-slate-50 border border-slate-300 rounded-lg shadow-lg z-10">
              <div className="py-1 max-h-64 overflow-y-auto">
                {filterOptions.map((option) => {
                  if (option.id === 'divider') {
                    return <div key={option.id} className="border-t border-slate-200 my-1" />;
                  }
                  
                  if (option.header) {
                    return (
                      <div key={option.id} className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">
                        {option.label}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onFilterChange(option.id);
                        setShowFilters(false);
                      }}
                      className={`
                        w-full text-left px-3 py-2 text-sm hover:bg-slate-100 flex items-center gap-2
                        ${activeFilter === option.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}
                        ${option.colorClass ? 'border-l-4' : ''}
                      `}
                      style={option.colorClass ? { borderLeftColor: option.colorClass.includes('blue') ? '#3b82f6' : 
                                                                   option.colorClass.includes('green') ? '#10b981' :
                                                                   option.colorClass.includes('yellow') ? '#f59e0b' :
                                                                   option.colorClass.includes('purple') ? '#8b5cf6' :
                                                                   option.colorClass.includes('pink') ? '#ec4899' :
                                                                   option.colorClass.includes('orange') ? '#f97316' : '#6b7280' } : {}}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                      {activeFilter === option.id && <span className="ml-auto">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <span>📊</span>
            <span>Sort: {activeSortLabel}</span>
            <span className={`transform transition-transform ${showSort ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showSort && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-slate-50 border border-slate-300 rounded-lg shadow-lg z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onSortChange(option.id);
                      setShowSort(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-slate-100 flex items-center gap-2
                      ${activeSort === option.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}
                    `}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                    {activeSort === option.id && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {(activeFilter !== 'all' || activeSort !== 'created-desc') && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Item Count */}
      <div className="text-sm text-slate-500">
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showFilters || showSort) && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setShowFilters(false);
            setShowSort(false);
          }}
        />
      )}
    </div>
  );
};

export default FilterSortBar;