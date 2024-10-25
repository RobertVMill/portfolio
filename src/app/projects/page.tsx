// app/projects/page.tsx
import { GithubIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export default function Page() {
  const projects = getAllProjects();

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Featured Projects</h1>
        <p className="text-xl text-gray-600 mb-12">
          A collection of my recent development work
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <Link 
                  href={project.slug === 'banking-dashboard' ? '/bankwave' : `/projects/${project.slug}`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <div className="flex gap-3">
                  {project.links.github && (
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {project.links.live && (
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link 
                href={project.slug === 'banking-dashboard' ? '/bankwave' : `/projects/${project.slug}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition-colors"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}