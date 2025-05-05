import React from 'react';
import ChatInterface from '../../components/features/ChatInterface';
import { Lightbulb, BookOpen, MessageSquare } from 'lucide-react';
import Card from '../../components/ui/Card';

// Chat page implementing UI/UX principles
const Chat: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Learning Assistant</h1>
        <p className="mt-2 text-gray-600">
          Ask questions about learning paths, career options, or get personalized recommendations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        
        {/* Sidebar - implementing Shneiderman's principle of providing informative feedback */}
        <div className="space-y-4">
          <Card title="How Can I Help You?">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Learning Recommendations</h4>
                  <p className="text-sm text-gray-600">
                    Ask about courses, tutorials, or learning resources tailored to your goals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Career Guidance</h4>
                  <p className="text-sm text-gray-600">
                    Explore career options, salary expectations, and required skills.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Skill Assessment</h4>
                  <p className="text-sm text-gray-600">
                    Get feedback on your current skills and areas for improvement.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Example questions - implementing Nielsen's recognition over recall */}
          <Card title="Example Questions">
            <div className="space-y-2">
              <button 
                className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  // This would integrate with the chat context in a real app
                  console.log("Question selected");
                }}
              >
                "What career paths are available for someone with UX design skills?"
              </button>
              
              <button 
                className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  console.log("Question selected");
                }}
              >
                "What skills should I develop to become a data scientist?"
              </button>
              
              <button 
                className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  console.log("Question selected");
                }}
              >
                "Can you recommend learning resources for front-end development?"
              </button>
              
              <button 
                className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  console.log("Question selected");
                }}
              >
                "What certifications would be valuable for a project manager?"
              </button>
            </div>
          </Card>
          
          {/* Tips - implementing Shneiderman's principle of error prevention */}
          <Card title="Tips for Better Results">
            <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-5">
              <li>Be specific about your current skills and experience level</li>
              <li>Mention any time constraints or learning preferences</li>
              <li>Ask follow-up questions for more detailed information</li>
              <li>Specify your career goals for more targeted recommendations</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;