export const EXERCISES = [
  // --- KETTLEBELL EXERCISES SECTION ---
  {
    id: 'kb-swings',
    name: 'Kettlebell Russian Swings',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Core'],
    secondaryMuscles: ['Latissimus Dorsi', 'Lower Back', 'Shoulders'],
    description: 'Dynamic ballistic hip-hinge exercise for explosive power, posterior chain conditioning, and cardio fat burn.',
    steps: [
      'Stand feet slightly wider than shoulder-width, kettlebell on floor in front of you.',
      'Hinge at hips, grip kettlebell handle with both hands, and hike it back between your legs.',
      'Snap hips forward explosively, driving kettlebell up to chest height while squeezing glutes tight.',
      'Guide weight back down into hip hinge stretch and repeat in a continuous fluid rhythm.'
    ],
    formTips: [
      'Power comes from explosive hip snap, NOT lifting with your arms.',
      'Keep back flat and core packed throughout.'
    ],
    defaultSets: 4,
    defaultReps: 15,
    defaultWeight: 16,
    defaultRestSec: 45,
    animationType: 'kettlebell_swing'
  },
  {
    id: 'kb-turkish-getup',
    name: 'Kettlebell Turkish Get-Up',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Advanced',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Shoulder Stability', 'Core / Abs', 'Glutes'],
    secondaryMuscles: ['Triceps', 'Quadriceps', 'Forearms'],
    description: 'Full-body movement transitioning from lying to standing while locking a kettlebell overhead.',
    steps: [
      'Lie on floor holding kettlebell locked vertically overhead in right hand, right knee bent.',
      'Roll onto left elbow, press up onto left hand.',
      'Sweep left leg under body into a low kneeling position.',
      'Lunge up to standing position while maintaining vertical overhead arm lock.',
      'Reverse all steps under control back to starting position on floor.'
    ],
    formTips: [
      'Keep your eyes locked on the kettlebell overhead at all times.',
      'Move slowly and deliberately.'
    ],
    defaultSets: 3,
    defaultReps: 5,
    defaultWeight: 12,
    defaultRestSec: 75,
    animationType: 'turkish_getup'
  },
  {
    id: 'kb-clean-press',
    name: 'Kettlebell Clean & Press',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single or Pair of Kettlebells',
    targetMuscles: ['Anterior Deltoids', 'Latissimus Dorsi'],
    secondaryMuscles: ['Triceps', 'Core', 'Glutes'],
    description: 'Combines a hip clean into the rack position followed by a strict overhead shoulder press.',
    steps: [
      'Hinge and swing kettlebell back between legs, then snap hips to clean it into forearm rack position.',
      'Keep elbow tucked into ribs in rack position.',
      'Press kettlebell straight overhead until elbow is fully locked out.',
      'Lower back to rack position and drop into swing for next rep.'
    ],
    formTips: [
      'Tuck elbow close to chest to avoid bell slamming onto forearm.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'clean_press'
  },
  {
    id: 'kb-high-pull',
    name: 'Kettlebell Sumo High Pull',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Upper Trapezius', 'Hamstrings', 'Shoulders'],
    secondaryMuscles: ['Glutes', 'Biceps', 'Forearms'],
    description: 'Explosive hip drive pulling kettlebell up to chest height with elbows high and wide.',
    steps: [
      'Stand in wide sumo stance with kettlebell between feet.',
      'Squat/hinge down and grip handle with both hands.',
      'Drive upward through heels explosively, pulling kettlebell to upper chest level with elbows high.',
      'Lower under control back to floor and repeat.'
    ],
    formTips: [
      'Lead with your elbows high above your wrists at peak height.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'high_pull'
  },
  {
    id: 'kb-windmill',
    name: 'Kettlebell Windmill',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Obliques', 'Shoulder Rotator Cuff', 'Hamstrings'],
    secondaryMuscles: ['Glutes', 'Lower Back'],
    description: 'Rotational hip hinge with locked arm overhead, enhancing shoulder stability and lateral core flexibility.',
    steps: [
      'Press kettlebell overhead in right hand, turn feet 45 degrees to the left.',
      'Keep right arm locked out overhead, hinge right hip back.',
      'Slide left hand down inside left leg toward floor while looking up at kettlebell.',
      'Contract right oblique and glute to stand back up to starting position.'
    ],
    formTips: [
      'Keep back straight and loaded hip pushed rearward.'
    ],
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 10,
    defaultRestSec: 45,
    animationType: 'windmill'
  },
  {
    id: 'kb-goblet-squat',
    name: 'Kettlebell Goblet Squat',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Beginner',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Core', 'Upper Back'],
    description: 'Deep squat holding kettlebell by the horns at chest level to build quad strength and hip mobility.',
    steps: [
      'Hold kettlebell by the horns close to chest.',
      'Stand feet shoulder-width apart, toes turned out 15 degrees.',
      'Squat down between knees keeping chest high and elbows inside knees.',
      'Drive through heels to stand fully upright.'
    ],
    formTips: [
      'Keep chest upright and weight centered through mid-foot.'
    ],
    defaultSets: 4,
    defaultReps: 12,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'goblet_squat'
  },
  {
    id: 'kb-snatch',
    name: 'Kettlebell Single-Arm Snatch',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Advanced',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Shoulders', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Latissimus Dorsi', 'Core', 'Forearms'],
    description: 'Explosive single-arm ballistic lift driving kettlebell from between legs directly overhead in one fluid motion.',
    steps: [
      'Stand feet shoulder-width apart, kettlebell on floor in front of you.',
      'Hinge hips, grip kettlebell with one hand, and hike it back between your legs.',
      'Drive hips forward explosively while keeping the kettlebell path close to your torso.',
      'Punch hand up under the handle at top of arc to lock out smoothly overhead without banging forearm.',
      'Guide kettlebell down in front and drop into hip hinge for next rep.'
    ],
    formTips: [
      'Keep bell trajectory close to body line; do not swing it out wide.',
      'Tame the arc by punching through at shoulder level.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'kettlebell_snatch'
  },
  {
    id: 'kb-halo',
    name: 'Kettlebell Halo',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Beginner',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Shoulder Stability', 'Core / Abs'],
    secondaryMuscles: ['Upper Back', 'Triceps', 'Forearms'],
    description: 'Fluid rotational movement circling kettlebell around head to develop shoulder mobility and core control.',
    steps: [
      'Stand feet shoulder-width apart, hold kettlebell upside down (bottoms-up) by the horns close to chest.',
      'Smoothly circle kettlebell around right side of head, passing handle behind neck.',
      'Continue around left side of head back to front chest position.',
      'Maintain tight core and keep hips completely fixed with zero torso rotation.',
      'Alternate rotation direction each rep.'
    ],
    formTips: [
      'Keep kettlebell close to neck and ears throughout rotation.',
      'Engage glutes and core to keep lower body anchored.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 10,
    defaultRestSec: 45,
    animationType: 'kettlebell_halo'
  },
  {
    id: 'kb-bent-over-row',
    name: 'Kettlebell Bent-Over Row',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single or Pair of Kettlebells',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Traps'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Core'],
    description: 'Powerful pulling movement using a kettlebell to build upper back thickness and posture strength.',
    steps: [
      'Stand feet shoulder-width apart, hinge forward at hips with spine straight and knees soft.',
      'Grip kettlebell handle with arm extended toward floor.',
      'Drive elbow backward pulling kettlebell to lower rib cage.',
      'Squeeze shoulder blade at top, then lower under control.'
    ],
    formTips: [
      'Maintain flat back and neutral neck throughout.',
      'Pull through elbow without using torso momentum.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'bent_over_row'
  },
  {
    id: 'kb-floor-press',
    name: 'Kettlebell Floor Press',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Beginner',
    equipment: 'Single or Pair of Kettlebells',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoid'],
    secondaryMuscles: ['Triceps', 'Core'],
    description: 'Chest pressing variation performed on the floor to limit shoulder stress while building upper push power.',
    steps: [
      'Lie flat on back with knees bent, holding kettlebell in rack position at side of chest.',
      'Press kettlebell straight up vertically until arm is locked overhead.',
      'Pause briefly, then lower back down until triceps touch floor.',
      'Pause on floor for a moment before pressing again.'
    ],
    formTips: [
      'Keep wrists stacked straight over elbows.',
      'Do not bounce triceps off the floor.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'chest_press'
  },
  {
    id: 'kb-bicep-curl',
    name: 'Kettlebell Horn Bicep Curl',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Beginner',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Forearms'],
    description: 'Bicep curl holding kettlebell by the horns for peak biceps contraction and grip strength.',
    steps: [
      'Stand upright holding kettlebell by the horns in front of chest.',
      'Lower weight until arms are fully extended at thighs.',
      'Curl kettlebell up toward chest squeezing biceps tightly at top.',
      'Lower under control to full arm lockout.'
    ],
    formTips: [
      'Keep elbows pinned near ribcage without swinging torso.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 12,
    defaultRestSec: 45,
    animationType: 'bicep_curl'
  },
  {
    id: 'kb-romanian-deadlift',
    name: 'Kettlebell Romanian Deadlift (RDL)',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single or Pair of Kettlebells',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus'],
    secondaryMuscles: ['Lower Back (Erector Spinae)', 'Core'],
    description: 'Hinge movement targeting the posterior chain, hamstrings stretch, and glute strength with a kettlebell.',
    steps: [
      'Stand feet hip-width apart holding kettlebell by the handle in front of thighs.',
      'Hinge back at hips pushing hips rearward with slight knee bend.',
      'Lower kettlebell down shins until hamstrings feel full stretch.',
      'Contract glutes and extend hips to return to standing.'
    ],
    formTips: [
      'Keep spine flat and kettlebell path close to legs.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 20,
    defaultRestSec: 60,
    animationType: 'bent_over_row'
  },
  {
    id: 'kb-lunges',
    name: 'Kettlebell Goblet / Rack Lunges',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Intermediate',
    equipment: 'Single Kettlebell',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings'],
    secondaryMuscles: ['Calves', 'Core Balance'],
    description: 'Unilateral leg builder holding kettlebell at chest or rack position for leg strength and balance.',
    steps: [
      'Hold kettlebell at chest in goblet position or locked in shoulder rack.',
      'Step forward with one leg and lower back knee toward floor until both knees bent at 90 degrees.',
      'Drive through front heel to return to standing position.',
      'Alternate legs each rep.'
    ],
    formTips: [
      'Keep front knee aligned over ankle without caving inward.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 12,
    defaultRestSec: 60,
    animationType: 'goblet_squat'
  },
  {
    id: 'kb-renegade-row',
    name: 'Kettlebell Renegade Row',
    category: 'Kettlebell',
    equipmentType: 'Kettlebell',
    difficulty: 'Advanced',
    equipment: 'Pair of Kettlebells',
    targetMuscles: ['Latissimus Dorsi', 'Core / Abs'],
    secondaryMuscles: ['Rhomboids', 'Shoulders', 'Triceps'],
    description: 'Advanced plank row holding kettlebell handles for core anti-rotation stability and back power.',
    steps: [
      'Assume high plank position gripping handles of two kettlebells on floor, feet wide.',
      'Keep core rigid, row one kettlebell up to lower hip while balancing on opposite hand.',
      'Lower kettlebell to floor under control, then alternate to opposite side.'
    ],
    formTips: [
      'Squeeze glutes and core tight to keep hips from rotating.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 14,
    defaultRestSec: 60,
    animationType: 'renegade_row'
  },

  // --- DUMBBELL EXERCISES SECTION ---
  {
    id: 'db-shoulder-press',
    name: 'Dumbbell Overhead Shoulder Press',
    category: 'Shoulders',
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    equipmentType: 'Dumbbell',
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
    id: 'db-hammer-curl',
    name: 'Dumbbell Hammer Curls',
    category: 'Arms',
    equipmentType: 'Dumbbell',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Brachialis', 'Forearms'],
    secondaryMuscles: ['Biceps Brachii'],
    description: 'Neutral grip arm curl that builds forearm thickness, grip strength, and arm width.',
    steps: [
      'Stand holding dumbbells at your sides with palms facing inward (neutral grip).',
      'Curl the weights up toward your shoulders keeping palms facing each other.',
      'Squeeze at top position, then lower under strict control.'
    ],
    formTips: [
      'Maintain neutral wrist alignment throughout.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 10,
    defaultRestSec: 45,
    animationType: 'bicep_curl'
  },
  {
    id: 'db-tricep-extension',
    name: 'Overhead Dumbbell Tricep Extension',
    category: 'Arms',
    equipmentType: 'Dumbbell',
    difficulty: 'Beginner',
    equipment: 'Single Heavy Dumbbell',
    targetMuscles: ['Triceps (Long Head)'],
    secondaryMuscles: ['Shoulders'],
    description: 'Overhead tricep extension targeting the long head of the tricep for full arm development.',
    steps: [
      'Hold a single dumbbell vertically with both hands behind your head.',
      'Lower weight by bending elbows until forearms touch biceps.',
      'Extend arms vertically back overhead squeezing triceps at top.'
    ],
    formTips: [
      'Keep elbows pointed forward rather than flaring out wide.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 12,
    defaultRestSec: 45,
    animationType: 'overhead_press'
  },
  {
    id: 'db-floor-chest-press',
    name: 'Dumbbell Floor/Bench Chest Press',
    category: 'Chest',
    equipmentType: 'Dumbbell',
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
    id: 'db-chest-fly',
    name: 'Dumbbell Chest Flyes',
    category: 'Chest',
    equipmentType: 'Dumbbell',
    difficulty: 'Intermediate',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid'],
    description: 'Horizontal adduction isolation exercise creating chest stretch and inner pectoral definition.',
    steps: [
      'Lie flat holding dumbbells over chest with palms facing each other and soft bend in elbows.',
      'Lower weights out wide to sides in an arc until chest stretches.',
      'Squeeze chest muscles to bring dumbbells back together over chest.'
    ],
    formTips: [
      'Maintain constant slight elbow bend—do not turn into a press.'
    ],
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 10,
    defaultRestSec: 45,
    animationType: 'reverse_fly'
  },
  {
    id: 'db-goblet-squat',
    name: 'Dumbbell Goblet Squat',
    category: 'Legs',
    equipmentType: 'Dumbbell',
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
  },
  {
    id: 'db-romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    category: 'Legs',
    equipmentType: 'Dumbbell',
    difficulty: 'Intermediate',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus'],
    secondaryMuscles: ['Lower Back (Erector Spinae)', 'Core'],
    description: 'Hinge exercise targeting the posterior chain, hamstrings stretch, and hip strength.',
    steps: [
      'Stand feet hip-width holding dumbbells at front of thighs.',
      'Hinge back at hips pushing butt rearward with slight knee flex, lowering dumbbells down shins.',
      'Lower until hamstrings feel full stretch, then contract glutes to return to standing.'
    ],
    formTips: [
      'Keep spine flat and dumbbells close to your legs.'
    ],
    defaultSets: 4,
    defaultReps: 10,
    defaultWeight: 16,
    defaultRestSec: 60,
    animationType: 'bent_over_row'
  },
  {
    id: 'db-lunges',
    name: 'Walking / Stationary Dumbbell Lunges',
    category: 'Legs',
    equipmentType: 'Dumbbell',
    difficulty: 'Beginner',
    equipment: 'Pair of Dumbbells',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Calves', 'Core Balance'],
    description: 'Unilateral leg builder improving leg strength, balance, and knee stability.',
    steps: [
      'Stand tall holding dumbbells at sides.',
      'Step forward with one leg and lower back knee toward floor until both knees bent at 90 degrees.',
      'Push off front heel to return to standing, then repeat on opposite leg.'
    ],
    formTips: [
      'Keep front knee aligned over ankle without caving inward.'
    ],
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 10,
    defaultRestSec: 60,
    animationType: 'goblet_squat'
  },
  {
    id: 'db-russian-twist',
    name: 'Dumbbell Russian Twists',
    category: 'Core',
    equipmentType: 'Dumbbell',
    difficulty: 'Beginner',
    equipment: 'Single Dumbbell',
    targetMuscles: ['Obliques', 'Abs'],
    secondaryMuscles: ['Hip Flexors'],
    description: 'Rotational core stability exercise building strong side waist obliques and abdominal endurance.',
    steps: [
      'Sit on floor with knees bent and feet slightly elevated, holding a single dumbbell with both hands.',
      'Lean torso back slightly at 45 degrees to engage core.',
      'Rotate your torso side to side, bringing dumbbell near the floor on left and right.'
    ],
    formTips: [
      'Rotate from your ribcage and shoulders rather than just swinging arms.'
    ],
    defaultSets: 3,
    defaultReps: 16,
    defaultWeight: 8,
    defaultRestSec: 45,
    animationType: 'reverse_fly'
  }
];

export const EQUIPMENT_TYPES = ['All', 'Dumbbell', 'Kettlebell'];
export const MUSCLE_CATEGORIES = ['All', 'Kettlebell', 'Shoulders', 'Back', 'Chest', 'Arms', 'Legs', 'Core'];
