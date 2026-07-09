import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { Download, Folder } from 'lucide-react';
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
        size={0.028}
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
      <meshBasicMaterial color={color} transparent opacity={0.65} />
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
      <pointLight position={[10, 10, 10]} intensity={1.6} />
      <ParticleField />
      <AnimatedSphere />
      <GlowOrb position={[-3, 2, -3]} color="#22d3ee" scale={0.3} />
      <GlowOrb position={[4, -1, -2]} color="#3b82f6" scale={0.2} />
      <GlowOrb position={[-2, -2, 0]} color="#06b6d4" scale={0.15} />
    </Canvas>
  );
}
 
function FloatingCodeSymbols() {
 
  const symbols = [
    { text: "</>", x: "5%", y: "8%", size: "text-7xl", color: "text-cyan-400" },
    { text: "<>", x: "20%", y: "10%", size: "text-6xl", color: "text-blue-500" },
    { text: "{}", x: "38%", y: "12%", size: "text-6xl", color: "text-purple-400" },
    { text: "const", x: "55%", y: "8%", size: "text-5xl", color: "text-cyan-300" },
    { text: "React", x: "73%", y: "12%", size: "text-5xl", color: "text-cyan-400" },
    { text: "TypeScript", x: "88%", y: "16%", size: "text-4xl", color: "text-blue-400" },
 
    { text: "import", x: "3%", y: "35%", size: "text-5xl", color: "text-purple-500" },
    { text: "npm", x: "92%", y: "34%", size: "text-5xl", color: "text-cyan-400" },
 
    { text: "Node.js", x: "8%", y: "75%", size: "text-5xl", color: "text-cyan-400" },
    { text: "export", x: "23%", y: "88%", size: "text-5xl", color: "text-purple-500" },
    { text: "=>", x: "48%", y: "80%", size: "text-6xl", color: "text-cyan-300" },
    { text: "</>", x: "68%", y: "78%", size: "text-7xl", color: "text-cyan-400" },
    { text: "{...}", x: "88%", y: "84%", size: "text-6xl", color: "text-blue-500" },
 
    { text: "function()", x: "42%", y: "28%", size: "text-4xl", color: "text-cyan-400" },
    { text: "useState()", x: "80%", y: "55%", size: "text-4xl", color: "text-cyan-300" },
    { text: "Tailwind", x: "16%", y: "55%", size: "text-4xl", color: "text-purple-400" },
  ];
 
  return (
    <>
      {symbols.map((item, index) => (
        <motion.div
          key={index}
          className={`
            absolute
            ${item.size}
            ${item.color}
            font-black
            tracking-wide
            select-none
            pointer-events-none
            opacity-20
            blur-[0.3px]
            drop-shadow-[0_0_45px_rgba(34,211,238,0.9)]
          `}
          style={{
            left: item.x,
            top: item.y
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 10, -10, 0],
            rotate: [-8, 8, -8],
            opacity: [0.15, 0.9, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 12 + index,
            ease: "easeInOut"
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </>
  );
}
 
export default function Hero() {
  const typingText = useTypingEffect(typingTexts, 100, 50, 2000);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
 
  const springX = useSpring(mouseX, {
    stiffness: 90,
    damping: 18,
  });
 
  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 18,
  });
 
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 180);
      mouseY.set(e.clientY - 180);
    };
 
    window.addEventListener("mousemove", move);
 
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
 
  return (
    <motion.section
      id="home"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="pointer-events-none absolute z-0 h-[360px] w-[360px] rounded-full bg-cyan-400/15 blur-[140px]"
      />
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>
      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <FloatingCodeSymbols />
      </div>
 
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950 pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none z-[2]" />
 
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-[110px] animate-pulse z-[2]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/30 rounded-full blur-[110px] animate-pulse delay-1000 z-[2]" />
 
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            className="flex-1 w-full"
          >
            {/* Glass Card: heading, tagline, about, buttons */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-500/40
                bg-white/5
                backdrop-blur-xl
                shadow-[0_0_60px_rgba(34,211,238,0.3)]
                p-6
                sm:p-8
                lg:p-10
                text-center
                lg:text-left
                mb-8
              "
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-white"
              >
                <h2 className="text-3xl font-semibold text-white">
                  Hi, I'm
                </h2>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  <span
                    className="
                      block
                      text-6xl
                      lg:text-7xl
                      font-extrabold
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-400
                      to-purple-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Vidyashree K
                  </span>
                </span>
              </motion.h1>
 
              <motion.div
                variants={fadeInUp}
                className="text-xl sm:text-2xl md:text-3xl text-slate-300 mb-4 h-12"
              >
                <span className="text-slate-400">I'm a </span>
                <span className="text-cyan-400 font-medium">{typingText}</span>
                <span className="animate-blink text-cyan-400">|</span>
              </motion.div>
 
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4 text-lg"
              >
                <span className="text-cyan-400 font-semibold">
                  Frontend Developer
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">React</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">TypeScript</span>
              </motion.div>
 
              <div className="w-28 h-[2px] bg-cyan-400 rounded-full mt-5 mb-8" />
 
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
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.45)] transition-all duration-300"
                >
                  <Button
                    icon={<Download className="w-5 h-5" />}
                    onClick={() => window.open(personalInfo.resume, "_blank")}
                  >
                    Download CV
                  </Button>
                </motion.div>
 
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all duration-300"
                >
                  <Button
                    variant="ghost"
                    icon={<Folder className="w-5 h-5" />}
                    onClick={() =>
                      document.getElementById("projects")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
 
            {/* Terminal Panel: separate floating panel below the glass card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-900/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,.3)]"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
 
                <span className="text-cyan-400 text-sm font-mono">
                  developer@vidyashree ~
                </span>
 
                <div />
              </div>
 
              <pre className="p-5 text-green-400 font-mono text-sm overflow-x-auto leading-7">
                {`const developer = {
  name: 'Vidyashree K',
  role: 'Frontend Developer',
  skills: ['React', 'TypeScript', 'Tailwind CSS'],
  passion: 'Building beautiful web experiences',
  code: 'Clean • Responsive • User Focused'
};
 
console.log('Building the future, one line at a time.');
`}
              </pre>
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
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full border-[3px] border-cyan-400"
              />
 
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: "linear"
                }}
                className="absolute -inset-4 rounded-full border border-dashed border-cyan-400/30"
              />
 
              <motion.div
                animate={{ scale: [1, .96, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3
                }}
                className="absolute -inset-10 rounded-full bg-cyan-500/20 blur-3xl"
              />
              {/* Orbiting Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: 0,
                    height: 0,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    style={{
                      transform: `translateX(${145 + i * 8}px)`,
                    }}
                  />
                </motion.div>
              ))}
 
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
 
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 pointer-events-none" />
 
                {/* Glass Reflection */}
                <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl pointer-events-none" />
 
                {/* Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
 
      {/* Animated Wave Mesh */}
      <div className="absolute bottom-0 left-0 w-full h-48 sm:h-56 pointer-events-none overflow-hidden z-[3] backdrop-blur-md">
        {/* Glass wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.04] via-white/[0.02] to-transparent" />
 
        <svg
          className="animate-wave-reverse absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
          style={{ animationDelay: '-9s' }}
        >
          <path
            fill="rgba(59,130,246,0.22)"
            d="M0,190 C60,190 120,230 180,230 C240,230 300,190 360,190 C420,190 480,150 540,150 C600,150 660,190 720,190 C780,190 840,230 900,230 C960,230 1020,190 1080,190 C1140,190 1200,150 1260,150 C1320,150 1380,190 1440,190 C1500,190 1560,230 1620,230 C1680,230 1740,190 1800,190 C1860,190 1920,150 1980,150 C2040,150 2100,190 2160,190 C2220,190 2280,230 2340,230 C2400,230 2460,190 2520,190 C2580,190 2640,150 2700,150 C2760,150 2820,190 2880,190 L2880,320 L0,320 Z"
          />
        </svg>
 
        <svg
          className="animate-wave absolute bottom-0 w-[200%] h-full"
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(34,211,238,0.32)"
            d="M0,210 C60,210 120,170 180,170 C240,170 300,210 360,210 C420,210 480,250 540,250 C600,250 660,210 720,210 C780,210 840,170 900,170 C960,170 1020,210 1080,210 C1140,210 1200,250 1260,250 C1320,250 1380,210 1440,210 C1500,210 1560,170 1620,170 C1680,170 1740,210 1800,210 C1860,210 1920,250 1980,250 C2040,250 2100,210 2160,210 C2220,210 2280,170 2340,170 C2400,170 2460,210 2520,210 C2580,210 2640,250 2700,250 C2760,250 2820,210 2880,210 L2880,320 L0,320 Z"
          />
          {/* Glass rim highlight on top edge */}
          <path
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            d="M0,210 C60,210 120,170 180,170 C240,170 300,210 360,210 C420,210 480,250 540,250 C600,250 660,210 720,210 C780,210 840,170 900,170 C960,170 1020,210 1080,210 C1140,210 1200,250 1260,250 C1320,250 1380,210 1440,210 C1500,210 1560,170 1620,170 C1680,170 1740,210 1800,210 C1860,210 1920,250 1980,250 C2040,250 2100,210 2160,210 C2220,210 2280,170 2340,170 C2400,170 2460,210 2520,210 C2580,210 2640,250 2700,250 C2760,250 2820,210 2880,210"
          />
        </svg>
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