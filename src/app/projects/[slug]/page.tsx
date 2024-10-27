// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import dynamic from 'next/dynamic';

// Dynamically import the BankWave dashboard with no SSR since it uses client-side features
const BankWaveDashboard = dynamic(
  () => import('../bankwave/page'),
  { ssr: false }
);

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  console.log('Generating static params for projects:', projects.map(p => p.slug));
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  console.log('Rendering project page for slug:', params.slug);
  const project = getProjectBySlug(params.slug);
  console.log('Found project:', project);

  if (!project) {
    notFound();
  }

  return (
    <article className={`py-20 ${params.slug === 'bankwave' ? 'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900' : ''}`}>
      <div className="max-w-5xl mx-auto px-4">
        <Link 
          href="/projects" 
          className={`inline-flex items-center ${
            params.slug === 'bankwave' 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-800'
          } transition-colors mb-8`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            params.slug === 'bankwave' ? 'text-white' : ''
          }`}>
            {project.title}
          </h1>
          <p className={`text-xl mb-6 ${
            params.slug === 'bankwave' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.longDescription || project.description}
          </p>
          
          <div className="flex gap-4">
            {project.links.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            )}
            {project.links.live && (
              <a 
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </a>
            )}
          </div>
        </div>

        {/* Render BankWave Dashboard if this is the bankwave project */}
        {params.slug === 'bankwave' && (
          <div className="mb-12">
            <BankWaveDashboard />
          </div>
        )}

        <section className="mb-12">
          <h2 className={`text-2xl font-semibold mb-4 ${
            params.slug === 'bankwave' ? 'text-white' : ''
          }`}>
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className={`px-3 py-1 rounded-full text-sm ${
                  params.slug === 'bankwave'
                    ? 'bg-slate-800 text-gray-300'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.features && (
          <section className="mb-12">
            <h2 className={`text-2xl font-semibold mb-4 ${
              params.slug === 'bankwave' ? 'text-white' : ''
            }`}>
              Key Features
            </h2>
            <ul className={`list-disc list-inside space-y-2 ${
              params.slug === 'bankwave' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {project.challenges && (
          <section className="mb-12">
            <h2 className={`text-2xl font-semibold mb-4 ${
              params.slug === 'bankwave' ? 'text-white' : ''
            }`}>
              Challenges & Solutions
            </h2>
            <ul className={`list-disc list-inside space-y-2 ${
              params.slug === 'bankwave' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </section>
        )}

        {project.outcomes && (
          <section className="mb-12">
            <h2 className={`text-2xl font-semibold mb-4 ${
              params.slug === 'bankwave' ? 'text-white' : ''
            }`}>
              Outcomes
            </h2>
            <ul className={`list-disc list-inside space-y-2 ${
              params.slug === 'bankwave' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}