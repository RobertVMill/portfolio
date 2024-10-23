// app/projects/page.tsx
import { GithubIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react'

export default function Page() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features responsive design and modern UI components.",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      github: "https://github.com/RobertVMill/portfolio",
      live: "https://your-portfolio-url.vercel.app"
    },
    // Add another project - we can update these with your real projects
    {
      title: "Project 2",
      description: "Brief description of another significant project you've worked on.",
      technologies: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/...",
      live: "https://..."
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Featured Projects</h1>
        <p className="text-xl text-gray-600 mb-12">
          A collection of my recent development work
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <div className="flex gap-3">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}