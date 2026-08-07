import React, { useState, useEffect } from 'react';
import { History, Flame, Clock, Calendar, Trophy, Trash2 } from 'lucide-react';
import { getWorkoutLogs, clearWorkoutLogs } from '../utils/storage';

export const WorkoutHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(getWorkoutLogs());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your workout history?')) {
      clearWorkoutLogs();
      setLogs([]);
    }
  };

  const totalWorkouts = logs.length;
  const totalVolume = logs.reduce((acc, log) => acc + (log.totalVolume || 0), 0);
  const totalMinutes = Math.round(logs.reduce((acc, log) => acc + (log.durationSeconds || 0), 0) / 60);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (secs) => {
    if (!secs) return '0 min';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit'] mb-2">
            Workout <span className="text-cyan-400">History & Stats</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Track your workout streak, total weight volume lifted, and session completion records.
          </p>
        </div>

        {logs.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear Log History
          </button>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Trophy className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">{totalWorkouts}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Workouts Completed</div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">{totalMinutes} mins</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Time Trained</div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">{totalVolume} kg</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Volume Lifted</div>
          </div>
        </div>
      </div>

      {/* Logs Table / Cards */}
      {logs.length === 0 ? (
        <div className="rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-12 text-center">
          <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Completed Sessions Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Start a guided workout from the Workout Player tab and complete your sets to log your first session!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-['Outfit'] mb-3">Completed Sessions Log</h3>
          <div className="grid grid-cols-1 gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {log.routineCategory || 'Workout'}
                    </span>
                    <h4 className="text-base font-bold text-white font-['Outfit'] mt-1">{log.routineTitle}</h4>
                    <p className="text-xs text-slate-400">{formatDate(log.completedAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                    <span className="font-bold text-white">{formatDuration(log.durationSeconds)}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Sets</span>
                    <span className="font-bold text-emerald-400">{log.totalSets || 0} sets</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Volume</span>
                    <span className="font-bold text-amber-400">{log.totalVolume || 0} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
