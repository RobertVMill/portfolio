'use client';

// app/page.tsx
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import MediumArticles from '@/components/MediumArticles';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <MediumArticles />
    </>
  );
}