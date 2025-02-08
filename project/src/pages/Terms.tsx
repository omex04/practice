import React from 'react';
import { FileText, AlertCircle, Shield, HelpCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Agreement to Terms</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using InvestCalc, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Disclaimer</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The calculators and information provided on InvestCalc are for educational purposes only. 
            We do not provide financial advice, and you should consult with qualified financial 
            professionals for personalized recommendations.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Results are estimates based on the information you provide</li>
            <li>Past performance does not guarantee future results</li>
            <li>Market conditions and other factors may affect actual returns</li>
            <li>All investments carry risk</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Intellectual Property</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            The content, features, and functionality of InvestCalc are owned by us and are 
            protected by international copyright, trademark, patent, trade secret, and other 
            intellectual property laws.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-[rgb(255,127,80)]" />
            <h2 className="text-xl font-semibold text-gray-900">Changes to Terms</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to modify or replace these terms at any time. If a revision is 
            material, we will try to provide at least 30 days' notice prior to any new terms 
            taking effect.
          </p>
        </section>

        <div className="bg-[rgb(255,127,80)]/5 rounded-xl p-6">
          <p className="text-gray-600">
            Last updated: March 2024
          </p>
          <p className="text-gray-600 mt-4">
            If you have any questions about our terms of service, please contact us at{' '}
            <a href="mailto:support@investcalc.com" className="text-[rgb(255,127,80)] hover:underline">
              support@investcalc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;