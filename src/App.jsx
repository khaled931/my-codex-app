import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const adjectives = [
  'Quantum',
  'Neural',
  'Hyper',
  'Stellar',
  'Aether',
  'Nano',
  'Luminous',
  'Sonic',
  'Omega',
  'Apex',
  'Prismatic',
  'Fusion',
  'Orbit',
  'Aurora',
  'Nova',
];

const techWords = [
  'Flux',
  'Matrix',
  'Forge',
  'Circuit',
  'Protocol',
  'Verse',
  'Dynamics',
  'OS',
  'Core',
  'Sphere',
  'Engine',
  'Lambda',
  'Pulse',
  'Beacon',
  'Fabric',
];

const suffixes = ['AI', 'Labs', 'Systems', 'Cloud', 'Works', 'Technologies', 'Analytics', 'Dynamics', 'Collective', 'Networks'];

const pickRandom = (collection) => collection[Math.floor(Math.random() * collection.length)];

const generateName = () => {
  const adjective = pickRandom(adjectives);
  const tech = pickRandom(techWords);
  const suffix = pickRandom(suffixes);
  const core = `${adjective}${tech}`;
  return `${core} ${suffix}`;
};

const gradients = [
  'from-slate-900 via-indigo-950 to-black',
  'from-gray-900 via-purple-950 to-slate-900',
  'from-blue-950 via-slate-900 to-black',
  'from-slate-900 via-cyan-900 to-slate-950',
];

export default function App() {
  const [name, setName] = useState(generateName);
  const [copied, setCopied] = useState(false);

  const gradient = useMemo(() => pickRandom(gradients), [name]);

  const handleGenerate = useCallback(() => {
    setName(generateName());
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard access failed:', error);
      setCopied(false);
    }
  }, [name]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} text-white transition-colors duration-700`}> 
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(244,114,182,0.1),_transparent_55%)]" />
      </div>
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16">
        <motion.div
          className="w-full rounded-3xl border border-white/10 bg-white/10 p-10 shadow-glow backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.p
            className="mb-3 text-sm uppercase tracking-[0.35em] text-white/70"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Futuristic Startup Name
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={name}
              className="mb-8 text-center text-4xl font-bold leading-tight text-white drop-shadow md:text-5xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {name}
            </motion.h1>
          </AnimatePresence>

          <p className="mx-auto mb-10 max-w-xl text-center text-base text-white/80 md:text-lg">
            Tap into a curated blend of cosmic adjectives, cutting-edge jargon, and sleek suffixes to inspire your next moonshot idea.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-pink px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-cyan-500/30 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              whileTap={{ scale: 0.97 }}
              onClick={handleGenerate}
            >
              <span>Generate Again</span>
              <motion.span
                className="inline-block text-lg"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              >
                ⚙️
              </motion.span>
            </motion.button>

            <motion.button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              whileTap={{ scale: 0.97 }}
              onClick={handleCopy}
            >
              <span>{copied ? 'Copied!' : 'Copy Name'}</span>
              <span aria-hidden>{copied ? '✅' : '📋'}</span>
            </motion.button>
          </div>
        </motion.div>
        <motion.footer
          className="mt-10 text-center text-xs text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Crafted for dreamers chasing the next frontier.
        </motion.footer>
      </main>
    </div>
  );
}
