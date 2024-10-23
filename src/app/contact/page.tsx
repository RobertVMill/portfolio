// app/contact/page.tsx
import { Mail, Linkedin, Github } from 'lucide-react'

export default function Page() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>
        <p className="text-xl text-gray-600 mb-12">
  I&apos;m always open to discussing new opportunities in fintech, product management, or development projects.
</p>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <a 
            href="mailto:bertmill19@gmail.com" 
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">your@email.com</p>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/robertvmill/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">LinkedIn</h3>
              <p className="text-gray-600">Connect with me</p>
            </div>
          </a>

          <a 
            href="https://github.com/RobertVMill" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <Github className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">GitHub</h3>
              <p className="text-gray-600">Check out my code</p>
            </div>
          </a>
        </div>

        {/* Form section remains the same... */}
      </div>
    </section>
  )
}