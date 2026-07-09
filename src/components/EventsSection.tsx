import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState } from "react";
import { Calendar, Video, Ticket, MapPin, Users, Radio } from "lucide-react";

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const events = [
    {
      id: 1,
      title: "ESTARR DevCon 2026",
      type: "hybrid",
      date: "August 12-14, 2026",
      location: "Lagos, NG & Online",
      attendees: 1250,
      price: "₦15,000",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
    {
      id: 2,
      title: "Web3 Africa Summit",
      type: "virtual",
      date: "September 5, 2026",
      location: "Online",
      attendees: 800,
      price: "Free",
      image:
        "https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80",
    },
    {
      id: 3,
      title: "Creative Arts Mixer",
      type: "in-person",
      date: "July 20, 2026",
      location: "Abuja, NG",
      attendees: 150,
      price: "₦5,000",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <PageBanner
        title="ESTARR Events"
        subtitle="LIVE STREAMS & TICKETING"
        description="Host masterclasses, participate in community events, and manage ticketing."
        icon={Calendar}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm"
          >
            <div className="h-48 relative overflow-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${
                event.type === "hybrid" ? "from-indigo-600 to-purple-700" :
                event.type === "virtual" ? "from-cyan-600 to-blue-700" :
                event.type === "in-person" ? "from-emerald-600 to-teal-700" :
                "from-slate-700 to-slate-800"
              } flex items-center justify-center`}>
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  {event.type === "hybrid" && <Calendar className="w-8 h-8 text-white/80" />}
                  {event.type === "virtual" && <Video className="w-8 h-8 text-white/80" />}
                  {event.type === "in-person" && <MapPin className="w-8 h-8 text-white/80" />}
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold font-mono uppercase shadow-sm">
                {event.type}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="text-[10px] font-bold text-purple-500 font-mono mb-2 font-medium tracking-wide">
                  {event.date}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight leading-tight mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-1.5 mt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-slate-9000" />{" "}
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Users className="w-4 h-4 text-slate-9000" />{" "}
                    {event.attendees.toLocaleString()} attending
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/10 flex justify-between items-center">
                <span className="font-mono font-bold text-slate-900">
                  {event.price}
                </span>
                <button className="bg-transparent border border-slate-200 hover:bg-slate-950 hover:text-white text-slate-900 px-3 py-1.5 text-[10px] font-semibold tracking-wide flex items-center gap-1.5 transition-colors">
                  <Ticket className="w-3.5 h-3.5" /> RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
