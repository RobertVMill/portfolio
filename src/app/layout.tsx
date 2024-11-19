import '@/app/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PatternProvider } from '@/context/PatternContext'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  title: 'Robert Mill | Portfolio',
  description: 'Personal portfolio of Robert Mill - Developer and Product Manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PatternProvider>
            <Navbar />
            <main className="pt-16 flex-grow">
              {children}
            </main>
            <Footer />
          </PatternProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}