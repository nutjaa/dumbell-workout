import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, Layers } from 'lucide-react';

export const ExerciseVisualizer = ({ animationType, isPlaying = true, className = '' }) => {
  const canvasRef = useRef(null);
  const [viewAngle, setViewAngle] = useState('front'); // 'front', 'side', '3d'

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

      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;

      // Radial Glow Backdrop
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

      // Helper function to draw stick figure head
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
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        ctx.fillStyle = dumbbellColor;
        ctx.shadowColor = dumbbellColor;
        ctx.shadowBlur = 8;
        ctx.fillRect(-size - 3, -6, 5, 12);
        ctx.fillRect(size - 2, -6, 5, 12);
        ctx.restore();
      };

      const drawKettlebell = (x, y, angle = 0, radius = 11) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.arc(0, -radius * 0.7, radius * 0.7, Math.PI * 0.9, Math.PI * 2.1);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, radius * 0.4, radius, 0, Math.PI * 2);
        ctx.fillStyle = kbColor;
        ctx.shadowColor = kbColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.strokeStyle = '#c2410c';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(-radius * 0.5, radius * 1.1, radius, 3);
        ctx.restore();
      };

      // -------------------------------------------------------------
      // MULTI-CAMERA VIEW PROJECTION ROUTINES
      // -------------------------------------------------------------

      if (viewAngle === 'side') {
        // === SIDE PROFILE CAMERA VIEW ===
        ctx.save();
        // Grid floor line
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, 220);
        ctx.lineTo(w - 30, 220);
        ctx.stroke();

        switch (animationType) {
          case 'bent_over_row':
          case 'kettlebell_swing': {
            // Side Profile Hinge: Spine tilted 45 deg, arm pulling back
            const hingeAngle = -Math.PI / 4 + progress * (Math.PI * 0.5);
            const headX = centerX - 30;
            const headY = 85;
            drawHead(headX, headY);

            const hipX = centerX + 25;
            const hipY = 135;

            // Spine
            ctx.beginPath();
            ctx.moveTo(headX + 10, headY + 10);
            ctx.lineTo(hipX, hipY);
            // Legs slightly bent
            ctx.lineTo(hipX - 10, 220);
            ctx.moveTo(hipX, hipY);
            ctx.lineTo(hipX + 15, 220);
            ctx.strokeStyle = bodyColor;
            ctx.stroke();

            // Side arm trajectory
            const handX = centerX - 10 + Math.cos(hingeAngle) * 45;
            const handY = 140 + Math.sin(hingeAngle) * 45;
            ctx.beginPath();
            ctx.moveTo(headX + 5, headY + 20);
            ctx.lineTo(handX, handY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            if (animationType === 'kettlebell_swing') {
              drawKettlebell(handX, handY, hingeAngle);
            } else {
              drawDumbbell(handX, handY, Math.PI / 4);
            }
            break;
          }

          case 'goblet_squat': {
            // Side Profile Squat (checking knee travel & back posture)
            const drop = progress * 45;
            const headX = centerX - 15;
            const headY = 65 + drop;
            drawHead(headX, headY);

            const hipX = centerX + 15;
            const hipY = 140 + drop * 1.1;
            const kneeX = centerX - 35;
            const kneeY = 180 + drop * 0.4;

            ctx.beginPath();
            ctx.moveTo(headX, headY + 14);
            ctx.lineTo(hipX, hipY);
            ctx.lineTo(kneeX, kneeY);
            ctx.lineTo(centerX - 25, 220);
            ctx.strokeStyle = bodyColor;
            ctx.stroke();

            // Hands holding weight at chest
            drawKettlebell(headX - 15, headY + 30, 0, 11);
            break;
          }

          default: {
            // Standard side profile standing press / curl
            const headY = 65;
            drawHead(centerX - 10, headY);

            ctx.beginPath();
            ctx.moveTo(centerX - 10, headY + 14);
            ctx.lineTo(centerX - 10, 150);
            ctx.lineTo(centerX - 25, 220);
            ctx.moveTo(centerX - 10, 150);
            ctx.lineTo(centerX + 15, 220);
            ctx.strokeStyle = bodyColor;
            ctx.stroke();

            const handY = 150 - progress * 80;
            ctx.beginPath();
            ctx.moveTo(centerX - 10, headY + 25);
            ctx.lineTo(centerX + 15, handY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            drawDumbbell(centerX + 15, handY, 0);
            break;
          }
        }
        ctx.restore();
      } else if (viewAngle === '3d') {
        // === 3D ISOMETRIC PERSPECTIVE CAMERA VIEW ===
        ctx.save();
        ctx.translate(20, 15);
        ctx.scale(0.9, 0.9);

        // 3D Isometric floor grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, 190);
        ctx.lineTo(130, 230);
        ctx.lineTo(230, 190);
        ctx.lineTo(130, 150);
        ctx.closePath();
        ctx.stroke();

        const headY = 65;
        drawHead(centerX + 15, headY);

        // 3D Torso
        ctx.beginPath();
        ctx.moveTo(centerX + 15, headY + 14);
        ctx.lineTo(centerX + 15, 145);
        // 3D Legs
        ctx.lineTo(centerX - 10, 210);
        ctx.moveTo(centerX + 15, 145);
        ctx.lineTo(centerX + 35, 210);
        ctx.strokeStyle = bodyColor;
        ctx.stroke();

        // 3D Arc Motion
        const isoArmX1 = centerX - 25 + progress * 20;
        const isoArmY1 = 120 - progress * 50;
        const isoArmX2 = centerX + 45 - progress * 15;
        const isoArmY2 = 120 - progress * 50;

        ctx.beginPath();
        ctx.moveTo(centerX + 5, headY + 25);
        ctx.lineTo(isoArmX1, isoArmY1);
        ctx.moveTo(centerX + 25, headY + 25);
        ctx.lineTo(isoArmX2, isoArmY2);
        ctx.strokeStyle = accentNeon;
        ctx.stroke();

        if (animationType.includes('kettlebell')) {
          drawKettlebell(isoArmX1, isoArmY1, Math.PI / 8);
        } else {
          drawDumbbell(isoArmX1, isoArmY1, Math.PI / 8);
          drawDumbbell(isoArmX2, isoArmY2, -Math.PI / 8);
        }
        ctx.restore();
      } else {
        // === FRONT CAMERA VIEW (DEFAULT) ===
        switch (animationType) {
          case 'kettlebell_swing': {
            const swingAngle = -Math.PI / 4 + progress * (Math.PI * 0.65);
            const headX = centerX - 10 + Math.cos(swingAngle) * 5;
            const headY = 70 + Math.sin(swingAngle) * 10;
            drawHead(headX, headY);

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

            ctx.beginPath();
            ctx.moveTo(centerX - 15, headY + 25);
            ctx.lineTo(centerX - 35, 120);
            ctx.lineTo(centerX - 15, 140);
            ctx.stroke();

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

            const handY = 110 - pressFactor * 65;
            ctx.beginPath();
            ctx.moveTo(centerX + 15, headY + 25);
            ctx.lineTo(centerX + 25, handY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            drawKettlebell(centerX + 25, handY - 5, 0);
            break;
          }

          case 'kettlebell_snatch': {
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

            const handY = 160 - progress * 125;
            ctx.beginPath();
            ctx.moveTo(centerX + 15, headY + 25);
            ctx.lineTo(centerX + 20, handY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            drawKettlebell(centerX + 20, handY - 5, 0);
            break;
          }

          case 'kettlebell_halo': {
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

            const haloAngle = progress * Math.PI * 2;
            const haloX = centerX + Math.cos(haloAngle) * 26;
            const haloY = headY + Math.sin(haloAngle) * 14;

            ctx.beginPath();
            ctx.moveTo(centerX - 15, headY + 25);
            ctx.lineTo(haloX, haloY);
            ctx.moveTo(centerX + 15, headY + 25);
            ctx.lineTo(haloX, haloY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            drawKettlebell(haloX, haloY, 0, 9);
            break;
          }

          case 'high_pull': {
            const pullY = 160 - progress * 70;
            const elbowY = pullY - 15;
            const headY = 65;
            drawHead(centerX, headY);

            ctx.beginPath();
            ctx.moveTo(centerX, headY + 14);
            ctx.lineTo(centerX, 145);
            ctx.lineTo(centerX - 35, 220);
            ctx.moveTo(centerX, 145);
            ctx.lineTo(centerX + 35, 220);
            ctx.strokeStyle = bodyColor;
            ctx.stroke();

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
            const bendAngle = progress * (Math.PI / 4);
            const headX = centerX - Math.sin(bendAngle) * 30;
            const headY = 70 + Math.cos(bendAngle) * 20;
            drawHead(headX, headY);

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
            const headY = 65;
            drawHead(centerX, headY);

            ctx.beginPath();
            ctx.moveTo(centerX, headY + 14);
            ctx.lineTo(centerX, 150);
            ctx.strokeStyle = bodyColor;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(centerX, 150);
            ctx.lineTo(centerX - 25, 220);
            ctx.moveTo(centerX, 150);
            ctx.lineTo(centerX + 25, 220);
            ctx.stroke();

            const handY = 100 - progress * 55;
            const elbowY = 105 - progress * 40;
            const leftElbowX = centerX - 35 + progress * 10;
            const rightElbowX = centerX + 35 - progress * 10;

            ctx.beginPath();
            ctx.moveTo(centerX - 15, headY + 25);
            ctx.lineTo(leftElbowX, elbowY);
            ctx.lineTo(centerX - 30, handY);
            ctx.strokeStyle = accentNeon;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(centerX + 15, headY + 25);
            ctx.lineTo(rightElbowX, elbowY);
            ctx.lineTo(centerX + 30, handY);
            ctx.stroke();

            drawDumbbell(centerX - 30, handY);
            drawDumbbell(centerX + 30, handY);
            break;
          }

          case 'shrugs': {
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
            const headY = 65;
            drawHead(centerX, headY);

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
  }, [animationType, isPlaying, viewAngle]);

  const viewAngleLabels = {
    front: 'Front View (Symmetry & Track)',
    side: 'Side Profile (Posture & Hinge)',
    '3d': '3D Iso (Depth & Motion Arc)'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl p-2 ${className}`}>
      {/* TOP MULTI-CAMERA ANGLE SWITCHER CONSOLE */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-1 z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          Camera Angle:
        </div>

        {/* Camera Switcher Buttons */}
        <div className="flex items-center gap-1">
          {[
            { id: 'front', label: 'Front' },
            { id: 'side', label: 'Side' },
            { id: '3d', label: '3D Iso' }
          ].map((angle) => (
            <button
              key={angle.id}
              onClick={() => setViewAngle(angle.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                viewAngle === angle.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {angle.label}
            </button>
          ))}
        </div>
      </div>

      {/* CANVAS DISPLAY */}
      <div className="relative w-full max-w-[260px] h-[240px]">
        <canvas
          ref={canvasRef}
          width={260}
          height={240}
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        />

        {/* Bottom Angle Cue Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-[10px] font-semibold text-cyan-300/90 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-sm uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          {viewAngleLabels[viewAngle]}
        </div>
      </div>
    </div>
  );
};
