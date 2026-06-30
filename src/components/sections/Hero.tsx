import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Download, Send, Folder } from 'lucide-react';
import { personalInfo, typingTexts } from '../../data/portfolioData';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../animations/variants';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function AnimatedSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[1.5, 64, 64]} position={[3, 0, -2]}>
        <meshStandardMaterial
          color="#0891b2"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function GlowOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleField />
      <AnimatedSphere />
      <GlowOrb position={[-3, 2, -3]} color="#22d3ee" scale={0.3} />
      <GlowOrb position={[4, -1, -2]} color="#3b82f6" scale={0.2} />
      <GlowOrb position={[-2, -2, 0]} color="#06b6d4" scale={0.15} />
    </Canvas>
  );
}

export default function Hero() {
  const typingText = useTypingEffect(typingTexts, 100, 50, 2000);

  return (
    <motion.section
      id="home"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <ThreeScene />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60 pointer-events-none" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          < motion.div
            variants={staggerContainer}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-white"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-8 h-12"
            >
              <span className="text-slate-400">I'm a </span>
              <span className="text-cyan-400 font-medium">{typingText}</span>
              <span className="animate-blink text-cyan-400">|</span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {personalInfo.about.slice(0, 150)}...
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button
                variant="primary"
                icon={<Download className="w-5 h-5" />}
                onClick={() => window.open(personalInfo.resume, '_blank')}
              >
                Download Resume
              </Button>

              <Button
                variant="outline"
                icon={<Send className="w-5 h-5" />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Me
              </Button>

              <Button
                variant="ghost"
                icon={<Folder className="w-5 h-5" />}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-transparent to-blue-500/30 blur-xl"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-cyan-500/20"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-blue-500/20"
              />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 pointer-events-none" />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -left-8 top-1/4 px-4 py-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-cyan-500/30 shadow-lg"
              >
                <span className="text-cyan-400 font-medium">React.js</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-8 top-1/3 px-4 py-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-blue-500/30 shadow-lg"
              >
                <span className="text-blue-400 font-medium">Node.js</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-cyan-500/30 shadow-lg"
              >
                <span className="text-cyan-400 font-medium">MongoDB</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-sm">Scroll down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-cyan-500 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
