import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import TicketCarousel from '../TicketCarousel.js';
import { useAuthContext } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js'; // Added .js extension
import { trackEvent } from '../../utils/metaPixel.js';

// Initialize Stripe with the environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PricingFeature {
  name: string;
  includedIn: ('free' | 'basic' | 'pro')[];
}

type BillingInterval = 'weekly' | 'monthly' | 'yearly';

const features: PricingFeature[] = [
  { name: 'Betting Picks', includedIn: ['pro'] },
  { name: 'Strokes Gained Statistics', includedIn: ['free', 'basic', 'pro'] },
  { name: 'Basic player rankings', includedIn: ['free', 'basic', 'pro'] },
  { name: 'Model Dashboard', includedIn: ['basic', 'pro'] },
  { name: 'Matchup Tool', includedIn: ['basic', 'pro'] },
  { name: '3-Ball Tool', includedIn: ['basic', 'pro'] },
  { name: 'Historical performance data', includedIn: ['pro'] },
  { name: 'Expert Models', includedIn: ['pro'] },
  { name: 'AI Caddie', includedIn: ['pro'] },
  { name: 'Course Fit Tool', includedIn: ['pro'] },
  { name: 'Advanced analytics', includedIn: ['pro'] },
  { name: 'Priority support', includedIn: ['pro'] },
];

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Advanced tools for serious golf analysis',
    price: {
      weekly: '17.99',
      monthly: '59.99',
      yearly: '599.99'
    },
    buttonText: 'Start Basic Plan',
    buttonStyle: 'text-gray-700 bg-white hover:bg-gray-50',
    featured: true
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Everything you need to dominate the sportsbooks. Betting picks and advanced betting tools',
    price: {
      weekly: '59.99',
      monthly: '239.99',
      yearly: '599.99'
    },
    buttonText: 'Start Pro Plan',
    buttonStyle: 'text-white bg-green-500 hover:bg-green-600',
    featured: false,
    tag: 'Most popular'
  }
];

async function createCheckoutSession(
  plan: string,
  billingInterval: 'weekly' | 'monthly' | 'yearly'
) {
  // Get Supabase session/token
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.access_token) {
      throw new Error(sessionError?.message || 'User must be logged in to subscribe');
  }
  const token = session.access_token;

  const res = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add Authorization header
     },
    body: JSON.stringify({ plan, billingInterval }),
  });

  if (!res.ok) {
    const errorBody = await res.json(); // Read error body
    throw new Error(errorBody.error || `Server error: ${res.statusText}`);
  }
  return res.json() as Promise<{ sessionId: string }>; 
}

export default function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubscribe = async (plan: string) => {
    if (plan === 'free') return;
    
    // Track subscription initiation
    trackEvent('InitiateCheckout', {
      content_name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
      content_category: 'subscription',
      value: parseFloat(plans.find(p => p.id === plan)?.price[billingInterval] || '0'),
      currency: 'USD'
    });
    
    if (!user) {
      sessionStorage.setItem('selectedPlan', JSON.stringify({ plan, interval: billingInterval }));
      navigate('/auth');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const session = await createCheckoutSession(plan, billingInterval);
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mx-auto max-w-4xl mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            YOU WILL <span className="text-green-500">WIN</span> WITH US
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Premier golf analytics and DFS tools to help you beat the book!
          </p>
        </div>
        <div className="mt-16">
          <TicketCarousel />
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-gray-900">Choose the right plan for your game</h2>
          </div>
        </div>
        <div className="mt-12 flex justify-center items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl justify-center mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg shadow-lg divide-y divide-gray-200 border-2 border-gray-900 ${
                  plan.name === 'Pro' ? 'bg-gray-900' : 'bg-white'
                }`}
              >
                <div className="p-6">
                  {plan.tag && (
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-green-100 text-green-600 mb-4">
                      {plan.tag}
                    </span>
                  )}
                  <h2 className={`text-2xl font-semibold ${plan.name === 'Pro' ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h2>
                  <p className={`mt-4 text-sm ${plan.name === 'Pro' ? 'text-gray-300 font-bold' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                  <p className="mt-8">
                    <span className={`text-4xl font-extrabold ${plan.name === 'Pro' ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.price[billingInterval]}
                    </span>
                    <span className={`text-base font-medium ${plan.name === 'Pro' ? 'text-gray-300' : 'text-gray-500'}`}>
                      /{billingInterval}
                    </span>
                  </p>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading || plan.id === 'free'}
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                      plan.buttonStyle
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Loading...' : plan.buttonText}
                  </button>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    {features.map((feature) => {
                      const included = feature.includedIn.includes(plan.id as 'free' | 'basic' | 'pro');
                      return (
                        <li
                          key={feature.name}
                          className={`flex items-start ${
                            plan.name === 'Pro' ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          {included ? (
                            <svg
                              className={`h-6 w-6 ${
                                plan.name === 'Pro' ? 'text-green-400' : 'text-green-500'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <span className="ml-3">{feature.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={() => setBillingInterval('weekly')}
            className={`px-6 py-2 rounded-md transition-colors ${
              billingInterval === 'weekly'
                ? 'text-white bg-green-500 hover:bg-green-600'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setBillingInterval('monthly')}
            className={`px-6 py-2 rounded-md transition-colors ${
              billingInterval === 'monthly'
                ? 'text-white bg-green-500 hover:bg-green-600'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingInterval('yearly')}
            className={`px-6 py-2 rounded-md transition-colors ${
              billingInterval === 'yearly'
                ? 'text-white bg-green-500 hover:bg-green-600'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
}