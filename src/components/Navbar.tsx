// components/Navbar.tsx
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            Your Name
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link 
              href="/" 
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/analysis" 
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              Analysis
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar