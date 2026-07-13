import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Plus, Clock } from 'lucide-react';

export function InterviewScheduler({ token, candidateName, candidateEmail }: { token: string | null, candidateName: string, candidateEmail: string }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = async () => {
    try {
      await axios.post('/api/send-email', {
        to: candidateEmail,
        subject: "Interview Scheduled",
        body: `Interview scheduled for ${candidateName} on ${date} at ${time}.`
      });
      alert(`Interview scheduled and invitation sent for ${candidateName} on ${date} at ${time}.`);
    } catch (error) {
      console.error('Failed to schedule interview:', error);
      alert('Failed to schedule interview.');
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-inner text-xs space-y-3 mt-2">
      <h4 className="font-bold flex items-center gap-1.5 text-slate-800"><Calendar size={14}/> Schedule Interview</h4>
      <div className="space-y-1">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-slate-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-emerald-500/20" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] text-slate-500 font-semibold uppercase">Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border border-slate-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-emerald-500/20" />
      </div>
      <button onClick={handleSchedule} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center gap-1 transition-colors font-medium">
        <Plus size={14}/> Schedule
      </button>
    </div>
  );
}
