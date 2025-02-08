import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, HelpCircle, TrendingUp, AlertTriangle, Download, Calendar } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

interface WithdrawalData {
  year: number;
  principal: number;
  withdrawal: number;
  returns: number;
  balance: number;
}

const SWPCalculator = () => {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [withdrawal, setWithdrawal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(12);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [inflation, setInflation] = useState<number>(6);
  const [chartData, setChartData] = useState<WithdrawalData[]>([]);
  const [sustainability, setSustainability] = useState<number>(100);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void,
    min: number,
    max: number
  ) => {
    const value = e.target.type === 'range' ? 
      Number(e.target.value) : 
      Math.min(Math.max(Number(e.target.value.replace(/[^0-9]/g, '')), min), max);
    setter(value);
  };

  const calculateSWP = () => {
    const data: WithdrawalData[] = [];
    let currentPrincipal = principal;
    let currentWithdrawal = withdrawal;
    const monthlyRate = rate / (12 * 100);
    const inflationRate = inflation / 100;
    const withdrawalsPerYear = frequency === 'monthly' ? 12 : 4;
    const withdrawalRate = currentWithdrawal * withdrawalsPerYear;

    for (let year = 0; year <= 30; year++) {
      const yearlyWithdrawal = withdrawalRate * Math.pow(1 + inflationRate, year);
      const yearlyReturns = currentPrincipal * (rate / 100);
      const newBalance = currentPrincipal + yearlyReturns - yearlyWithdrawal;

      data.push({
        year,
        principal: Math.round(currentPrincipal),
        withdrawal: Math.round(yearlyWithdrawal),
        returns: Math.round(yearlyReturns),
        balance: Math.round(newBalance)
      });

      if (newBalance <= 0) {
        setSustainability(Math.round((year / 30) * 100));
        break;
      }

      currentPrincipal = newBalance;
    }

    setChartData(data);
  };

  useEffect(() => {
    calculateSWP();
  }, [principal, withdrawal, rate, frequency, inflation]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const exportToCSV = () => {
    const headers = ['Year', 'Principal', 'Withdrawal', 'Returns', 'Balance'];
    const csvData = chartData.map(row => 
      [row.year, row.principal, row.withdrawal, row.returns, row.balance].join(',')
    );
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `swp-report-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSustainabilityColor = () => {
    if (sustainability >= 80) return 'text-green-600';
    if (sustainability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CalculatorIcon className="h-6 w-6 text-[rgb(255,127,80)]" />
                SWP Calculator
              </h2>
            </div>

            {/* Principal Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Principal Amount
                </label>
                <input
                  type="text"
                  value={formatCurrency(principal).replace('₹', '')}
                  onChange={(e) => handleInputChange(e, setPrincipal, 100000, 10000000)}
                  className="w-32 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={100000}
                max={10000000}
                step={100000}
                value={principal}
                onChange={(e) => handleInputChange(e, setPrincipal, 100000, 10000000)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹1L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Monthly Withdrawal Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  {frequency === 'monthly' ? 'Monthly' : 'Quarterly'} Withdrawal
                </label>
                <input
                  type="text"
                  value={formatCurrency(withdrawal).replace('₹', '')}
                  onChange={(e) => handleInputChange(e, setWithdrawal, 1000, 100000)}
                  className="w-32 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={withdrawal}
                onChange={(e) => handleInputChange(e, setWithdrawal, 1000, 100000)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Expected Returns Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Expected Returns (% p.a.)
                </label>
                <input
                  type="text"
                  value={rate}
                  onChange={(e) => handleInputChange(e, setRate, 1, 30)}
                  className="w-20 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={rate}
                onChange={(e) => handleInputChange(e, setRate, 1, 30)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Withdrawal Frequency */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Withdrawal Frequency
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    frequency === 'monthly'
                      ? 'bg-[rgb(255,127,80)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFrequency('quarterly')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    frequency === 'quarterly'
                      ? 'bg-[rgb(255,127,80)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="pt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[rgb(255,127,80)] text-sm font-medium flex items-center gap-2"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
                <motion.span
                  animate={{ rotate: showAdvanced ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">
                          Inflation Rate (% p.a.)
                        </label>
                        <input
                          type="text"
                          value={inflation}
                          onChange={(e) => handleInputChange(e, setInflation, 0, 15)}
                          className="w-20 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        value={inflation}
                        onChange={(e) => handleInputChange(e, setInflation, 0, 15)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>15%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sustainability Indicator */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Plan Sustainability</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">30-Year Outlook</span>
                  <span className={`text-lg font-bold ${getSustainabilityColor()}`}>
                    {sustainability}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      sustainability >= 80 ? 'bg-green-500' :
                      sustainability >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${sustainability}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  {sustainability >= 80 ? 'Your withdrawal plan is sustainable.' :
                   sustainability >= 50 ? 'Consider adjusting your withdrawal rate.' :
                   'High risk of depleting your principal.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Principal Balance Over Time</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{ value: 'Years', position: 'bottom', offset: 0 }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                    label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', offset: -5 }}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Balance"
                    stroke="rgb(255,127,80)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="withdrawal"
                    name="Yearly Withdrawal"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Yearly Breakdown</h3>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(255,127,80)] hover:bg-[rgb(255,127,80)]/10 rounded-md transition-colors"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chartData.map((data) => (
                    <motion.tr
                      key={data.year}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-[rgba(255,127,80,0.1)] transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(data.principal)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(data.withdrawal)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(data.returns)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(data.balance)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;