import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-indigo-900/8 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-500/30 mb-6 text-4xl ring-1 ring-white/10">
            🌍
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-3 tracking-tight">
            Heritage{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
            Explore the world of names — analyse your heritage or test your geographic knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/analyse" className="group block">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 h-full transition-all duration-300 group-hover:bg-white/8 group-hover:border-indigo-500/30 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 group-hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                🔍
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Heritage Analyser</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Enter your full name and uncover its cultural and geographic origins through an AI-powered deep analysis.
              </p>
              <div className="flex items-center text-indigo-400 text-sm font-semibold group-hover:text-indigo-300 transition-colors">
                Start Analysis
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </div>
            </div>
          </Link>

          <Link href="/game" className="group block">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 h-full transition-all duration-300 group-hover:bg-white/8 group-hover:border-violet-500/30 group-hover:shadow-2xl group-hover:shadow-violet-500/10 group-hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                🎮
              </div>
              <h2 className="text-xl font-bold text-white mb-2">NameGuessr</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A name from somewhere on Earth appears. Click the map to guess where it comes from and rack up points.
              </p>
              <div className="flex items-center text-violet-400 text-sm font-semibold group-hover:text-violet-300 transition-colors">
                Play Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          Powered by Claude AI · No data stored
        </p>
      </div>
    </div>
  );
}
