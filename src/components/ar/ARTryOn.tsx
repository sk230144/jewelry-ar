'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Camera, CameraOff, RotateCcw, Download, Info } from 'lucide-react';

interface Props {
  productName: string;
  category: string;
  onClose: () => void;
}

export default function ARTryOn({ productName, category, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');
  const [instructions, setInstructions] = useState(true);

  const getInstructionText = () => {
    switch (category) {
      case 'rings': return 'Hold your hand in front of the camera to preview the ring on your finger';
      case 'necklaces': return 'Position your neck/chest area in front of the camera';
      case 'bracelets': return 'Hold your wrist in front of the camera';
      case 'earrings': return 'Position your ear in front of the camera';
      default: return 'Position yourself in front of the camera';
    }
  };

  const drawAROverlay = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const t = Date.now() / 1000;
    const pulse = 0.7 + 0.3 * Math.sin(t * 2);

    ctx.save();
    ctx.strokeStyle = `rgba(201,168,76,${pulse})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);

    if (category === 'rings') {
      // Ring overlay on finger area
      const cx = w * 0.5, cy = h * 0.65;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 35, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Gem sparkle
      ctx.fillStyle = `rgba(201,168,76,${pulse * 0.8})`;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + t;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * 50, cy - 30 + Math.sin(a) * 10, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Ring glow
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60);
      grad.addColorStop(0, `rgba(201,168,76,${pulse * 0.15})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 60, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (category === 'necklaces') {
      // Necklace arc
      const cx = w * 0.5, startY = h * 0.2, dropY = h * 0.45;
      ctx.beginPath();
      ctx.moveTo(cx - 100, startY);
      ctx.quadraticCurveTo(cx, dropY, cx + 100, startY);
      ctx.stroke();
      // Pendant gem
      ctx.fillStyle = `rgba(100,150,255,${pulse * 0.8})`;
      ctx.beginPath();
      ctx.arc(cx, dropY - 5, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(201,168,76,${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (category === 'bracelets') {
      const cx = w * 0.5, cy = h * 0.7;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 50, 18, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Gems
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const gx = cx + Math.cos(a) * 50, gy = cy + Math.sin(a) * 18;
        ctx.fillStyle = i % 2 === 0 ? `rgba(50,200,120,${pulse})` : `rgba(255,255,255,${pulse})`;
        ctx.beginPath();
        ctx.arc(gx, gy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (category === 'earrings') {
      [-90, 90].forEach((xOffset) => {
        const ex = w * 0.5 + xOffset, ey = h * 0.3;
        ctx.beginPath();
        ctx.arc(ex, ey, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(ex, ey + 18);
        ctx.lineTo(ex, ey + 45);
        ctx.stroke();
        ctx.fillStyle = `rgba(232,213,255,${pulse})`;
        ctx.beginPath();
        ctx.arc(ex, ey + 52, 10, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Corner scan lines
    const corners = [[0.1, 0.1], [0.9, 0.1], [0.1, 0.9], [0.9, 0.9]];
    ctx.strokeStyle = `rgba(201,168,76,${pulse * 0.6})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    corners.forEach(([cx2, cy2]) => {
      const x = cx2 * w, y = cy2 * h;
      const len = 20;
      const sx = cx2 < 0.5 ? 1 : -1, sy = cy2 < 0.5 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + sx * len, y); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x, y + sy * len); ctx.stroke();
    });

    // Label
    ctx.restore();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.roundRect(w / 2 - 90, h - 60, 180, 32, 8);
    ctx.fill();
    ctx.fillStyle = '#C9A84C';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`AR Preview: ${productName}`, w / 2, h - 40);
  }, [category, productName]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setLoading(false);

        const animate = () => {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (!video || !canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          ctx.save();
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();
          drawAROverlay(ctx, canvas.width, canvas.height);
          animFrameRef.current = requestAnimationFrame(animate);
        };
        animate();
      }
    } catch (err) {
      console.error(err);
      setCameraError('Camera access denied. Please allow camera permission and try again.');
      setLoading(false);
    }
  }, [drawAROverlay]);

  useEffect(() => {
    startCamera();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCapturedImage(canvas.toDataURL('image/png'));
    setCapturing(true);
  };

  const downloadPhoto = () => {
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `luxear-try-on-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="ar-overlay flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur border-b border-white/10">
        <div>
          <h3 className="font-semibold text-white">AR Try-On</h3>
          <p className="text-xs text-gray-400">{productName}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setInstructions(!instructions)} className="p-2 text-gray-400 hover:text-white">
            <Info size={18} />
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Camera view */}
      <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
        <video ref={videoRef} className="hidden" playsInline muted />
        <canvas ref={canvasRef} className="w-full h-full object-contain" />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Starting camera...</p>
            </div>
          </div>
        )}

        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center max-w-sm px-6">
              <CameraOff size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-red-400 text-sm mb-4">{cameraError}</p>
              <button onClick={startCamera} className="btn-gold text-sm">
                <Camera size={16} /> Retry
              </button>
            </div>
          </div>
        )}

        {instructions && !loading && !cameraError && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black/70 backdrop-blur rounded-xl p-3 text-center">
              <p className="text-sm text-gray-300">{getInstructionText()}</p>
              <button onClick={() => setInstructions(false)} className="text-xs text-[#C9A84C] mt-1">Dismiss</button>
            </div>
          </div>
        )}
      </div>

      {/* Captured photo preview */}
      {capturing && capturedImage && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-10">
          <div className="text-center p-6 max-w-sm">
            <img src={capturedImage} alt="Captured" className="rounded-xl w-full mb-4 border border-white/10" />
            <div className="flex gap-3 justify-center">
              <button onClick={downloadPhoto} className="btn-gold text-sm">
                <Download size={16} /> Save Photo
              </button>
              <button onClick={() => setCapturing(false)} className="btn-outline-gold text-sm">
                <RotateCcw size={16} /> Retake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div className="p-6 bg-black/80 backdrop-blur border-t border-white/10 flex justify-center gap-6">
        <button
          onClick={capturePhoto}
          disabled={loading || !!cameraError}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40"
        >
          <Camera size={28} className="text-black" />
        </button>
      </div>
    </div>
  );
}
