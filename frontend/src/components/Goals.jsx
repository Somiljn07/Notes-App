import { useState } from "react";
import { COLORS, DEFAULTS, PROGRESS_COLORS, SUCCESS_MESSAGES } from "../constants";
import { useAutoSave } from "../hooks/useAutoSave";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { filterItems, sortItems, searchItems } from "../utils/filterSort";
import FilterSortBar from "./FilterSortBar";
import {
  createGoal,
  updateGoal,
  deleteGoal,
} from "../api/api";

export default function Goals({ goals, setGoals, searchQuery = "", onNotify, onError }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [progress, setProgress] = useState(DEFAULTS.PROGRESS);
  const [color, setColor] = useState(DEFAULTS.COLOR);

  /* ---------- EDIT ---------- */
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  // filter and sort
  const [activeFilter, setActiveFilter] = useState(DEFAULTS.FILTER);
  const [activeSort, setActiveSort] = useState(DEFAULTS.SORT);

  // Auto-save for editing
  const { manualSave } = useAutoSave(
    editData,
    async (data) => {
      if (editingId && data) {
        const payload = {
          title: data.title,
          comment: data.comment,
          progress: data.progress,
          color: data.color,
        };
        await updateGoal(editingId, payload);
        onNotify?.(SUCCESS_MESSAGES.AUTO_SAVED);
      }
    },
    editingId !== null
  );

  // Drag and drop
  const { getDragProps, getDropProps, isDraggedOver, isDragging } = useDragAndDrop(
    goals,
    setGoals,
    (newOrder, fromIndex, toIndex) => {
      onNotify?.(`Moved goal from position ${fromIndex + 1} to ${toIndex + 1}`);
    }
  );

  const addGoal = async () => {
    if (!title.trim()) return;

    const payload = {
      title,
      comment,
      progress,
      color,
    };

    try {
      const newGoal = await createGoal(payload);
      setGoals([newGoal, ...goals]);
      
      setTitle("");
      setComment("");
      setProgress(DEFAULTS.PROGRESS);
      setColor(DEFAULTS.COLOR);
      
      onNotify?.(SUCCESS_MESSAGES.CREATED);
    } catch (error) {
      console.error("Failed to create goal:", error);
      onError?.("Failed to create goal");
    }
  };

  const updateProgress = async (goal, value) => {
    try {
      const updated = { ...goal, progress: value };
      await updateGoal(goal.id, updated);
      setGoals(goals.map(g => (g.id === goal.id ? updated : g)));
      
      if (value === 100) {
        onNotify?.("🎉 Goal completed! Congratulations!");
      } else if (value >= 75) {
        onNotify?.("🚀 Almost there! Keep going!");
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      onError?.("Failed to update progress");
    }
  };

  /* ---------- EDIT ---------- */
  const startEdit = (goal) => {
    setEditingId(goal.id);
    setEditData({
      title: goal.title ?? "",
      comment: goal.comment ?? "",
      progress: goal.progress ?? 0,
      color: goal.color ?? DEFAULTS.COLOR,
    });
  };

  const saveEdit = async () => {
    if (!editingId || !editData) return;

    try {
      const updated = await updateGoal(editingId, editData);
      setGoals(goals.map(g => (g.id === editingId ? updated : g)));

      setEditingId(null);
      setEditData(null);
      
      onNotify?.(SUCCESS_MESSAGES.UPDATED);
    } catch (error) {
      console.error("Failed to update goal:", error);
      onError?.("Failed to update goal");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  /* ---------- DELETE ---------- */
  const removeGoal = async (id) => {
    if (!confirm("Are you sure you want to delete this goal?")) return;

    try {
      await deleteGoal(id);
      setGoals(goals.filter(g => g.id !== id));
      onNotify?.(SUCCESS_MESSAGES.DELETED);
    } catch (error) {
      console.error("Failed to delete goal:", error);
      onError?.("Failed to delete goal");
    }
  };

  /* ---------- FILTER & SORT ---------- */
  const processedGoals = (() => {
    let result = goals;
    
    // Apply search first
    if (searchQuery) {
      result = searchItems(result, searchQuery, 'goals');
    }
    
    // Apply filter
    result = filterItems(result, 'filter', activeFilter, 'goals');
    
    // Apply sort
    result = sortItems(result, activeSort, 'goals');
    
    return result;
  })();

  const handleClearFilters = () => {
    setActiveFilter(DEFAULTS.FILTER);
    setActiveSort(DEFAULTS.SORT);
  };

  const getProgressColor = (progress) => {
    if (progress >= PROGRESS_COLORS.HIGH.threshold) return PROGRESS_COLORS.COMPLETE.color;
    if (progress >= PROGRESS_COLORS.MEDIUM.threshold) return PROGRESS_COLORS.HIGH.color;
    if (progress >= PROGRESS_COLORS.LOW.threshold) return PROGRESS_COLORS.MEDIUM.color;
    return PROGRESS_COLORS.LOW.color;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-4 sm:gap-6 min-h-0">
      {/* LEFT */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 xl:sticky xl:top-4 xl:h-fit">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          🎯 <span>Create Goal</span>
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Goal title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addGoal()}
          />

          <textarea
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
            rows={4}
            placeholder="Comments / notes about this goal..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Initial Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Choose Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c.value}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                    color === c.value ? "ring-2 ring-slate-400 scale-110" : "hover:scale-105"
                  } ${c.class}`}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <button
            onClick={addGoal}
            disabled={!title.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 flex flex-col">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 flex-shrink-0">
          📈 <span>Your Goals</span>
        </h2>

        {/* Filter and Sort Bar */}
        <FilterSortBar
          itemType="goals"
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          itemCount={processedGoals.length}
          onClearFilters={handleClearFilters}
        />

        <div className="space-y-4">
          {processedGoals.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-4xl mb-2">🎯</div>
              <p>{searchQuery ? "No goals match your search" : DEFAULTS.EMPTY_STATES.GOALS}</p>
            </div>
          ) : (
            processedGoals.map((goal, index) => (
              <div 
                key={goal.id}
                {...getDragProps(goal, index)}
                {...getDropProps(index)}
                className={`
                  p-3 sm:p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-move
                  ${COLORS.find(c => c.value === goal.color)?.class || "bg-slate-100 border-slate-200"}
                  ${isDragging(index) ? "opacity-50" : ""}
                  ${isDraggedOver(index) ? "border-blue-400 bg-blue-50" : ""}
                `}
              >
                {editingId === goal.id ? (
                  <div className="space-y-3">
                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      value={editData.title}
                      onChange={e =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                    />

                    <textarea
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      rows={3}
                      value={editData.comment}
                      onChange={e =>
                        setEditData({ ...editData, comment: e.target.value })
                      }
                    />

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Progress: {editData.progress}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editData.progress}
                        onChange={e =>
                          setEditData({ ...editData, progress: Number(e.target.value) })
                        }
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Choose Color</label>
                      <div className="flex gap-2 flex-wrap">
                        {COLORS.map(c => (
                          <button
                            key={c.value}
                            className={`w-6 h-6 rounded-full border transition-all ${
                              editData.color === c.value ? "ring-2 ring-slate-400" : ""
                            } ${c.class}`}
                            onClick={() =>
                              setEditData({ ...editData, color: c.value })
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={saveEdit} 
                        className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="px-3 sm:px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={manualSave} 
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Save Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 break-words">
                        {goal.title}
                      </h3>
                      {goal.comment && (
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-words">
                          {goal.comment}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Progress</span>
                        <span className="text-sm font-bold text-slate-800">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={e => updateProgress(goal, Number(e.target.value))}
                        className="w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer mt-2"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(goal)}
                        className="px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeGoal(goal.id)}
                        className="px-2 sm:px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
