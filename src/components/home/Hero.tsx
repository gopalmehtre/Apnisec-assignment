import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-20 overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Secure Your Digital Future with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600">
            ApniSec
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8">
          Enterprise-grade cybersecurity solutions to protect your business from
          evolving threats.
          <br />
          <span className="font-semibold">Trust the experts.</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            href="/register"
            className="px-8 py-3 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:bg-purple-100 transition"
          >
            Get Started Free
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition"
          >
            Learn More
          </Link>
        </div>
        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-extrabold">1000+</div>
            <div className="text-sm text-gray-200">Clients Protected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold">99.9%</div>
            <div className="text-sm text-gray-200">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold">24/7</div>
            <div className="text-sm text-gray-200">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}