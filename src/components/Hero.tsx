import React from 'react';
import { Code, TrendingUp } from 'lucide-react';
import Link from 'next/link'; // Add this for routing

// Create a reusable button component
const Button = ({ 
  variant = 'primary', 
  children, 
  href 
}: { 
  variant?: 'primary' | 'secondary', 
  children: React.ReactNode,
  href: string 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg transition-all duration-300 font-medium";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg",
    secondary: "border border-gray-300 hover:border-gray-400 hover:shadow-md"
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </Link>
  );
};

// Create a reusable card component
const ExpertiseCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType,
  title: string,
  description: string
}) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]">
    <div className="flex items-center space-x-4 mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Hero = () => {
  const expertiseData = [
    {
      icon: Code,
      title: "Technical Expertise",
      description: "Building robust applications and tools that drive business value through code."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Deep understanding of fintech trends and market dynamics in banking."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fade-in">
            Product Manager & Developer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600">
            Driving fintech innovation at CIBC
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {expertiseData.map((data, index) => (
              <ExpertiseCard key={index} {...data} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button href="/projects">View Projects</Button>
            <Button variant="secondary" href="/analysis">Market Analysis</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;