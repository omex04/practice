import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Globe } from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');

  const faqs = [
    {
      question: "How accurate are the calculator results?",
      answer: "Our calculators use industry-standard financial formulas to provide accurate estimates. However, actual returns may vary based on market conditions and other factors."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, all calculations are performed locally in your browser. We don't store any of your financial information on our servers."
    },
    {
      question: "Can I export my calculation results?",
      answer: "Yes, you can export your results to CSV format using the 'Export' button in the yearly breakdown table."
    },
    {
      question: "What should I do if I find a bug?",
      answer: "Please report any bugs through our contact form or email us at support@investcalc.com. Include as much detail as possible about the issue."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Support Center</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'faq'
                  ? 'text-[rgb(255,127,80)] border-b-2 border-[rgb(255,127,80)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'contact'
                  ? 'text-[rgb(255,127,80)] border-b-2 border-[rgb(255,127,80)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Us
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'faq' ? (
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <Mail className="h-6 w-6 text-[rgb(255,127,80)] mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:support@investcalc.com" className="hover:text-[rgb(255,127,80)]">
                      support@investcalc.com
                    </a>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <Phone className="h-6 w-6 text-[rgb(255,127,80)] mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:text-[rgb(255,127,80)]">
                      +1 (234) 567-890
                    </a>
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <Globe className="h-6 w-6 text-[rgb(255,127,80)] mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hours</h3>
                  <p className="text-gray-600">
                    Mon - Fri: 9AM - 6PM<br />
                    Weekend: Closed
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(255,127,80)] focus:ring-[rgb(255,127,80)] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(255,127,80)] focus:ring-[rgb(255,127,80)] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(255,127,80)] focus:ring-[rgb(255,127,80)] sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(255,127,80)] hover:bg-[rgb(255,127,80)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(255,127,80)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;