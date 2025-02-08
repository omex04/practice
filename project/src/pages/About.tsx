import React from 'react';
import { Calculator, Target, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About InvestCalc</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering investors with smart calculation tools for better financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-[rgb(255,127,80)]/10 rounded-lg flex items-center justify-center mb-4">
            <Calculator className="h-6 w-6 text-[rgb(255,127,80)]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Precise Calculations</h3>
          <p className="text-gray-600">
            Our calculators use industry-standard formulas to provide accurate investment projections.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-[rgb(255,127,80)]/10 rounded-lg flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-[rgb(255,127,80)]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
          <p className="text-gray-600">
            Set and track your investment goals with our comprehensive planning tools.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-[rgb(255,127,80)]/10 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-[rgb(255,127,80)]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
          <p className="text-gray-600">
            Your data is never stored or shared. All calculations happen in your browser.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-[rgb(255,127,80)]/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-[rgb(255,127,80)]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
          <p className="text-gray-600">
            Built with feedback from financial experts and everyday investors.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          At InvestCalc, we believe that everyone should have access to powerful financial planning tools. 
          Our mission is to simplify investment planning and empower individuals to make informed financial decisions.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you're just starting your investment journey or are a seasoned investor, 
          our tools are designed to help you understand and plan your financial future better.
        </p>
      </div>

      <div className="bg-[rgb(255,127,80)]/5 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h2>
        <p className="text-gray-600 text-lg mb-8">
          Take control of your financial future with our easy-to-use calculators.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/sip-calculator" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[rgb(255,127,80)] hover:bg-[rgb(255,127,80)]/90 transition-colors">
            Try SIP Calculator
          </a>
          <a href="/lumpsum-calculator" className="inline-flex items-center px-6 py-3 border border-[rgb(255,127,80)] text-base font-medium rounded-md text-[rgb(255,127,80)] hover:bg-[rgb(255,127,80)]/10 transition-colors">
            Try Lumpsum Calculator
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;