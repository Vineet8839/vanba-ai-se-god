import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-2 sm:px-4 py-6">
      <div className="text-center max-w-xs sm:max-w-md w-full">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative">
            <h1 className="text-6xl sm:text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-onBackground mb-2">Page Not Found</h2>
        <p className="text-onBackground/70 mb-6 sm:mb-8 text-sm sm:text-base">
          The page you're looking for doesn't exist. Let's get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={() => window.history?.back()}
            className="text-base sm:text-lg"
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={handleGoHome}
            className="text-base sm:text-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
