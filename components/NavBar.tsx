import React from 'react';
import { NewsCategory } from '../types';
import { IconRocket, IconPlanet, IconChip, IconFuture } from './Icons';

interface NavBarProps {
  activeCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: NewsCategory.ALL, label: 'すべて', icon: null },
    { id: NewsCategory.ROCKETS, label: 'ロケット', icon: IconRocket },
    { id: NewsCategory.ASTRONOMY, label: '天文学', icon: IconPlanet },
    { id: NewsCategory.TECH, label: '技術', icon: IconChip },
    { id: NewsCategory.FUTURE, label: '未来', icon: IconFuture },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-50">
      <div className="glass-panel rounded-full px-2 py-2 flex justify-between items-center shadow-2xl shadow-cyan-900/20">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative flex items-center justify-center px-4 py-3 rounded-full transition-all duration-500 ease-out group ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-white/10 rounded-full blur-sm" />
              )}
              {isActive && (
                <span className="absolute inset-0 border border-white/20 rounded-full" />
              )}
              
              <div className="flex flex-col items-center gap-1 z-10">
                {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-300' : ''}`} />}
                <span className={`text-xs font-medium tracking-wider ${isActive ? 'text-cyan-100' : ''}`}>
                  {cat.label}
                </span>
              </div>
              
              {/* Glow effect on active */}
              {isActive && (
                <div className="absolute -bottom-2 w-1/2 h-1 bg-cyan-400/50 blur-[8px] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
