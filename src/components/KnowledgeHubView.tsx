import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowRight, X, BookOpen } from 'lucide-react';
import { KNOWLEDGE_ARTICLES, FAQS, Article } from '../data/articles.ts';

export const KnowledgeHubView: React.FC = () => {
  const [articleQuery, setArticleQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // FAQ search & open state
  const [faqQuery, setFaqQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_ARTICLES.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(articleQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(articleQuery.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(articleQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || a.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [articleQuery, selectedCategory]);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(f =>
      f.question.toLowerCase().includes(faqQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(faqQuery.toLowerCase())
    );
  }, [faqQuery]);

  return (
    <div className="relative isolate min-h-screen text-[#d5dbe3]">
      {/* Fixed Coral Reef Background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(2, 10, 24, 0.12) 0%,
              rgba(2, 10, 26, 0.28) 45%,
              rgba(2, 8, 22, 0.46) 100%
            ),
            url('${import.meta.env.BASE_URL}assets/aistudio/image_69840b06.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16 pb-32">
        {/* Editorial Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/15 pb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-400/40 inline-flex items-center gap-2 shadow-md">
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            <span>Scholarly Research & Inquiries</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] [text-shadow:_0_3px_14px_rgba(0,0,0,0.85)]">
            Knowledge Library
          </h1>
          <p className="text-base text-white/95 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-2xl">
            Deep dives into Betta anatomy, genetics, and ecology, dismantling retail myths through peer-reviewed freshwater teleost literature.
          </p>
        </div>

        {/* Articles Search & Filter */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pb-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-1/2 -translate-y-1/2 drop-shadow" />
              <input
                type="text"
                value={articleQuery}
                onChange={(e) => setArticleQuery(e.target.value)}
                placeholder="Search articles, topics, or authors..."
                className="w-full pl-10 pr-4 py-2.5 bg-black/35 hover:bg-black/45 focus:bg-black/55 backdrop-blur-md border border-white/20 focus:border-cyan-400/60 rounded-xl text-sm text-white placeholder-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {['all', 'myth busting', 'anatomy', 'botanicals', 'behavior'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`capitalize px-3.5 py-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
                    selectedCategory === cat
                      ? 'bg-cyan-900/70 text-cyan-200 border-cyan-400/50 shadow-md font-medium'
                      : 'bg-black/30 text-slate-200 border-white/15 hover:border-white/30 hover:bg-black/45 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Papers' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="p-7 sm:p-8 rounded-2xl bg-black/35 hover:bg-black/50 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer group space-y-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.18)] hover:-translate-y-0.5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300/90 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    <span className="uppercase tracking-wider">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-cyan-200 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                    {article.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1.5 text-xs shadow-inner">
                    <span className="font-mono uppercase tracking-wider text-cyan-300 font-semibold block">Core Finding:</span>
                    <p className="text-slate-100 font-normal leading-relaxed">{article.keyTakeaways[0]}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">By {article.author}</span>
                  <span className="font-semibold text-cyan-300 group-hover:text-cyan-200 group-hover:translate-x-1 transition-all flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordions */}
        <section className="border-t border-white/15 pt-14 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/30 inline-block shadow-sm">
                Inquiries & Answers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-1/2 -translate-y-1/2 drop-shadow" />
              <input
                type="text"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder="Filter questions..."
                className="w-full pl-10 pr-3.5 py-2 bg-black/35 hover:bg-black/45 focus:bg-black/55 backdrop-blur-md border border-white/20 focus:border-cyan-400/60 rounded-xl text-xs text-white placeholder-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-black/35 hover:bg-black/45 backdrop-blur-xl border border-white/15 transition-all p-5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                      <span className="text-xs font-mono text-cyan-300 font-medium shrink-0 uppercase tracking-wider">
                        {faq.category}
                      </span>
                      <span className="font-serif text-lg sm:text-xl text-white group-hover:text-cyan-200 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-300 shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-cyan-300 shrink-0 mt-1 transition-colors" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="pt-3.5 mt-3 border-t border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pl-0 sm:pl-4 animate-in fade-in duration-150 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
            <div className="relative w-full max-w-3xl bg-slate-950/85 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
              <div className="p-6 sm:p-8 border-b border-white/15 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-medium">
                    {activeArticle.category} · {activeArticle.readTime}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {activeArticle.title}
                  </h2>
                  <div className="text-xs text-slate-300 pt-1">
                    By {activeArticle.author} · <span className="italic text-slate-200">{activeArticle.credentials}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="p-5 rounded-xl bg-cyan-950/50 backdrop-blur-md border border-cyan-500/30 space-y-2 shadow-inner">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-300 font-semibold">Core Takeaways</h3>
                  <ul className="space-y-1.5 text-xs text-cyan-100 list-disc list-inside leading-relaxed">
                    {activeArticle.keyTakeaways.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 text-sm text-slate-200 leading-relaxed font-normal">
                  {activeArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                  {activeArticle.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-cyan-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-white/15 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-cyan-900/70 hover:bg-cyan-800/80 border border-cyan-400/40 rounded-xl cursor-pointer transition-all shadow-md backdrop-blur-md"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
