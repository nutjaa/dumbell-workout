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

      // Draw exercise specific poses based on animationType
      switch (animationType) {
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

          // Arm angle: 0 (down at sides) to Math.PI / 2 (horizontal T-pose)
          const armAngle = progress * (Math.PI / 2);

          const armLength = 55;
          const leftHandX = centerX - 15 - Math.sin(armAngle) * armLength;
          const leftHandY = headY + 25 + Math.cos(armAngle) * armLength;

          const rightHandX = centerX + 15 + Math.sin(armAngle) * armLength;
          const rightHandY = headY + 25 + Math.cos(armAngle) * armLength;

          // Arms
          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(leftHandX, leftHandY);
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(rightHandX, rightHandY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          // Dumbbells
          drawDumbbell(leftHandX, leftHandY, armAngle);
          drawDumbbell(rightHandX, rightHandY, -armAngle);
          break;
        }

        case 'bent_over_row': {
          // Bent over figure at 45 degrees rowing dumbbells up
          const headX = centerX - 40;
          const headY = 85;
          drawHead(headX, headY);

          // Hinged Spine
          const hipX = centerX + 20;
          const hipY = 135;
          ctx.beginPath();
          ctx.moveTo(headX + 10, headY + 10);
          ctx.lineTo(hipX, hipY);
          // Legs
          ctx.lineTo(hipX - 10, 220);
          ctx.moveTo(hipX, hipY);
          ctx.lineTo(hipX + 15, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Row motion: hand moves from low y=160 up to y=105
          const handY = 160 - progress * 55;
          const handX = centerX - 15;
          const elbowX = centerX + 10 + progress * 15;
          const elbowY = 120 - progress * 20;

          // Arm
          ctx.beginPath();
          ctx.moveTo(centerX - 25, 100);
          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(handX, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(handX, handY, Math.PI / 6);
          break;
        }

        case 'single_arm_row': {
          // Bench row support
          // Bench
          ctx.beginPath();
          ctx.moveTo(centerX - 70, 165);
          ctx.lineTo(centerX + 60, 165);
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 6;
          ctx.stroke();
          ctx.lineWidth = 4;

          const headX = centerX - 35;
          const headY = 95;
          drawHead(headX, headY);

          // Support leg & arm on bench
          ctx.beginPath();
          ctx.moveTo(headX + 10, headY + 10);
          ctx.lineTo(centerX + 30, 120); // spine
          ctx.lineTo(centerX + 40, 165); // back leg
          ctx.moveTo(headX + 5, headY + 15);
          ctx.lineTo(headX - 10, 165); // support arm on bench
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Active arm rowing
          const activeHandY = 165 - progress * 50;
          const activeElbowX = centerX + 15 + progress * 15;
          const activeElbowY = 130 - progress * 25;

          ctx.beginPath();
          ctx.moveTo(centerX - 10, 110);
          ctx.lineTo(activeElbowX, activeElbowY);
          ctx.lineTo(centerX, activeHandY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(centerX, activeHandY, 0);
          break;
        }

        case 'reverse_fly': {
          // Bent forward, rear delt fly out to sides
          const headX = centerX;
          const headY = 100;
          drawHead(headX, headY);

          // Spine forward
          ctx.beginPath();
          ctx.moveTo(headX, headY + 14);
          ctx.lineTo(centerX, 150);
          ctx.lineTo(centerX - 20, 220);
          ctx.moveTo(centerX, 150);
          ctx.lineTo(centerX + 20, 220);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Fly arms out (handY goes from 165 to 110)
          const spreadX = 25 + progress * 40;
          const handY = 165 - progress * 55;

          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 20);
          ctx.lineTo(centerX - spreadX, handY);
          ctx.moveTo(centerX + 15, headY + 20);
          ctx.lineTo(centerX + spreadX, handY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(centerX - spreadX, handY);
          drawDumbbell(centerX + spreadX, handY);
          break;
        }

        case 'bicep_curl': {
          // Bicep curl standing
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

          // Elbows fixed at sides y=115
          // Forearm curls up from y=160 to y=95
          const curlY = 160 - progress * 65;
          const curlX = centerX + 25 - progress * 8;

          ctx.beginPath();
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX + 22, 118); // elbow fixed
          ctx.lineTo(curlX, curlY);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(curlX, curlY, -progress * Math.PI * 0.4);
          break;
        }

        case 'goblet_squat': {
          // Squatting motion
          const squatDrop = progress * 40;
          const headY = 65 + squatDrop;
          drawHead(centerX, headY);

          const hipY = 145 + squatDrop * 1.1;
          const kneeX = 35;
          const kneeY = 180 + squatDrop * 0.4;

          // Torso & Legs squatting
          ctx.beginPath();
          ctx.moveTo(centerX, headY + 14);
          ctx.lineTo(centerX, hipY);
          // Legs bent
          ctx.lineTo(centerX - kneeX, kneeY);
          ctx.lineTo(centerX - 25, 225);
          ctx.moveTo(centerX, hipY);
          ctx.lineTo(centerX + kneeX, kneeY);
          ctx.lineTo(centerX + 25, 225);
          ctx.strokeStyle = bodyColor;
          ctx.stroke();

          // Holding single dumbbell at chest
          ctx.beginPath();
          ctx.moveTo(centerX - 15, headY + 25);
          ctx.lineTo(centerX, headY + 35);
          ctx.moveTo(centerX + 15, headY + 25);
          ctx.lineTo(centerX, headY + 35);
          ctx.strokeStyle = accentNeon;
          ctx.stroke();

          drawDumbbell(centerX, headY + 35, Math.PI / 2, 14);
          break;
        }

        default: {
          // Generic overhead press
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
