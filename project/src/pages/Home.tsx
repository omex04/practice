import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2B9EB3] to-[#238999] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Smart Investment Decisions Start Here
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90">
              Calculate your investment returns with our powerful SIP and Lumpsum calculators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sip-calculator"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#2B9EB3] bg-white hover:bg-gray-50 transition-colors"
              >
                Try SIP Calculator
              </Link>
              <Link
                to="/lumpsum-calculator"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Try Lumpsum Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Calculators?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-[#2B9EB3]/10 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-[#2B9EB3]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accurate Calculations
              </h3>
              <p className="text-gray-600">
                Get precise investment projections based on your inputs and market assumptions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-[#2B9EB3]/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#2B9EB3]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Visual Insights
              </h3>
              <p className="text-gray-600">
                Understand your investment growth through interactive charts and graphs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-[#2B9EB3]/10 rounded-lg flex items-center justify-center mb-4">
                <PiggyBank className="h-6 w-6 text-[#2B9EB3]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Planning
              </h3>
              <p className="text-gray-600">
                Make informed decisions about your investments with our comprehensive tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;