// components/Projects.tsx
import { Github, ExternalLink as ExternalLinkIcon } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of project",
      technologies: ["React", "TypeScript", "Tailwind"],
      github: "https://github.com/...",
      live: "https://..."
    },
    // ... other projects
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <div className="flex gap-3">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Github className="w-5 h-5" />
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
              {/* Rest of the component remains the same */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects