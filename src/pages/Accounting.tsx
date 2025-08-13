import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Receipt, CreditCard } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'overdue';
}

export function Accounting() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Grain Sale - Spring Wheat',
      category: 'Grain Sales',
      amount: 45000,
      type: 'income',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Fertilizer Purchase - Nutrien',
      category: 'Inputs',
      amount: 12450,
      type: 'expense',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-12',
      description: 'Equipment Repair - JD 9650',
      category: 'Equipment',
      amount: 3200,
      type: 'expense',
      status: 'pending'
    },
    {
      id: '4',
      date: '2024-01-10',
      description: 'Canola Forward Contract',
      category: 'Grain Sales',
      amount: 28000,
      type: 'income',
      status: 'pending'
    },
    {
      id: '5',
      date: '2024-01-08',
      description: 'Seed Purchase - Pioneer',
      category: 'Inputs',
      amount: 8750,
      type: 'expense',
      status: 'completed'
    }
  ];

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Grain Sales': return 'bg-emerald-100 text-emerald-800';
      case 'Inputs': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-purple-100 text-purple-800';
      case 'Labor': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
            </div>
            <p className="text-gray-600">Track your farm's financial performance</p>
          </div>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SmartCard className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-600">Total Income</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            ${totalIncome.toLocaleString()}
          </div>
        </SmartCard>
        
        <SmartCard className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Total Expenses</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            ${totalExpenses.toLocaleString()}
          </div>
        </SmartCard>
        
        <SmartCard className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Net Income</span>
          </div>
          <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${netIncome.toLocaleString()}
          </div>
        </SmartCard>
        
        <SmartCard className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Receipt className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Transactions</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {transactions.length}
          </div>
        </SmartCard>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SmartCard>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income by Category</h3>
          <div className="space-y-3">
            {Object.entries(
              transactions
                .filter(t => t.type === 'income')
                .reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {} as Record<string, number>)
            ).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(category)}`}>
                  {category}
                </span>
                <span className="font-semibold text-emerald-600">
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </SmartCard>

        <SmartCard>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {Object.entries(
              transactions
                .filter(t => t.type === 'expense')
                .reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {} as Record<string, number>)
            ).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(category)}`}>
                  {category}
                </span>
                <span className="font-semibold text-red-600">
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </SmartCard>
      </div>

      {/* Recent Transactions */}
      <SmartCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
            Add Transaction
          </button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? 
                    <TrendingUp className="w-5 h-5 text-emerald-600" /> :
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  }
                </div>
                <div>
                  <div className="font-medium text-gray-900">{transaction.description}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(transaction.date).toLocaleDateString()}
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SmartCard>
    </div>
  );
}