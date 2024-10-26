// app/projects/page.tsx
import React from 'react';
import Link from 'next/link';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      slug: 'portfolio-website',
    },
    {
      title: 'Banking Dashboard',
      description: 'A comprehensive banking dashboard for monitoring financial metrics.',
      technologies: ['React', 'Node.js', 'D3.js', 'AWS'],
      slug: 'banking-dashboard',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Featured Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          A collection of my recent development work
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-block text-blue-600 dark:text-blue-300 hover:text-blue-800 transition-colors">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
