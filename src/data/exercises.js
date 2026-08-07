export const EXERCISES = [
  {
    id: 'db-shoulder-press',
    name: 'Dumbbell Overhead Shoulder Press',
    category: 'Shoulders',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Traps'],
    description: 'A classic vertical pushing movement that builds overhead strength and broad shoulder shoulders.',
    steps: [
      'Sit or stand tall holding dumbbells at shoulder level, palms facing forward or neutral.',
      'Engage core and press weights vertically overhead until arms are fully extended.',
      'Pause briefly at the top without locking elbows hard.',
      'Slowly lower the dumbbells back down to shoulder level under control (2-3 seconds).'
    ],
    formTips: [
      'Keep your core tight and avoid arching your lower back as you press.',
      'Exhale as you press upward, inhale as you lower.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 12,
    defaultRestSec: 60,
    animationType: 'overhead_press'
  },
  {
    id: 'db-bent-over-row',
    name: 'Dumbbell Bent-Over Row',
    category: 'Back',
    difficulty: 'Intermediate',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Traps'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Core'],
    description: 'Essential compound pulling exercise for building thick back muscles, rear shoulders, and posture.',
    steps: [
      'Stand hip-width apart, hinge forward at hips to ~45 degrees with knees slightly bent and spine neutral.',
      'Let dumbbells hang at arm\'s length with palms facing each other.',
      'Pull dumbbells towards your lower ribs/hips, driving your elbows backward.',
      'Squeeze shoulder blades together at the top, then lower with control.'
    ],
    formTips: [
      'Maintain a neutral neck and straight spine throughout the set.',
      'Focus on pulling through your elbows, not just curling with your hands.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'bent_over_row'
  },
  {
    id: 'db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Lateral Deltoids (Side Delts)'],
    secondaryMuscles: ['Anterior Deltoids', 'Upper Traps'],
    description: 'Isolation exercise targeting the side deltoids to create shoulder width and V-taper aesthetic.',
    steps: [
      'Stand upright holding dumbbells at your sides, soft bend in elbows.',
      'Raise arms out to the sides in a smooth arc until hands reach shoulder height.',
      'Pause for a split second at top position.',
      'Lower weights back to sides under strict control.'
    ],
    formTips: [
      'Avoid swinging your torso or using momentum to lift.',
      'Lead slightly with your elbows as if pouring water from two pitchers.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 8,
    defaultRestSec: 45,
    animationType: 'lateral_raise'
  },
  {
    id: 'db-single-arm-row',
    name: 'Single-Arm Dumbbell Row',
    category: 'Back',
    difficulty: 'Beginner',
    equipment: 'Single Dumbbell & Bench',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Deltoid', 'Obliques'],
    description: 'Unilateral back exercise that allows full range of motion and helps correct muscle imbalances.',
    steps: [
      'Place left knee and left hand on a bench, keeping torso parallel to floor.',
      'Hold dumbbell in right hand with arm extended down.',
      'Row the dumbbell up toward your hip while keeping elbow close to body.',
      'Squeeze back muscle at top, lower slowly to full stretch, then repeat for reps before switching sides.'
    ],
    formTips: [
      'Keep shoulders square to the bench—don\'t twist your body excessively.',
      'Pull toward your hip rather than straight up to your chest.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'single_arm_row'
  },
  {
    id: 'db-reverse-fly',
    name: 'Dumbbell Reverse Rear-Delt Fly',
    category: 'Shoulders',
    difficulty: 'Intermediate',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Rear Deltoids', 'Rhomboids'],
    secondaryMuscles: ['Infraspinatus', 'Upper Traps'],
    description: 'Crucial for shoulder health and posture, isolating the posterior deltoid and upper back.',
    steps: [
      'Hinge forward at hips until torso is nearly parallel to floor, palms facing inward.',
      'Keeping elbows slightly bent, raise arms out to sides until parallel with floor.',
      'Squeeze rear shoulders at top peak contraction.',
      'Lower back down under tension without letting weights clack together.'
    ],
    formTips: [
      'Use lighter weights with high control to prevent upper traps from taking over.',
      'Focus on pinching rear delts and shoulder blades together.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 6,
    defaultRestSec: 45,
    animationType: 'reverse_fly'
  },
  {
    id: 'db-arnold-press',
    name: 'Arnold Dumbbell Press',
    category: 'Shoulders',
    difficulty: 'Intermediate',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    description: 'Named after Arnold Schwarzenegger, this rotational press hits all three deltoid heads in one motion.',
    steps: [
      'Hold dumbbells at upper chest level with palms facing toward your body (supinated).',
      'As you press upward, rotate your wrists so palms face forward at the top.',
      'Fully extend overhead, then reverse the motion lowering back to chest level with palms facing you.'
    ],
    formTips: [
      'Execute the rotation smoothly throughout the press rather than all at once.',
      'Maintain tight core alignment.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 10,
    defaultRestSec: 60,
    animationType: 'arnold_press'
  },
  {
    id: 'db-shrugs',
    name: 'Dumbbell Trap Shrugs',
    category: 'Shoulders',
    difficulty: 'Beginner',
    equipment: 'Pair of Heavy Dumbbells',
    targetMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Levator Scapulae', 'Forearms'],
    description: 'Isolates upper traps to build shoulder height, neck support, and upper back thickness.',
    steps: [
      'Stand upright holding dumbbells at sides, arms extended.',
      'Elevate your shoulders straight up toward your ears as high as possible without bending elbows.',
      'Hold the top peak contraction for 1 second.',
      'Slowly lower shoulders back down under full control.'
    ],
    formTips: [
      'Shrug straight up and down—do not roll your shoulders in circles.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 16,
    defaultRestSec: 45,
    animationType: 'shrugs'
  },
  {
    id: 'db-pullover',
    name: 'Dumbbell Back Pullover',
    category: 'Back',
    difficulty: 'Intermediate',
    equipment: 'Single Dumbbell & Bench',
    targetMuscles: ['Latissimus Dorsi', 'Serratus Anterior'],
    secondaryMuscles: ['Chest', 'Triceps'],
    description: 'Stretches and builds upper lats, serratus, and thoracic extension.',
    steps: [
      'Lie perpendicular across a flat bench with upper back supported, holding one dumbbell overhead.',
      'With a slight bend in elbows, lower dumbbell back behind your head in a wide arc until lats stretch.',
      'Pull dumbbell back over chest using your lats, squeezing at top.'
    ],
    formTips: [
      'Keep hips slightly dipped to maintain deep stretch in upper back.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'pullover'
  },
  {
    id: 'db-renegade-row',
    name: 'Dumbbell Renegade Row',
    category: 'Back',
    difficulty: 'Advanced',
    equipment: 'Pair of Hex Dumbbells',
    targetMuscles: ['Latissimus Dorsi', 'Core / Abs'],
    secondaryMuscles: ['Rhomboids', 'Shoulders', 'Triceps'],
    description: 'High-intensity plank combined with dumbbell row for core anti-rotation and upper back power.',
    steps: [
      'Start in a push-up plank position gripping hexagonal dumbbells under shoulders, feet wide for stability.',
      'Keeping core rigid, row one dumbbell up to your lower hip while balancing on the opposite hand.',
      'Lower dumbbell back to floor, then repeat on opposite side.'
    ],
    formTips: [
      'Squeeze glutes and core tight to keep hips from swaying side to side.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 12,
    defaultRestSec: 60,
    animationType: 'renegade_row'
  },
  {
    id: 'db-bicep-curl',
    name: 'Dumbbell Bicep Curls',
    category: 'Arms',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Forearms'],
    description: 'Classic arm isolation movement for building bicep peak and arm flex power.',
    steps: [
      'Stand tall holding dumbbells at thighs with palms facing forward.',
      'Keep upper arms stationary and curl weights toward shoulders while contracting biceps.',
      'Squeeze at peak contraction, then lower slowly back to full extension.'
    ],
    formTips: [
      'Keep elbows pinned near your sides without swinging your body.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 10,
    defaultRestSec: 45,
    animationType: 'bicep_curl'
  },
  {
    id: 'db-floor-chest-press',
    name: 'Dumbbell Floor/Bench Chest Press',
    category: 'Chest',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoid'],
    secondaryMuscles: ['Triceps'],
    description: 'Fundamental upper body horizontal pushing exercise to build chest size and press power.',
    steps: [
      'Lie flat on bench or floor with knees bent, holding dumbbells at chest level.',
      'Press weights up until arms extended over chest.',
      'Lower slowly until upper arms touch floor or bench level, then press up again.'
    ],
    formTips: [
      'Keep wrists stacked directly over elbows throughout.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'chest_press'
  },
  {
    id: 'db-goblet-squat',
    name: 'Dumbbell Goblet Squat',
    category: 'Legs',
    difficulty: 'Beginner',
    equipment: 'Single Dumbbell',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Core', 'Calves'],
    description: 'Full lower body builder holding a dumbbell at chest height for balance and depth.',
    steps: [
      'Hold a single dumbbell vertically against your chest like a goblet.',
      'Stand feet shoulder-width apart, toes slightly turned out.',
      'Lower hips down and back into a deep squat keeping chest upright.',
      'Drive through heels to stand back up to starting position.'
    ],
    formTips: [
      'Keep elbows inside knees at bottom position.'
    ],
    defaultSets: 4,
    defaultReps: 12,
    defaultWeight: 16,
    defaultRestSec: 75,
    animationType: 'goblet_squat'
  }
];

export const MUSCLE_CATEGORIES = ['All', 'Shoulders', 'Back', 'Chest', 'Arms', 'Legs'];
