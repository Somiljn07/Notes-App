import { useState } from "react";
import { COLORS, DEFAULTS, SUCCESS_MESSAGES } from "../constants";
import { useAutoSave } from "../hooks/useAutoSave";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { filterItems, sortItems, searchItems } from "../utils/filterSort";
import FilterSortBar from "./FilterSortBar";
import {
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/api";

export default function Todo({ todos = [], setTodos, searchQuery = "", onNotify, onError }) {
  /* ---------- CREATE ---------- */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
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
          description: data.description,
          date: data.date,
          tags: normalizeTags(data.tags),
          color: data.color,
          done: data.done,
        };
        await updateTodo(editingId, payload);
        onNotify?.(SUCCESS_MESSAGES.AUTO_SAVED);
      }
    },
    editingId !== null
  );

  // Drag and drop
  const { getDragProps, getDropProps, isDraggedOver, isDragging } = useDragAndDrop(
    todos,
    setTodos,
    (newOrder, fromIndex, toIndex) => {
      onNotify?.(`Moved task from position ${fromIndex + 1} to ${toIndex + 1}`);
    }
  );

  /* ---------- HELPERS ---------- */
  const normalizeTags = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string")
      return value.split(",").map(t => t.trim()).filter(Boolean);
    return [];
  };

  /* ---------- CREATE ---------- */
  const addTask = async () => {
    if (!title.trim() || !date) return;

    const payload = {
      title,
      description,
      date,
      tags: normalizeTags(tags),
      color,
      done: false,
    };

    try {
      const created = await createTodo(payload);
      setTodos(prev => [created, ...prev]);

      setTitle("");
      setDescription("");
      setDate("");
      setTags("");
      setColor(DEFAULTS.COLOR);
      
      onNotify?.(SUCCESS_MESSAGES.CREATED);
    } catch (error) {
      console.error("Failed to create todo:", error);
      onError?.("Failed to create task");
    }
  };

  /* ---------- TOGGLE DONE ---------- */
  const toggleDone = async (todo) => {
    try {
      const updated = { ...todo, done: !todo.done };
      await updateTodo(todo.id, updated);

      setTodos(prev =>
        prev.map(t => (t.id === todo.id ? updated : t))
      );
      
      onNotify?.(updated.done ? "Task completed! 🎉" : "Task marked as incomplete");
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      onError?.("Failed to update task status");
    }
  };

  /* ---------- START EDIT ---------- */
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditData({
      title: todo.title ?? "",
      description: todo.description ?? "",
      date: todo.date ?? "",
      tags: Array.isArray(todo.tags) ? todo.tags.join(", ") : (todo.tags ?? ""),
      color: todo.color ?? DEFAULTS.COLOR,
      done: todo.done ?? false,
    });
  };

  /* ---------- SAVE EDIT ---------- */
  const saveEdit = async () => {
    if (!editingId || !editData) return;

    const payload = {
      title: editData.title,
      description: editData.description,
      date: editData.date,
      tags: normalizeTags(editData.tags),
      color: editData.color,
      done: editData.done,
    };

    try {
      const updated = await updateTodo(editingId, payload);

      setTodos(prev =>
        prev.map(t => (t.id === editingId ? updated : t))
      );

      setEditingId(null);
      setEditData(null);
      
      onNotify?.(SUCCESS_MESSAGES.UPDATED);
    } catch (error) {
      console.error("Failed to update todo:", error);
      onError?.("Failed to update task");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  /* ---------- DELETE ---------- */
  const removeTodo = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
      onNotify?.(SUCCESS_MESSAGES.DELETED);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      onError?.("Failed to delete task");
    }
  };

  /* ---------- FILTER & SORT ---------- */
  const processedTodos = (() => {
    let result = todos;
    
    // Apply search first
    if (searchQuery) {
      result = searchItems(result, searchQuery, 'todos');
    }
    
    // Apply filter
    result = filterItems(result, 'filter', activeFilter, 'todos');
    
    // Apply sort
    result = sortItems(result, activeSort, 'todos');
    
    return result;
  })();

  const handleClearFilters = () => {
    setActiveFilter(DEFAULTS.FILTER);
    setActiveSort(DEFAULTS.SORT);
  };

  /* ---------- UI ---------- */
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-4 sm:gap-6 min-h-0">
      {/* LEFT */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 xl:sticky xl:top-4 xl:h-fit">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          ✅ <span>Create Task</span>
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Task title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />

          <textarea
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
            rows={4}
            placeholder="Task description..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />

          <input
            type="date"
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

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
            onClick={addTask}
            disabled={!title.trim() || !date}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-medium py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 flex flex-col">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 flex-shrink-0">
          📋 <span>Your Tasks</span>
        </h2>

        {/* Filter and Sort Bar */}
        <FilterSortBar
          itemType="todos"
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          itemCount={processedTodos.length}
          onClearFilters={handleClearFilters}
        />

        <div className="space-y-4">
          {processedTodos.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-4xl mb-2">✅</div>
              <p>{searchQuery ? "No tasks match your search" : DEFAULTS.EMPTY_STATES.TODOS}</p>
            </div>
          ) : (
            processedTodos.map((todo, index) => (
              <div 
                key={todo.id}
                {...getDragProps(todo, index)}
                {...getDropProps(index)}
                className={`
                  p-3 sm:p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-move
                  ${todo.done 
                    ? "bg-green-50 border-green-200" 
                    : COLORS.find(c => c.value === todo.color)?.class || "bg-slate-50 border-slate-200"
                  }
                  ${isDragging(index) ? "opacity-50" : ""}
                  ${isDraggedOver(index) ? "border-blue-400 bg-blue-50" : ""}
                `}
              >
                {editingId === todo.id ? (
                  <div className="space-y-3">
                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      value={editData.title}
                      onChange={e =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                    />

                    <textarea
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      rows={3}
                      value={editData.description}
                      onChange={e =>
                        setEditData({ ...editData, description: e.target.value })
                      }
                    />

                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Tags (comma separated)"
                      value={editData.tags}
                      onChange={e =>
                        setEditData({ ...editData, tags: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      value={editData.date}
                      onChange={e =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                    />

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
                        className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
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
                    <div className="mb-3">
                      <div className="flex items-start gap-3 mb-2">
                        <button
                          onClick={() => toggleDone(todo)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                            todo.done 
                              ? "bg-green-500 border-green-500 text-white" 
                              : "border-slate-300 hover:border-green-400"
                          }`}
                        >
                          {todo.done && "✓"}
                        </button>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg font-semibold break-words ${
                            todo.done ? "line-through text-slate-500" : "text-slate-800"
                          }`}>
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className={`text-sm sm:text-base text-slate-600 leading-relaxed break-words ${
                              todo.done ? "line-through" : ""
                            }`}>
                              {todo.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-500 mb-2 ml-8">
                        📅 {new Date(todo.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {normalizeTags(todo.tags).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEdit(todo)}
                          className="px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeTodo(todo.id)}
                          className="px-2 sm:px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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
