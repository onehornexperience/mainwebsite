import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Check, Star, ArrowRight } from 'lucide-react';
import PageCarousel from '../components/PageCarousel';

const serviceDetails = {
  weddings: {
    title: 'Wedding Planning & Coordination',
    description: 'Create your dream wedding with our expert planning and coordination services.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Elegant Wedding Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Wedding Reception'
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Wedding Ceremony'
      }
    ],
    benefits: [
      'Personalized planning and consultation',
      'Vendor selection and management',
      'Custom theme and decor design',
      'Timeline and budget management',
      'Day-of coordination and support',
      'Stress-free planning experience'
    ],
    features: [
      {
        title: 'Expert Planning Team',
        description: 'Our experienced wedding planners bring your vision to life with meticulous attention to detail.'
      },
      {
        title: 'Custom Design',
        description: 'Create a unique wedding aesthetic that reflects your personal style and love story.'
      },
      {
        title: 'Full-Service Coordination',
        description: 'From venue selection to day-of coordination, we handle every aspect of your special day.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Sarah & Michael',
        comment: 'The One Horn Experience made our dream wedding a reality. Every detail was perfect!',
        rating: 5
      },
      {
        name: 'Emily & James',
        comment: 'Professional, creative, and absolutely amazing to work with. Highly recommended!',
        rating: 5
      }
    ]
  },
  corporate: {
    title: 'Corporate Events & Conferences',
    description: 'Elevate your corporate events with our professional planning and execution services.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Corporate Conference'
      },
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Business Meeting'
      },
      {
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Corporate Event'
      }
    ],
    benefits: [
      'Professional event management',
      'Technical support and equipment',
      'Registration and check-in services',
      'Catering and hospitality',
      'Brand integration',
      'Post-event reporting'
    ],
    features: [
      {
        title: 'Seamless Organization',
        description: 'Expert coordination of all event elements for a professional and polished experience.'
      },
      {
        title: 'Technical Excellence',
        description: 'State-of-the-art audio-visual equipment and technical support for flawless presentations.'
      },
      {
        title: 'Brand Integration',
        description: 'Incorporate your company branding throughout the event for consistent messaging.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'John Smith',
        comment: 'Exceptional service and attention to detail. Our conference was a huge success!',
        rating: 5
      },
      {
        name: 'Lisa Johnson',
        comment: 'Professional team that delivered beyond our expectations.',
        rating: 5
      }
    ]
  },
  birthdays: {
    title: 'Birthday Celebrations',
    description: 'Create unforgettable birthday celebrations with our expert planning services.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Birthday Party Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Birthday Celebration'
      },
      {
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Birthday Decorations'
      }
    ],
    benefits: [
      'Customized theme and decor',
      'Entertainment coordination',
      'Catering and cake arrangements',
      'Photography and videography',
      'Guest list management',
      'Venue selection and setup'
    ],
    features: [
      {
        title: 'Creative Themes',
        description: "Design unique and personalized party themes that reflect the celebrant's personality"
      },
      {
        title: 'Complete Planning',
        description: 'Handle all aspects of the celebration from invitations to entertainment'
      },
      {
        title: 'Memorable Experiences',
        description: 'Create lasting memories with unique activities and entertainment options'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Rachel Thompson',
        comment: "They made my daughter's sweet 16 absolutely magical! Every detail was perfect.",
        rating: 5
      },
      {
        name: 'David Wilson',
        comment: 'Amazing team that created a fantastic celebration. Highly recommended!',
        rating: 5
      }
    ]
  },
  festivals: {
    title: 'Music Festivals & Concerts',
    description: 'Create electrifying music festivals and concerts that leave lasting impressions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Music Festival'
      },
      {
        url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Concert Stage'
      },
      {
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Festival Crowd'
      }
    ],
    benefits: [
      'Full production management',
      'Artist coordination',
      'Sound and lighting expertise',
      'Security and crowd management',
      'Food and beverage vendors',
      'Emergency response planning'
    ],
    features: [
      {
        title: 'Production Excellence',
        description: 'State-of-the-art sound and lighting systems for an immersive experience.'
      },
      {
        title: 'Artist Management',
        description: 'Comprehensive artist coordination and backstage management.'
      },
      {
        title: 'Crowd Safety',
        description: 'Expert security and crowd management for a safe environment.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Festival Organizer',
        comment: 'One Horn Experience delivered an incredible festival experience. Perfect execution!',
        rating: 5
      },
      {
        name: 'Music Promoter',
        comment: 'Outstanding production quality and professional management.',
        rating: 5
      }
    ]
  },
  launches: {
    title: 'Product Launch Events',
    description: 'Create impactful product launches that generate buzz and drive success.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Product Launch Event'
      },
      {
        url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Product Display'
      },
      {
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Launch Presentation'
      }
    ],
    benefits: [
      'Strategic event planning',
      'Media coordination',
      'Brand experience design',
      'Interactive demonstrations',
      'Press kit preparation',
      'Social media integration'
    ],
    features: [
      {
        title: 'Brand Impact',
        description: 'Create memorable brand experiences that resonate with your audience.'
      },
      {
        title: 'Media Coverage',
        description: 'Comprehensive media strategy and press coordination.'
      },
      {
        title: 'Interactive Elements',
        description: 'Engaging product demonstrations and hands-on experiences.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Tech Company CEO',
        comment: 'Our product launch was a massive success thanks to One Horn Experience.',
        rating: 5
      },
      {
        name: 'Marketing Director',
        comment: 'Exceptional attention to detail and brand alignment. Outstanding results!',
        rating: 5
      }
    ]
  },
  sports: {
    title: 'Sports Events',
    description: 'Deliver exceptional sporting events that inspire and excite.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Sports Event'
      },
      {
        url: 'https://images.unsplash.com/photo-1471295253337-3ceaaad65897?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Stadium Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1463244019899-6ff29c86c56a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Sports Competition'
      }
    ],
    benefits: [
      'Venue coordination',
      'Equipment management',
      'Participant registration',
      'Safety protocols',
      'Medical support',
      'Live scoring systems'
    ],
    features: [
      {
        title: 'Professional Setup',
        description: 'Competition-ready venues with proper equipment and facilities.'
      },
      {
        title: 'Safety First',
        description: 'Comprehensive safety measures and medical support.'
      },
      {
        title: 'Smooth Operations',
        description: 'Efficient event management from registration to awards.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471295253337-3ceaaad65897?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1463244019899-6ff29c86c56a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471295253337-3ceaaad65897?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Sports Federation',
        comment: 'Flawless execution of our championship event. Highly professional team!',
        rating: 5
      },
      {
        name: 'Event Coordinator',
        comment: 'Outstanding organization and attention to safety protocols.',
        rating: 5
      }
    ]
  },
  social: {
    title: 'Social Gatherings',
    description: 'Create memorable social events that bring people together.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Social Event'
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Party Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Social Gathering'
      }
    ],
    benefits: [
      'Personalized themes',
      'Entertainment booking',
      'Catering services',
      'Decor and lighting',
      'Guest management',
      'Photography services'
    ],
    features: [
      {
        title: 'Creative Design',
        description: 'Unique themes and decor that create the perfect atmosphere.'
      },
      {
        title: 'Full Service',
        description: 'Comprehensive planning from concept to cleanup.'
      },
      {
        title: 'Guest Experience',
        description: 'Attention to every detail for memorable moments.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Party Host',
        comment: 'One Horn Experience created an amazing atmosphere for our gathering!',
        rating: 5
      },
      {
        name: 'Social Club',
        comment: 'Professional team that delivered a perfect social event.',
        rating: 5
      }
    ]
  },
  custom: {
    title: 'Custom Events',
    description: 'Bring your unique vision to life with our bespoke event planning services.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Custom Event'
      },
      {
        url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Unique Setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        alt: 'Special Event'
      }
    ],
    benefits: [
      'Unique concept development',
      'Custom design and decor',
      'Specialized vendor sourcing',
      'Personalized planning',
      'Flexible solutions',
      'Creative direction'
    ],
    features: [
      {
        title: 'Innovative Ideas',
        description: 'Transform your vision into an extraordinary event experience.'
      },
      {
        title: 'Tailored Solutions',
        description: 'Customized planning and execution for your unique needs.'
      },
      {
        title: 'Creative Excellence',
        description: 'Innovative designs and concepts that stand out.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    testimonials: [
      {
        name: 'Creative Director',
        comment: 'They brought our unique vision to life perfectly. Exceptional creativity!',
        rating: 5
      },
      {
        name: 'Event Host',
        comment: 'Incredible attention to detail and innovative solutions.',
        rating: 5
      }
    ]
  }
};

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { isDarkMode } = useTheme();
  
  const service = serviceDetails[serviceId as keyof typeof serviceDetails];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Service not found</p>
      </div>
    );
  }

  return (
    <main>
      <PageCarousel
        images={service.images}
        title={service.title}
        description={service.description}
      />
      
      <div className={`py-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-6">
          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12 text-center`}>
              Why Choose One Horn Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div 
                  key={index}
                  className={`${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-8 rounded-lg shadow-lg`}
                >
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    {feature.title}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12 text-center`}>
              Benefits of Working With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
          <Link
            to="/packages"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors mb-12"
          >
            View Packages
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

          {/* Gallery */}
          <div className="mb-20">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12 text-center`}>
              Previous Events Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.gallery.map((image, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className={`text-3xl font-bol d ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-12 text-center`}>
              Client Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'} p-8 rounded-lg shadow-lg`}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} italic mb-4`}>
                    "{testimonial.comment}"
                  </p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetails;