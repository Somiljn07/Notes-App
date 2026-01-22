// src/api/api.js

import { API_CONFIG, ERROR_MESSAGES } from '../constants';

const BASE_URL = API_CONFIG.BASE_URL;

// Generic API call wrapper with error handling
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw new Error(error.message.includes('fetch') ? ERROR_MESSAGES.NETWORK : ERROR_MESSAGES.SERVER);
  }
}

/* ---------------- NOTES ---------------- */

export async function getNotes() {
  return apiCall('/notes');
}

export async function createNote(note) {
  return apiCall('/notes', {
    method: "POST",
    body: JSON.stringify(note),
  });
}

export async function updateNote(id, note) {
  return apiCall(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note),
  });
}

export async function deleteNote(id) {
  return apiCall(`/notes/${id}`, {
    method: "DELETE",
  });
}

/* ---------------- TODOS ---------------- */

export async function getTodos() {
  return apiCall('/todos');
}

export async function createTodo(todo) {
  return apiCall('/todos', {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

export async function updateTodo(id, todo) {
  return apiCall(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(id) {
  return apiCall(`/todos/${id}`, {
    method: "DELETE",
  });
}

/* ---------------- GOALS ---------------- */

export async function getGoals() {
  return apiCall('/goals');
}

export async function createGoal(goal) {
  return apiCall('/goals', {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

export async function updateGoal(id, goal) {
  return apiCall(`/goals/${id}`, {
    method: "PUT",
    body: JSON.stringify(goal),
  });
}

export async function deleteGoal(id) {
  return apiCall(`/goals/${id}`, {
    method: "DELETE",
  });
}
