import React, { useState } from 'react';
import { Search, Dumbbell, Info, Eye } from 'lucide-react';
import { EXERCISES, MUSCLE_CATEGORIES } from '../data/exercises';
import { ExerciseModal } from './ExerciseModal';

export const ExerciseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalExercise, setActiveModalExercise] = useState(null);

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit'] mb-2">
            Dumbbell <span className="text-cyan-400">Exercise Library</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Explore proper form guides, muscle targeting, and animated technique demonstrations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search exercises or muscles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {MUSCLE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="group flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-slate-800 p-5 backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {ex.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400">{ex.difficulty}</span>
              </div>

              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2 group-hover:text-cyan-300 transition-colors">
                {ex.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {ex.description}
              </p>

              <div className="mb-4">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">Primary Target:</p>
                <div className="flex flex-wrap gap-1">
                  {ex.targetMuscles.map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModalExercise(ex)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 font-semibold text-xs border border-slate-700 hover:border-cyan-500/40 transition-all"
            >
              <Eye className="w-4 h-4" />
              View Technique & Guide
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ExerciseModal
        exercise={activeModalExercise}
        onClose={() => setActiveModalExercise(null)}
      />
    </div>
  );
};
