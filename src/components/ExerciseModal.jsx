import React from 'react';
import { X, ShieldCheck, Dumbbell, Activity, Target } from 'lucide-react';
import { ExerciseVisualizer } from './ExerciseVisualizer';

export const ExerciseModal = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {exercise.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">{exercise.difficulty}</span>
        </div>

        <h3 className="text-2xl font-black text-white font-['Outfit'] mb-4">
          {exercise.name}
        </h3>

        {/* Visualizer */}
        <div className="mb-6">
          <ExerciseVisualizer animationType={exercise.animationType} postureImage={exercise.postureImage} isPlaying={true} />
        </div>

        {/* Muscles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-400" /> Primary Muscles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((m, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-400" /> Secondary Muscles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {exercise.secondaryMuscles.map((m, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Step-By-Step Execution</h4>
          <ol className="space-y-2">
            {exercise.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Form tips */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
          <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Expert Technique Tip
          </h4>
          <p className="text-amber-200/90 leading-relaxed">
            {exercise.formTips[0]}
          </p>
        </div>
      </div>
    </div>
  );
};
