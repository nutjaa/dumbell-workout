import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { RoutineBuilder } from './components/RoutineBuilder';
import { WorkoutHistory } from './components/WorkoutHistory';
import { DEFAULT_ROUTINES } from './data/routines';
import { getStoredCustomRoutines } from './utils/storage';
import { parseHashRoute, setHashRoute } from './utils/router';

export function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [allRoutines, setAllRoutines] = useState([]);

  const refreshRoutines = () => {
    const custom = getStoredCustomRoutines();
    const combined = [...DEFAULT_ROUTINES, ...custom];
    setAllRoutines(combined);
    return combined;
  };

  // Sync state from current URL hash
  const syncStateFromHash = (routinesList = allRoutines) => {
    const route = parseHashRoute();
    setActiveTab(route.tab);

    if (route.tab === 'workout') {
      if (route.routineId) {
        const found = routinesList.find((r) => r.id === route.routineId);
        if (found) {
          setSelectedRoutine(found);
        }
      } else {
        setSelectedRoutine(null);
      }
      setSelectedExerciseId(null);
    } else if (route.tab === 'library') {
      setSelectedExerciseId(route.exerciseId || null);
    } else {
      setSelectedRoutine(null);
      setSelectedExerciseId(null);
    }
  };

  // Initial Load & Hash Change Listener
  useEffect(() => {
    const currentRoutines = refreshRoutines();
    syncStateFromHash(currentRoutines);

    const handleHashChange = () => {
      syncStateFromHash();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handlers that update URL Hash
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'workout') {
      setHashRoute('workout', selectedRoutine ? selectedRoutine.id : null);
    } else {
      setHashRoute(tabId);
    }
  };

  const handleRoutineCreated = (newRoutine) => {
    const updatedRoutines = refreshRoutines();
    setSelectedRoutine(newRoutine);
    setActiveTab('workout');
    setHashRoute('workout', newRoutine.id);
  };

  const handleSelectRoutineFromList = (routine) => {
    setSelectedRoutine(routine);
    setActiveTab('workout');
    setHashRoute('workout', routine ? routine.id : null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-1 pb-16">
        {activeTab === 'workout' && (
          <WorkoutPlayer
            selectedRoutine={selectedRoutine}
            routines={allRoutines}
            onSelectRoutine={handleSelectRoutineFromList}
            onNavigateToBuilder={() => handleTabChange('builder')}
          />
        )}

        {activeTab === 'library' && (
          <ExerciseLibrary initialExerciseId={selectedExerciseId} />
        )}

        {activeTab === 'builder' && (
          <RoutineBuilder onRoutineCreated={handleRoutineCreated} />
        )}

        {activeTab === 'history' && <WorkoutHistory />}
      </main>

      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 bg-slate-950">
        <p className="font-medium">
          Dumbbell Pro — Interactive Workout Companion & Dynamic Visualizer
        </p>
      </footer>
    </div>
  );
}

export default App;
