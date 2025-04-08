import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const billingIntervals = [
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'yearly', name: 'Yearly' },
];

const allFeatures = [
  'Strokes Gained Statistics',
  'Basic player rankings',
  'Model Dashboard',
  'Matchup Tool',
  '3-Ball Tool',
  'Historical performance data',
  'Expert Insights',
  'AI Caddie',
  'Course Fit Tool',
  'Advanced analytics',
  'Priority support',
];

const tiers = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic access to essential golf statistics.',
    price: {
      weekly: '0',
      monthly: '0',
      yearly: '0',
    },
    features: [
      'Strokes Gained Statistics',
      'Basic player rankings',
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Advanced tools for serious golf analysis',
    price: {
      weekly: '17.99',
      monthly: '59.99',
      yearly: '599.99',
    },
    features: [
      'Strokes Gained Statistics',
      'Basic player rankings',
      'Model Dashboard',
      'Matchup Tool',
      '3-Ball Tool',
    ],
    cta: 'Start Basic Plan',
    mostPopular: false,
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
      monthly: '199.99',
      yearly: '999.99',
    },
    features: allFeatures,
    cta: 'Start Pro Plan',
    mostPopular: true,
    links: {
      weekly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869964',
      monthly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869965',
      yearly: 'https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869966'
    }
  },
];

export default function PricingPlans() {
  const [selectedInterval, setSelectedInterval] = useState('monthly');

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your game
          </p>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
            {billingIntervals.map((interval) => (
              <button
                key={interval.id}
                onClick={() => setSelectedInterval(interval.id)}
                className={`px-6 py-3 text-base font-semibold rounded-md transition-all duration-200 ${
                  selectedInterval === interval.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {interval.name}
              </button>
            ))}
          </div>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 transition-all duration-200 hover:ring-2 hover:ring-green-500 ${
                tier.mostPopular ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.name}
                  className={`text-base font-semibold leading-7 ${
                    tier.mostPopular ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold leading-5 text-green-400">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className={`mt-3 text-sm leading-6 ${
                tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {tier.description}
              </p>
              <p className="mt-4 flex items-baseline gap-x-1">
                <span className={`text-3xl font-bold tracking-tight ${
                  tier.mostPopular ? 'text-white' : 'text-gray-900'
                }`}>
                  ${tier.price[selectedInterval as keyof typeof tier.price]}
                </span>
                <span className={`text-sm font-semibold leading-6 ${
                  tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  /{selectedInterval}
                </span>
              </p>
              {tier.id === 'free' ? (
                <a
                  href="https://www.winible.com/checkout/1378395472007287051?pid=1378395472019869964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.mostPopular
                      ? 'bg-green-500 text-white shadow-sm hover:bg-green-400 focus-visible:outline-green-500'
                      : 'bg-white text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300'
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <a
                  href={tier.links?.[selectedInterval as keyof typeof tier.links]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.mostPopular
                      ? 'bg-green-500 text-white shadow-sm hover:bg-green-400 focus-visible:outline-green-500'
                      : 'bg-white text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300'
                  }`}
                >
                  {tier.cta}
                </a>
              )}
              <ul
                role="list"
                className={`mt-6 space-y-2 text-sm leading-6 ${
                  tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {allFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    {tier.features.includes(feature) ? (
                      <CheckIcon
                        className={`h-5 w-5 flex-none ${
                          tier.mostPopular ? 'text-green-400' : 'text-green-600'
                        }`}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className={`h-5 w-5 flex-none rounded-full border ${
                        tier.mostPopular ? 'border-gray-600' : 'border-gray-300'
                      }`} />
                    )}
                    <span className={tier.features.includes(feature) ? '' : 'opacity-50'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}