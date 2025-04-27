import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, Lock, FileText, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

const PrivacyPolicy = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-rose-50/30 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className={`h-16 w-16 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          <Accordion.Item value="introduction" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">1. Introduction</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  Welcome to The One Horn Experience, your premier event management service. We are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data when you use our event planning services, book events, or interact with our website.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="information" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-4">We collect various types of information to provide our event management services:</p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Event Details (date, venue, guest count, event type)</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Client Information (name, contact details, preferences)</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Vendor Information (caterers, decorators, photographers)</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Payment Information (processed securely through our payment partners)</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Event Preferences and Requirements</span>
                  </li>
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="usage" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-4">We use your personal data to:</p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Plan and execute your events according to your specifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Coordinate with vendors and service providers</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Process payments and manage financial transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Send event updates and important notifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Improve our services and customer experience</span>
                  </li>
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="security" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <Lock className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">4. Data Security</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  We implement industry-standard security measures to protect your event and personal information. This includes encryption of sensitive data, secure payment processing, and restricted access to your information. Our team is trained in data protection and privacy best practices.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="rights" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-4">You have the right to:</p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Access your event and personal information</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Request corrections to your information</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Request deletion of your information (subject to legal requirements)</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Opt-out of marketing communications</span>
                  </li>
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="contact" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <Mail className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">6. Contact Us</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-6">
                  For any privacy-related questions or concerns, please contact our Data Protection Officer at:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                    <span className="text-lg">privacy@onehornexperience.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                    <span className="text-lg">[Your Contact Number]</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                    <span className="text-lg">[Your Business Address]</span>
                  </div>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 