import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Floating Hearts Animation */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              top: `${Math.random() * 100}%`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-rose-700 mb-6">
          AI Love Triangle Predictor 💘
        </h1>
        <p className="text-lg md:text-xl text-rose-800 mb-8 font-medium">
          Enter three people, their feelings and personalities… and let AI guess
          who’s meant to be 💍
        </p>
        <Link
          href="/predict"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Try It Now 💑
        </Link>
      </div>
    </div>
  );
}
