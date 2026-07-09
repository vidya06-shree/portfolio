import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import animeGirl from "../../assets/anime_girl.png";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let value = 0;

    const interval = window.setInterval(() => {
      value += 1;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setVisible(false);

          setTimeout(() => {
            onComplete?.();
          }, 600);
        }, 400);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  const circumference = useMemo(() => 2 * Math.PI * 70, []);
  const dashOffset = circumference - (progress / 100) * circumference;

  const letters = "VIDYASHREE".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#020817]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]"
              animate={{
                x: [0, 80, 0],
                y: [0, 60, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[170px]"
              animate={{
                x: [0, -70, 0],
                y: [0, -60, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          {/* Main */}
          <div className="relative flex h-full w-full flex-col items-center justify-center px-5 py-10 lg:flex-row lg:justify-between lg:px-16 xl:px-24">
            {/* Left */}
            <div className="flex w-full max-w-xl flex-col items-center lg:items-start">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="relative"
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.95, 1.15, 0.95],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                />

                <svg
                  className="relative h-44 w-44 sm:h-52 sm:w-52"
                  viewBox="0 0 180 180"
                >
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                    fill="transparent"
                  />

                  <motion.circle
                    cx="90"
                    cy="90"
                    r="70"
                    fill="transparent"
                    stroke="#38bdf8"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{
                      filter: "drop-shadow(0px 0px 12px #38bdf8)",
                      rotate: "-90deg",
                      transformOrigin: "50% 50%",
                    }}
                    animate={{
                      strokeDashoffset: dashOffset,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-4xl font-bold text-cyan-300 sm:text-5xl"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                    }}
                  >
                    {progress}%
                  </motion.span>
                </div>
              </motion.div>

              <motion.h2
                className="mt-8 text-xl font-semibold tracking-[0.45em] text-cyan-300 sm:text-2xl"
                animate={{
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                }}
              >
                LOADING...
              </motion.h2>

              <div className="mt-7 w-full max-w-md">
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_25px_#38bdf8]"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-1 lg:justify-start">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-xl font-bold tracking-wider text-cyan-200 sm:text-2xl md:text-3xl"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      y: [0, -5, 0],
                      textShadow: [
                        "0 0 8px #38bdf8",
                        "0 0 18px #67e8f9",
                        "0 0 8px #38bdf8",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      delay: index * 0.08,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="mt-12 flex w-full items-center justify-center lg:mt-0 lg:w-auto">
              <motion.div
                className="relative"
                animate={{
                  y: [0, -18, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[90px] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
                  animate={{
                    opacity: [0.45, 0.95, 0.45],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                  }}
                />

                <motion.img
                  src={animeGirl}
                  alt="Anime Girl"
                  className="relative z-10 h-64 w-auto object-contain sm:h-80 md:h-[24rem] lg:h-[30rem] xl:h-[36rem] 2xl:h-[42rem] max-w-full"
                  animate={{
                    filter: [
                      "drop-shadow(0px 0px 12px rgba(56,189,248,0.45))",
                      "drop-shadow(0px 0px 30px rgba(56,189,248,0.95))",
                      "drop-shadow(0px 0px 12px rgba(56,189,248,0.45))",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingScreen;