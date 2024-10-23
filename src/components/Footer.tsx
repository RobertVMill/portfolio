// components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center text-gray-600">
          © {new Date().getFullYear()} Robert Mill. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer