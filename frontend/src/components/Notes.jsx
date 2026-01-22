import { useEffect, useState } from "react";
import { COLORS, DEFAULTS, SUCCESS_MESSAGES } from "../constants";
import { useAutoSave } from "../hooks/useAutoSave";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { filterItems, sortItems, searchItems } from "../utils/filterSort";
import FilterSortBar from "./FilterSortBar";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/api";

export default function Notes({ notes, setNotes, searchQuery = "", onNotify, onError }) {
  // create
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState(DEFAULTS.COLOR);

  // edit
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
          content: data.content,
          tags: normalizeTags(data.tags),
          color: data.color,
        };
        await updateNote(editingId, payload);
        onNotify?.(SUCCESS_MESSAGES.AUTO_SAVED);
      }
    },
    editingId !== null
  );

  // Drag and drop
  const { getDragProps, getDropProps, isDraggedOver, isDragging } = useDragAndDrop(
    notes,
    setNotes,
    (newOrder, fromIndex, toIndex) => {
      onNotify?.(`Moved note from position ${fromIndex + 1} to ${toIndex + 1}`);
    }
  );

  /* ---------------- HELPERS ---------------- */
  const normalizeTags = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string")
      return value.split(",").map(t => t.trim()).filter(Boolean);
    return [];
  };

  /* ---------------- CREATE ---------------- */
  const addNote = async () => {
    if (!title.trim()) return;

    const payload = {
      title,
      content,
      tags: normalizeTags(tags),
      color,
    };

    try {
      const created = await createNote(payload);
      setNotes(prev => [created, ...prev]);

      setTitle("");
      setContent("");
      setTags("");
      setColor(DEFAULTS.COLOR);
      
      onNotify?.(SUCCESS_MESSAGES.CREATED);
    } catch (error) {
      console.error("Failed to create note:", error);
      onError?.("Failed to create note");
    }
  };

  /* ---------------- EDIT ---------------- */
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditData({
      title: note.title ?? "",
      content: note.content ?? "",
      tags: Array.isArray(note.tags) ? note.tags.join(", ") : (note.tags ?? ""),
      color: note.color ?? DEFAULTS.COLOR,
    });
  };

  const saveEdit = async () => {
    if (!editingId || !editData) return;

    const payload = {
      title: editData.title,
      content: editData.content,
      tags: normalizeTags(editData.tags),
      color: editData.color,
    };

    try {
      const updated = await updateNote(editingId, payload);
      setNotes(prev =>
        prev.map(n => (n.id === editingId ? updated : n))
      );

      setEditingId(null);
      setEditData(null);
      
      onNotify?.(SUCCESS_MESSAGES.UPDATED);
    } catch (error) {
      console.error("Failed to update note:", error);
      onError?.("Failed to update note");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      onNotify?.(SUCCESS_MESSAGES.DELETED);
    } catch (error) {
      console.error("Failed to delete note:", error);
      onError?.("Failed to delete note");
    }
  };

  /* ---------------- FILTER & SORT ---------------- */
  const processedNotes = (() => {
    let result = notes;
    
    // Apply search first
    if (searchQuery) {
      result = searchItems(result, searchQuery, 'notes');
    }
    
    // Apply filter
    result = filterItems(result, 'filter', activeFilter, 'notes');
    
    // Apply sort
    result = sortItems(result, activeSort, 'notes');
    
    return result;
  })();

  const handleClearFilters = () => {
    setActiveFilter(DEFAULTS.FILTER);
    setActiveSort(DEFAULTS.SORT);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-4 sm:gap-6 min-h-0">

      {/* LEFT — CREATE */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 xl:sticky xl:top-4 xl:h-fit">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          📝 <span>Create Note</span>
        </h2>

        <div className="space-y-4">
          <input
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addNote()}
          />

          <textarea
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
            rows={6}
            placeholder="Write your note content here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <input
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
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
            onClick={addNote}
            disabled={!title.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
          >
            Add Note
          </button>
        </div>
      </div>

      {/* RIGHT — LIST */}
      <div className="bg-slate-50 rounded-xl shadow-lg border border-slate-300 p-4 sm:p-6 flex flex-col">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 flex-shrink-0">
          📋 <span>Your Notes</span>
        </h2>

        {/* Filter and Sort Bar */}
        <FilterSortBar
          itemType="notes"
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          itemCount={processedNotes.length}
          onClearFilters={handleClearFilters}
        />

        <div className="space-y-4">
          {processedNotes.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-4xl mb-2">📝</div>
              <p>{searchQuery ? "No notes match your search" : DEFAULTS.EMPTY_STATES.NOTES}</p>
            </div>
          ) : (
            processedNotes.map((note, index) => (
              <div
                key={note.id}
                {...getDragProps(note, index)}
                {...getDropProps(index)}
                className={`
                  p-3 sm:p-4 rounded-lg border-2 transition-all hover:shadow-md cursor-move
                  ${COLORS.find(c => c.value === note.color)?.class || "bg-slate-100 border-slate-200"}
                  ${isDragging(index) ? "opacity-50" : ""}
                  ${isDraggedOver(index) ? "border-blue-400 bg-blue-50" : ""}
                `}
              >
                {editingId === note.id ? (
                  <div className="space-y-3">
                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      value={editData.title}
                      onChange={e =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                    />

                    <textarea
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      rows={4}
                      value={editData.content}
                      onChange={e =>
                        setEditData({ ...editData, content: e.target.value })
                      }
                    />

                    <input
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Tags (comma separated)"
                      value={editData.tags}
                      onChange={e =>
                        setEditData({ ...editData, tags: e.target.value })
                      }
                    />

                    <div className="flex gap-2 mb-2 flex-wrap">
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
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 break-words">
                        {note.title}
                      </h3>
                      {note.content && (
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-words">
                          {note.content}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {normalizeTags(note.tags).map((tag, i) => (
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
                          onClick={() => startEdit(note)}
                          className="px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
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
