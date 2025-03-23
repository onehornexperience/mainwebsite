import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const packageCategories = [
  'All Packages',
  'Weddings',
  'Corporate',
  'Birthdays',
  'Music Events',
  'Product Launches'
];

const packages = [
  {
    name: 'Essential',
    price: 349000,
    description: 'Perfect for smaller events with basic requirements',
    category: ['All Packages', 'Weddings', 'Birthdays'],
    features: [
      { name: 'Event Planning & Coordination', included: true },
      { name: 'Venue Selection Assistance', included: true },
      { name: 'Basic Decor Package', included: true },
      { name: 'Event Timeline Creation', included: true },
      { name: 'Vendor Recommendations', included: true },
      { name: 'Day-of Coordination (8 hours)', included: true },
      { name: 'Custom Theme Design', included: false },
      { name: 'Premium Catering Options', included: false },
      { name: 'Photography & Videography', included: false },
      { name: 'VIP Guest Management', included: false }
    ],
    popular: false,
    color: 'indigo'
  },
  {
    name: 'Premium',
    price: 499999,
    description: 'Our most popular package for medium-sized events',
    category: ['All Packages', 'Weddings', 'Corporate', 'Birthdays', 'Product Launches'],
    features: [
      { name: 'Event Planning & Coordination', included: true },
      { name: 'Venue Selection Assistance', included: true },
      { name: 'Enhanced Decor Package', included: true },
      { name: 'Event Timeline Creation', included: true },
      { name: 'Vendor Management', included: true },
      { name: 'Day-of Coordination (12 hours)', included: true },
      { name: 'Custom Theme Design', included: true },
      { name: 'Premium Catering Options', included: true },
      { name: 'Photography & Videography', included: false },
      { name: 'VIP Guest Management', included: false }
    ],
    popular: true,
    color: 'indigo'
  },
  {
    name: 'Luxury',
    price: 699999,
    description: 'All-inclusive package for the most memorable events',
    category: ['All Packages', 'Weddings', 'Corporate', 'Music Events', 'Product Launches'],
    features: [
      { name: 'Event Planning & Coordination', included: true },
      { name: 'Venue Selection Assistance', included: true },
      { name: 'Luxury Decor Package', included: true },
      { name: 'Event Timeline Creation', included: true },
      { name: 'Full Vendor Management', included: true },
      { name: 'Day-of Coordination (Full Day)', included: true },
      { name: 'Custom Theme Design', included: true },
      { name: 'Premium Catering Options', included: true },
      { name: 'Photography & Videography', included: true },
      { name: 'VIP Guest Management', included: true }
    ],
    popular: false,
    color: 'indigo'
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const calculatePaymentStages = (price: number) => {
  return {
    initial: price * 0.1,    // 10% initial payment
    progress: price * 0.7,   // 70% progress payment
    final: price * 0.2      // 20% final payment
  };
};

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('All Packages');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const filteredPackages = packages.filter(pkg => 
    pkg.category.includes(activeCategory)
  );

  const handleCustomQuote = () => {
    navigate('/custom-quote');
  };

  const handleSelectPackage = (pkg: any) => {
    navigate('/package-booking', {
      state: {
        packageDetails: pkg
      }
    });
  };

  return (
    <section id="packages" className={`py-20 ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {packageCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => {
            const paymentStages = calculatePaymentStages(pkg.price);
            
            return (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  isDarkMode
                    ? pkg.popular 
                      ? 'border border-indigo-500 shadow-xl' 
                      : 'border border-gray-700 shadow-lg'
                    : pkg.popular 
                      ? 'border border-indigo-600 shadow-xl' 
                      : 'border border-gray-200 shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white py-1 px-4 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'}`}>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{pkg.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                  <p className={isDarkMode ? 'text-gray-300 mb-6' : 'text-gray-600 mb-6'}>{pkg.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <X className={`h-5 w-5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mr-2`} />
                        )}
                        <span className={
                          feature.included 
                            ? isDarkMode ? 'text-gray-300' : 'text-gray-700' 
                            : isDarkMode ? 'text-gray-600' : 'text-gray-400'
                        }>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

              
                  
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 rounded-md font-medium transition-colors ${
                      pkg.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : isDarkMode
                          ? 'bg-dark-bg-alt text-indigo-400 border border-indigo-500 hover:bg-dark-bg'
                          : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    Select Package
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className={isDarkMode ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}>Need a custom solution for your event?</p>
          <button 
            onClick={handleCustomQuote}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default Packages;