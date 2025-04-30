import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FileText, CheckCircle, AlertCircle, Shield, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

const TermsOfService = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-rose-50/30 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FileText className={`h-16 w-16 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          <Accordion.Item value="acceptance" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <CheckCircle className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  By accessing and using The One Horn Experience's event management services, you accept and agree to be bound by these terms. These terms govern your use of our event planning, coordination, and management services. If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="services" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">2. Event Management Services</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  The One Horn Experience provides comprehensive event management services including but not limited to:
                </p>
                <ul className="space-y-3 text-lg mt-4">
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Event planning and coordination</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Venue selection and management</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Vendor coordination and management</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Event design and decoration</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Guest management and coordination</span>
                  </li>
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="responsibilities" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <AlertCircle className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">3. Client Responsibilities</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-4">As a client, you agree to:</p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Provide accurate and complete information about your event requirements</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Make timely decisions and approvals during the planning process</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Make payments according to the agreed schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Communicate any changes or concerns promptly</span>
                  </li>
                  <li className="flex items-start">
                    <span className={`${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} mr-2`}>•</span>
                    <span>Comply with venue rules and regulations</span>
                  </li>
                </ul>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="booking" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">4. Booking and Payments</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  All event bookings are subject to availability and require a signed contract. Payment terms will be specified in your event agreement. We require a deposit to secure your event date, with the remaining balance due according to the payment schedule in your contract.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="cancellation" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <AlertCircle className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">5. Cancellation and Refund Policy</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  Cancellation policies vary based on the type of event and will be detailed in your event agreement. Generally, deposits are non-refundable. Cancellations made within 30 days of the event may be subject to additional fees. We recommend purchasing event insurance for protection against unforeseen circumstances.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="intellectual" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <Shield className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  All event designs, concepts, and materials created by The One Horn Experience remain our intellectual property. We grant you a license to use these materials for your event. Photographs and videos taken at your event may be used by us for promotional purposes unless otherwise specified in your contract.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="liability" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <AlertCircle className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">7. Liability and Insurance</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  The One Horn Experience carries general liability insurance. We are not responsible for the actions of third-party vendors. Clients are responsible for obtaining any necessary permits or licenses for their event. We recommend that clients obtain event insurance for additional protection.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="changes" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <FileText className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after such changes constitutes your acceptance of the new terms.
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="contact" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left">
                <div className="flex items-center">
                  <Mail className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                  <h2 className="text-2xl font-semibold">9. Contact Information</h2>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'} accordion-chevron`} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden">
              <div className="px-6 pb-6">
                <p className="text-lg mb-6">
                  For any questions about these Terms of Service, please contact us at:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-indigo-400' : 'text-rose-600'}`} />
                    <span className="text-lg">legal@onehornexperience.com</span>
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

export default TermsOfService; 