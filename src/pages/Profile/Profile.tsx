import React, { useState } from 'react';
import { User, Settings, ChevronDown, X, Save, Upload, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Captcha from '../../components/ui/Captcha';

// Profile page implementing multiple UX principles
const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formValues, setFormValues] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'UX designer and frontend developer with 3 years of experience. Passionate about creating intuitive and accessible digital experiences.',
    currentRole: 'UX Designer',
    experience: '3-5 years',
    education: 'Bachelor\'s in Computer Science',
    interests: ['UX Design', 'Frontend Development', 'Accessibility'],
    skills: ['HTML/CSS', 'JavaScript', 'React', 'UI Design', 'Wireframing', 'Figma', 'User Testing'],
  });

  // Implementing system feedback for form saving
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      // Show success message (not implemented in this demo)
    }, 1500);
  };

  // Handle form value changes - implementing user control
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Handle skills and interests changes
  const handleArrayItemRemove = (field: 'skills' | 'interests', index: number) => {
    setFormValues(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayItemAdd = (field: 'skills' | 'interests', value: string) => {
    if (!value.trim()) return;
    
    setFormValues(prev => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  // CAPTCHA verification handler
  const handleCaptchaVerify = (verified: boolean) => {
    setIsVerified(verified);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile information and preferences.
          </p>
        </div>
        
        <Button 
          variant="primary"
          icon={<Save size={16} />}
          iconPosition="left"
          isLoading={isSaving}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </header>
      
      {/* Profile navigation - implementing tabbed navigation for progressive disclosure */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'profile'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="mr-2 h-5 w-5" />
            Profile Information
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
              activeTab === 'settings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="mr-2 h-5 w-5" />
            Account Settings
          </button>
        </nav>
      </div>
      
      {/* Profile information tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            {/* Profile photo - implementing feedback principles */}
            <Card className="text-center p-6">
              <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
                  aria-label="Change profile picture"
                >
                  <Upload className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <h2 className="mt-4 text-xl font-bold text-gray-900">{formValues.name}</h2>
              <p className="text-gray-600">{formValues.currentRole}</p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                icon={<Upload size={14} />}
                iconPosition="left"
              >
                Change Photo
              </Button>
            </Card>
            
            {/* Skills section - implementing strong visual grouping */}
            <Card title="Skills" className="mt-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formValues.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleArrayItemRemove('skills', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        aria-label={`Remove ${skill}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    id="add-skill"
                    placeholder="Add a skill..."
                    className="flex-grow rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-3 py-1.5"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        handleArrayItemAdd('skills', input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button 
                    className="bg-primary-600 text-white rounded-r-md px-3 py-1.5 hover:bg-primary-700 transition-colors"
                    onClick={() => {
                      const input = document.getElementById('add-skill') as HTMLInputElement;
                      handleArrayItemAdd('skills', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Card>
            
            {/* Interests section */}
            <Card title="Interests" className="mt-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formValues.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                    >
                      <span>{interest}</span>
                      <button
                        onClick={() => handleArrayItemRemove('interests', index)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        aria-label={`Remove ${interest}`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    id="add-interest"
                    placeholder="Add an interest..."
                    className="flex-grow rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-3 py-1.5"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        handleArrayItemAdd('interests', input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button 
                    className="bg-primary-600 text-white rounded-r-md px-3 py-1.5 hover:bg-primary-700 transition-colors"
                    onClick={() => {
                      const input = document.getElementById('add-interest') as HTMLInputElement;
                      handleArrayItemAdd('interests', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main profile form - implementing usability */}
          <div className="md:col-span-2">
            <Card>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formValues.bio}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Brief description about yourself for your profile.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Role
                    </label>
                    <input
                      type="text"
                      id="currentRole"
                      name="currentRole"
                      value={formValues.currentRole}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formValues.experience}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="0-2 years">0-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formValues.education}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </Card>
            
            {/* Privacy settings - implementing clear status indicators */}
            <Card title="Privacy Settings" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                    <p className="text-sm text-gray-600">Control who can see your profile information</p>
                  </div>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Connections Only</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email updates about new matches and recommendations</p>
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
                    <h4 className="font-medium text-gray-900">Learning Activity Sharing</h4>
                    <p className="text-sm text-gray-600">Share your learning progress with your network</p>
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
      )}
      
      {/* Account settings tab - implementing user control principles */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto">
          <Card title="Account Security">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    
                    {/* Password strength indicator - implementing feedback */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        Password strength: <span className="text-yellow-600 font-medium">Medium</span>
                      </p>
                      
                      <ul className="mt-2 text-xs text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <Check className="h-3 w-3 text-green-500 mr-1" />
                          At least 8 characters
                        </li>
                        <li className="flex items-center">
                          <Check className="h-3 w-3 text-green-500 mr-1" />
                          Contains uppercase letters
                        </li>
                        <li className="flex items-center">
                          <X className="h-3 w-3 text-red-500 mr-1" />
                          Contains special characters
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                {/* Show CAPTCHA for security - implementing verification */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Security Verification</h4>
                  <Captcha onVerify={handleCaptchaVerify} />
                </div>
                
                <Button 
                  variant="primary" 
                  className="mt-6"
                  disabled={!isVerified}
                >
                  Update Password
                </Button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Connected Accounts</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-bold">G</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Google</h4>
                        <p className="text-xs text-gray-500">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-bold">L</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">LinkedIn</h4>
                        <p className="text-xs text-gray-500">Connected as Alex Johnson</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Delete Your Account</h4>
                      <p className="text-xs text-red-700 mt-1">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-600">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;