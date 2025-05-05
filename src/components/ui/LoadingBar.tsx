import React, { useEffect, useState } from 'react';

interface LoadingBarProps {
  progress?: number; // 0-100
  color?: string;
  height?: number;
  isIndeterminate?: boolean;
}

// Implementing Nielsen's visibility of system status principle
const LoadingBar: React.FC<LoadingBarProps> = ({
  progress = 0,
  color = 'var(--color-primary-600)',
  height = 4,
  isIndeterminate = false,
}) => {
  const [width, setWidth] = useState(progress);

  // Animate progress changes for smoother visual feedback
  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  // For indeterminate loading (when we don't know the exact progress)
  if (isIndeterminate) {
    return (
      <div
        className="fixed top-0 left-0 w-full z-50"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-busy="true"
      >
        <div
          className="absolute top-0 left-0 h-full animate-progress"
          style={{
            backgroundColor: color,
            width: '30%',
            animation: 'progress 1.5s ease-in-out infinite',
          }}
        />
      </div>
    );
  }

  // Determinate loading (when we know the exact progress)
  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      style={{
        height: `${height}px`,
      }}
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${width}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default LoadingBar;