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

  const startCamera = useCallback(() => {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
    }).then((stream) => {
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      const animate = () => {
        const v = videoRef.current;
        const canvas = canvasRef.current;
        if (!v || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = v.videoWidth || 640;
        canvas.height = v.videoHeight || 480;
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        drawAROverlay(ctx, canvas.width, canvas.height);
        animFrameRef.current = requestAnimationFrame(animate);
      };

      // Wait for metadata before playing — prevents AbortError
      video.onloadedmetadata = () => {
        video.play().then(() => {
          setLoading(false);
          animate();
        }).catch((err) => {
          console.error('play() failed:', err);
          setCameraError('Could not start camera preview. Please try again.');
          setLoading(false);
        });
      };
    }).catch((err) => {
      console.error(err);
      setCameraError('Camera access denied. Please allow camera permission and try again.');
      setLoading(false);
    });
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
    <div className="ar-overlay" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <div>
          <h3 style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>AR Try-On</h3>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{productName}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button onClick={() => setInstructions(!instructions)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
            <Info size={18} />
          </button>
          <button onClick={onClose} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Camera view */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />

        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '3rem', height: '3rem', border: '2px solid #C9A84C', borderTopColor: 'transparent', borderRadius: '9999px', margin: '0 auto 0.75rem', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Starting camera…</p>
            </div>
          </div>
        )}

        {cameraError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', maxWidth: '22rem', padding: '0 1.5rem' }}>
              <CameraOff size={48} color="#374151" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: '#F87171', fontSize: '0.85rem', marginBottom: '1rem' }}>{cameraError}</p>
              <button onClick={startCamera} className="btn-gold" style={{ fontSize: '0.85rem' }}>
                <Camera size={16} /> Retry
              </button>
            </div>
          </div>
        )}

        {instructions && !loading && !cameraError && (
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', borderRadius: '0.75rem', padding: '0.75rem 1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.82rem', color: '#D1D5DB' }}>{getInstructionText()}</p>
              <button onClick={() => setInstructions(false)} style={{ fontSize: '0.72rem', color: '#C9A84C', marginTop: '0.35rem', background: 'none', border: 'none', cursor: 'pointer' }}>Dismiss</button>
            </div>
          </div>
        )}
      </div>

      {/* Captured photo preview */}
      {capturing && capturedImage && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', maxWidth: '22rem', width: '100%' }}>
            <img src={capturedImage} alt="Captured" style={{ borderRadius: '0.75rem', width: '100%', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={downloadPhoto} className="btn-gold" style={{ fontSize: '0.85rem' }}>
                <Download size={16} /> Save Photo
              </button>
              <button onClick={() => setCapturing(false)} className="btn-outline-gold" style={{ fontSize: '0.85rem' }}>
                <RotateCcw size={16} /> Retake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexShrink: 0 }}>
        <button
          onClick={capturePhoto}
          disabled={loading || !!cameraError}
          style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'background 0.2s', opacity: (loading || !!cameraError) ? 0.4 : 1 }}
        >
          <Camera size={26} color="#000" />
        </button>
      </div>
    </div>
  );
}
