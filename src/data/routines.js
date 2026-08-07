export const DEFAULT_ROUTINES = [
  {
    id: 'routine-shoulders-back',
    title: 'Shoulders & Back Sculptor',
    category: 'Shoulders & Back',
    description: 'Comprehensive 6-exercise workout targeting overhead press, bent rows, lateral width, single arm balance, rear delts, and trap shrugs.',
    estimatedMinutes: 30,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-shoulder-press', sets: 4, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-bent-over-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-lateral-raise', sets: 3, targetReps: 12, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-single-arm-row', sets: 3, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-reverse-fly', sets: 3, targetReps: 12, targetWeight: 6, restSec: 45 },
      { exerciseId: 'db-shrugs', sets: 3, targetReps: 12, targetWeight: 16, restSec: 45 }
    ]
  },
  {
    id: 'routine-full-body',
    title: 'Full Body Dumbbell Blast',
    category: 'Full Body',
    description: 'High-yield 6-exercise compound workout covering legs, chest, back, shoulders, arms, and upper trap power.',
    estimatedMinutes: 35,
    difficulty: 'Beginner',
    exercises: [
      { exerciseId: 'db-goblet-squat', sets: 4, targetReps: 12, targetWeight: 16, restSec: 75 },
      { exerciseId: 'db-floor-chest-press', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-bent-over-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-shoulder-press', sets: 3, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-bicep-curl', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 },
      { exerciseId: 'db-shrugs', sets: 3, targetReps: 12, targetWeight: 16, restSec: 45 }
    ]
  },
  {
    id: 'routine-upper-hypertrophy',
    title: 'Upper Body Power & Pump',
    category: 'Upper Body',
    description: '6-exercise hypertrophy sequence hitting Arnold press, single arm row, chest press, lateral raise, bicep curl, and rear delt fly.',
    estimatedMinutes: 32,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-arnold-press', sets: 3, targetReps: 10, targetWeight: 10, restSec: 60 },
      { exerciseId: 'db-single-arm-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-floor-chest-press', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-lateral-raise', sets: 3, targetReps: 12, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-bicep-curl', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 },
      { exerciseId: 'db-reverse-fly', sets: 3, targetReps: 12, targetWeight: 6, restSec: 45 }
    ]
  },
  {
    id: 'routine-arms-core',
    title: 'Arm & Core Annihilator',
    category: 'Arms & Core',
    description: 'Direct arm isolation and core rotation routine featuring bicep curls, hammer curls, tricep extensions, and Russian twists.',
    estimatedMinutes: 28,
    difficulty: 'Beginner',
    exercises: [
      { exerciseId: 'db-bicep-curl', sets: 4, targetReps: 12, targetWeight: 10, restSec: 45 },
      { exerciseId: 'db-tricep-extension', sets: 4, targetReps: 12, targetWeight: 12, restSec: 45 },
      { exerciseId: 'db-hammer-curl', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 },
      { exerciseId: 'db-renegade-row', sets: 3, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-russian-twist', sets: 3, targetReps: 16, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-pullover', sets: 3, targetReps: 10, targetWeight: 14, restSec: 60 }
    ]
  },
  {
    id: 'routine-legs-lower',
    title: 'Leg & Lower Body Hammer',
    category: 'Legs & Lower Body',
    description: 'Targeted lower body leg workout with goblet squats, Romanian deadlifts, forward lunges, and calf/glute focus.',
    estimatedMinutes: 30,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-goblet-squat', sets: 4, targetReps: 12, targetWeight: 16, restSec: 75 },
      { exerciseId: 'db-romanian-deadlift', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-lunges', sets: 3, targetReps: 10, targetWeight: 10, restSec: 60 },
      { exerciseId: 'db-goblet-squat', sets: 3, targetReps: 15, targetWeight: 12, restSec: 45 },
      { exerciseId: 'db-romanian-deadlift', sets: 3, targetReps: 12, targetWeight: 14, restSec: 45 },
      { exerciseId: 'db-russian-twist', sets: 3, targetReps: 16, targetWeight: 8, restSec: 45 }
    ]
  },
  {
    id: 'routine-chest-shoulders',
    title: 'Chest & Shoulder Builder',
    category: 'Chest & Shoulders',
    description: 'Upper body pushing workout focusing on heavy chest press, Arnold press, chest flyes, lateral raises, and trap shrugs.',
    estimatedMinutes: 32,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-floor-chest-press', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-shoulder-press', sets: 4, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-chest-fly', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 },
      { exerciseId: 'db-arnold-press', sets: 3, targetReps: 10, targetWeight: 10, restSec: 60 },
      { exerciseId: 'db-lateral-raise', sets: 3, targetReps: 12, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-shrugs', sets: 3, targetReps: 12, targetWeight: 16, restSec: 45 }
    ]
  }
];
