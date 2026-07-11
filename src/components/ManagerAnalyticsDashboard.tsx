import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { ConsultancyTask } from '../types';

interface Props {
  tasks: ConsultancyTask[];
}

export function ManagerAnalyticsDashboard({ tasks }: Props) {
  const approved = tasks.filter(t => t.status === 'done').length;
  const rejected = tasks.filter(t => t.status === 'inprogress' && t.feedback).length;
  
  const tasksByStatus = [
    { name: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', count: tasks.filter(t => t.status === 'inprogress').length },
    { name: 'Review', count: tasks.filter(t => t.status === 'review').length },
    { name: 'Done', count: approved },
  ];

  const qualityMetrics = [
    { name: 'QA Performance', Approved: approved, Rejected: rejected },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
      <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase font-display mb-6">Manager Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Task Distribution by Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tasksByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-64 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-2">QA Performance (Approved vs Rejected)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qualityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Approved" fill="#10b981" />
              <Bar dataKey="Rejected" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
