import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const categories = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Festivals', 'Product Launches'];

const portfolioItems = [
  {
    id: 1,
    title: 'Elegant Garden Wedding',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'Sarah & Michael',
    location: 'Botanical Gardens',
    description: 'A stunning outdoor wedding with 200 guests featuring elegant floral arrangements and a custom dance floor.'
  },
  {
    id: 2,
    title: 'Tech Company Annual Conference',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'InnovateTech Inc.',
    location: 'Grand Convention Center',
    description: 'A three-day conference for 500 attendees with keynote speakers, breakout sessions, and networking events.'
  },
  {
    id: 3,
    title: 'Sweet 16 Celebration',
    category: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'Emma Johnson',
    location: 'Skyline Venue',
    description: 'A glamorous sweet 16 party with custom decorations, photo booth, and professional entertainment.'
  },
  {
    id: 4,
    title: 'Summer Music Festival',
    category: 'Festivals',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'City Cultural Department',
    location: 'Riverside Park',
    description: 'A two-day music festival featuring 15 bands, food vendors, and interactive art installations.'
  },
  {
    id: 5,
    title: 'Smartphone Launch Event',
    category: 'Product Launches',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'NextGen Mobile',
    location: 'Modern Art Museum',
    description: 'A high-profile product launch with media coverage, interactive demos, and celebrity appearances.'
  },
  {
    id: 6,
    title: 'Luxury Destination Wedding',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    client: 'Jessica & David',
    location: 'Coastal Resort',
    description: 'A weekend-long destination wedding celebration with welcome dinner, ceremony, and farewell brunch.'
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const { isDarkMode } = useTheme();
  
  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className={`py-20 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
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
        
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal for portfolio details */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto`}>
              <div className="relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2"
                  onClick={() => setSelectedItem(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedItem.title}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-4">{selectedItem.category}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>Client</p>
                    <p className={isDarkMode ? 'font-medium text-white' : 'font-medium'}>{selectedItem.client}</p>
                  </div>
                  <div>
                    <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>Location</p>
                    <p className={isDarkMode ? 'font-medium text-white' : 'font-medium'}>{selectedItem.location}</p>
                  </div>
                </div>
                
                <p className={isDarkMode ? 'text-gray-300 mb-6' : 'text-gray-700 mb-6'}>{selectedItem.description}</p>
                
                <div className="flex justify-end">
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;