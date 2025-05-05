import React from 'react';
import { Eye, EyeOff, Type, Volume2, MousePointer, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// Accessibility page implementing universal design principles
const Accessibility: React.FC = () => {
  // Simplified toggle function for accessibility features
  const toggleFeature = (feature: string) => {
    console.log(`Toggling ${feature} feature`);
    // In a real app, this would apply the selected accessibility settings
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Accessibility Settings</h1>
        <p className="mt-2 text-gray-600">
          Customize your experience to match your accessibility needs.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <div className="divide-y divide-gray-200">
              <button
                className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md"
                onClick={() => toggleFeature('visual')}
              >
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-primary-600 mr-3" />
                  <span>Visual</span>
                </div>
                <span className="text-primary-600">
                  <Check className="h-5 w-5" />
                </span>
              </button>
              
              <button
                className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md"
                onClick={() => toggleFeature('text')}
              >
                <div className="flex items-center">
                  <Type className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Text</span>
                </div>
              </button>
              
              <button
                className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md"
                onClick={() => toggleFeature('audio')}
              >
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Audio</span>
                </div>
              </button>
              
              <button
                className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md"
                onClick={() => toggleFeature('motion')}
              >
                <div className="flex items-center">
                  <MousePointer className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Motion</span>
                </div>
              </button>
            </div>
          </Card>
          
          <div className="mt-6">
            <Button variant="primary" className="w-full">
              Save Preferences
            </Button>
            <Button variant="outline" className="w-full mt-2">
              Reset to Default
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {/* Visual settings panel */}
          <Card title="Visual Settings">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Color Contrast</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="py-2 px-4 bg-gray-900 text-white rounded-md border-2 border-primary-500"
                    onClick={() => toggleFeature('high-contrast')}
                  >
                    High Contrast
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md"
                    onClick={() => toggleFeature('normal-contrast')}
                  >
                    Normal
                  </button>
                  <button
                    className="py-2 px-4 bg-white text-gray-700 rounded-md border border-gray-300"
                    onClick={() => toggleFeature('low-contrast')}
                  >
                    Low Contrast
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Color Blindness Support</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md"
                    onClick={() => toggleFeature('protanopia')}
                  >
                    Protanopia
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md"
                    onClick={() => toggleFeature('deuteranopia')}
                  >
                    Deuteranopia
                  </button>
                  <button
                    className="py-2 px-4 bg-gray-100 text-gray-900 rounded-md"
                    onClick={() => toggleFeature('tritanopia')}
                  >
                    Tritanopia
                  </button>
                  <button
                    className="py-2 px-4 bg-white text-gray-700 rounded-md border border-gray-300"
                    onClick={() => toggleFeature('normal-color')}
                  >
                    Normal
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Focus Indicators</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="focus-high"
                      name="focus"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="focus-high" className="ml-2 block text-sm text-gray-700">
                      High visibility focus indicators
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="focus-normal"
                      name="focus"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="focus-normal" className="ml-2 block text-sm text-gray-700">
                      Standard focus indicators
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Zoom Level</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">80%</span>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    defaultValue="100"
                    className="mx-4 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    onChange={(e) => console.log(`Zoom level: ${e.target.value}%`)}
                  />
                  <span className="text-sm text-gray-600">200%</span>
                </div>
                <div className="mt-2 text-center text-sm text-gray-600">
                  Current: 100%
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Text Settings" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Font Size</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">A</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="2"
                    className="mx-4 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    onChange={(e) => console.log(`Font size level: ${e.target.value}`)}
                  />
                  <span className="text-xl text-gray-600">A</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Font Family</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-sans"
                    onClick={() => toggleFeature('font-sans')}
                  >
                    Sans-serif (Default)
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-serif"
                    onClick={() => toggleFeature('font-serif')}
                  >
                    Serif
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-mono"
                    onClick={() => toggleFeature('font-mono')}
                  >
                    Monospace
                  </button>
                  <button
                    className="py-2 px-4 bg-white border border-gray-300 rounded-md text-sm"
                    style={{ fontFamily: 'OpenDyslexic, sans-serif' }}
                    onClick={() => toggleFeature('font-dyslexic')}
                  >
                    Dyslexia-friendly
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Line Spacing</h3>
                <div className="flex items-center space-x-2">
                  <button
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-center text-sm"
                    style={{ lineHeight: '1.2' }}
                    onClick={() => toggleFeature('line-spacing-compact')}
                  >
                    Compact
                  </button>
                  <button
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-center text-sm"
                    style={{ lineHeight: '1.5' }}
                    onClick={() => toggleFeature('line-spacing-normal')}
                  >
                    Normal
                  </button>
                  <button
                    className="flex-1 py-2 px-4 bg-primary-50 border border-primary-300 rounded-md text-center text-sm"
                    style={{ lineHeight: '2' }}
                    onClick={() => toggleFeature('line-spacing-relaxed')}
                  >
                    Relaxed
                  </button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Motion & Animation Settings" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Reduce Motion</h3>
                  <p className="text-sm text-gray-600">
                    Minimize animations and transitions throughout the interface
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-primary-600">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform translate-x-0 peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Disable Auto-Playing Media</h3>
                  <p className="text-sm text-gray-600">
                    Prevent videos and animations from playing automatically
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-primary-600">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform translate-x-0 peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>
          </Card>
          
          <Card title="Audio Settings" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Screen Reader Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Enhance the experience for screen reader users
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-primary-600">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform translate-x-0 peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Text-to-Speech for Content</h3>
                  <p className="text-sm text-gray-600">
                    Enable audio narration of page content
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-primary-600">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform translate-x-0 peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;