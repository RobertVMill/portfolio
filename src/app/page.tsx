'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import MediumArticles from '@/components/MediumArticles';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePattern } from '@/context/PatternContext';

// Simple Section wrapper with basic animation
const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.8 }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { triggerNeuralAnimation } = usePattern();

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10" />
      
      {/* Main content */}
      <main className="relative z-10">
        <Section className="mt-24">
          <Hero />
        </Section>

        <Section>
          <div 
            className="py-20"
            onMouseEnter={triggerNeuralAnimation}
          >
            <Projects />
          </div>
        </Section>

        <Section>
          <div className="py-20">
            <MediumArticles />
          </div>
        </Section>
      </main>
    </div>
  );
}