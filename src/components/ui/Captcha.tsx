import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Button from './Button';

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

// Implementing security validation with accessibility consideration
const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Generate a simple text captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setError('');
  };

  // Initialize captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validate user input
  const validateCaptcha = () => {
    if (userInput.trim() === '') {
      setError('Please enter the captcha text');
      return;
    }

    if (userInput === captchaText) {
      setIsVerified(true);
      onVerify(true);
      setError('');
    } else {
      setAttempts(attempts + 1);
      setError('Incorrect captcha. Please try again.');
      generateCaptcha();
      
      // After 3 failed attempts, provide audio option (accessibility)
      if (attempts >= 2) {
        setError('Having trouble? Try the audio option or request a new captcha.');
      }
    }
  };

  // Provide audio version of captcha for accessibility
  const playAudioCaptcha = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `The captcha code is ${captchaText.split('').join(' ')}`
      );
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Verify you're human</h3>
          
          {/* Audio option for accessibility */}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={playAudioCaptcha}
              className="text-primary-600 hover:text-primary-700 text-sm"
              aria-label="Listen to captcha"
            >
              🔊 Listen
            </button>
            
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-primary-600 hover:text-primary-700"
              aria-label="Refresh captcha"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Display captcha */}
        <div 
          className="flex items-center justify-center h-16 bg-white border border-gray-300 rounded-md select-none overflow-hidden"
          aria-label="CAPTCHA image"
        >
          <div 
            className="text-lg tracking-widest font-mono"
            style={{
              transform: 'skew(-10deg)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #f7fafc, #e2e8f0)',
              padding: '8px 16px',
              letterSpacing: '0.2em',
              position: 'relative',
            }}
          >
            {captchaText}
            {/* Visual noise for security */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gray-400"
                  style={{
                    width: '1px',
                    height: Math.random() * 30 + 10,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="captcha-input" className="block text-sm font-medium text-gray-700">
            Enter the text above
          </label>
          <input
            id="captcha-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'captcha-error' : undefined}
            placeholder="Type the characters you see"
          />
          
          {error && (
            <p id="captcha-error" className="text-error-600 text-sm">
              {error}
            </p>
          )}
          
          {isVerified && (
            <p className="text-success-600 text-sm">
              ✓ Verification successful
            </p>
          )}
        </div>

        <Button 
          onClick={validateCaptcha}
          disabled={isVerified || userInput.length === 0}
          variant="primary"
          size="sm"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default Captcha;