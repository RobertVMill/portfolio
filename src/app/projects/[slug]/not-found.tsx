// app/projects/[slug]/not-found.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Project Not Found</h2>
          <p className="text-gray-600 text-lg">
            Sorry, the project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}