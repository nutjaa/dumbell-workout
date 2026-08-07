import React, { useState } from 'react';
import { Plus, Trash2, Save, Dumbbell, ArrowUp, ArrowDown } from 'lucide-react';
import { EXERCISES, MUSCLE_CATEGORIES } from '../data/exercises';
import { saveCustomRoutine } from '../utils/storage';

export const RoutineBuilder = ({ onRoutineCreated }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Shoulders & Back');
  const [description, setDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([
    { exerciseId: 'db-shoulder-press', sets: 3, targetReps: 10, targetWeight: 12, restSec: 60 },
    { exerciseId: 'db-bent-over-row', sets: 3, targetReps: 10, targetWeight: 14, restSec: 60 }
  ]);

  const handleAddExercise = (exerciseId) => {
    const exData = EXERCISES.find((e) => e.id === exerciseId);
    if (!exData) return;

    setSelectedExercises((prev) => [
      ...prev,
      {
        exerciseId,
        sets: exData.defaultSets || 3,
        targetReps: exData.defaultReps || 10,
        targetWeight: exData.defaultWeight || 12,
        restSec: exData.defaultRestSec || 60
      }
    ]);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleUpdateItem = (index, field, value) => {
    setSelectedExercises((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: Number(value) } : item))
    );
  };

  const handleSaveRoutine = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a routine title.');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('Please add at least one exercise to the routine.');
      return;
    }

    const newRoutine = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category,
      description: description.trim() || 'Custom user created dumbbell workout.',
      estimatedMinutes: Math.round(selectedExercises.reduce((acc, item) => acc + item.sets * 2.5, 0)),
      difficulty: 'Custom',
      exercises: selectedExercises
    };

    saveCustomRoutine(newRoutine);
    if (onRoutineCreated) onRoutineCreated(newRoutine);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit'] mb-2">
          Create Custom <span className="text-cyan-400">Workout Routine</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Design your own workout sequence, configure target sets, reps, weights, and rest intervals.
        </p>
      </div>

      <form onSubmit={handleSaveRoutine} className="space-y-6">
        {/* Basic Details Card */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Routine Title</label>
            <input
              type="text"
              placeholder="e.g. My Upper Body Power Blast"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Target Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Shoulders & Back">Shoulders & Back</option>
                <option value="Full Body">Full Body</option>
                <option value="Chest & Arms">Chest & Arms</option>
                <option value="Legs & Core">Legs & Core</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Description</label>
              <input
                type="text"
                placeholder="Short summary of this routine..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Selected Exercises List */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Routine Sequence ({selectedExercises.length} Exercises)
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            {selectedExercises.map((item, idx) => {
              const exData = EXERCISES.find((e) => e.id === item.exerciseId);
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs flex items-center justify-center border border-cyan-500/20">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{exData ? exData.name : item.exerciseId}</h4>
                      <p className="text-[11px] text-slate-400">{exData ? exData.category : ''}</p>
                    </div>
                  </div>

                  {/* Config Inputs */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Sets</span>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={item.sets}
                        onChange={(e) => handleUpdateItem(idx, 'sets', e.target.value)}
                        className="w-16 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono text-center"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Reps</span>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={item.targetReps}
                        onChange={(e) => handleUpdateItem(idx, 'targetReps', e.target.value)}
                        className="w-16 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono text-center"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Weight (kg)</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={item.targetWeight}
                        onChange={(e) => handleUpdateItem(idx, 'targetWeight', e.target.value)}
                        className="w-16 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono text-center"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Rest (sec)</span>
                      <input
                        type="number"
                        min={10}
                        max={300}
                        step={5}
                        value={item.restSec}
                        onChange={(e) => handleUpdateItem(idx, 'restSec', e.target.value)}
                        className="w-16 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono text-center"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(idx)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all mt-4 sm:mt-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Exercise Dropdown */}
          <div className="border-t border-slate-800/80 pt-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Add Exercise to Sequence</label>
            <div className="flex gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddExercise(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="">-- Choose Exercise to Add --</option>
                {EXERCISES.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} ({ex.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save & Launch Custom Routine
        </button>
      </form>
    </div>
  );
};
