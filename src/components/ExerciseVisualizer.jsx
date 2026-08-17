import React, { useState, useEffect, useRef } from 'react';
import { Camera, Play, Pause, Activity, Gauge, Sparkles, Image, MonitorPlay, Maximize2, X } from 'lucide-react';

export const ExerciseVisualizer = ({ animationType, postureImage, isPlaying: initialIsPlaying = true, className = '' }) => {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'image'
  const [viewAngle, setViewAngle] = useState('front'); // 'front', 'side', '3d'
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5, 1, 1.5
  const [currentPhase, setCurrentPhase] = useState('CONCENTRIC'); // CONCENTRIC, PEAK SQUEEZE, ECCENTRIC, RESET
  const [phaseProgress, setPhaseProgress] = useState(0); // 0 to 1
  const [showMuscles, setShowMuscles] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync internal playing state if prop changes
  useEffect(() => {
    setIsPlaying(initialIsPlaying);
  }, [initialIsPlaying]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (viewMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let lastTimestamp = performance.now();

    const render = (now) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        time += delta * playbackSpeed * 0.31;
      }

      const cycle = time % 1; // 0 to 1 representing one full rep

      let rawProgress = 0;
      let phaseName = 'CONCENTRIC';

      if (cycle < 0.30) {
        const tNorm = cycle / 0.30;
        rawProgress = Math.sin((tNorm * Math.PI) / 2);
        phaseName = 'CONCENTRIC';
      } else if (cycle < 0.45) {
        rawProgress = 1;
        phaseName = 'PEAK SQUEEZE';
      } else if (cycle < 0.85) {
        const tNorm = (cycle - 0.45) / 0.40;
        rawProgress = (1 + Math.cos(tNorm * Math.PI)) / 2;
        phaseName = 'ECCENTRIC';
      } else {
        rawProgress = 0;
        phaseName = 'RESET';
      }

      setCurrentPhase(phaseName);
      setPhaseProgress(rawProgress);

      const progress = rawProgress;
      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      // --- BACKDROP & CANVAS STYLING ---
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, w * 0.65);
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      bgGrad.addColorStop(0.65, 'rgba(15, 23, 42, 0.99)');
      bgGrad.addColorStop(1, 'rgba(2, 6, 23, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const colors = {
        bodyMain: '#94a3b8',
        bodyDark: '#475569',
        bodyLight: '#cbd5e1',
        jointNode: '#e2e8f0',
        activeNeon: '#06b6d4',
        accentGold: '#f59e0b',
        kbOrange: '#f97316',
        benchColor: '#1e293b',
        benchBorder: '#334155'
      };

      ctx.save();
      const floorY = 222;

      if (viewAngle === 'side') {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(20, floorY);
        ctx.lineTo(w - 20, floorY);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
        for (let x = 40; x <= w - 40; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, floorY - 3);
          ctx.lineTo(x, floorY + 3);
          ctx.stroke();
        }
      } else if (viewAngle === '3d') {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        const gridCenterY = 205;

        for (let i = -4; i <= 4; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX + i * 35 - 80, gridCenterY - 25);
          ctx.lineTo(centerX + i * 35 + 80, gridCenterY + 25);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX - i * 35 - 80, gridCenterY + 25);
          ctx.lineTo(centerX - i * 35 + 80, gridCenterY - 25);
          ctx.stroke();
        }
      } else {
        ctx.strokeStyle = 'rgba(30, 41, 59, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(15, floorY);
        ctx.lineTo(w - 15, floorY);
        ctx.stroke();
      }
      ctx.restore();

      const drawLimb = (x1, y1, x2, y2, radius = 6, color = colors.bodyMain, opacity = 1) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = radius * 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = Math.max(1.5, radius * 0.6);
        ctx.stroke();

        ctx.fillStyle = colors.jointNode;
        ctx.beginPath();
        ctx.arc(x2, y2, Math.max(2, radius * 0.45), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      const drawHead = (x, y, radius = 13, angle = 0, opacity = 1) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.bodyDark;
        ctx.fill();
        ctx.strokeStyle = colors.bodyLight;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.75, -Math.PI * 0.3, Math.PI * 0.3);
        ctx.strokeStyle = colors.activeNeon;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      };

      const drawMuscleHeatmap = (x, y, radius = 18, intensity = progress) => {
        if (!showMuscles || intensity < 0.05) return;
        ctx.save();
        const pulse = 1 + Math.sin(time * 12) * 0.1;
        const rEff = radius * pulse;
        const grad = ctx.createRadialGradient(x, y, 2, x, y, rEff);

        if (phaseName === 'PEAK SQUEEZE') {
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.85)');
          grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.45)');
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        } else {
          grad.addColorStop(0, 'rgba(6, 182, 212, 0.85)');
          grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.45)');
          grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, rEff, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      const drawDumbbell = (x, y, angle = 0, size = 13, isGlowing = false) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        if (isGlowing || phaseName === 'PEAK SQUEEZE') {
          ctx.shadowColor = colors.accentGold;
          ctx.shadowBlur = 12;
        }

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();

        ctx.fillStyle = colors.accentGold;
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-size - 5, -7, 6, 14, 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(size - 1, -7, 6, 14, 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(-size + 1, -4, 2, 8);
        ctx.fillRect(size - 3, -4, 2, 8);
        ctx.restore();
      };

      const drawKettlebell = (x, y, angle = 0, radius = 12, isGlowing = false) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        if (isGlowing || phaseName === 'PEAK SQUEEZE') {
          ctx.shadowColor = colors.kbOrange;
          ctx.shadowBlur = 14;
        }

        ctx.beginPath();
        ctx.arc(0, -radius * 0.8, radius * 0.7, Math.PI * 0.85, Math.PI * 2.15);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, radius * 0.35, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.kbOrange;
        ctx.fill();
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(-radius * 0.5, radius * 1.1, radius, 3.5);
        ctx.restore();
      };

      const drawBench = (bx, by, bw, bh, angle = 0) => {
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(angle);
        ctx.fillStyle = colors.benchColor;
        ctx.strokeStyle = colors.benchBorder;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-bw * 0.35, bh / 2);
        ctx.lineTo(-bw * 0.35, bh / 2 + 35);
        ctx.moveTo(bw * 0.35, bh / 2);
        ctx.lineTo(bw * 0.35, bh / 2 + 35);
        ctx.stroke();
        ctx.restore();
      };

      const drawForceArrow = (x, y, dx, dy) => {
        if (phaseName !== 'CONCENTRIC') return;
        ctx.save();
        ctx.strokeStyle = colors.activeNeon;
        ctx.fillStyle = colors.activeNeon;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = colors.activeNeon;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();

        const arrowAngle = Math.atan2(dy, dx);
        ctx.translate(x + dx, y + dy);
        ctx.rotate(arrowAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-6, -4);
        ctx.lineTo(-6, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      const type = animationType || 'bicep_curl';

      if (viewAngle === 'side') {
        ctx.save();
        if (type === 'chest_press' || type === 'pullover') {
          const benchY = 165;
          drawBench(centerX, benchY, 190, 18);

          const headX = centerX - 65;
          const headY = benchY - 14;
          const hipX = centerX + 35;

          drawHead(headX, headY, 12, -Math.PI / 2);
          drawLimb(headX + 14, headY, hipX, benchY - 5, 9.5, colors.bodyMain);
          drawLimb(hipX, benchY, centerX + 70, benchY + 15, 6, colors.bodyDark, 0.6);
          drawLimb(centerX + 70, benchY + 15, centerX + 70, 220, 5, colors.bodyDark, 0.6);

          if (type === 'chest_press') {
            const pressY = benchY - 25 - progress * 55;
            drawMuscleHeatmap(centerX - 10, benchY - 10, 22, progress);
            drawLimb(centerX - 10, benchY - 10, centerX - 10, benchY - 5, 6, colors.bodyMain);
            drawLimb(centerX - 10, benchY - 5, centerX - 10, pressY, 5.5, colors.bodyMain);
            drawDumbbell(centerX - 10, pressY, 0, 13, true);
            drawForceArrow(centerX - 10, pressY + 15, 0, -20);
          } else {
            const armAngle = -Math.PI * 0.85 + progress * (Math.PI * 0.5);
            const handX = centerX - 15 + Math.cos(armAngle) * 55;
            const handY = benchY - 12 + Math.sin(armAngle) * 55;

            drawMuscleHeatmap(centerX - 25, benchY - 5, 20, progress);
            drawLimb(centerX - 15, benchY - 12, handX, handY, 6, colors.bodyMain);
            drawDumbbell(handX, handY, armAngle + Math.PI / 2, 13, true);
          }
        } else if (type === 'renegade_row') {
          const headX = centerX - 70;
          const headY = 135;
          const hipX = centerX + 25;
          const feetX = centerX + 85;

          drawHead(headX, headY, 12, Math.PI / 6);
          drawLimb(headX + 15, headY, hipX, 145, 9, colors.bodyMain);
          drawLimb(hipX, 145, feetX, 185, 6, colors.bodyMain);

          drawLimb(headX + 30, headY + 10, headX + 30, 185, 6, colors.bodyDark, 0.5);
          drawDumbbell(headX + 30, 185, 0, 11);

          const rowY = 185 - progress * 42;
          drawMuscleHeatmap(centerX - 10, 145, 20, progress);
          drawLimb(headX + 45, headY + 10, centerX + 10, 135 - progress * 25, 6, colors.bodyMain);
          drawLimb(centerX + 10, 135 - progress * 25, centerX - 5, rowY, 5.5, colors.bodyMain);
          drawDumbbell(centerX - 5, rowY, 0, 13, true);
        } else if (type === 'goblet_squat' || type === 'squat') {
          const drop = progress * 50;
          const headX = centerX - 10;
          const headY = 62 + drop;
          const hipX = centerX + 25;
          const hipY = 135 + drop * 1.15;
          const kneeX = centerX - 25;
          const kneeY = 175 + drop * 0.35;

          drawHead(headX, headY, 13, 0.2);
          drawLimb(headX, headY + 14, hipX, hipY, 9, colors.bodyMain);

          drawMuscleHeatmap(kneeX, kneeY, 22, progress);

          drawLimb(hipX, hipY, kneeX, kneeY, 7.5, colors.bodyMain);
          drawLimb(kneeX, kneeY, centerX - 15, 220, 6.5, colors.bodyMain);

          drawLimb(headX + 10, headY + 25, headX - 15, headY + 35, 5.5, colors.bodyMain);
          drawKettlebell(headX - 15, headY + 35, 0, 12, true);
        } else if (type === 'kettlebell_swing' || type === 'bent_over_row' || type === 'single_arm_row' || type === 'reverse_fly') {
          const isSwing = type === 'kettlebell_swing';
          const hinge = isSwing ? 1 - progress : 1;

          const headX = centerX - hinge * 35;
          const headY = 68 + hinge * 28;
          const hipX = centerX + hinge * 25;
          const hipY = 135 + hinge * 12;

          drawHead(headX, headY, 13, -hinge * 0.4);
          drawLimb(headX, headY + 14, hipX, hipY, 9, colors.bodyMain);

          drawMuscleHeatmap(hipX, hipY, 24, hinge);

          drawLimb(hipX, hipY, centerX - 5, 180, 7, colors.bodyMain);
          drawLimb(centerX - 5, 180, centerX - 10, 220, 6, colors.bodyMain);

          if (isSwing) {
            const swingAngle = -Math.PI * 0.35 + progress * (Math.PI * 0.70);
            const armLen = 65;
            const handX = centerX + Math.cos(swingAngle) * armLen;
            const handY = 120 + Math.sin(swingAngle) * armLen;

            drawLimb(headX + 10, headY + 20, handX, handY, 6, colors.bodyMain);
            drawKettlebell(handX, handY, swingAngle - Math.PI / 2, 13, true);
          } else {
            const pullDist = progress * 48;
            const handX = centerX - 10;
            const handY = 175 - pullDist;
            const elbowX = centerX + 15;
            const elbowY = 135 - pullDist * 0.5;

            drawLimb(headX + 15, headY + 15, elbowX, elbowY, 6, colors.bodyMain);
            drawLimb(elbowX, elbowY, handX, handY, 5.5, colors.bodyMain);
            drawDumbbell(handX, handY, Math.PI / 6, 13, true);
          }
        } else if (type === 'bicep_curl') {
          const headY = 62;
          drawHead(centerX, headY, 13, 0.1);

          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 5, 220, 7, colors.bodyMain);

          const shoulderX = centerX + 10;
          const shoulderY = headY + 22;
          const elbowX = centerX + 12;
          const elbowY = 125;

          const flexAngle = Math.PI / 2 - progress * (Math.PI * 0.75);
          const armLen = 42;
          const handX = elbowX + Math.cos(flexAngle) * armLen;
          const handY = elbowY + Math.sin(flexAngle) * armLen;

          drawMuscleHeatmap(shoulderX + 5, 105, 18, progress);

          drawLimb(shoulderX, shoulderY, elbowX, elbowY, 6.5, colors.bodyMain);
          drawLimb(elbowX, elbowY, handX, handY, 5.5, colors.bodyMain);
          drawDumbbell(handX, handY, flexAngle, 13, true);
        } else {
          const headY = 62;
          drawHead(centerX, headY, 13, 0.1);

          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 5, 220, 7, colors.bodyMain);

          const handY = 150 - progress * 65;
          drawLimb(centerX + 12, headY + 22, centerX + 15, handY, 6, colors.bodyMain);
          drawDumbbell(centerX + 15, handY, 0, 13, true);
        }

        ctx.restore();
      } else if (viewAngle === '3d') {
        ctx.save();
        ctx.transform(1, -0.12, 0.28, 0.92, -20, 15);

        ctx.fillStyle = 'rgba(2, 6, 23, 0.6)';
        ctx.beginPath();
        ctx.ellipse(centerX, 215, 35, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(centerX, 130, 45, 18, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        const headY = 62;
        drawHead(centerX, headY, 13);
        drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);

        drawLimb(centerX, 140, centerX - 22, 220, 7, colors.bodyMain);
        drawLimb(centerX, 140, centerX + 22, 220, 7, colors.bodyMain);

        drawMuscleHeatmap(centerX, headY + 30, 22, progress);

        const handY = 140 - progress * 60;
        drawLimb(centerX - 18, headY + 22, centerX - 28, handY, 6, colors.bodyMain);
        drawDumbbell(centerX - 28, handY, Math.PI / 8, 13, true);

        drawLimb(centerX + 18, headY + 22, centerX + 28, handY, 6, colors.bodyMain);
        drawDumbbell(centerX + 28, handY, -Math.PI / 8, 13, true);

        ctx.restore();
      } else {
        ctx.save();

        if (type === 'chest_press') {
          const benchY = 160;
          drawBench(centerX, benchY, 180, 20);

          const lyingHeadX = centerX - 65;
          const lyingHeadY = benchY - 14;
          const hipX = centerX + 40;
          const kneeX = centerX + 75;

          drawLimb(hipX, benchY, kneeX, benchY + 15, 6, colors.bodyDark, 0.6);
          drawLimb(kneeX, benchY + 15, kneeX, 220, 5, colors.bodyDark, 0.6);

          drawLimb(lyingHeadX + 15, lyingHeadY, hipX, benchY - 5, 10, colors.bodyMain);
          drawHead(lyingHeadX, lyingHeadY, 12, -Math.PI / 2);

          const pressDist = progress * 55;
          const handY = benchY - 25 - pressDist;
          const elbowY = benchY - 10 - pressDist * 0.4;

          drawMuscleHeatmap(centerX - 15, benchY - 10, 22, progress);

          drawLimb(centerX - 25, benchY - 10, centerX - 25, elbowY, 6, colors.bodyDark, 0.5);
          drawLimb(centerX - 25, elbowY, centerX - 25, handY, 5, colors.bodyDark, 0.5);
          drawDumbbell(centerX - 25, handY, 0, 12);

          drawLimb(centerX + 10, benchY - 10, centerX + 10, elbowY, 6, colors.bodyMain);
          drawLimb(centerX + 10, elbowY, centerX + 10, handY, 5.5, colors.bodyMain);
          drawDumbbell(centerX + 10, handY, 0, 13, true);

          drawForceArrow(centerX + 10, handY + 15, 0, -20);
        } else if (type === 'pullover') {
          const benchY = 160;
          drawBench(centerX, benchY, 180, 20);

          const headX = centerX - 60;
          const headY = benchY - 14;
          const hipX = centerX + 40;

          drawHead(headX, headY, 12, -Math.PI / 2);
          drawLimb(headX + 15, headY, hipX, benchY - 5, 10, colors.bodyMain);

          const armAngle = -Math.PI * 0.85 + progress * (Math.PI * 0.5);
          const shoulderX = centerX - 20;
          const shoulderY = benchY - 12;
          const armLength = 55;

          const handX = shoulderX + Math.cos(armAngle) * armLength;
          const handY = shoulderY + Math.sin(armAngle) * armLength;

          drawMuscleHeatmap(shoulderX - 10, shoulderY + 5, 20, progress);

          drawLimb(shoulderX, shoulderY, handX, handY, 6, colors.bodyMain);
          drawDumbbell(handX, handY, armAngle + Math.PI / 2, 13, true);
        } else if (type === 'renegade_row') {
          const headX = centerX - 70;
          const headY = 135;
          const hipX = centerX + 25;
          const feetX = centerX + 85;
          const floorPlankY = 185;

          drawLimb(hipX, 145, feetX, floorPlankY, 6, colors.bodyMain);
          drawLimb(headX + 15, headY, hipX, 145, 9, colors.bodyMain);
          drawHead(headX, headY, 12, Math.PI / 6);

          drawMuscleHeatmap(centerX - 10, 145, 20, progress);

          drawLimb(headX + 30, headY + 10, headX + 30, floorPlankY, 6, colors.bodyDark, 0.6);
          drawDumbbell(headX + 30, floorPlankY, 0, 11);

          const rowPull = progress * 40;
          const handX = centerX - 5;
          const handY = floorPlankY - rowPull;
          const elbowX = centerX + 10;
          const elbowY = 135 - rowPull * 0.6;

          drawLimb(headX + 45, headY + 10, elbowX, elbowY, 6, colors.bodyMain);
          drawLimb(elbowX, elbowY, handX, handY, 5.5, colors.bodyMain);
          drawDumbbell(handX, handY, 0, 13, true);

          drawForceArrow(handX, handY + 15, 0, -18);
        } else if (type === 'goblet_squat' || type === 'squat') {
          const squatDepth = progress * 52;
          const headX = centerX;
          const headY = 60 + squatDepth;

          const hipX = centerX;
          const hipY = 135 + squatDepth * 1.15;
          const kneeOut = 40 + squatDepth * 0.2;
          const kneeY = 175 + squatDepth * 0.35;
          const footX = 30;

          drawMuscleHeatmap(centerX - 25, 175, 22, progress);
          drawMuscleHeatmap(centerX + 25, 175, 22, progress);

          drawHead(headX, headY, 13);
          drawLimb(headX, headY + 14, hipX, hipY, 9, colors.bodyMain);

          drawLimb(hipX, hipY, centerX - kneeOut, kneeY, 7.5, colors.bodyMain);
          drawLimb(centerX - kneeOut, kneeY, centerX - footX, 220, 6.5, colors.bodyMain);

          drawLimb(hipX, hipY, centerX + kneeOut, kneeY, 7.5, colors.bodyMain);
          drawLimb(centerX + kneeOut, kneeY, centerX + footX, 220, 6.5, colors.bodyMain);

          const kbY = headY + 34;
          drawLimb(headX - 18, headY + 24, centerX, kbY, 5.5, colors.bodyMain);
          drawLimb(headX + 18, headY + 24, centerX, kbY, 5.5, colors.bodyMain);
          drawKettlebell(centerX, kbY, 0, 13, true);
        } else if (type === 'kettlebell_swing') {
          const swingAngle = -Math.PI * 0.35 + progress * (Math.PI * 0.70);
          const hingeFactor = 1 - progress;

          const headX = centerX - hingeFactor * 35;
          const headY = 70 + hingeFactor * 30;
          const hipX = centerX + hingeFactor * 30;
          const hipY = 135 + hingeFactor * 15;

          drawMuscleHeatmap(hipX, hipY, 24, hingeFactor);

          drawHead(headX, headY, 13, -hingeFactor * 0.4);
          drawLimb(headX, headY + 14, hipX, hipY, 9, colors.bodyMain);

          drawLimb(hipX, hipY, centerX - 15, 180, 7, colors.bodyMain);
          drawLimb(centerX - 15, 180, centerX - 20, 220, 6, colors.bodyMain);
          drawLimb(hipX, hipY, centerX + 15, 180, 7, colors.bodyMain);
          drawLimb(centerX + 15, 180, centerX + 20, 220, 6, colors.bodyMain);

          const armLen = 65;
          const handX = centerX + Math.cos(swingAngle) * armLen;
          const handY = 120 + Math.sin(swingAngle) * armLen;

          drawLimb(headX + 10, headY + 20, handX, handY, 6, colors.bodyMain);
          drawKettlebell(handX, handY, swingAngle - Math.PI / 2, 13, true);
        } else if (type === 'bicep_curl') {
          const headY = 62;
          drawHead(centerX, headY, 13);

          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 20, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 20, 220, 7, colors.bodyMain);

          drawMuscleHeatmap(centerX + 22, 105, 18, progress);

          const shoulderX = centerX + 18;
          const shoulderY = headY + 22;
          const elbowX = centerX + 22;
          const elbowY = 125;

          const flexAngle = Math.PI / 2 - progress * (Math.PI * 0.75);
          const armLen = 42;
          const handX = elbowX + Math.cos(flexAngle) * armLen;
          const handY = elbowY + Math.sin(flexAngle) * armLen;

          drawLimb(centerX - 18, headY + 22, centerX - 22, 125, 5, colors.bodyDark, 0.5);
          drawLimb(centerX - 22, 125, centerX - 22, 160, 5, colors.bodyDark, 0.5);

          drawLimb(shoulderX, shoulderY, elbowX, elbowY, 6.5, colors.bodyMain);
          drawLimb(elbowX, elbowY, handX, handY, 5.5, colors.bodyMain);
          drawDumbbell(handX, handY, flexAngle, 13, true);
        } else if (type === 'arnold_press' || type === 'overhead_press') {
          const headY = 62;
          drawHead(centerX, headY, 13);

          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 22, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 22, 220, 7, colors.bodyMain);

          drawMuscleHeatmap(centerX - 24, 85, 18, progress);
          drawMuscleHeatmap(centerX + 24, 85, 18, progress);

          const pressHeight = progress * 65;
          const handY = 110 - pressHeight;
          const elbowOut = 32 - progress * 10;
          const elbowY = 118 - pressHeight * 0.5;

          const rotationAngle = type === 'arnold_press' ? progress * (Math.PI / 2) : 0;

          drawLimb(centerX - 18, headY + 22, centerX - elbowOut, elbowY, 6, colors.bodyMain);
          drawLimb(centerX - elbowOut, elbowY, centerX - 28, handY, 5.5, colors.bodyMain);
          drawDumbbell(centerX - 28, handY, -rotationAngle, 13, true);

          drawLimb(centerX + 18, headY + 22, centerX + elbowOut, elbowY, 6, colors.bodyMain);
          drawLimb(centerX + elbowOut, elbowY, centerX + 28, handY, 5.5, colors.bodyMain);
          drawDumbbell(centerX + 28, handY, rotationAngle, 13, true);

          drawForceArrow(centerX + 28, handY + 15, 0, -20);
        } else if (type === 'lateral_raise') {
          const headY = 62;
          drawHead(centerX, headY, 13);

          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 20, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 20, 220, 7, colors.bodyMain);

          drawMuscleHeatmap(centerX - 35, 88, 18, progress);
          drawMuscleHeatmap(centerX + 35, 88, 18, progress);

          const raiseAngle = progress * (Math.PI * 0.48);
          const armLen = 58;

          const leftHandX = centerX - 16 - Math.sin(raiseAngle) * armLen;
          const leftHandY = headY + 24 + Math.cos(raiseAngle) * armLen;

          const rightHandX = centerX + 16 + Math.sin(raiseAngle) * armLen;
          const rightHandY = headY + 24 + Math.cos(raiseAngle) * armLen;

          drawLimb(centerX - 16, headY + 24, leftHandX, leftHandY, 6, colors.bodyMain);
          drawDumbbell(leftHandX, leftHandY, raiseAngle, 12, true);

          drawLimb(centerX + 16, headY + 24, rightHandX, rightHandY, 6, colors.bodyMain);
          drawDumbbell(rightHandX, rightHandY, -raiseAngle, 12, true);
        } else if (type === 'bent_over_row' || type === 'single_arm_row' || type === 'reverse_fly') {
          const headX = centerX - 42;
          const headY = 88;
          const hipX = centerX + 25;
          const hipY = 138;

          drawHead(headX, headY, 13, -Math.PI / 4);
          drawLimb(headX + 12, headY + 8, hipX, hipY, 9, colors.bodyMain);

          drawLimb(hipX, hipY, centerX, 180, 7.5, colors.bodyMain);
          drawLimb(centerX, 180, centerX - 10, 220, 6.5, colors.bodyMain);
          drawLimb(hipX, hipY, centerX + 25, 180, 7.5, colors.bodyMain);
          drawLimb(centerX + 25, 180, centerX + 20, 220, 6.5, colors.bodyMain);

          drawMuscleHeatmap(centerX - 10, 110, 22, progress);

          const pullDist = progress * 50;
          const handX = centerX - 15;
          const handY = 170 - pullDist;

          if (type === 'reverse_fly') {
            const flyAngle = progress * (Math.PI * 0.45);
            const flyX = centerX - 15 - Math.sin(flyAngle) * 40;
            const flyY = 160 - Math.cos(flyAngle) * 40;
            drawLimb(headX + 18, headY + 15, flyX, flyY, 6, colors.bodyMain);
            drawDumbbell(flyX, flyY, flyAngle, 12, true);
          } else {
            const elbowX = centerX + 10 + progress * 15;
            const elbowY = 130 - pullDist * 0.5;

            drawLimb(headX + 18, headY + 15, elbowX, elbowY, 6, colors.bodyMain);
            drawLimb(elbowX, elbowY, handX, handY, 5.5, colors.bodyMain);
            drawDumbbell(handX, handY, Math.PI / 6, 13, true);
            drawForceArrow(handX, handY + 12, 0, -18);
          }
        } else if (type === 'shrugs') {
          const shrugLift = progress * 18;
          const headY = 62 - shrugLift * 0.3;

          drawHead(centerX, headY, 13);
          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 20, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 20, 220, 7, colors.bodyMain);

          drawMuscleHeatmap(centerX, headY + 22, 22, progress);

          const shoulderY = headY + 24 - shrugLift;
          const handY = 145 - shrugLift;

          drawLimb(centerX - 22, shoulderY, centerX - 28, handY, 6, colors.bodyMain);
          drawDumbbell(centerX - 28, handY, 0, 13, true);

          drawLimb(centerX + 22, shoulderY, centerX + 28, handY, 6, colors.bodyMain);
          drawDumbbell(centerX + 28, handY, 0, 13, true);
        } else if (type === 'turkish_getup') {
          const stage = Math.floor(progress * 3.99);
          const stages = [
            { head: { x: centerX - 50, y: 155 }, hip: { x: centerX, y: 160 }, lockY: 105 },
            { head: { x: centerX - 35, y: 125 }, hip: { x: centerX - 5, y: 150 }, lockY: 70 },
            { head: { x: centerX - 15, y: 90 }, hip: { x: centerX - 5, y: 135 }, lockY: 38 },
            { head: { x: centerX, y: 62 }, hip: { x: centerX, y: 135 }, lockY: 20 }
          ];
          const st = stages[stage];

          drawHead(st.head.x, st.head.y, 13);
          drawLimb(st.head.x, st.head.y + 12, st.hip.x, st.hip.y, 9, colors.bodyMain);
          drawLimb(st.hip.x, st.hip.y, st.hip.x + 25, 215, 7, colors.bodyMain);

          const handX = st.head.x + 15;
          const handY = st.lockY;

          drawLimb(st.head.x + 10, st.head.y + 10, handX, handY, 6, colors.bodyMain);
          drawKettlebell(handX, handY - 10, 0, 13, true);
          drawMuscleHeatmap(handX, handY, 20, 1);
        } else if (type === 'clean_press' || type === 'kettlebell_snatch' || type === 'high_pull' || type === 'windmill' || type === 'kettlebell_halo') {
          const headY = 62;
          drawHead(centerX, headY, 13);
          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 22, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 22, 220, 7, colors.bodyMain);

          if (type === 'high_pull') {
            const pullY = 155 - progress * 75;
            const elbowY = pullY - 18;

            drawMuscleHeatmap(centerX, pullY, 20, progress);

            drawLimb(centerX - 18, headY + 22, centerX - 32, elbowY, 6, colors.bodyMain);
            drawLimb(centerX - 32, elbowY, centerX, pullY, 5.5, colors.bodyMain);

            drawLimb(centerX + 18, headY + 22, centerX + 32, elbowY, 6, colors.bodyMain);
            drawLimb(centerX + 32, elbowY, centerX, pullY, 5.5, colors.bodyMain);

            drawKettlebell(centerX, pullY + 12, 0, 13, true);
          } else if (type === 'kettlebell_halo') {
            const haloAngle = time * Math.PI * 2;
            const haloX = centerX + Math.cos(haloAngle) * 32;
            const haloY = headY + Math.sin(haloAngle) * 16;

            drawMuscleHeatmap(centerX, headY + 10, 22, 0.8);

            drawLimb(centerX - 16, headY + 22, haloX, haloY, 5.5, colors.bodyMain);
            drawLimb(centerX + 16, headY + 22, haloX, haloY, 5.5, colors.bodyMain);
            drawKettlebell(haloX, haloY, 0, 11, true);
          } else {
            const armY = 150 - progress * 115;
            drawLimb(centerX + 18, headY + 22, centerX + 22, armY, 6, colors.bodyMain);
            drawKettlebell(centerX + 22, armY - 10, 0, 13, true);
            drawMuscleHeatmap(centerX + 22, armY, 20, progress);
          }
        } else {
          const headY = 62;
          drawHead(centerX, headY, 13);
          drawLimb(centerX, headY + 14, centerX, 140, 9, colors.bodyMain);
          drawLimb(centerX, 140, centerX - 20, 220, 7, colors.bodyMain);
          drawLimb(centerX, 140, centerX + 20, 220, 7, colors.bodyMain);

          const handY = 150 - progress * 65;
          drawLimb(centerX + 18, headY + 22, centerX + 25, handY, 6, colors.bodyMain);
          drawDumbbell(centerX + 25, handY, 0, 13, true);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationType, isPlaying, viewAngle, playbackSpeed, showMuscles, viewMode]);

  const viewAngleLabels = {
    front: 'Front View (Symmetry)',
    side: 'Side Profile (Posture)',
    '3d': '3D Iso Perspective'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl p-3 ${className}`}>
      {/* MODE SWITCHER TAB (2D CANVAS ANIMATION vs PUBLIC FORM GUIDE CHART) */}
      {postureImage && (
        <div className="w-full flex items-center justify-center gap-1.5 p-1 bg-slate-950/90 rounded-xl border border-slate-800/90 mb-2">
          <button
            onClick={() => setViewMode('canvas')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'canvas'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            2D Motion Engine
          </button>
          <button
            onClick={() => setViewMode('image')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'image'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            HD Form Chart
          </button>
        </div>
      )}

      {/* VIEW MODE 1: INTERACTIVE CANVAS 2D ANIMATION */}
      {viewMode === 'canvas' && (
        <>
          {/* TOP CONTROLS CONSOLE */}
          <div className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-2xl border border-slate-800/80 mb-2 z-10 gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-cyan-400 mr-1 shrink-0" />
              {[
                { id: 'front', label: 'Front' },
                { id: 'side', label: 'Side' },
                { id: '3d', label: '3D Iso' }
              ].map((angle) => (
                <button
                  key={angle.id}
                  onClick={() => setViewAngle(angle.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase transition-all ${
                    viewAngle === angle.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-[1.02]'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {angle.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                {[0.5, 1, 1.5].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
                      playbackSpeed === spd
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={`Playback Speed ${spd}x`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowMuscles(!showMuscles)}
                className={`p-1.5 rounded-xl border transition-all ${
                  showMuscles
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-800/60 text-slate-500 border-slate-800'
                }`}
                title="Toggle Muscle Heatmap"
              >
                <Activity className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-xl text-white font-bold transition-all ${
                  isPlaying
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                }`}
                title={isPlaying ? 'Pause Animation' : 'Play Animation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
            </div>
          </div>

          {/* CANVAS DISPLAY AREA */}
          <div className="relative w-full max-w-[280px] h-[250px]">
            <canvas
              ref={canvasRef}
              width={280}
              height={250}
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.25)] rounded-2xl"
            />

            <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-bold text-cyan-300 bg-slate-950/85 px-2.5 py-1 rounded-xl border border-cyan-500/30 backdrop-blur-md uppercase tracking-wider shadow-lg">
              <span
                className={`w-2 h-2 rounded-full ${
                  currentPhase === 'PEAK SQUEEZE'
                    ? 'bg-amber-400 animate-ping'
                    : currentPhase === 'CONCENTRIC'
                    ? 'bg-cyan-400 animate-pulse'
                    : 'bg-slate-400'
                }`}
              />
              {currentPhase}
            </div>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {viewAngleLabels[viewAngle]}
            </div>
          </div>

          {/* BOTTOM REP SCRUBBER & TEMPO INDICATOR */}
          <div className="w-full mt-2 px-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-amber-400" /> Rep Tempo
              </span>
              <span className="text-cyan-400 font-bold">{(phaseProgress * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-75 ${
                  currentPhase === 'PEAK SQUEEZE'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}
                style={{ width: `${phaseProgress * 100}%` }}
              />
            </div>
          </div>
        </>
      )}

      {/* VIEW MODE 2: PUBLIC HD POSTURE BREAKDOWN CHART */}
      {viewMode === 'image' && postureImage && (
        <div className="relative w-full max-w-[280px] h-[310px] flex flex-col items-center justify-center p-1 rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden">
          <div className="relative w-full h-[260px] rounded-xl overflow-hidden group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
            <img
              src={postureImage}
              alt="Exercise Form Breakdown Chart"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs">
              <Maximize2 className="w-4 h-4 text-cyan-400" /> Click to Enlarge Chart
            </div>
          </div>
          <span className="mt-2 text-[10px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> HD Anatomical Form Breakdown Chart
          </span>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR HD POSTURE CHART */}
      {isLightboxOpen && postureImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fadeIn" onClick={() => setIsLightboxOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-2xl flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-bold text-white mb-3 font-['Outfit'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Technique & Posture Breakdown Guide
            </h4>
            <img
              src={postureImage}
              alt="Enlarged Posture Guide"
              className="w-full max-h-[78vh] object-contain rounded-2xl border border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};
