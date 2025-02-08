import React from 'react';
import Calculator from '../components/Calculator';
import FAQ from '../components/FAQ';

const SIPCalculator = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] p-3 sm:p-5">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">SIP Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your potential returns from Systematic Investment Plan (SIP) investments.
            Plan your financial future with our easy-to-use calculator.
          </p>
        </div>

        {/* Calculator Component */}
        <Calculator />

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
};

export default SIPCalculator;