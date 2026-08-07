import { DEFAULT_ROUTINES } from '../data/routines';

const CUSTOM_ROUTINES_KEY = 'dumbbell_pro_custom_routines';
const WORKOUT_LOGS_KEY = 'dumbbell_pro_workout_logs';

export const getStoredCustomRoutines = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_ROUTINES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get custom routines', e);
    return [];
  }
};

export const saveCustomRoutine = (routine) => {
  try {
    const existing = getStoredCustomRoutines();
    const updated = [routine, ...existing.filter((r) => r.id !== routine.id)];
    localStorage.setItem(CUSTOM_ROUTINES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save custom routine', e);
    return [];
  }
};

export const deleteCustomRoutine = (routineId) => {
  try {
    const existing = getStoredCustomRoutines();
    const updated = existing.filter((r) => r.id !== routineId);
    localStorage.setItem(CUSTOM_ROUTINES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete custom routine', e);
    return [];
  }
};

export const getWorkoutLogs = () => {
  try {
    const raw = localStorage.getItem(WORKOUT_LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get workout logs', e);
    return [];
  }
};

export const saveWorkoutLog = (logEntry) => {
  try {
    const existing = getWorkoutLogs();
    const updated = [logEntry, ...existing];
    localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save workout log', e);
    return [];
  }
};

export const clearWorkoutLogs = () => {
  try {
    localStorage.removeItem(WORKOUT_LOGS_KEY);
    return [];
  } catch (e) {
    return [];
  }
};
