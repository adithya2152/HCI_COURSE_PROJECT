import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Trophy, Star, BookOpen, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LearningPathCard from '../../components/features/LearningPathCard';
import { useLoadingState } from '../../hooks/useLoadingState';
import { motion } from 'framer-motion';

// Home page implementing multiple UX/HCI principles
const Home: React.FC = () => {
  const { startLoading, finishLoading } = useLoadingState();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate page loading - visibility of system status
  useEffect(() => {
    startLoading();
    
    // Simulate content loading
    const timer = setTimeout(() => {
      finishLoading();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [startLoading, finishLoading]);

  // Featured learning paths
  const featuredPaths = [
    {
      id: '1',
      title: 'Data Science Fundamentals',
      description: 'Master the core concepts of data analysis, statistics, and machine learning to start your data science journey.',
      duration: '3 months',
      level: 'Beginner' as const,
      courseCount: 8,
      imageSrc: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      title: 'UX/UI Design Immersive',
      description: 'Learn user-centered design processes, wireframing, prototyping, and usability testing to create engaging experiences.',
      duration: '4 months',
      level: 'Intermediate' as const,
      courseCount: 12,
      imageSrc: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      title: 'Full-Stack Web Development',
      description: 'Build dynamic web applications with modern frameworks, covering both frontend and backend development.',
      duration: '6 months',
      level: 'Intermediate' as const,
      courseCount: 15,
      imageSrc: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-16">
      {/* Hero section */}
      <section className="relative -mt-8 py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-b-3xl overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Find Your Perfect Learning Path
            </h1>
            <p className="mt-6 text-xl text-primary-100">
              Personalized career recommendations and learning resources tailored to your skills and goals.
            </p>
            
            {/* Search bar - implementing Nielsen's user control and freedom */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for skills, careers, or courses..."
                  className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
                />
              </div>

              {/* Quick search suggestions - implementing Hick's law */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <button 
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
                  onClick={() => setSearchQuery("Data Science")}
                >
                  Data Science
                </button>
                <button 
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
                  onClick={() => setSearchQuery("UX Design")}
                >
                  UX Design
                </button>
                <button 
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
                  onClick={() => setSearchQuery("Web Development")}
                >
                  Web Development
                </button>
                <button 
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
                  onClick={() => setSearchQuery("Product Management")}
                >
                  Product Management
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                icon={<BookOpen size={18} />}
                iconPosition="left"
              >
                Explore Learning Paths
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                icon={<Briefcase size={18} />}
                iconPosition="left"
              >
                Discover Careers
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-secondary-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-accent-400 rounded-full opacity-20 blur-3xl"></div>
      </section>
      
      {/* Stats section - implementing visibility of system status */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item}>
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary-100 rounded-full mb-4">
                    <Trophy className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-600">Career Paths</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-secondary-100 rounded-full mb-4">
                    <BookOpen className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">1,200+</h3>
                  <p className="text-gray-600">Learning Resources</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-accent-100 rounded-full mb-4">
                    <Star className="h-6 w-6 text-accent-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">98%</h3>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured learning paths - implementing Gestalt principles */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Learning Paths</h2>
              <p className="text-gray-600">Explore our most popular learning paths</p>
            </div>
            <Link to="/learning">
              <Button 
                variant="outline"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPaths.map(path => (
              <LearningPathCard key={path.id} {...path} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section - implementing clear visual hierarchy */}
      <section className="bg-gradient-to-r from-secondary-500 to-secondary-700 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-white">
              <h2 className="text-2xl font-bold">Ready to start your learning journey?</h2>
              <p className="mt-2 text-secondary-100">
                Get personalized recommendations based on your skills and goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/learning">
                <Button variant="primary" size="lg">
                  Explore Learning Paths
                </Button>
              </Link>
              <Link to="/chat">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;