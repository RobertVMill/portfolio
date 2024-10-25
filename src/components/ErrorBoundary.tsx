// components/ErrorBoundary.tsx
'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Props) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-semibold">Something went wrong!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {error.message || 'An unexpected error occurred. Please try again later.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}