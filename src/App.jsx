import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { RoutineBuilder } from './components/RoutineBuilder';
import { WorkoutHistory } from './components/WorkoutHistory';
import { DEFAULT_ROUTINES } from './data/routines';
import { getStoredCustomRoutines } from './utils/storage';

export function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [allRoutines, setAllRoutines] = useState([]);

  const refreshRoutines = () => {
    const custom = getStoredCustomRoutines();
    setAllRoutines([...DEFAULT_ROUTINES, ...custom]);
  };

  useEffect(() => {
    refreshRoutines();
  }, []);

  const handleRoutineCreated = (newRoutine) => {
    refreshRoutines();
    setSelectedRoutine(newRoutine);
    setActiveTab('workout');
  };

  const handleSelectRoutineFromList = (routine) => {
    setSelectedRoutine(routine);
    setActiveTab('workout');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 pb-16">
        {activeTab === 'workout' && (
          <WorkoutPlayer
            selectedRoutine={selectedRoutine}
            routines={allRoutines}
            onSelectRoutine={handleSelectRoutineFromList}
            onNavigateToBuilder={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'library' && <ExerciseLibrary />}

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
