import React, { useState, useEffect } from 'react';
import { Filter, Search, Clock, BookOpen, Award, Check, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LearningPathCard from '../../components/features/LearningPathCard';
import { useLoadingState } from '../../hooks/useLoadingState';

// Learning paths data
const allLearningPaths = [
  {
    id: '1',
    title: 'Data Science Fundamentals',
    description: 'Master the core concepts of data analysis, statistics, and machine learning to start your data science journey.',
    duration: '3 months',
    level: 'Beginner' as const,
    courseCount: 8,
    category: 'Data Science',
    imageSrc: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'UX/UI Design Immersive',
    description: 'Learn user-centered design processes, wireframing, prototyping, and usability testing to create engaging experiences.',
    duration: '4 months',
    level: 'Intermediate' as const,
    courseCount: 12,
    category: 'Design',
    imageSrc: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Full-Stack Web Development',
    description: 'Build dynamic web applications with modern frameworks, covering both frontend and backend development.',
    duration: '6 months',
    level: 'Intermediate' as const,
    courseCount: 15,
    category: 'Development',
    imageSrc: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Product Management Essentials',
    description: 'Learn to identify market opportunities, define product requirements, and lead cross-functional teams to deliver successful products.',
    duration: '3 months',
    level: 'Beginner' as const,
    courseCount: 10,
    category: 'Business',
    imageSrc: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into neural networks, deep learning, and advanced ML algorithms to solve complex real-world problems.',
    duration: '5 months',
    level: 'Advanced' as const,
    courseCount: 12,
    category: 'Data Science',
    imageSrc: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'Mobile App Development',
    description: 'Build native and cross-platform mobile applications for iOS and Android using modern frameworks and best practices.',
    duration: '4 months',
    level: 'Intermediate' as const,
    courseCount: 9,
    category: 'Development',
    imageSrc: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Learning page implementing filtering and search functionality
const Learning: React.FC = () => {
  const { startLoading, finishLoading } = useLoadingState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    level: [] as string[],
    duration: [] as string[],
    category: [] as string[],
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [learningPaths, setLearningPaths] = useState(allLearningPaths);

  // Apply loading state on initial page load
  useEffect(() => {
    startLoading();
    
    // Simulate content loading
    const timer = setTimeout(() => {
      finishLoading();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [startLoading, finishLoading]);

  // Apply filters and search - implementing user control and freedom
  useEffect(() => {
    let filteredPaths = [...allLearningPaths];
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPaths = filteredPaths.filter(
        path => 
          path.title.toLowerCase().includes(query) ||
          path.description.toLowerCase().includes(query) ||
          path.category.toLowerCase().includes(query)
      );
    }
    
    // Apply level filter
    if (filters.level.length > 0) {
      filteredPaths = filteredPaths.filter(path => filters.level.includes(path.level));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filteredPaths = filteredPaths.filter(path => filters.category.includes(path.category));
    }
    
    // Apply duration filter
    if (filters.duration.length > 0) {
      // simplified duration filter for demo
      filteredPaths = filteredPaths.filter(path => {
        const months = parseInt(path.duration.split(' ')[0]);
        
        if (filters.duration.includes('short') && months <= 3) return true;
        if (filters.duration.includes('medium') && months > 3 && months <= 5) return true;
        if (filters.duration.includes('long') && months > 5) return true;
        
        return false;
      });
    }
    
    setLearningPaths(filteredPaths);
  }, [searchQuery, filters]);

  // Toggle filter selection
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters,
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      level: [],
      duration: [],
      category: [],
    });
    setSearchQuery('');
  };

  // Check if a filter is active
  const isFilterActive = (category: keyof typeof filters, value: string) => {
    return filters[category].includes(value);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Learning Paths</h1>
        <p className="mt-2 text-gray-600">
          Discover curated learning paths to help you achieve your career goals.
        </p>
      </header>
      
      {/* Search and filter - implementing Shneiderman's principle of searchability */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for learning paths..."
            className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        {/* Mobile filter button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            icon={<Filter size={16} />}
            iconPosition="left"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            Filters {Object.values(filters).flat().length > 0 && `(${Object.values(filters).flat().length})`}
          </Button>
        </div>
        
        {/* Desktop filters */}
        <div className="hidden md:flex space-x-2">
          <div className="relative group">
            <Button
              variant="outline"
              className={filters.level.length > 0 ? 'border-primary-500 text-primary-700' : ''}
            >
              Level {filters.level.length > 0 && `(${filters.level.length})`}
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
              <div className="py-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleFilter('level', level)}
                    className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                      isFilterActive('level', level) ? 'text-primary-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2">
                      {isFilterActive('level', level) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </span>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <Button
              variant="outline"
              className={filters.duration.length > 0 ? 'border-primary-500 text-primary-700' : ''}
            >
              Duration {filters.duration.length > 0 && `(${filters.duration.length})`}
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
              <div className="py-2">
                {[
                  { id: 'short', label: '1-3 months' },
                  { id: 'medium', label: '3-6 months' },
                  { id: 'long', label: '6+ months' },
                ].map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => toggleFilter('duration', duration.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                      isFilterActive('duration', duration.id) ? 'text-primary-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2">
                      {isFilterActive('duration', duration.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </span>
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <Button
              variant="outline"
              className={filters.category.length > 0 ? 'border-primary-500 text-primary-700' : ''}
            >
              Category {filters.category.length > 0 && `(${filters.category.length})`}
            </Button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
              <div className="py-2">
                {['Data Science', 'Design', 'Development', 'Business'].map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleFilter('category', category)}
                    className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                      isFilterActive('category', category) ? 'text-primary-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-2">
                      {isFilterActive('category', category) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </span>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {Object.values(filters).flat().length > 0 && (
            <Button
              variant="ghost"
              icon={<X size={16} />}
              iconPosition="left"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile filter menu */}
      {isFilterMenuOpen && (
        <div className="md:hidden">
          <Card className="mb-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleFilter('level', level)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isFilterActive('level', level)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'short', label: '1-3 months' },
                    { id: 'medium', label: '3-6 months' },
                    { id: 'long', label: '6+ months' },
                  ].map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => toggleFilter('duration', duration.id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isFilterActive('duration', duration.id)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {['Data Science', 'Design', 'Development', 'Business'].map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleFilter('category', category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isFilterActive('category', category)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsFilterMenuOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Active filters - implementing visibility of system status */}
      {Object.values(filters).flat().length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.level.map(level => (
            <div 
              key={`level-${level}`}
              className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
            >
              <span className="mr-1">Level:</span> {level}
              <button 
                onClick={() => toggleFilter('level', level)}
                className="ml-2 text-primary-500 hover:text-primary-700"
                aria-label={`Remove ${level} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          {filters.duration.map(duration => {
            const durationLabel = {
              short: '1-3 months',
              medium: '3-6 months',
              long: '6+ months',
            }[duration];
            
            return (
              <div 
                key={`duration-${duration}`}
                className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
              >
                <span className="mr-1">Duration:</span> {durationLabel}
                <button 
                  onClick={() => toggleFilter('duration', duration)}
                  className="ml-2 text-primary-500 hover:text-primary-700"
                  aria-label={`Remove ${durationLabel} filter`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          
          {filters.category.map(category => (
            <div 
              key={`category-${category}`}
              className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
            >
              <span className="mr-1">Category:</span> {category}
              <button 
                onClick={() => toggleFilter('category', category)}
                className="ml-2 text-primary-500 hover:text-primary-700"
                aria-label={`Remove ${category} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Results section */}
      <div>
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {learningPaths.length} {learningPaths.length === 1 ? 'result' : 'results'} found
          </p>
          
          {/* Sort options - implementing user control principles */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option>Relevance</option>
              <option>Duration: Short to Long</option>
              <option>Duration: Long to Short</option>
              <option>Level: Beginner to Advanced</option>
              <option>Level: Advanced to Beginner</option>
            </select>
          </div>
        </div>
        
        {/* Learning paths grid */}
        {learningPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map(path => (
              <LearningPathCard key={path.id} {...path} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No learning paths found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filter criteria to find more results.
            </p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;