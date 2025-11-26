import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative pt-20 pb-12 px-6 text-center z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <h1 className="relative text-6xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-500 tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        U-SPACE
      </h1>
      
      <p className="text-cyan-200/70 text-sm md:text-base font-medium tracking-[0.2em] uppercase max-w-md mx-auto">
        Discover the Unknown Universe
      </p>
      
      <div className="mt-8 flex justify-center">
        <div className="h-16 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent opacity-50"></div>
      </div>
    </header>
  );
};

export default Hero;
