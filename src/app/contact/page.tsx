'use client'; // Ensure this is a client-side component

import { Linkedin, Github } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://formspree.io/f/mpwzwnae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
        }),
      });
  
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ email: '', message: '' }); // Clear the form after submission
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      // Option 1: Log the error for debugging
      console.error(err); // Log the error
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Get In Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          I&apos;m always open to discussing new opportunities in fintech, product management, or development projects.
        </p>

        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full p-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                className="mt-1 block w-full p-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        ) : (
          <p className="text-lg font-semibold text-green-500">Thank you for your message! I will get back to you soon.</p>
        )}

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <a 
            href="https://www.linkedin.com/in/robertvmill/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with me</p>
            </div>
          </a>

          <a 
            href="https://github.com/RobertVMill" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <Github className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-400">Check out my code</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
