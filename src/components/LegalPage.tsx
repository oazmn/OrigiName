import Link from "next/link";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-8%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200 mb-8"
        >
          ← Zurück zum Spiel
        </Link>

        <div className="mb-8">
          <img src="/OrigiName/logo.svg" alt="Originame" className="w-12 h-12 rounded-xl mb-4 shadow-lg shadow-violet-500/30" />
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 prose prose-invert prose-sm max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2
          prose-h3:text-base prose-h3:mt-4 prose-h3:mb-1
          prose-p:text-gray-400 prose-p:leading-relaxed prose-p:my-2
          prose-ul:text-gray-400 prose-ul:my-2
          prose-li:my-0.5
          prose-a:text-violet-400 hover:prose-a:text-violet-300
          prose-strong:text-gray-200">
          {children}
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">
          Originame · A name geography game
        </p>
      </div>
    </div>
  );
}
