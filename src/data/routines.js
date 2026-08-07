export const DEFAULT_ROUTINES = [
  {
    id: 'routine-shoulders-back',
    title: 'Shoulders & Back Sculptor',
    category: 'Shoulders & Back',
    description: 'Targeted upper body workout focusing on shoulder width, rear delts, lat width, and strong spinal alignment.',
    estimatedMinutes: 25,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-shoulder-press', sets: 4, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-bent-over-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-lateral-raise', sets: 3, targetReps: 12, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-single-arm-row', sets: 3, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-reverse-fly', sets: 3, targetReps: 12, targetWeight: 6, restSec: 45 }
    ]
  },
  {
    id: 'routine-full-body',
    title: 'Full Body Dumbbell Blast',
    category: 'Full Body',
    description: 'High-yield compound workout covering chest, back, shoulders, arms, and legs for maximum muscle activation.',
    estimatedMinutes: 30,
    difficulty: 'Beginner',
    exercises: [
      { exerciseId: 'db-goblet-squat', sets: 4, targetReps: 12, targetWeight: 16, restSec: 75 },
      { exerciseId: 'db-floor-chest-press', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-bent-over-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-shoulder-press', sets: 3, targetReps: 10, targetWeight: 12, restSec: 60 },
      { exerciseId: 'db-bicep-curl', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 }
    ]
  },
  {
    id: 'routine-upper-hypertrophy',
    title: 'Upper Body Power & Pump',
    category: 'Upper Body',
    description: 'Hypertrophy-focused sequence hitting Arnold presses, single arm rows, chest press, and lateral raises.',
    estimatedMinutes: 28,
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'db-arnold-press', sets: 3, targetReps: 10, targetWeight: 10, restSec: 60 },
      { exerciseId: 'db-single-arm-row', sets: 4, targetReps: 10, targetWeight: 14, restSec: 60 },
      { exerciseId: 'db-floor-chest-press', sets: 4, targetReps: 10, targetWeight: 16, restSec: 60 },
      { exerciseId: 'db-lateral-raise', sets: 3, targetReps: 12, targetWeight: 8, restSec: 45 },
      { exerciseId: 'db-bicep-curl', sets: 3, targetReps: 12, targetWeight: 10, restSec: 45 }
    ]
  }
];
