// app/layout.tsx
import '@/app/globals.css'
import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          {children}
        </main>
        <footer className="bg-gray-50 p-4 mt-20">
          <div className="max-w-5xl mx-auto">
            This footer appears on every page
          </div>
        </footer>
      </body>
    </html>
  )
}