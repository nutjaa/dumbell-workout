import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, FastForward, Plus, Pause, RotateCcw, Award, Dumbbell, Clock, Flame, ChevronRight, Volume2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { EXERCISES } from '../data/exercises';
import { ExerciseVisualizer } from './ExerciseVisualizer';
import { sound } from '../utils/sound';
import { saveWorkoutLog } from '../utils/storage';

export const WorkoutPlayer = ({ selectedRoutine, routines, onSelectRoutine, onFinishWorkout, onNavigateToBuilder }) => {
  // Workout State
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  
  // Interactive Live Values for active set
  const [liveReps, setLiveReps] = useState(10);
  const [liveWeight, setLiveWeight] = useState(12);

  // Rest Timer State
  const [isResting, setIsResting] = useState(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState(60);
  const [isRestPaused, setIsRestPaused] = useState(false);

  // Workout Summary / Stats Tracking
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [completedSetsCount, setCompletedSetsCount] = useState(0);
  const [totalVolumeLifted, setTotalVolumeLifted] = useState(0);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef(null);
  const overallTimerRef = useRef(null);

  // Initialize selected routine if passed from props
  useEffect(() => {
    if (selectedRoutine) {
      startWorkout(selectedRoutine);
    }
  }, [selectedRoutine]);

  // Overall workout stopwatch timer
  useEffect(() => {
    if (activeRoutine && !isWorkoutCompleted) {
      overallTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(overallTimerRef.current);
    }
    return () => clearInterval(overallTimerRef.current);
  }, [activeRoutine, isWorkoutCompleted]);

  // Rest Countdown Timer Effect
  useEffect(() => {
    if (isResting && !isRestPaused && restSecondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdownTick();
          }
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishRestPeriod();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isResting, isRestPaused, restSecondsLeft]);

  const startWorkout = (routine) => {
    setActiveRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSet(1);
    setIsResting(false);
    setIsWorkoutCompleted(false);
    setCompletedSetsCount(0);
    setTotalVolumeLifted(0);
    setElapsedSeconds(0);
    setWorkoutStartTime(new Date());

    if (routine.exercises.length > 0) {
      const firstExConfig = routine.exercises[0];
      setLiveReps(firstExConfig.targetReps || 10);
      setLiveWeight(firstExConfig.targetWeight || 12);
    }
  };

  // Current exercise object lookup
  const getCurrentExerciseData = () => {
    if (!activeRoutine) return null;
    const item = activeRoutine.exercises[currentExIndex];
    if (!item) return null;
    const exerciseDef = EXERCISES.find((e) => e.id === item.exerciseId) || EXERCISES[0];
    return {
      ...exerciseDef,
      routineConfig: item
    };
  };

  // MANUAL SET COMPLETION HANDLER
  const handleCompleteSet = () => {
    sound.playSetComplete();

    const currentEx = getCurrentExerciseData();
    const setsTotal = currentEx.routineConfig.sets;
    const restTime = currentEx.routineConfig.restSec || 60;

    // Log volume
    const setVolume = Number(liveReps) * Number(liveWeight);
    setTotalVolumeLifted((prev) => prev + setVolume);
    setCompletedSetsCount((prev) => prev + 1);

    if (currentSet < setsTotal) {
      setRestSecondsLeft(restTime);
      setIsResting(true);
      setIsRestPaused(false);
    } else if (currentExIndex < activeRoutine.exercises.length - 1) {
      setRestSecondsLeft(restTime);
      setIsResting(true);
      setIsRestPaused(false);
    } else {
      finishWorkoutSession();
    }
  };

  const finishRestPeriod = () => {
    sound.playRestOver();
    setIsResting(false);

    const currentEx = getCurrentExerciseData();
    const setsTotal = currentEx.routineConfig.sets;

    if (currentSet < setsTotal) {
      setCurrentSet((prev) => prev + 1);
    } else {
      const nextIdx = currentExIndex + 1;
      setCurrentExIndex(nextIdx);
      setCurrentSet(1);

      const nextExConfig = activeRoutine.exercises[nextIdx];
      if (nextExConfig) {
        setLiveReps(nextExConfig.targetReps || 10);
        setLiveWeight(nextExConfig.targetWeight || 12);
      }
    }
  };

  const handleSkipRest = () => {
    finishRestPeriod();
  };

  const handleAddRestTime = (sec = 10) => {
    setRestSecondsLeft((prev) => prev + sec);
  };

  const finishWorkoutSession = () => {
    sound.playWorkoutComplete();
    setIsResting(false);
    setIsWorkoutCompleted(true);

    const logEntry = {
      id: 'log-' + Date.now(),
      routineTitle: activeRoutine.title,
      routineCategory: activeRoutine.category,
      completedAt: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      totalSets: completedSetsCount + 1,
      totalVolume: totalVolumeLifted,
      exerciseCount: activeRoutine.exercises.length
    };

    saveWorkoutLog(logEntry);
    if (onFinishWorkout) onFinishWorkout(logEntry);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter routines by Equipment
  const filteredRoutines = routines.filter((r) => {
    if (equipmentFilter === 'All') return true;
    return r.equipmentType === equipmentFilter || r.category === equipmentFilter;
  });

  // --- VIEW 1: ROUTINE SELECTION LIST ---
  if (!activeRoutine) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mb-3">
            Select Your <span className="text-cyan-400">Workout Routine</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-6">
            Choose a guided dumbbell or kettlebell workout routine to launch live set tracking and rest timers.
          </p>

          {/* Equipment Filter Selector */}
          <div className="inline-flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-xl">
            {['All', 'Dumbbell', 'Kettlebell'].map((eq) => (
              <button
                key={eq}
                onClick={() => setEquipmentFilter(eq)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  equipmentFilter === eq
                    ? eq === 'Kettlebell'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/25'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {eq === 'All' ? '⚡ All Workouts' : eq === 'Kettlebell' ? '🔔 Kettlebell' : '🏋️ Dumbbell'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.map((routine) => {
            const isKB = routine.equipmentType === 'Kettlebell' || routine.category === 'Kettlebell';
            return (
              <div
                key={routine.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        isKB
                          ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      }`}
                    >
                      {isKB ? '🔔 Kettlebell' : routine.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      ~{routine.estimatedMinutes} mins
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2 group-hover:text-cyan-300 transition-colors">
                    {routine.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {routine.description}
                  </p>

                  <div className="border-t border-slate-800/80 pt-3 mb-6">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Exercises ({routine.exercises.length}):
                    </p>
                    <ul className="space-y-1.5">
                      {routine.exercises.map((item, idx) => {
                        const exData = EXERCISES.find((e) => e.id === item.exerciseId);
                        return (
                          <li key={idx} className="flex items-center justify-between text-xs text-slate-300">
                            <span className="truncate max-w-[180px]">{exData ? exData.name : item.exerciseId}</span>
                            <span className="text-slate-500 font-mono">{item.sets} x {item.targetReps}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => startWorkout(routine)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    isKB
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-orange-500/20 hover:shadow-orange-500/40'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40'
                  }`}
                >
                  <Play className={`w-4 h-4 ${isKB ? 'fill-slate-950' : 'fill-white'}`} />
                  Start Interactive Workout
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Builder Prompt Card */}
        <div className="mt-10 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-6 text-center">
          <p className="text-slate-300 text-sm font-medium mb-3">Want to craft a custom workout sequence?</p>
          <button
            onClick={onNavigateToBuilder}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Build Custom Routine
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 2: WORKOUT COMPLETED SUMMARY MODAL ---
  if (isWorkoutCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">
          <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30 animate-bounce">
            <Award className="w-10 h-10 text-cyan-400" />
          </div>

          <h2 className="text-3xl font-black text-white font-['Outfit'] mb-2">
            WORKOUT <span className="text-cyan-400">CRUSHED!</span>
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Great job completing your <strong className="text-white">{activeRoutine.title}</strong> routine!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-xl font-extrabold text-white font-mono">{formatTime(elapsedSeconds)}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Duration</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-xl font-extrabold text-white font-mono">{completedSetsCount}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sets Finished</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-xl font-extrabold text-white font-mono">{totalVolumeLifted} kg</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Est. Volume</div>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveRoutine(null);
              if (onSelectRoutine) onSelectRoutine(null);
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all"
          >
            Back to Workout Library
          </button>
        </div>
      </div>
    );
  }

  const currentEx = getCurrentExerciseData();
  const totalExercises = activeRoutine.exercises.length;
  const currentSetsTotal = currentEx ? currentEx.routineConfig.sets : 3;

  // --- VIEW 3: REST PERIOD INTERVAL VIEW ---
  if (isResting) {
    const nextSetNumber = currentSet < currentSetsTotal ? currentSet + 1 : 1;
    const isNextExercise = currentSet >= currentSetsTotal;
    const nextExConfig = isNextExercise ? activeRoutine.exercises[currentExIndex + 1] : null;
    const nextExData = nextExConfig ? EXERCISES.find((e) => e.id === nextExConfig.exerciseId) : currentEx;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/40 p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest inline-block mb-4">
            Rest Interval
          </span>

          <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="10" fill="transparent" />
              <circle
                cx="96"
                cy="96"
                r="88"
                className="stroke-cyan-400 transition-all duration-1000 ease-linear"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={
                  2 * Math.PI * 88 * (1 - restSecondsLeft / (currentEx.routineConfig.restSec || 60))
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-white font-mono tracking-tight">{restSecondsLeft}</span>
              <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Seconds</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => handleAddRestTime(10)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              +10 Sec
            </button>

            <button
              onClick={() => setIsRestPaused(!isRestPaused)}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-all"
            >
              {isRestPaused ? <Play className="w-5 h-5 fill-cyan-400" /> : <Pause className="w-5 h-5" />}
            </button>

            <button
              onClick={handleSkipRest}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
            >
              Skip Rest & Start Next Set
              <FastForward className="w-4 h-4 fill-white" />
            </button>
          </div>

          <div className="border-t border-slate-800/80 pt-6 text-left max-w-md mx-auto">
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-2">
              Next Up ({isNextExercise ? 'Next Exercise' : `Set ${nextSetNumber} of ${currentSetsTotal}`}):
            </p>
            <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 rounded-2xl p-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{nextExData ? nextExData.name : 'Next Exercise'}</h4>
                <p className="text-xs text-slate-400">
                  Target: {nextExConfig ? nextExConfig.targetReps : liveReps} reps @ {nextExConfig ? nextExConfig.targetWeight : liveWeight} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 4: LIVE SET GUIDED WORKOUT PLAYER ---
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
        <div>
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
            {activeRoutine.title}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            Exercise {currentExIndex + 1} of {totalExercises}: <span className="text-cyan-300">{currentEx.name}</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Elapsed</span>
            <span className="text-sm font-mono font-bold text-slate-200">{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => {
              setActiveRoutine(null);
              if (onSelectRoutine) onSelectRoutine(null);
            }}
            className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30 transition-all"
          >
            Quit
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${((currentExIndex + (currentSet - 1) / currentSetsTotal) / totalExercises) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6 space-y-4">
          <ExerciseVisualizer animationType={currentEx.animationType} isPlaying={true} />

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Muscles</h4>
            <div className="flex flex-wrap gap-1.5">
              {currentEx.targetMuscles.map((m, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Pro Form Cue
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentEx.formTips[0]}
            </p>
          </div>
        </div>

        <div className="md:col-span-6 space-y-5">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-xl shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Set</span>
                <div className="text-3xl font-black text-white font-['Outfit'] flex items-baseline gap-2">
                  Set {currentSet} <span className="text-sm font-normal text-slate-400">/ {currentSetsTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: currentSetsTotal }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      i + 1 < currentSet
                        ? 'bg-emerald-500 border-emerald-400'
                        : i + 1 === currentSet
                        ? 'bg-cyan-400 border-cyan-300 animate-pulse'
                        : 'bg-slate-800 border-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <label className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block mb-2">Target Reps</label>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setLiveReps(Math.max(1, liveReps - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-white font-mono">{liveReps}</span>
                  <button
                    onClick={() => setLiveReps(liveReps + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <label className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider block mb-2">Weight (kg)</label>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setLiveWeight(Math.max(0, liveWeight - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-cyan-400 font-mono">{liveWeight}</span>
                  <button
                    onClick={() => setLiveWeight(liveWeight + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteSet}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 stroke-[3]" />
              Complete Set & Rest
            </button>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              Tap to complete set and begin your rest countdown timer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Execution Steps</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              {currentEx.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
