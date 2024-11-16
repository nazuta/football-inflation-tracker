import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const data = [
  { year: "2013/14", value: 1.00, percentage: 0 },
  { year: "2014/15", value: 1.17, percentage: 17 },
  { year: "2015/16", value: 1.31, percentage: 31 },
  { year: "2016/17", value: 1.67, percentage: 67 },
  { year: "2017/18", value: 1.99, percentage: 99 },
  { year: "2018/19", value: 1.94, percentage: 94 },
  { year: "2019/20", value: 2.18, percentage: 118 },
  { year: "2020/21", value: 2.61, percentage: 161 },
  { year: "2021/22", value: 1.98, percentage: 98 },
  { year: "2022/23", value: 2.16, percentage: 116 },
  { year: "2023/24", value: 2.16, percentage: 116 }
];

const TransferInflationCalculator = () => {
  const [amount, setAmount] = useState('50000000');
  const [year, setYear] = useState('2013/14');

  const formatInputNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const calculateModernValue = () => {
    const baseMultiplier = data.find(d => d.year === year)?.value || 1;
    const currentMultiplier = data[data.length - 1].value;
    const ratio = currentMultiplier / baseMultiplier;
    return (parseFloat(amount) * ratio).toLocaleString('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
      groupingSeparator: ' '
    });
  };

  return (
    <div className="space-y-8 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Inflation Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="amount">Original Transfer Amount (€)</Label>
              <Input
                id="amount"
                type="text"
                value={formatInputNumber(amount)}
                onChange={handleAmountChange}
                className="w-full text-xl font-mono"
                placeholder="50 000 000"
              />
              <p className="text-sm text-gray-500">Enter amount without currency symbol or decimals</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Transfer Year</Label>
              <select 
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {data.map(d => (
                  <option key={d.year} value={d.year}>{d.year}</option>
                ))}
              </select>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <p className="text-lg font-semibold">Modern Equivalent Value:</p>
              <p className="text-2xl font-bold text-blue-600 font-mono">{calculateModernValue()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Inflation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={700} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="Multiplier" />
            <Line type="monotone" dataKey="percentage" stroke="#82ca9d" name="% Increase" />
          </LineChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left border-b">Season</th>
                  <th className="p-4 text-right border-b">Multiplier</th>
                  <th className="p-4 text-right border-b">Inflation %</th>
                  <th className="p-4 text-right border-b">Example: €1M in this season equals</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="p-4 border-b font-medium">{row.year}</td>
                    <td className="p-4 border-b text-right font-mono">{row.value.toFixed(2)}×</td>
                    <td className="p-4 border-b text-right font-mono">+{row.percentage}%</td>
                    <td className="p-4 border-b text-right font-mono">
                      {(1000000 * (data[data.length - 1].value / row.value)).toLocaleString('en-EU', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferInflationCalculator;
