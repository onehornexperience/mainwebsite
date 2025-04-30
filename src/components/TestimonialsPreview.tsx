import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ITEMS_PER_PAGE = 4;

const TestimonialsPreview = () => {
  const { isDarkMode } = useTheme();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [videoPage, setVideoPage] = useState(1);

  // Featured Videos Data
  const videos = [
    { 
      id: 1, 
      title: 'Corporate Conference Dubai', 
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Luxury Garden Wedding', 
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      title: 'Music Festival Highlights', 
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      title: 'Mountain Corporate Retreat', 
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      title: 'Elegant Product Launch', 
      image: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 6, 
      title: 'Rustic Birthday Celebration', 
      image: 'https://images.unsplash.com/photo-1495305379050-64540d6ee95d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 7, 
      title: 'Intimate Social Gathering', 
      image: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 8, 
      title: 'Waterfront Sports Event', 
      image: 'https://images.unsplash.com/photo-1522057384400-681b421cfefc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
  ];

  // Reviews Data
  const reviews = [
    {
      id: 1,
      text: 'Our corporate conference was absolutely perfect thanks to the incredible team. They took care of every detail and made our event truly memorable. The setup was stunning and the timing was flawless!',
      author: 'Nicolas Freeman, CEO',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      text: 'Thank you for creating the most memorable wedding day! The venue was breathtaking and the organization was impeccable. We couldn\'t have asked for a better experience for our special day.',
      author: 'Louisa & Thomas Nelson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      text: 'From start to finish, the service for our music festival was exceptional. They understood our vision perfectly and transformed it into reality. Our attendees are still talking about how amazing everything was!',
      author: 'Joan Adams, Event Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  ];
  
  // Pagination calculation for videos
  const videoTotalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const videoStartIndex = (videoPage - 1) * ITEMS_PER_PAGE;
  const currentPageVideos = videos.slice(videoStartIndex, videoStartIndex + ITEMS_PER_PAGE);

  const handleVideoPageChange = (page: number) => {
    if (page < 1 || page > videoTotalPages) return;
    setVideoPage(page);
    // Remove the scrolling behavior
  };

  // Auto-scroll testimonials every 6 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(intervalId);
  }, [reviews.length]);

  return (
    <>
      {/* Reviews Section */}
      <section className={`py-12 ${isDarkMode ? 'bg-dark-bg' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Client Testimonials
          </motion.h2>
          
          <div className="relative max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
              className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-gray-100'} p-8 rounded-lg relative shadow-md`}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <motion.img 
                  key={`review-image-${activeReviewIndex}`}
                  src={reviews[activeReviewIndex].image} 
                  alt={reviews[activeReviewIndex].author} 
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="text-center pt-4">
                <motion.p 
                  key={`review-text-${activeReviewIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`italic mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  "{reviews[activeReviewIndex].text}"
                </motion.p>
                <motion.p 
                  key={`review-author-${activeReviewIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {reviews[activeReviewIndex].author}
                </motion.p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setActiveReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10"
                aria-label="Previous testimonial"
              >
                <span className="text-gray-700">‹</span>
              </button>
              <button 
                onClick={() => setActiveReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10"
                aria-label="Next testimonial"
              >
                <span className="text-gray-700">›</span>
              </button>
            </motion.div>

            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveReviewIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeReviewIndex 
                        ? 'bg-indigo-600' 
                        : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section id="featured-videos" className={`py-12 ${isDarkMode ? 'bg-dark-bg-alt' : 'bg-rose-50/30'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Featured Videos
            </motion.h2>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              View All ({videos.length})
            </div>
          </div>

        <motion.div 
            key={`video-page-${videoPage}`}
          variants={containerVariants}
          initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {currentPageVideos.map((video) => (
            <motion.div
                key={video.id} 
              variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`${isDarkMode ? 'bg-dark-bg' : 'bg-white'} rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={video.image} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleVideoPageChange(videoPage - 1)}
                disabled={videoPage === 1}
                className={`w-7 h-7 flex items-center justify-center rounded-full 
                  ${videoPage === 1 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'cursor-pointer'} 
                  ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                <span>«</span>
              </button>
              
              {Array.from({ length: videoTotalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => handleVideoPageChange(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-full ${
                    page === videoPage 
                    ? 'bg-indigo-600 text-white' 
                    : isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handleVideoPageChange(videoPage + 1)}
                disabled={videoPage === videoTotalPages}
                className={`w-7 h-7 flex items-center justify-center rounded-full 
                  ${videoPage === videoTotalPages 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'cursor-pointer'} 
                  ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                <span>»</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPreview;