import React, { useState, useEffect } from 'react';
import {
  Calculator as CalculatorIcon,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Download,
} from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface InvestmentData {
  year: number;
  invested: number;
  totalValue: number;
  returns: number;
  inflation_adjusted: number;
}

const Calculator = () => {
  const [amount, setAmount] = useState<number>(35000);
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [isSIP, setIsSIP] = useState<boolean>(true);
  const [inflation, setInflation] = useState<number>(6);
  const [chartData, setChartData] = useState<InvestmentData[]>([]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void,
    min: number,
    max: number
  ) => {
    const value =
      e.target.type === 'range'
        ? Number(e.target.value)
        : Math.min(
            Math.max(Number(e.target.value.replace(/[^0-9]/g, '')), min),
            max
          );
    setter(value);
  };

  const calculateInvestment = () => {
    const data: InvestmentData[] = [];
    if (isSIP) {
      const monthlyRate = rate / (12 * 100);
      const inflationRate = inflation / 100;

      for (let year = 0; year <= years; year++) {
        const monthsCompleted = year * 12;
        const invested = amount * monthsCompleted;
        const totalValue =
          monthsCompleted > 0
            ? amount *
              ((Math.pow(1 + monthlyRate, monthsCompleted) - 1) / monthlyRate) *
              (1 + monthlyRate)
            : 0;
        const returns = totalValue - invested;
        const inflation_adjusted =
          totalValue / Math.pow(1 + inflationRate, year);

        data.push({
          year,
          invested: Math.round(invested),
          totalValue: Math.round(totalValue),
          returns: Math.round(returns),
          inflation_adjusted: Math.round(inflation_adjusted),
        });
      }
    } else {
      const principal = amount;
      const inflationRate = inflation / 100;

      for (let year = 0; year <= years; year++) {
        const totalValue = principal * Math.pow(1 + rate / 100, year);
        const returns = totalValue - principal;
        const inflation_adjusted =
          totalValue / Math.pow(1 + inflationRate, year);

        data.push({
          year,
          invested: principal,
          totalValue: Math.round(totalValue),
          returns: Math.round(returns),
          inflation_adjusted: Math.round(inflation_adjusted),
        });
      }
    }
    setChartData(data);
  };

  useEffect(() => {
    calculateInvestment();
  }, [amount, years, rate, isSIP, inflation]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatLakhs = (value: number) => {
    return `${(value / 100000).toFixed(2)} L`;
  };

  const getInvestmentRatio = () => {
    const finalData = chartData[chartData.length - 1];
    if (!finalData) return 0;
    return ((finalData.invested / finalData.totalValue) * 100).toFixed(1);
  };

  const getReturnsRatio = () => {
    const finalData = chartData[chartData.length - 1];
    if (!finalData) return 0;
    return ((finalData.returns / finalData.totalValue) * 100).toFixed(1);
  };

  const pieChartData = () => {
    const finalData = chartData[chartData.length - 1];
    if (!finalData) return [];
    return [
      { name: 'Invested', value: finalData.invested },
      { name: 'Returns', value: finalData.returns },
    ];
  };

  const COLORS = ['rgb(45, 185, 185)', 'rgb(255,127,80)'];

  const exportToCSV = () => {
    const headers = ['Year', 'Invested Amount', 'Returns', 'Total Value'];
    const csvData = chartData.map((row) =>
      [row.year, row.invested, row.returns, row.totalValue].join(',')
    );

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `investment-report-${new Date().toISOString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CalculatorIcon className="h-6 w-6 text-[rgb(255,127,80)]" />
                {isSIP ? 'SIP Calculator' : 'Lumpsum Calculator'}
              </h2>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    isSIP ? 'text-[rgb(255,127,80)]' : 'text-gray-500'
                  }`}
                >
                  SIP
                </span>
                <Switch.Root
                  checked={!isSIP}
                  onCheckedChange={(checked) => setIsSIP(!checked)}
                  className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-[rgb(255,127,80)] transition-colors"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
                <span
                  className={`text-sm font-medium ${
                    !isSIP ? 'text-[rgb(255,127,80)]' : 'text-gray-500'
                  }`}
                >
                  Lumpsum
                </span>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  {isSIP ? 'Monthly Investment' : 'Lumpsum Amount'}
                </label>
                <input
                  type="text"
                  value={formatCurrency(amount).replace('₹', '')}
                  onChange={(e) =>
                    handleInputChange(e, setAmount, 1000, 10000000)
                  }
                  className="w-32 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-3 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={10000000}
                step={1000}
                value={amount}
                onChange={(e) =>
                  handleInputChange(e, setAmount, 1000, 10000000)
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
              />
            </div>

            {/* Years Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Investment Period (Years)
                </label>
                <input
                  type="text"
                  value={years}
                  onChange={(e) => handleInputChange(e, setYears, 1, 30)}
                  className="w-20 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                />
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={years}
                onChange={(e) => handleInputChange(e, setYears, 1, 30)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
              />
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
                          onChange={(e) =>
                            handleInputChange(e, setInflation, 0, 15)
                          }
                          className="w-20 text-right text-sm font-medium text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-[rgb(255,127,80)] focus:border-transparent"
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        value={inflation}
                        onChange={(e) =>
                          handleInputChange(e, setInflation, 0, 15)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[rgb(255,127,80)]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Results Section with Pie Charts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Investment Ratio */}
            <div className="relative">
              <div className="w-full aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: Number(getInvestmentRatio()) },
                        { value: 100 - Number(getInvestmentRatio()) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="rgb(45, 185, 185)" />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {getInvestmentRatio()}%
                  </span>
                  <span className="text-sm text-gray-500">
                    Investment Ratio
                  </span>
                </div>
              </div>
            </div>

            {/* Returns Ratio */}
            <div className="relative">
              <div className="w-full aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { value: Number(getReturnsRatio()) },
                        { value: 100 - Number(getReturnsRatio()) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="rgb(255,127,80)" />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {getReturnsRatio()}%
                  </span>
                  <span className="text-sm text-gray-500">Returns Ratio</span>
                </div>
              </div>
            </div>

            {/* Total Value */}
            <div className="relative">
              <div className="w-full aspect-square">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ value: 100 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="rgb(45, 185, 185)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatLakhs(
                      chartData[chartData.length - 1]?.totalValue || 0
                    )}
                  </span>
                  <span className="text-sm text-gray-500">Total Value</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">Invested Amount</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatLakhs(chartData[chartData.length - 1]?.invested || 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Est. Returns</p>
              <p className="text-lg font-semibold text-[rgb(255,127,80)]">
                {formatLakhs(chartData[chartData.length - 1]?.returns || 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatLakhs(chartData[chartData.length - 1]?.totalValue || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Investment Growth Over Time
        </h3>
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
                label={{
                  value: 'Amount (₹)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -5,
                }}
              />
              <RechartsTooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="invested"
                name="Invested Amount"
                stroke="rgb(45, 185, 185)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalValue"
                name="Total Value"
                stroke="rgb(255,127,80)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Yearly Breakdown
          </h3>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invested Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(data.invested)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(data.returns)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(data.totalValue)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
