import { useState, useCallback } from 'react';
import { DRAG_TYPES } from '../constants';

export const useDragAndDrop = (items, setItems, onReorder) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.index === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const [draggedElement] = newItems.splice(draggedItem.index, 1);
    newItems.splice(dropIndex, 0, draggedElement);

    setItems(newItems);
    setDragOverIndex(null);

    // Call optional reorder callback
    if (onReorder) {
      onReorder(newItems, draggedItem.index, dropIndex);
    }
  }, [draggedItem, items, setItems, onReorder]);

  const getDragProps = useCallback((item, index) => ({
    draggable: true,
    onDragStart: (e) => handleDragStart(e, item, index),
    onDragEnd: handleDragEnd,
  }), [handleDragStart, handleDragEnd]);

  const getDropProps = useCallback((index) => ({
    onDragOver: (e) => handleDragOver(e, index),
    onDragLeave: handleDragLeave,
    onDrop: (e) => handleDrop(e, index),
  }), [handleDragOver, handleDragLeave, handleDrop]);

  const isDraggedOver = useCallback((index) => {
    return dragOverIndex === index;
  }, [dragOverIndex]);

  const isDragging = useCallback((index) => {
    return draggedItem?.index === index;
  }, [draggedItem]);

  return {
    getDragProps,
    getDropProps,
    isDraggedOver,
    isDragging,
    draggedItem,
  };
};