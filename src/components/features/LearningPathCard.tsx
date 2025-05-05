import React from 'react';
import { Book, Clock, BarChart, Award, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

interface LearningPathCardProps {
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  courseCount: number;
  imageSrc: string;
  onClick?: () => void;
}

// Implementing clear visual hierarchy and gestalt principles
const LearningPathCard: React.FC<LearningPathCardProps> = ({
  title,
  description,
  duration,
  level,
  courseCount,
  imageSrc,
  onClick,
}) => {
  // Level-based styling
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image area - visual prominence */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor()}`}>
            {level}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Title and description */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        
        {/* Course details - using Gestalt principle of proximity */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Book className="h-4 w-4" />
            <span>{courseCount} Courses</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <BarChart className="h-4 w-4" />
            <span>{level}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Award className="h-4 w-4" />
            <span>Certificate</span>
          </div>
        </div>
        
        {/* Action button */}
        <Button 
          variant="primary" 
          className="w-full"
          icon={<ArrowRight size={16} />}
          iconPosition="right"
        >
          Start Learning
        </Button>
      </div>
    </motion.div>
  );
};

export default LearningPathCard;