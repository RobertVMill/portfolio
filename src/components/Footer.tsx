// components/Footer.tsx
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/RobertVMill",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/robertvmill/",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:bertmill19@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/projects" className="block text-gray-600 hover:text-blue-600">Projects</Link>
              <Link href="/analysis" className="block text-gray-600 hover:text-blue-600">Analysis</Link>
              <Link href="/contact" className="block text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-gray-600">
              Product Manager and Developer specializing in fintech innovation and banking solutions.
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© {currentYear} Robert Mill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;