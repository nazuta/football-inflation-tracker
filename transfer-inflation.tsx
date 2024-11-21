import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const TransferInflationDashboard = () => {
  const [originalAmount, setOriginalAmount] = useState('');
  const [originalYear, setOriginalYear] = useState('2013');
  const [targetYear, setTargetYear] = useState('2023');

  const inflationData = [
    { year: '2013/14', multiplier: 1.00, increase: '+0%' },
    { year: '2014/15', multiplier: 1.17, increase: '+17%' },
    { year: '2015/16', multiplier: 1.31, increase: '+31%' },
    { year: '2016/17', multiplier: 1.67, increase: '+67%' },
    { year: '2017/18', multiplier: 1.99, increase: '+99%' },
    { year: '2018/19', multiplier: 1.94, increase: '+94%' },
    { year: '2019/20', multiplier: 2.18, increase: '+118%' },
    { year: '2020/21', multiplier: 2.61, increase: '+161%' },
    { year: '2021/22', multiplier: 1.98, increase: '+98%' },
    { year: '2022/23', multiplier: 2.16, increase: '+116%' }
  ];

  const formatAmount = (value) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with spaces every 3 digits
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    return formatted;
  };

  const handleAmountChange = (e) => {
    const formatted = formatAmount(e.target.value);
    setOriginalAmount(formatted);
  };

const calculateInflatedValue = () => {
  if (!originalAmount) return '0';
  const numericAmount = parseFloat(originalAmount.replace(/\s/g, ''));
  if (isNaN(numericAmount)) return '0';
  
  const startIndex = inflationData.findIndex(d => d.year.startsWith(originalYear));
  const endIndex = inflationData.findIndex(d => d.year.startsWith(targetYear));
  if (startIndex === -1 || endIndex === -1) return '0';
  
  const multiplier = inflationData[endIndex].multiplier / inflationData[startIndex].multiplier;
  const result = (numericAmount * multiplier / 1_000_000).toFixed(2);
  return formatAmount(result);
};


  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Football Transfer Inflation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Transfer Amount (€)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                  <Input
                    type="text"
                    placeholder="50 000 000"
                    value={originalAmount}
                    onChange={handleAmountChange}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Original Season</label>
                  <select
                    value={originalYear}
                    onChange={(e) => setOriginalYear(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {inflationData.map(d => (
                      <option key={d.year} value={d.year.split('/')[0]}>
                        {d.year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Target Season</label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {inflationData.map(d => (
                      <option key={d.year} value={d.year.split('/')[0]}>
                        {d.year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <div className="text-sm">Inflated Value:</div>
              <div className="text-2xl font-bold">€{calculateInflatedValue()}M</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Inflation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inflationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="multiplier" 
                  stroke="#2563eb"
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferInflationDashboard;
