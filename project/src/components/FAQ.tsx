import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What is SIP (Systematic Investment Plan)?",
      answer: "A Systematic Investment Plan (SIP) is an investment strategy where you invest a fixed amount regularly (usually monthly) in mutual funds or stocks. This approach helps in averaging out the cost of investment over time and benefits from the power of compounding."
    },
    {
      question: "How is Lumpsum investment different from SIP?",
      answer: "In Lumpsum investment, you invest a large amount at once, while in SIP, you invest smaller amounts periodically. Lumpsum is suitable when you have a large amount ready to invest, while SIP is ideal for regular income earners who want to invest systematically."
    },
    {
      question: "How does compound interest work in investments?",
      answer: "Compound interest is interest earned on both the principal amount and previously accumulated interest. This creates a snowball effect where your money grows exponentially over time, especially in long-term investments."
    },
    {
      question: "What factors should I consider before starting a SIP?",
      answer: "Consider your financial goals, investment horizon, risk tolerance, and regular income stability. Also, evaluate the fund's past performance, expense ratio, and ensure you have an emergency fund before starting SIP investments."
    },
    {
      question: "How do I use the investment calculator effectively?",
      answer: "Input your investment amount (monthly for SIP or one-time for Lumpsum), expected returns rate, and investment duration. The calculator will show you the estimated returns and total value. Adjust these parameters to plan according to your financial goals."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2B9EB3] focus:ring-offset-2"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;