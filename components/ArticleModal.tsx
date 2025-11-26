import React, { useEffect, useState } from 'react';
import { NewsArticle } from '../types';
import { IconClose } from './Icons';

interface ArticleModalProps {
  article: NewsArticle;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // High res image for the modal
  const imageSeed = article.title.length + 55; 
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/1200/800`;

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400); // Matches transition duration
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 transition-all duration-500 ${isVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 backdrop-blur-none'}`}>
      
      {/* Dark Overlay with noise/grid */}
      <div 
        className="absolute inset-0 bg-slate-950/90 transition-opacity duration-500"
        onClick={handleClose}
      >
         <div className="absolute inset-0 opacity-20 holo-grid pointer-events-none"></div>
      </div>

      {/* Modal Window */}
      <div 
        className={`
          relative w-full md:max-w-5xl h-full md:h-[90vh] 
          bg-slate-900/80 border border-cyan-500/20 md:rounded-2xl 
          shadow-[0_0_50px_rgba(6,182,212,0.15)] 
          flex flex-col overflow-hidden 
          transform transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
          ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}
        `}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-50 hidden md:block"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-50 hidden md:block"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-50 hidden md:block"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-50 hidden md:block"></div>

        {/* Scanline Effect */}
        <div className="animate-scanline z-40 pointer-events-none"></div>

        {/* Close Button (Floating) */}
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 group bg-black/20 hover:bg-cyan-500/20 rounded-full border border-white/10 hover:border-cyan-400 transition-all duration-300"
        >
            <IconClose className="w-6 h-6 text-slate-400 group-hover:text-cyan-300 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content Container - Split View on Desktop */}
        <div className="flex flex-col lg:flex-row h-full">
            
            {/* Left/Top: Visuals & Header */}
            <div className="lg:w-2/5 relative h-64 lg:h-full shrink-0 group overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
                
                {/* ID Tag */}
                <div className="absolute top-6 left-6 font-mono text-[10px] text-cyan-500 tracking-[0.2em] border border-cyan-500/30 px-2 py-1 bg-black/40 backdrop-blur-sm">
                    ID: {article.id.slice(0, 8).toUpperCase()} // SECURE
                </div>
            </div>

            {/* Right/Bottom: Text Content */}
            <div className="flex-1 flex flex-col h-full bg-slate-950/50 backdrop-blur-md relative overflow-hidden">
                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-white/5 bg-slate-900/50 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-bold text-cyan-950 bg-cyan-500 rounded-sm font-orbitron tracking-wider">
                            {article.category}
                        </span>
                        <span className="text-cyan-500/50 text-xs font-mono">
                             // {article.date.replace(/\./g, ' :: ')}
                        </span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight font-feature-settings-palt tracking-tight mb-2">
                        {article.title}
                    </h2>
                    
                    {/* Impact Meter */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest">IMPACT SCORE</span>
                            <div className="flex gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`h-2 w-3 rounded-[1px] ${i < (article.impactScore / 10) ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-slate-800'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest">READ TIME</span>
                            <span className="text-sm text-cyan-200 font-mono">{article.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Text Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 lg:p-10">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl text-cyan-100/90 leading-relaxed font-light mb-8 p-4 border-l-4 border-cyan-500 bg-cyan-950/10 rounded-r-lg">
                            {article.summary}
                        </p>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="text-slate-300 space-y-6 leading-8 font-light tracking-wide whitespace-pre-wrap font-sans text-base md:text-lg opacity-90">
                                {article.content}
                            </div>
                        </div>

                        {/* Footer / CTA */}
                        <div className="mt-12 pt-8 border-t border-dashed border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex gap-4">
                                {article.sourceUrl && (
                                    <a 
                                        href={article.sourceUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="h-10 px-4 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-mono uppercase tracking-wider"
                                    >
                                        Source Data
                                        <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                )}
                            </div>
                            
                            <button 
                                onClick={handleClose}
                                className="px-8 py-3 bg-cyan-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 rounded font-orbitron text-sm tracking-widest uppercase"
                            >
                                Close Terminal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;