import React from 'react';
import SWPCalculatorComponent from '../components/SWPCalculator';

const SWPCalculator = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] p-3 sm:p-5">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">SWP Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your systematic withdrawal plan and understand how long your investments will last.
            Plan your regular withdrawals while maintaining your financial security.
          </p>
        </div>

        {/* Calculator Component */}
        <SWPCalculatorComponent />
      </div>
    </div>
  );
};

export default SWPCalculator;