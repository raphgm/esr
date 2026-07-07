import { PageBanner } from "./PageBanner";
import { CategoryTabs } from "./CategoryTabs";
import React, { useState } from "react";
import { CommunityChannel, UserProfile } from "../types";
import { MessageSquare, Heart, Send, Calendar, Star, Users } from "lucide-react";

interface CommunitySectionProps {
  userProfile: UserProfile;
  channels: CommunityChannel[];
  onUpdateChannels: (channels: CommunityChannel[]) => void;
}

export default function CommunitySection({
  userProfile,
  channels,
  onUpdateChannels
}: CommunitySectionProps) {
  const [activeChannelId, setActiveChannelId] = useState(channels[0]?.id || "ch-1");
  const [newPostText, setNewPostText] = useState("");
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: `cp-${Date.now()}`,
      author: userProfile.name,
      content: newPostText.trim(),
      time: "Just now",
      likes: 0
    };

    const updated = channels.map(ch => {
      if (ch.id === activeChannelId) {
        return {
          ...ch,
          posts: [newPost, ...ch.posts]
        };
      }
      return ch;
    });

    onUpdateChannels(updated);
    setNewPostText("");
  };

  const handleLikePost = (postId: string) => {
    const updated = channels.map(ch => {
      if (ch.id === activeChannelId) {
        const updatedPosts = ch.posts.map(p => {
          if (p.id === postId) {
            return { ...p, likes: p.likes + 1 };
          }
          return p;
        });
        return { ...ch, posts: updatedPosts };
      }
      return ch;
    });
    onUpdateChannels(updated);
  };

  const handleJoinChallenge = (challengeId: string) => {
    if (joinedChallenges.includes(challengeId)) return;
    setJoinedChallenges([...joinedChallenges, challengeId]);
    alert("Joined! Your progress will be tracked via your ESTARR Profile missions.");
  };

  const upcomingEvents = [
    { title: "Surulere Tailors Meetup & Sourcing Guide", date: "July 12, 2026", time: "2:00 PM", location: "Surulere Hub, Lagos" },
    { title: "Video Editing & CapCut Mobile Bootcamp", date: "July 18, 2026", time: "11:00 AM", location: "Online Classroom" }
  ];

  const challenges = [
    { id: "chal-1", title: "Canva Logo Design challenge (7 Days)", reward: "200 ESTARR points", description: "Design a professional brand logo using Canva and upload it to the 'Zero to YouTuber' class." },
    { id: "chal-2", title: "Whatsapp Catalog Launch Campaign", reward: "150 ESTARR points", description: "Launch your Whatsapp business catalog, list at least 5 products, and share your catalogue links." }
  ];

  return (
    <div id="community-section" className="flex flex-col gap-6">

      <PageBanner
        title="ESTARR Community"
        subtitle="COHORTS & DISCUSSIONS"
        description="Join cohorts, engage in discussions, and share insights with peers."
        icon={Heart}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Channels lists & Events */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Discussion Channels */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" /> Topic Channels
          </h3>
          <div className="flex flex-col gap-1.5">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs transition-all cursor-pointer border ${
                  activeChannelId === ch.id
                    ? "bg-emerald-50 text-emerald-800 border-emerald-100 font-bold"
                    : "text-slate-500 hover:bg-slate-50 border-transparent"
                }`}
              >
                # {ch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Local Events list */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" /> Upcoming Gatherings
          </h3>
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((ev, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100/50 p-3 rounded-xl text-xs flex flex-col gap-1">
                <h4 className="font-bold text-slate-800 leading-snug">{ev.title}</h4>
                <p className="text-[10px] text-slate-9000 font-mono mt-0.5">{ev.date} • {ev.time}</p>
                <span className="text-[10px] text-slate-500 font-semibold mt-1">📍 {ev.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Forum Chat and active challenges */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Active Forum Chat */}
        {activeChannel && (
          <div id="forum-chat-box" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="font-display font-bold text-base text-slate-800"># {activeChannel.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{activeChannel.desc}</p>
              </div>

              <div className="flex flex-col gap-4 max-h-[250px] overflow-y-auto pr-2">
                {activeChannel.posts.map((post) => (
                  <div key={post.id} className="flex gap-3 items-start text-xs border-b border-slate-100/50 pb-3">
                    <div className="bg-emerald-100 text-emerald-800 font-bold w-7 h-7 rounded-full flex items-center justify-center font-mono shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-slate-800 mb-1">
                        <span>{post.author}</span>
                        <span className="text-[10px] text-slate-9000 font-mono">{post.time}</span>
                      </div>
                      <p className="text-slate-500 leading-relaxed">{post.content}</p>
                      
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center gap-1.5 text-[10px] text-slate-9000 font-semibold hover:text-emerald-600 transition-colors mt-2 cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5" /> {post.likes} Likes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreatePost} className="flex gap-2 items-center pt-4 border-t border-slate-100 mt-4">
              <input
                type="text"
                placeholder={`Post an update to #${activeChannel.name}...`}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Community Challenges */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-display font-bold text-base text-slate-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" /> Competitive Cohort Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((chal) => (
              <div key={chal.id} className="border border-slate-100 rounded-xl p-5 flex flex-col justify-between gap-4">
                <div className="text-xs">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {chal.reward}
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-800 mt-2.5">{chal.title}</h4>
                  <p className="text-slate-500 mt-1 line-clamp-3 leading-relaxed">{chal.description}</p>
                </div>

                <button
                  id={`btn-join-challenge-${chal.id}`}
                  onClick={() => handleJoinChallenge(chal.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    joinedChallenges.includes(chal.id)
                      ? "bg-slate-100 text-slate-500"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {joinedChallenges.includes(chal.id) ? "Joined Cohort" : "Join Challenge Cohort"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
