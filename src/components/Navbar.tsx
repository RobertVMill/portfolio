'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href} 
        className={`text-gray-900 font-medium transition-colors ${
          isActive ? 'text-blue-600' : 'hover:text-blue-600'
        }`}
        onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            Robert Mill
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/analysis">Analysis</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation with Animation */}
        <div 
          className={`md:hidden fixed left-0 right-0 bg-white transition-all duration-300 ease-in-out transform ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{
            top: '64px', // height of the navbar
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/analysis">Analysis</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-25 transition-opacity"
            style={{ top: '64px' }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;