'use client';
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';

type Category = 'rings' | 'necklaces' | 'bracelets' | 'earrings';

function RingModel({ color, gemColor }: { color: string; gemColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });

  const metalColor = color === 'Rose Gold' ? '#C98070' : color === 'Yellow Gold' ? '#C9A84C' : '#E8E8E8';

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Ring band */}
        <mesh>
          <torusGeometry args={[1, 0.15, 32, 100]} />
          <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} envMapIntensity={2} />
        </mesh>
        {/* Gem setting */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.12, 6]} />
          <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Main gem */}
        <mesh position={[0, 1.32, 0]} rotation={[0, 0, Math.PI / 6]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshPhysicalMaterial
            color={gemColor}
            metalness={0}
            roughness={0}
            transmission={0.95}
            thickness={0.5}
            ior={2.4}
            reflectivity={1}
            envMapIntensity={3}
          />
        </mesh>
        {/* Pavé diamonds */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 1;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.2, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshPhysicalMaterial color="#FFFFFF" metalness={0} roughness={0} transmission={0.8} ior={2.4} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

function NecklaceModel({ color }: { color: string }) {
  const metalColor = color === 'Rose Gold' ? '#C98070' : color === 'Yellow Gold' ? '#C9A84C' : '#E8E8E8';
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Chain links */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 1.6 - Math.PI * 0.8;
          const r = 1.8;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.3 + 0.3, 0]} rotation={[Math.PI / 2, 0, angle]}>
              <torusGeometry args={[0.08, 0.025, 8, 16]} />
              <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
            </mesh>
          );
        })}
        {/* Pendant */}
        <mesh position={[0, -0.8, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshPhysicalMaterial color="#1E90FF" metalness={0} roughness={0} transmission={0.9} ior={1.8} thickness={0.4} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.25, 6]} />
          <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

function BraceletModel({ color }: { color: string }) {
  const metalColor = color === 'Rose Gold' ? '#C98070' : color === 'Yellow Gold' ? '#C9A84C' : '#E8E8E8';
  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.3}>
      <group rotation={[Math.PI / 6, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.2, 0.08, 16, 80]} />
          <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
        </mesh>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const colors = ['#50C878', '#FFFFFF', '#50C878', '#FFFFFF'];
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshPhysicalMaterial
                color={colors[i % colors.length]}
                metalness={0} roughness={0} transmission={0.85} ior={2.0}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

function EarringModel({ color }: { color: string }) {
  const metalColor = color === 'Rose Gold' ? '#C98070' : color === 'Yellow Gold' ? '#C9A84C' : '#E8E8E8';
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group>
        {[-0.6, 0.6].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 0.8, 0]}>
              <torusGeometry args={[0.2, 0.04, 12, 48]} />
              <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
              <meshStandardMaterial color={metalColor} metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshPhysicalMaterial color="#E8D5FF" metalness={0} roughness={0} transmission={0.8} ior={1.7} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function Model({ category, color, gemColor }: { category: Category; color: string; gemColor: string }) {
  switch (category) {
    case 'rings': return <RingModel color={color} gemColor={gemColor} />;
    case 'necklaces': return <NecklaceModel color={color} />;
    case 'bracelets': return <BraceletModel color={color} />;
    case 'earrings': return <EarringModel color={color} />;
    default: return <RingModel color={color} gemColor={gemColor} />;
  }
}

interface Props {
  category: Category;
  colors: string[];
  onARClick?: () => void;
}

const gemstoneColors: Record<string, string> = {
  Diamond: '#FFFFFF',
  Ruby: '#FF2244',
  Sapphire: '#1E4FCC',
  Emerald: '#2ECC71',
  Amethyst: '#9B59B6',
  Pearl: '#FFF5E1',
};

export default function JewelryViewer({ category, colors, onARClick }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || 'White Gold');
  const [zoom, setZoom] = useState(4);
  const controlsRef = useRef<{ reset: () => void }>(null);

  const gemColor = gemstoneColors['Diamond'];

  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border border-white/10">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, zoom], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={0.5} intensity={2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#C9A84C" />
        <Sparkles count={50} scale={5} size={1.5} speed={0.3} color="#C9A84C" opacity={0.15} />

        <Suspense fallback={null}>
          <Model category={category} color={selectedColor} gemColor={gemColor} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={8} blur={2} />
        </Suspense>

        <OrbitControls
          ref={controlsRef as React.RefObject<any>}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        {/* Color picker */}
        <div className="flex gap-2">
          {colors.map((c) => {
            const bg = c === 'Rose Gold' ? '#C98070' : c === 'Yellow Gold' ? '#C9A84C' : c === 'White Gold' ? '#E8E8E8' : '#888';
            return (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className="w-7 h-7 rounded-full border-2 transition-all"
                style={{
                  background: bg,
                  borderColor: selectedColor === c ? '#fff' : 'transparent',
                  transform: selectedColor === c ? 'scale(1.15)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>

        {/* Zoom + AR buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(8, z + 1))}
            className="w-8 h-8 card-glass flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(2, z - 1))}
            className="w-8 h-8 card-glass flex items-center justify-center text-gray-400 hover:text-white"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => controlsRef.current?.reset()}
            className="w-8 h-8 card-glass flex items-center justify-center text-gray-400 hover:text-white"
          >
            <RotateCcw size={14} />
          </button>
          {onARClick && (
            <button onClick={onARClick} className="btn-gold text-xs py-1.5 px-3 ml-1">
              Try AR
            </button>
          )}
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-3">
        <span className="text-xs text-gray-500 bg-black/50 px-2 py-1 rounded-full">3D · Drag to rotate</span>
      </div>
    </div>
  );
}
