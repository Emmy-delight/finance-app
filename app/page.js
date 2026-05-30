import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      <section className="flex-grow flex items-center justify-center px-6 py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
         
          {/* { <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Smart Money Management
          </div> } */}

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Take the stress out <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              of your money.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base md:text-xl text-gray-600 leading-relaxed">
            Track spending, set effortless budgets, and grow your savings—all in one secure, beautifully simple app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5">
              Get Started for Free
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
              Watch 1-Min Demo
            </button>
          </div>

          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest pt-8">
            Trusted by over 500,000+ people optimizing their wealth
          </p>

        </div>
      </section>

      
    </main>
  );
}