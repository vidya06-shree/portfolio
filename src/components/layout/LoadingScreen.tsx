import animeGirl from "../../assets/anime_girl.png";

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({
  isLoading,
}: LoadingScreenProps) {

  const progress = useMotionValue(0);

  useEffect(() => {
    if (!isLoading) return;

    const controls = animate(progress, 100, {
  duration: 4,
  ease: "easeInOut",
  onUpdate(value) {
    setPercentage(Math.round(value));
  },});

    return controls.stop;
  }, [isLoading]);

  const [percentage, setPercentage] = useState(0);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isLoading ? 1 : 0,
      }}
      transition={{
        duration: 0.6,
      }}
      style={{
        pointerEvents: isLoading ? "auto" : "none",
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#040816] flex items-center justify-center"
    >

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute
          -left-36
          top-1/2
          -translate-y-1/2
          w-[520px]
          h-[520px]
          rounded-full
          bg-cyan-500
          blur-[180px]"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute
          right-[-180px]
          bottom-[-120px]
          w-[480px]
          h-[480px]
          rounded-full
          bg-blue-600
          blur-[180px]"
        />

      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24 px-6">
        
        {/* LEFT SIDE */}

        <div className="flex flex-col items-center">

          {/* Circular Loader */}

          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[320px] lg:h-[320px]">

            <svg
              width="320"
              height="320"
              className="-rotate-90"
            >

              <defs>

                <linearGradient
                  id="ringGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#3EF5FF"
                  />

                  <stop
                    offset="50%"
                    stopColor="#22D3EE"
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                  />

                </linearGradient>

                <filter id="ringGlow">

                  <feGaussianBlur
                    stdDeviation="8"
                    result="blur"
                  />

                  <feMerge>

                    <feMergeNode in="blur" />

                    <feMergeNode in="SourceGraphic" />

                  </feMerge>

                </filter>

              </defs>

              {/* Track */}

              <circle
                cx="160"
                cy="160"
                r={radius}
                fill="none"
                stroke="#16324C"
                strokeWidth="8"
              />

              {/* Progress */}

              <motion.circle
                cx="160"
                cy="160"
                r={radius}
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#ringGlow)"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: useTransform(
                    progress,
                    (value) =>
                      circumference -
                      (value / 100) * circumference
                  ),
                }}
              />

            </svg>

            {/* Rotating Dot */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >

              <div
                className="
                absolute
                left-1/2
                top-[35px]
                -translate-x-1/2
                w-5
                h-5
                rounded-full
                bg-cyan-200
                shadow-[0_0_25px_#22d3ee]"
              />

            </motion.div>

            {/* Center */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Percentage */}
              <motion.h1
                className="
                text-[78px]
                font-light
                leading-none
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent"
              >
                {percentage}
                <span className="text-4xl align-top ml-1">%</span>
              </motion.h1>

              {/* Loading Text */}
              <motion.p
                animate={{
                  opacity: [0.4, 1, 0.4],
                  letterSpacing: ["0.35em", "0.45em", "0.35em"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-4 text-cyan-300 text-lg font-medium"
              >
                LOADING...
              </motion.p>

            </div>


          </div>

          {/* ===========================
              NAME
          =========================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
            className="mt-8 flex"
          >

            {"VIDYASHREE".split("").map((letter, index) => (

              <motion.span
                key={index}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  y: [0, -4, 0],
                  textShadow: [
                    "0 0 5px #22d3ee",
                    "0 0 20px #38bdf8",
                    "0 0 5px #22d3ee",
                  ],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.08,
                  repeat: Infinity,
                }}
                className="
                mx-[2px]
                text-[48px]
                font-semibold
                tracking-[0.22em]
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent
                select-none"
              >
                {letter}
              </motion.span>

            ))}

          </motion.div>

          {/* ===========================
              LOADING BAR
          =========================== */}

          <div className="relative mt-10 w-[420px] h-[4px] rounded-full overflow-hidden">

            {/* Track */}
            <div className="absolute inset-0 bg-[#18344E]" />

            {/* Gradient */}
            <div
              className="
              absolute
              inset-0
              bg-gradient-to-r
              from-cyan-400
              via-sky-400
              to-blue-600"
            />

            {/* Glow */}
            <motion.div
              animate={{
                x: [-80, 420],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
              absolute
              top-1/2
              -translate-y-1/2
              w-20
              h-7
              rounded-full
              bg-cyan-300
              blur-xl"
            />

            {/* Dot */}
            <motion.div
              animate={{
                x: [-8, 420],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
              absolute
              top-1/2
              -translate-y-1/2
              w-3
              h-3
              rounded-full
              bg-white
              shadow-[0_0_20px_#22d3ee]"
            />

          </div>

        </div>
                {/* ===========================
            RIGHT SIDE - ANIME GIRL
        =========================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: {
              duration: 0.8,
              delay: 0.4,
            },
            x: {
              duration: 0.8,
              delay: 0.4,
            },
            scale: {
              duration: 0.8,
              delay: 0.4,
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative flex items-center justify-center"
        >

          {/* Main Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.18, 0.4, 0.18],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              w-[430px]
              h-[430px]
              rounded-full
              bg-cyan-400
              blur-[140px]"
          />

          {/* Secondary Glow */}

          <motion.div
            animate={{
              scale: [1.15, 1, 1.15],
              opacity: [0.15, 0.28, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              w-[320px]
              h-[320px]
              rounded-full
              bg-blue-600
              blur-[120px]"
          />

          {/* Anime Girl */}

          <motion.img
            src={animeGirl}
            alt="Anime Girl"
            draggable={false}
            animate={{
              y: [0, -12, 0],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              relative
              z-20
              w-[180px] sm:w-[240px] md:w-[320px] lg:w-[420px] xl:w-[480px]
              select-none
              drop-shadow-[0_0_45px_rgba(34,211,238,0.55)]"
          />

          {/* Floating Circles */}

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-300"
              style={{
                width: `${5 + Math.random() * 6}px`,
                height: `${5 + Math.random() * 6}px`,
                left: `${15 + Math.random() * 70}%`,
                top: `${10 + Math.random() * 75}%`,
                boxShadow: "0 0 18px #22d3ee",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}

        </motion.div>

        {/* ===========================
            BACKGROUND PARTICLES
        =========================== */}

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-cyan-300"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.15, 0.8, 0.15],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
              </div>

    </motion.div>
  );
}