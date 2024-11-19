'use client';

// components/Hero.tsx
import React from 'react';
import { Code, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundPattern from './BackgroundPattern';
import { usePattern } from '@/context/PatternContext';

const Hero = () => {
  const { triggerNeuralAnimation } = usePattern();

  return (
    <section className="relative min-h-[40vh] text-gray-900 dark:text-gray-100">
      <BackgroundPattern />
      <div className="relative max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <div className="space-y-4">
            <div className="flex items-center gap-6 mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 shadow-xl"
              >
                <Image
                  src="/images/BM Headshot.jpeg"
                  alt="Berto Mill headshot"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </motion.div>
              
              <div className="flex-1">
                <motion.h1 
                  key="title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white"
                >
                  AI Consultant & Developer
                </motion.h1>
                
                <motion.p 
                  key="subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2"
                >
                  Building magical experiences for clients through AI
                </motion.p>
              </div>
            </div>

            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-8 mt-8"
            >
              <h2 className="text-2xl font-semibold text-center mb-8">Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full"
                    >
                      <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Driven Market Insights</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Transforming complex market data into actionable business strategies
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full"
                    >
                      <Code className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">App Development</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Building modern, scalable applications with cutting-edge technology
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full"
                    >
                      <svg 
                        className="w-6 h-6 text-blue-600 dark:text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Business Strategy</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Developing innovative solutions to drive growth and efficiency
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/projects" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center block"
                  onMouseEnter={triggerNeuralAnimation}
                >
                  View Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="https://medium.com/@robertmill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-gray-800 dark:border-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center block"
                  onMouseEnter={triggerNeuralAnimation}
                >
                  Read Articles
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
