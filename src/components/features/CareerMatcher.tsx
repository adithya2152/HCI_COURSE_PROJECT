import React, { useState } from 'react';
import { Star, Briefcase, ArrowRight, Check } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

interface Career {
  id: string;
  title: string;
  matchScore: number;
  salary: string;
  growthRate: string;
  description: string;
  skills: string[];
}

// Sample career data
const careerOptions: Career[] = [
  {
    id: '1',
    title: 'UX/UI Designer',
    matchScore: 95,
    salary: '$75,000 - $120,000',
    growthRate: '13% (Much faster than average)',
    description: 'Design digital products with a focus on user experience and interface design, creating intuitive and engaging experiences for users.',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
  },
  {
    id: '2',
    title: 'Data Scientist',
    matchScore: 87,
    salary: '$90,000 - $150,000',
    growthRate: '22% (Much faster than average)',
    description: 'Analyze complex data sets to identify patterns and derive insights that drive business decisions and strategy.',
    skills: ['Statistics', 'Machine Learning', 'Python', 'SQL', 'Data Visualization'],
  },
  {
    id: '3',
    title: 'Frontend Developer',
    matchScore: 82,
    salary: '$70,000 - $130,000',
    growthRate: '15% (Faster than average)',
    description: 'Build the user interface of websites and applications, focusing on creating responsive and interactive experiences.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Responsive Design', 'Web Accessibility'],
  },
  {
    id: '4',
    title: 'Product Manager',
    matchScore: 79,
    salary: '$85,000 - $140,000',
    growthRate: '10% (Faster than average)',
    description: 'Oversee the development of products, balancing business goals with user needs and technical constraints.',
    skills: ['Strategic Planning', 'User Stories', 'Market Research', 'Agile Methodologies', 'Stakeholder Management'],
  },
];

const CareerMatcher: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  
  // Implementing Gestalt principle of similarity with consistent card designs
  // and Hick's Law by presenting limited, clearly differentiated choices
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Career Matches</h2>
          <p className="text-gray-600">Based on your skills and preferences</p>
        </div>
        
        <Button 
          variant="outline"
          icon={<ArrowRight size={16} />}
          iconPosition="right"
        >
          View All Matches
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {careerOptions.map((career) => (
          <motion.div
            key={career.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className="h-full"
              hover
              onClick={() => setSelectedCareer(career)}
              footer={
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Star 
                      className="h-4 w-4 text-yellow-400 fill-current" 
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    icon={<ArrowRight size={16} />}
                    aria-label={`View ${career.title} details`}
                  >
                    Details
                  </Button>
                </div>
              }
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-primary-100">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {career.description}
                </p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Salary Range:</span>
                    <span className="font-medium text-gray-900">{career.salary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Growth:</span>
                    <span className="font-medium text-gray-900">{career.growthRate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {career.skills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {career.skills.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{career.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Career details modal - implementing progressive disclosure */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="career-modal-title"
            aria-modal="true"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-full bg-primary-100">
                    <Briefcase className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 id="career-modal-title" className="text-2xl font-bold text-gray-900">
                      {selectedCareer.title}
                    </h2>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-medium">{selectedCareer.matchScore}% Match</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCareer(null)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                  <p className="mt-2 text-gray-600">{selectedCareer.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Salary Range</h4>
                    <p className="text-lg font-bold text-primary-600">{selectedCareer.salary}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Growth Rate</h4>
                    <p className="text-lg font-bold text-primary-600">{selectedCareer.growthRate}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Required Skills</h3>
                  <ul className="mt-2 space-y-2">
                    {selectedCareer.skills.map((skill) => (
                      <li key={skill} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recommended Learning Paths</h3>
                  <div className="mt-2 space-y-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-primary-700">Essential Skills Track</h4>
                      <p className="text-sm text-gray-600">Core skills needed for entry-level positions</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        icon={<ArrowRight size={16} />}
                        iconPosition="right"
                      >
                        View Path
                      </Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-primary-700">Advanced Career Track</h4>
                      <p className="text-sm text-gray-600">Skills for career advancement to senior roles</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        icon={<ArrowRight size={16} />}
                        iconPosition="right"
                      >
                        View Path
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <Button 
                  variant="primary"
                  icon={<Star size={16} />}
                  iconPosition="left"
                >
                  Save to Favorites
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedCareer(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerMatcher;