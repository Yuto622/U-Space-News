import React from 'react';
import { NewsArticle } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  index: number;
  onClick: (article: NewsArticle) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, onClick }) => {
  const imageSeed = article.title.length + index * 55; 
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/600/400`;

  return (
    <div 
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group cursor-pointer animate-fade-in-up flex flex-col h-full relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(article)}
    >
      {/* Selection Overlay Effect */}
      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 z-0 pointer-events-none" />

      <div className="relative h-48 overflow-hidden shrink-0 z-10">
        <img 
          src={imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
           <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
           <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-cyan-100 bg-slate-950/60 backdrop-blur-sm border border-cyan-500/30 rounded">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow z-10">
        <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-cyan-400/80 font-mono tracking-wide flex items-center gap-1">
              <span className="opacity-50">DATE:</span> {article.date}
            </span>
            <div className="flex items-center gap-1 bg-slate-800/50 px-2 py-0.5 rounded border border-white/5">
                <span className="text-[10px] text-slate-300 font-orbitron">{article.readTime}</span>
            </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2 font-feature-settings-palt">
          {article.title}
        </h3>
        
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4 group-hover:text-slate-300 transition-colors">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 w-3 skew-x-12 ${i < (article.impactScore / 20) ? 'bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'bg-slate-800'}`}
                  ></div>
              ))}
            </div>
            
            <div className="relative overflow-hidden group-hover:overflow-visible transition-all">
                <button className="text-[10px] font-bold text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded bg-cyan-950/30 group-hover:bg-cyan-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 uppercase tracking-widest flex items-center gap-2">
                    Access Data
                    {article.sourceUrl && <span className="w-1 h-1 bg-cyan-200 rounded-full animate-pulse" />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;