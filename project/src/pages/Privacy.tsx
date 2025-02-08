import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Data Protection</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We take your privacy seriously. All calculations are performed locally in your browser, 
            and we do not store any personal or financial information on our servers.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Our website uses industry-standard SSL encryption to protect any data transmitted 
            between your browser and our servers. We regularly update our security measures 
            to ensure the best protection for our users.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Analytics & Cookies</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We use anonymous analytics to improve our service. These analytics do not collect 
            any personally identifiable information. We use essential cookies to ensure the 
            proper functioning of our website.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Data Usage</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The data you enter in our calculators is used solely for performing the requested 
            calculations. We do not:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Store your financial information</li>
            <li>Share your data with third parties</li>
            <li>Use your data for marketing purposes</li>
            <li>Track your usage across other websites</li>
          </ul>
        </section>

        <div className="bg-[rgb(255,127,80)]/5 rounded-xl p-6">
          <p className="text-gray-600">
            Last updated: March 2024
          </p>
          <p className="text-gray-600 mt-4">
            If you have any questions about our privacy policy, please contact us at{' '}
            <a href="mailto:privacy@investcalc.com" className="text-[rgb(255,127,80)] hover:underline">
              privacy@investcalc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;