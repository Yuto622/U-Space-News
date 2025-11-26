import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import Loader from './components/Loader';
import ArticleModal from './components/ArticleModal';
import { fetchSpaceNews } from './services/geminiService';
import { NewsCategory, NewsArticle } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>(NewsCategory.ALL);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      setLoading(true);
      // Slight artificial delay for smooth transition feel if API is too fast/cached
      // and to let the loader animation play a bit
      const [data] = await Promise.all([
        fetchSpaceNews(activeCategory),
        new Promise(resolve => setTimeout(resolve, 800)) 
      ]);
      
      if (isMounted) {
        setArticles(data.articles);
        setLoading(false);
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <div className="min-h-screen pb-32 relative">
      {/* Dynamic background vignette */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Hero />

        <main className="px-4 md:px-8">
          
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8 max-w-6xl mx-auto border-b border-white/10 pb-4">
             <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-cyan-500 rounded-sm inline-block"></span>
                    LATEST NEWS
                </h2>
                <p className="text-slate-400 text-xs mt-1 ml-4 font-mono">
                   CATEGORY: <span className="text-cyan-300">{activeCategory}</span>
                </p>
             </div>
             <div className="hidden md:block text-right">
                <p className="text-[10px] text-slate-500 tracking-widest">
                    POWERED BY GEMINI 2.5
                </p>
             </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {articles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index} 
                  onClick={setSelectedArticle}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <NavBar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      {/* Modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
      
      {/* Decorative blurred background elements for atmosphere */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-20" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default App;