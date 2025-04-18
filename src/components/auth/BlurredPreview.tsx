import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface BlurredPreviewProps {
  children: React.ReactNode;
  requiredSubscription?: 'free' | 'basic' | 'pro';
}

const BlurredPreview: React.FC<BlurredPreviewProps> = ({ children, requiredSubscription = 'free' }) => {
  const { user } = useAuthContext();
  const userTier = user?.subscription_tier || 'free';
  const subscriptionLevels = { free: 0, basic: 1, pro: 2 };

  // If user has sufficient subscription level, show content normally
  if (user && subscriptionLevels[userTier] >= subscriptionLevels[requiredSubscription]) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Upgrade prompt positioned at the top with some padding */}
      <div className="sticky top-0 z-50 pt-4 pb-6">
        <div className="text-center max-w-md mx-auto p-4 bg-white/95 rounded-lg shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Get Access to Premium Features
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Choose a plan that fits your needs and get access to all our professional golf analysis tools.
          </p>
          <a
            href="https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869964"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Get Pro Access
          </a>
        </div>
      </div>

      {/* Content with blur effect */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/20 z-40" />
        <div className="blur-[2px] pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BlurredPreview;
