import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface PricingFeature {
  name: string;
  includedIn: ('free' | 'basic' | 'pro')[];
}

type BillingInterval = 'weekly' | 'monthly' | 'yearly';

const features: PricingFeature[] = [
  { name: 'Strokes Gained Statistics', includedIn: ['free', 'basic', 'pro'] },
  { name: 'Basic player rankings', includedIn: ['free', 'basic', 'pro'] },
  { name: 'Model Dashboard', includedIn: ['basic', 'pro'] },
  { name: 'Matchup Tool', includedIn: ['basic', 'pro'] },
  { name: '3-Ball Tool', includedIn: ['basic', 'pro'] },
  { name: 'Historical performance data', includedIn: ['pro'] },
  { name: 'Expert Insights', includedIn: ['pro'] },
  { name: 'AI Caddie', includedIn: ['pro'] },
  { name: 'Course Fit Tool', includedIn: ['pro'] },
  { name: 'Advanced analytics', includedIn: ['pro'] },
  { name: 'Priority support', includedIn: ['pro'] }
];

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic access to essential golf statistics',
    price: {
      weekly: '0',
      monthly: '0',
      yearly: '0'
    },
    buttonText: 'Get Started',
    buttonStyle: 'text-gray-700 bg-white hover:bg-gray-50',
    featured: false
  },
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
    featured: true,
    links: {
      weekly: 'https://www.winible.com/checkout/1438237995290349947?pid=1438237995302932860',
      monthly: 'https://www.winible.com/checkout/1438237995290349947?pid=1438237995302932861',
      yearly: 'https://www.winible.com/checkout/1438237995290349947?pid=1438237995302932862'
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Complete suite of professional golf analysis tools',
    price: {
      weekly: '59.99',
      monthly: '239.99',
      yearly: '599.99'
    },
    buttonText: 'Start Pro Plan',
    buttonStyle: 'text-white bg-green-500 hover:bg-green-600',
    featured: false,
    tag: 'Most popular',
    links: {
      weekly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869964',
      monthly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869965',
      yearly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869966'
    }
  }
];

export default function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Choose your plan
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 border-2 border-gray-900 ${
                plan.name === 'Pro' ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              <div className="p-6">
                {plan.tag && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {plan.tag}
                  </span>
                )}
                <h2 className={`text-2xl font-semibold ${plan.name === 'Pro' ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h2>
                <p className={`mt-4 text-sm ${plan.name === 'Pro' ? 'text-gray-300' : 'text-gray-500'}`}>
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
                {plan.id === 'free' ? (
                  <button
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <a
                    href={plan.links?.[billingInterval]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </a>
                )}
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
                          <CheckIcon
                            className={`h-6 w-6 ${
                              plan.name === 'Pro' ? 'text-green-400' : 'text-green-500'
                            }`}
                            aria-hidden="true"
                          />
                        ) : (
                          <div className={`h-6 w-6 rounded-full border ${
                            plan.name === 'Pro' ? 'border-gray-600' : 'border-gray-300'
                          }`} />
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