import React from "react";
import { X, Bell, CheckCircle2, ShieldCheck, Award, MessageCircle } from "lucide-react";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Escrow Milestone Released",
      message: "The funds for 'Marketing Strategy v1' have been released to your wallet.",
      time: "10 mins ago",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      id: 2,
      title: "New Course Certificate",
      message: "You earned a new certificate: Advanced Escrow Operations.",
      time: "2 hours ago",
      icon: Award,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      id: 3,
      title: "New Message in Connect",
      message: "Amina has replied to your partnership request.",
      time: "5 hours ago",
      icon: MessageCircle,
      color: "text-blue-500",
      bg: "bg-blue-50"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-white max-w-sm w-full h-full p-6 shadow-2xl flex flex-col border-l border-slate-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 uppercase tracking-tight">
            <Bell className="w-5 h-5 text-purple-500" /> Notifications
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-slate-100 p-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {notifications.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors bg-slate-50/50">
                <div className={`${n.bg} ${n.color} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-9000 font-mono mt-2 block">{n.time}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 mt-auto border-t border-slate-100">
          <button className="w-full py-3 bg-slate-950 text-white font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
