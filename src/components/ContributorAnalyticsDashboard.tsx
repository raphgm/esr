import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { UserProfile, ConsultancyTask, PortfolioItem, ActivityPost } from '../types';
import { TrendingUp, Award, CheckCircle, Eye, ThumbsUp } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  tasks: ConsultancyTask[];
  posts: ActivityPost[];
}

export function ContributorAnalyticsDashboard({ userProfile, tasks, posts }: Props) {
  // Dynamically calculated stats
  const totalEarnings = tasks.filter(t => t.status === 'done').reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const accuracyRate = completedTasks > 0 ? (tasks.filter(t => t.qualityScore && t.qualityScore > 3).length / completedTasks * 100).toFixed(0) : 0;
  
  // Real-time dynamic badge system based on performance
  const TIERED_BADGES = {
    CONTRIBUTOR: [
      { threshold: 5, name: 'Contributor', color: 'bg-slate-500' },
      { threshold: 10, name: 'Pro Contributor', color: 'bg-emerald-500' },
      { threshold: 25, name: 'Elite Contributor', color: 'bg-violet-500' },
    ],
    INFLUENCER: [
      { threshold: 10, name: 'Rising Influencer', color: 'bg-orange-500' },
      { threshold: 50, name: 'Influencer', color: 'bg-amber-500' },
      { threshold: 200, name: 'Top Influencer', color: 'bg-rose-500' },
    ]
  };

  const getHighestBadge = (tiers: any[], count: number) => {
      if (count === 0) return null;
      return [...tiers].reverse().find(t => count >= t.threshold);
  }

  const badges = [];
  const contributorBadge = getHighestBadge(TIERED_BADGES.CONTRIBUTOR, completedTasks);
  const influencerBadge = getHighestBadge(TIERED_BADGES.INFLUENCER, totalLikes);
  
  if (contributorBadge) badges.push(contributorBadge);
  if (influencerBadge) badges.push(influencerBadge);

  const data = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'inprogress').length },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length },
    { name: 'Done', value: completedTasks },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase font-display">Contributor Analytics</h2>
        <div className="flex gap-2">
            {badges.map(b => <span key={b.name} className={`${b.color} text-white px-2 py-1 rounded text-[10px] font-bold`}>{b.name}</span>)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Award className="w-5 h-5 text-indigo-500" />} label="Total Earnings" value={totalEarnings} />
        <StatCard icon={<ThumbsUp className="w-5 h-5 text-rose-500" />} label="Total Likes" value={totalLikes} />
        <StatCard icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} label="Accuracy Rate (%)" value={Number(accuracyRate)} />
        <StatCard icon={<Award className="w-5 h-5 text-amber-500" />} label="Total Points" value={userProfile.points || 0} />
      </div>

      <div className="h-64 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" name="Tasks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-black text-slate-900 tracking-tighter">{value.toLocaleString()}</p>
    </div>
  );
}
