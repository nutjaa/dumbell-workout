import React, { useEffect, useRef } from 'react';

export const ExerciseVisualizer = ({ animationType, isPlaying = true, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let t = 0;

    const render = () => {
      if (isPlaying) {
        t += 0.035;
      }

      // Smooth oscillation between 0 and 1
      const progress = (Math.sin(t) + 1) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Canvas dimensions & styling
      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;

      // Glow backdrop
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, w * 0.45);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Colors
      const bodyColor = '#94a3b8';
      const accentNeon = '#06b6d4'; // Cyan glow
      const dumbbellColor = '#f59e0b'; // Amber gold
      const kbColor = '#f97316'; // Vivid Kettlebell Orange
      const glowColor = '#38bdf8';

      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Helper function to draw stick figure torso & head
      const drawHead = (x, y, r = 14) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = bodyColor;
        ctx.lineWidth = 3;
        ctx.stroke();
      };

      const drawDumbbell = (x, y, angle = 0, size = 12) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        // Handle bar
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        // Weights
        ctx.fillStyle = dumbbellColor;
        ctx.shadowColor = dumbbellColor;
        ctx.shadowBlur = 8;
        ctx.fillRect(-size - 3, -6, 5, 12);
        ctx.fillRect(size - 2, -6, 5, 12);
        ctx.restore();
      };

      // Helper to draw realistic Vector Kettlebell
      const drawKettlebell = (x, y, angle = 0, radius = 11) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Handle loop top
        ctx.beginPath();
        ctx.arc(0, -radius * 0.7, radius * 0.7, Math.PI * 0.9, Math.PI * 2.1);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Cast iron main sphere body
        ctx.beginPath();
        ctx.arc(0, radius * 0.4, radius, 0, Math.PI * 2);
        ctx.fillStyle = kbColor;
        ctx.shadowColor = kbColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#c2410c';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Flat bottom base
        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(-radius * 0.5, radius * 1.1, radius, 3);

        ctx.restore();
      };

      // Draw exercise specific poses based on animationType
      switch (animationType) {
        case 'kettlebell_swing': {
          // Ballistic hip hinge swing
          const swingAngle = -Math.PI / 4 + progress * (Math.PI * 0.65);
          const headX = centerX - 10 + Math.cos(swingAngle) * 5;
          const headY = 70 + Math.sin(swingAngle) * 10;
          drawHead(headX, headY);

          // Hinged Spine & Legs
          const hipX = centerX - 5;
          const hipY = 140;
          ctx.beginPath();
          ctx.moveTo(headX, headY + 14);
          ctx.lineTo(hipX, hipY);
          ctx.lineTo(centerX - 25, 220);
          ctx.moveTo(hipX, hipY);
          ctx.lineTo(centerX + 25, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Swinging Arm
          const handX = centerX + Math.cos(swingAngle) * 65;
          const handY = 135 + Math.sin(swingAngle) * 65;

          ctx.beginPath();
          ctx.moveTo(headX, headY + 25);
          ctx.lineTo(handX, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(handX, handY, swingAngle - Math.PI / 2);
          break;
        }

        case 'turkish_getup': {
          // Standing overhead lockout pose
          const headY = 65;
          drawHead(centerX, headY);

          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Left hand on hip
          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(centerX - 35, 120);
          ctx.lineTo(centerX - 15, 140);
          ctx.stroke();

          // Right arm holding kettlebell locked overhead
          const handY = 40;
          ctx.beginPath();
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX + 20, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(centerX + 20, handY - 10, 0);
          break;
        }

        case 'clean_press': {
          // Clean into rack then press overhead
          const isPress = progress > 0.5;
          const pressFactor = isPress ? (progress - 0.5) * 2 : 0;
          const headY = 65;
          drawHead(centerX, headY);

          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Right arm pressing from rack y=110 to y=45
          const handY = 110 - pressFactor * 65;
          ctx.beginPath();
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX + 25, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(centerX + 25, handY - 5, 0);
          break;
        }

        case 'high_pull': {
          // Sumo High Pull (elbows high)
          const pullY = 160 - progress * 70;
          const elbowY = pullY - 15;
          const headY = 65;
          drawHead(centerX, headY);

          // Wide sumo legs
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 145);
          ctx.lineTo(centerX - 35, 220);
          ctx.moveTo(centerX, 145);
          ctx.lineTo(centerX + 35, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Arms pulling up with high elbows
          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 20);
          ctx.lineTo(centerX - 30, elbowY);
          ctx.lineTo(centerX, pullY);

          ctx.moveTo(centerX + 15, headY + 20);
          ctx.lineTo(centerX + 30, elbowY);
          ctx.lineTo(centerX, pullY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(centerX, pullY + 15, 0);
          break;
        }

        case 'windmill': {
          // Windmill hinge with arm locked overhead
          const bendAngle = progress * (Math.PI / 4);
          const headX = centerX - Math.sin(bendAngle) * 30;
          const headY = 70 + Math.cos(bendAngle) * 20;
          drawHead(headX, headY);

          // Spine bent to left
          const hipX = centerX + 15;
          const hipY = 145;
          ctx.beginPath();
          ctx.moveTo(headX, headY + 14);
          ctx.lineTo(hipX, hipY);
          ctx.lineTo(centerX - 25, 220);
          ctx.moveTo(hipX, hipY);
          ctx.lineTo(centerX + 25, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Locked overhead arm
          const handX = centerX + 20;
          const handY = 40;
          ctx.beginPath();
          ctx.moveTo(headX + 10, headY + 10);
          ctx.lineTo(handX, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(handX, handY - 10, 0);
          break;
        }

        case 'overhead_press': {
          // Standing figure pressing overhead
          const headY = 65;
          drawHead(centerX, headY);

          // Torso
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Legs
          ctx.beginPath();
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX - 25, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 25, 220);
          ctx.stroke();

          // Arms moving overhead (shoulder level y=100 up to y=45)
          const handY = 100 - progress * 55;
          const elbowY = 105 - progress * 40;
          const leftElbowX = centerX - 35 + progress * 10;
          const rightElbowX = centerX + 35 - progress * 10;

          // Left arm
          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(leftElbowX, elbowY);
          ctx.lineTo(centerX - 30, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          // Right arm
          ctx.beginPath();
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(rightElbowX, elbowY);
          ctx.lineTo(centerX + 30, handY);
          ctx.stroke();

          // Dumbbells
          drawDumbbell(centerX - 30, handY);
          drawDumbbell(centerX + 30, handY);
          break;
        }

        case 'shrugs': {
          // Standing figure shrugging shoulders straight up
          const shrugLift = progress * 15;
          const headY = 65 - shrugLift * 0.4;
          drawHead(centerX, headY);

          const shoulderY = 85 - shrugLift;
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Arms hanging down but lifting with shoulders
          const handY = 150 - shrugLift;
          ctx.beginPath();
          ctx.moveTo(centerX - 20, shoulderY);
          ctx.lineTo(centerX - 25, handY);
          ctx.moveTo(centerX + 20, shoulderY);
          ctx.lineTo(centerX + 25, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(centerX - 25, handY);
          drawDumbbell(centerX + 25, handY);
          break;
        }

        case 'lateral_raise': {
          // Standing figure raising arms out to sides
          const headY = 65;
          drawHead(centerX, headY);

          // Torso & Legs
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          const armAngle = progress * (Math.PI / 2);
          const armLength = 55;
          const leftHandX = centerX - 15 - Math.sin(armAngle) * armLength;
          const leftHandY = headY + 25 + Math.cos(armAngle) * armLength;

          const rightHandX = centerX + 15 + Math.sin(armAngle) * armLength;
          const rightHandY = headY + 25 + Math.cos(armAngle) * armLength;

          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(leftHandX, leftHandY);
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(rightHandX, rightHandY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(leftHandX, leftHandY, armAngle);
          drawDumbbell(rightHandX, rightHandY, -armAngle);
          break;
        }

        case 'bent_over_row': {
          const headX = centerX - 40;
          const headY = 85;
          drawHead(headX, headY);

          const hipX = centerX + 20;
          const hipY = 135;
          ctx.beginPath();
          ctx.moveTo(headX + 10, headY + 10);
          ctx.lineTo(hipX, hipY);
          ctx.lineTo(hipX - 10, 220);
          ctx.moveTo(hipX, hipY);
          ctx.lineTo(hipX + 15, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          const handY = 160 - progress * 55;
          const handX = centerX - 15;
          const elbowX = centerX + 10 + progress * 15;
          const elbowY = 120 - progress * 20;

          ctx.beginPath();
          ctx.moveTo(centerX - 25, 100);
          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(handX, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(handX, handY, Math.PI / 6);
          break;
        }

        case 'bicep_curl': {
          const headY = 65;
          drawHead(centerX, headY);

          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          const curlY = 160 - progress * 65;
          const curlX = centerX + 25 - progress * 8;

          ctx.beginPath();
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX + 22, 118);
          ctx.lineTo(curlX, curlY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(curlX, curlY, -progress * Math.PI * 0.4);
          break;
        }

        case 'goblet_squat': {
          const squatDrop = progress * 40;
          const headY = 65 + squatDrop;
          drawHead(centerX, headY);

          const hipY = 145 + squatDrop * 1.1;
          const kneeX = 35;
          const kneeY = 180 + squatDrop * 0.4;

          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, hipY);
          ctx.lineTo(centerX - kneeX, kneeY);
          ctx.lineTo(centerX - 25, 225);
          ctx.moveTo(centerX, hipY);
          ctx.lineTo(centerX + kneeX, kneeY);
          ctx.lineTo(centerX + 25, 225);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(centerX, headY + 35);
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX, headY + 35);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawKettlebell(centerX, headY + 35, 0, 11);
          break;
        }

        default: {
          const headY = 65;
          drawHead(centerX, headY);
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();
          const handY = 110 - progress * 50;
          drawDumbbell(centerX, handY);
          break;
        }
      }

      // Motion Trail Glow Arc Indicator
      ctx.beginPath();
      ctx.arc(w - 30, 35, 12, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationType, isPlaying]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl p-2 ${className}`}>
      <canvas
        ref={canvasRef}
        width={260}
        height={240}
        className="w-full max-w-[260px] h-[240px] object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]"
      />
      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-cyan-400/80 uppercase">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        Motion Guide
      </div>
    </div>
  );
};
