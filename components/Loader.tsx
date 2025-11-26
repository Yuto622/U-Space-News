import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative w-24 h-24">
        {/* Orbital rings */}
        <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-2 border-2 border-purple-500/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
        
        {/* Planet core */}
        <div className="absolute inset-8 bg-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] animate-pulse" />
      </div>
      <p className="mt-8 text-cyan-200/80 font-mono text-xs tracking-[0.2em] animate-pulse">
        SEARCHING COSMOS...
      </p>
    </div>
  );
};

export default Loader;
