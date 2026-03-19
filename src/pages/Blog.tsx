/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const Blog = () => {
  const { posts } = useBlog();
  
  return (
    <div className="pb-8 bg-white">
      <Helmet>
        <title>Blog & News Legal Tech | AvvocApp</title>
        <meta name="description" content="Resta aggiornato sulle ultime novità in ambito Legal Tech, Intelligenza Artificiale e innovazione per studi legali." />
        <meta property="og:title" content="Blog & News Legal Tech | AvvocApp" />
        <meta property="og:description" content="Approfondimenti su Legal Tech, Intelligenza Artificiale e il futuro della professione forense." />
        <meta name="twitter:title" content="Blog & News Legal Tech | AvvocApp" />
        <meta name="twitter:description" content="Tutte le novità dal mondo Legal Tech e IA." />
      </Helmet>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6"
            >
              Blog & News
            </motion.h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Approfondimenti su Legal Tech, Intelligenza Artificiale e il futuro della professione forense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#1e3a8a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Tag size={12} />
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1e3a8a] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm font-medium mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to="#" className="inline-flex items-center gap-2 text-[#1e3a8a] font-bold text-sm hover:gap-3 transition-all">
                      Leggi l'articolo <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
