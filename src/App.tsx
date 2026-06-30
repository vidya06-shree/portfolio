import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingScreen from './components/layout/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Achievements from './components/sections/Achievements';
import Languages from './components/sections/Languages';
import Contact from './components/sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-950 overflow-x-hidden">
        {/* Loading Screen */}
        <LoadingScreen isLoading={isLoading} />

        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-slate-950 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-950 to-slate-950 opacity-50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48Y2lyY2xlIGZpbGw9IiMyMDI0MmEiIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9zdmc+')] opacity-10" />
        </div>

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Skills />
              <Education />
              <Experience />
              <Projects />
              <Certifications />
              <Achievements />
              <Languages />
              <Contact />
            </motion.main>
          )}
        </AnimatePresence>

        {/* Footer */}
        {!isLoading && <Footer />}

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Custom Cursor (optional visual enhancement) */}
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <div className="absolute w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2 hidden md:block" id="cursor-glow" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
