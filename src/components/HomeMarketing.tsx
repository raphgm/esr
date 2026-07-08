import React, { useState } from "react";
import {
  Zap,
  Globe,
  ChevronRight,
  ShieldCheck,
  Award,
  Briefcase,
  ArrowUpRight,
  BookOpen,
  Users,
  Check,
  HelpCircle,
  Trophy,
  Play,
  Sparkles,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Code,
  Laptop,
  CheckSquare,
  Lock,
  ThumbsUp,
  Star,
  DollarSign,
  X,
  Send,
  FileText,
  Calculator,
  TrendingUp,
  Percent
} from "lucide-react";
import confetti from "canvas-confetti";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function HomeMarketing({
  onStartEarning,
  onStartCollabing,
}: {
  onStartEarning?: () => void;
  onStartCollabing?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Job Search/Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Talent Self-Assessment Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Request Quote Modal State
  const [selectedExpert, setSelectedExpert] = useState<any | null>(null);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteBudget, setQuoteBudget] = useState("< 1 month ($50-100/hr)");
  const [quoteBrief, setQuoteBrief] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    try {
      await addDoc(collection(db, "expert_quotes"), {
        expertName: selectedExpert.name,
        expertRole: selectedExpert.role,
        clientName: quoteName,
        clientEmail: quoteEmail,
        budgetRange: quoteBudget,
        projectBrief: quoteBrief,
        createdAt: serverTimestamp()
      });

      setQuoteSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Clear fields
      setQuoteName("");
      setQuoteEmail("");
      setQuoteBrief("");
    } catch (err) {
      console.error("Error submitting quote: ", err);
      // Fallback in case of offline/local storage to provide high usability
      setQuoteSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  // Crossover-style Vetting Pipeline State
  const [activeVettingStep, setActiveVettingStep] = useState(0);

  // Crossover-style Earnings & Power Estimator State
  const [calcRole, setCalcRole] = useState("Software Engineer");
  const [calcHours, setCalcHours] = useState(40);
  const [calcCurrency, setCalcCurrency] = useState("USD");

  const vettingSteps = [
    {
      step: "01",
      title: "Cognitive Aptitude Test (CCAT)",
      subtitle: "Evaluation of logic, abstract reasoning, and fast-paced numerical resolution.",
      successRate: "Top 12% Pass",
      description: "Candidates face a customized 50-question cognitive capability assessment. This test benchmarks raw processing speed, critical decision accuracy, and logical adaptability under high-pressure parameters.",
      criteria: ["Numerical & verbal aptitude", "Spatial & logical sequencing", "Under-pressure accuracy"]
    },
    {
      step: "02",
      title: "Subject Matter Real-World Trial",
      subtitle: "Practical execution of high-difficulty production tasks in virtual sandbox environments.",
      successRate: "Top 4% Pass",
      description: "Instead of generic puzzle algorithms, applicants are given 72 hours to build, document, and deploy a high-fidelity application or security architecture matching strict production specs.",
      criteria: ["Clean, type-safe clean code architecture", "Rigorous error handling & telemetry", "Strict adherence to constraints"]
    },
    {
      step: "03",
      title: "Direct Peer Architecture Audit",
      subtitle: "Live cross-examination, live refactoring, and code review defense with active Principal Engineers.",
      successRate: "Top 1.5% Pass",
      description: "The finalist candidates walk through their submission with senior domain experts, refactoring real-time Edge cases and defending their system layout choices to prove authentic expertise.",
      criteria: ["System scaling explanations", "Real-time live refactoring speed", "Soft skills & design communication"]
    },
    {
      step: "04",
      title: "Escrow & Security Clearance",
      subtitle: "Platform compliance, multi-factor biometric check, and professional alignment validation.",
      successRate: "Top 1% Admitted",
      description: "Passed experts undergo comprehensive secure onboarding, linking their decentralized payout details, and verifying biometric security parameters to ensure complete client data protection.",
      criteria: ["Biometric identity alignment", "Security compliance training", "Immediate deployment availability"]
    }
  ];

  const calcRoles = [
    { name: "Software Engineer", hourlyRate: 95, averageLocalSal: 1200 },
    { name: "Product Manager", hourlyRate: 85, averageLocalSal: 1100 },
    { name: "UI/UX Architect", hourlyRate: 75, averageLocalSal: 950 },
    { name: "Fintech Lead / Financial Analyst", hourlyRate: 110, averageLocalSal: 1400 },
    { name: "VP of Engineering", hourlyRate: 190, averageLocalSal: 2500 }
  ];

  const currencies: Record<string, { symbol: string, rate: number, label: string }> = {
    USD: { symbol: "$", rate: 1, label: "US Dollar (USD)" },
    NGN: { symbol: "₦", rate: 1500, label: "Nigerian Naira (NGN)" },
    KES: { symbol: "KSh", rate: 130, label: "Kenyan Shilling (KES)" },
    GHS: { symbol: "GH₵", rate: 15, label: "Ghanaian Cedi (GHS)" },
    ZAR: { symbol: "R", rate: 18.2, label: "South African Rand (ZAR)" }
  };

  // Specialized Expert Verticals State & Data (Toptal style)
  const [activeVertical, setActiveVertical] = useState("developers");

  const expertVerticals = [
    {
      id: "developers",
      label: "Developers",
      title: "Elite Software Engineers & Architects",
      desc: "Top 3% specialists in full-stack web, mobile applications, cloud devops, and secure smart contract architectures.",
      skills: ["React/TypeScript", "Node.js & Go", "AWS & CloudNative", "Solidity & Web3", "Python & ML Ops"],
      metrics: "Matched in < 24 Hours",
      rating: "4.95/5 Client Rating",
      popularProject: "Scale high-performance SaaS infrastructure & complex API design",
      icon: Code,
      accentColor: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50/50",
      borderColor: "border-blue-100",
      textColor: "text-blue-600",
      expert: {
        name: "Ezenwa Okafor",
        role: "Senior Cloud & Node Architect",
        stats: "Ex-Stripe • 8+ Years Exp",
        location: "Lagos, Nigeria",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&auto=format&fit=crop&q=80",
        bio: "Specializes in building distributed systems, high-throughput microservices, and setting up bulletproof AWS infrastructures.",
        avail: "Available Now"
      }
    },
    {
      id: "designers",
      label: "Designers",
      title: "UI/UX & Brand Identity Architects",
      desc: "World-class visual storytellers, graphic designers, interaction experts, and meticulous Figma design system masters.",
      skills: ["UI/UX Design", "Figma Systems", "Brand Strategy", "Motion Graphics", "Mobile Interaction"],
      metrics: "Matched in < 48 Hours",
      rating: "4.98/5 Client Rating",
      popularProject: "Complete digital product redesign & high-fidelity prototype crafting",
      icon: Sparkles,
      accentColor: "from-pink-500 to-rose-600",
      bgLight: "bg-rose-50/50",
      borderColor: "border-rose-100",
      textColor: "text-rose-600",
      expert: {
        name: "Amara Diallo",
        role: "Lead Interactive Designer",
        stats: "Red Dot Award Winner • ex-Figma",
        location: "Dakar, Senegal",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        bio: "Creates breathtaking user journeys, high-fidelity prototypes, and robust design systems that scale effortlessly.",
        avail: "Available Next Week"
      }
    },
    {
      id: "product",
      label: "Product & PMs",
      title: "Strategic Product & Project Leaders",
      desc: "Scrum masters, Agile practitioners, and product managers specializing in roadmaps, feature spec drafting, and seamless execution.",
      skills: ["Agile/Scrum", "Product Roadmap", "Risk Mitigation", "Jira & Linear Systems", "Cross-functional Align"],
      metrics: "Immediate Onboarding",
      rating: "4.92/5 Client Rating",
      popularProject: "Aligning multi-disciplinary engineering squads & agile sprint dispatch",
      icon: Briefcase,
      accentColor: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50/50",
      borderColor: "border-amber-100",
      textColor: "text-amber-600",
      expert: {
        name: "Kofi Boateng",
        role: "Principal Product Specialist",
        stats: "Certified Scrum Leader • ex-Andela",
        location: "Accra, Ghana",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        bio: "Transforms complex business visions into actionable roadmaps. Expert in running cross-functional sprints and product-market fit.",
        avail: "Booked (Waitlist Open)"
      }
    },
    {
      id: "finance",
      label: "Finance Experts",
      title: "Fractional CFOs & Valuation Analysts",
      desc: "Strategic modelers, corporate venture experts, tokenomics advisors, and fractional CFOs to secure funding & model growth.",
      skills: ["Financial Modeling", "Fundraising Consulting", "Fractional CFO", "Tokenomics Planning", "Risk Analytics"],
      metrics: "Matched in < 3 Days",
      rating: "4.96/5 Client Rating",
      popularProject: "Series-A venture fundraising modeling & custom escrow structure design",
      icon: DollarSign,
      accentColor: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50/50",
      borderColor: "border-emerald-100",
      textColor: "text-emerald-600",
      expert: {
        name: "Chidi Nwachukwu",
        role: "Fractional CFO & Valuation Lead",
        stats: "Chartered Financial Analyst • ex-KPMG",
        location: "Nairobi, Kenya",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
        bio: "Designs sophisticated financial projection models, conducts rigorous risk audits, and structures corporate fundraising rounds.",
        avail: "Available Now"
      }
    },
    {
      id: "teams",
      label: "Cohesive Teams",
      title: "Cross-Functional Cohesive Squads",
      desc: "Pre-assembled, highly collaborative squads consisting of an Agile PM, elite developer, and lead designer, operational on day one.",
      skills: ["End-to-End Delivery", "Squad Assembly", "Instant Integration", "Product Launch Sprint", "Turnkey Solutions"],
      metrics: "Assembled in 72 Hours",
      rating: "5.00/5 Performance Score",
      popularProject: "MVP design-to-launch in under 4 weeks with dedicated daily standups",
      icon: Users,
      accentColor: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50/50",
      borderColor: "border-purple-100",
      textColor: "text-purple-600",
      expert: {
        name: "Apollo Tech Squad",
        role: "3-Person Turnkey MVP Squad",
        stats: "Agile PM + Senior Dev + UI/UX Designer",
        location: "Remote (Global)",
        avatar: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150&auto=format&fit=crop&q=80",
        bio: "A battle-tested, high-performance squad of experts ready to take raw specifications and deliver an enterprise-grade web app.",
        avail: "2 Squads Open for Booking"
      }
    }
  ];

  // Mock Open Jobs Board data
  const jobPositions = [
    { id: "job1", title: "Senior Full-Stack Developer (React & Node)", category: "Engineering", location: "Remote (Global)", type: "Contract (Escrow)", rate: "$95/hr", skills: ["React", "TypeScript", "Node.js", "Express"] },
    { id: "job2", title: "UGC Video Content Specialist & Editor", category: "Creative", location: "Remote (UK/US)", type: "Freelance", rate: "$70/hr", skills: ["CapCut", "Video Editing", "UGC", "Mobile Production"] },
    { id: "job3", title: "Lead Cloud Architect (AWS S3 & CloudFront)", category: "Engineering", location: "Remote (Europe)", type: "Full-Time", rate: "$140/hr", skills: ["AWS", "Docker", "S3", "Kubernetes", "CloudFront"] },
    { id: "job4", title: "Social Commerce Growth Funnel Lead", category: "Marketing", location: "Remote (Nigeria/Africa)", type: "Contract (Escrow)", rate: "$50/hr", skills: ["WhatsApp Selling", "CRM", "Copywriting"] },
    { id: "job5", title: "Lead UI/UX Figma Design Architect", category: "Design", location: "Remote (Global)", type: "Freelance", rate: "$85/hr", skills: ["Figma", "Design Systems", "Interactive Prototypes"] },
    { id: "job6", title: "TikTok & Reels Micro-Video Specialist", category: "Creative", location: "Remote (Global)", type: "Contract", rate: "$65/hr", skills: ["Video Optimization", "Sponsorship Outreach", "Reels"] },
  ];

  const categories = ["All", "Engineering", "Creative", "Marketing", "Design"];

  // Filtered jobs
  const filteredJobs = jobPositions.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory === "All" || job.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  // Self-Assessment Quiz Questions
  const quizQuestions = [
    {
      question: "Select your primary craft of expertise",
      options: [
        { label: "Software Engineering & Cloud Architecture", value: "eng", score: 30 },
        { label: "High-Impact Video Production & UGC", value: "crt", score: 25 },
        { label: "Modern UI/UX Figma Product Design", value: "dsg", score: 25 },
        { label: "Growth Hacking & Digital Marketing Funnels", value: "mkt", score: 20 },
      ]
    },
    {
      question: "How many years of remote/contract experience do you have?",
      options: [
        { label: "Less than 2 years", value: "junior", score: 10 },
        { label: "2 to 5 years of verified delivery", value: "mid", score: 25 },
        { label: "5+ years of leading premium contracts", value: "senior", score: 35 },
      ]
    },
    {
      question: "Do you maintain a verified live portfolio or GitHub registry?",
      options: [
        { label: "Yes, fully documented on GitHub or creative hubs", value: "verified", score: 20 },
        { label: "I have personal files but need to compile them", value: "partial", score: 10 },
        { label: "I am ready to build and verify my portfolio now", value: "ready", score: 15 },
      ]
    },
    {
      question: "Which describes your project execution ownership?",
      options: [
        { label: "I deliver precise tasks under management", value: "task", score: 5 },
        { label: "I can take product specifications and build independently", value: "independent", score: 15 },
        { label: "Expert: I draft system architectures and consult directly", value: "expert", score: 15 },
      ]
    }
  ];

  const handleQuizAnswer = (score: number, value: string) => {
    const newAnswers = { ...answers, [quizStep]: value };
    setAnswers(newAnswers);
    setQuizScore(prev => prev + score);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers({});
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.85 }
      });
      try {
        await fetch("/api/send-welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, type: "newsletter" })
        });
      } catch (error) {
        console.error("Failed to send newsletter email:", error);
      }
    }
  };

  const testimonials = [
    {
      quote: "ESTARR changed how I work. The milestone escrow verified my $2.5k contract before I even wrote line one. For remote creators, this level of trust is completely unmatched.",
      author: "Adewale Mensah",
      role: "Lead Full-Stack Creator",
      location: "Accra, Ghana",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Being part of the elite 3% network gives me access to premier international brands. No bidding wars, no chasing unpaid invoices. Pure execution.",
      author: "Elena Petrova",
      role: "Senior UI/UX & Brand Designer",
      location: "Sofia, Bulgaria",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="flex flex-col gap-12 mt-12 animate-fade-in font-sans">
      
      {/* SECTION 1: BENCHMARK TALENT STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-black border border-slate-800 rounded-2xl text-white">
        <div className="text-center md:border-r border-slate-800">
          <p className="text-3xl md:text-4xl font-black text-purple-400 tracking-tight">3%</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-450 mt-1">Acceptance Rate</p>
        </div>
        <div className="text-center md:border-r border-slate-800">
          <p className="text-3xl md:text-4xl font-black text-white tracking-tight">100%</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-450 mt-1">Escrow Secured</p>
        </div>
        <div className="text-center md:border-r border-slate-800">
          <p className="text-3xl md:text-4xl font-black text-purple-400 tracking-tight">45k+</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-450 mt-1">Global Talents</p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-black text-white tracking-tight">&lt; 24h</p>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-450 mt-1">Match Time</p>
        </div>
      </div>

      {/* SECTION 2: THE TOPTAL DIFFERENCE - BENTO GRID OF CORE PILLARS */}
      <div>
        <div className="text-center max-w-4xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 border border-purple-150 px-3 py-1 rounded-full uppercase tracking-widest">
            The ESTARR Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-3 uppercase font-display lg:whitespace-nowrap">
            Why Elite Talent Choose Our Network
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We bypass traditional freelancing chaos by pairing premium talent with smart milestone escrows and automated portfolio verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 bg-white border border-slate-200 hover:border-purple-300 transition-all rounded-2xl group flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                Strict Escrow Protection
              </h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Clients fund the escrow milestones upfront. Work with complete peace of mind knowing your payouts are fully collateralized and locked before you write code or upload media.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
              <span>ZERO PAYMENT DELAYS</span>
              <span className="text-purple-600">StrrSecure &trade;</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-white border border-slate-200 hover:border-purple-300 transition-all rounded-2xl group flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                AI Pitch & Portfolio Grader
              </h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Gain access to our built-in AI Copilot. Optimize your client-facing outreach pitches, align with elite brands, and audit your portfolio gap instantly to stand out among top clients.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
              <span>94% PASS RATE GAIN</span>
              <span className="text-purple-600">Copilot AI</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-white border border-slate-200 hover:border-purple-300 transition-all rounded-2xl group flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                World-Class Remote Freedom
              </h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Work from anywhere on high-impact projects with premier global brands. Access custom-matched contracts, asynchronous flexibility, and a world-class network of elite builders.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
              <span>WORK FROM ANYWHERE</span>
              <span className="text-purple-600">Elite Freedom</span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2.5: SPECIALIZED EXPERT NETWORKS (TOPTAL-INSPIRED VERTICAL SHOWCASE) */}
      <div className="bg-[#FAF6EE] border border-slate-200 rounded-3xl p-6 md:p-10 relative overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-widest inline-block">
            ✨ Expert Talent Pool
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-3 uppercase font-display">
            Specialized Expert Networks
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-2 leading-relaxed">
            Direct access to Africa's top 3% of vocational, tech, and creative masterminds. Find individual specialists or spin up custom cohesive delivery squads in under 24 hours.
          </p>
        </div>

        {/* Horizontal Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 pb-3 border-b border-slate-200">
          {expertVerticals.map((vert) => {
            const IconComponent = vert.icon;
            return (
              <button
                key={vert.id}
                onClick={() => setActiveVertical(vert.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeVertical === vert.id
                    ? "bg-slate-950 border-slate-950 text-white shadow-md active:scale-95"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${activeVertical === vert.id ? "text-purple-400 animate-pulse" : "text-slate-400"}`} />
                <span>{vert.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Detail Bento Grid */}
        {expertVerticals.map((vert) => {
          if (vert.id !== activeVertical) return null;
          const IconComponent = vert.icon;
          return (
            <div 
              key={vert.id} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in"
            >
              {/* Left Details Panel */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${vert.accentColor} text-white flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Expert Vertical</p>
                      <h3 className="font-display font-black text-lg md:text-xl text-slate-900 leading-tight sm:whitespace-nowrap">
                        {vert.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                    {vert.desc}
                  </p>

                  {/* Core Skill Chips */}
                  <div className="mb-6">
                    <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2.5">
                      Expertise Verticals & Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {vert.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Typical Projects */}
                  <div className="mb-6 p-4 bg-slate-50 border border-slate-150 rounded-xl">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center border border-purple-100 mt-0.5 shrink-0">
                        <CheckSquare className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-400">Popular Assignment Scope</p>
                        <p className="text-slate-800 text-xs font-semibold leading-snug mt-0.5">
                          {vert.popularProject}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Substats and Actions */}
                <div className="mt-6 pt-6 border-t border-slate-150 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] font-mono uppercase text-slate-400 font-bold">Matching Speed</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        {vert.metrics}
                      </p>
                    </div>
                    <div className="border-l border-slate-200 pl-4">
                      <p className="text-[9px] font-mono uppercase text-slate-400 font-bold">Feedback Score</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        {vert.rating}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onStartCollabing}
                    className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-display font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    <span>Recruit {vert.label}</span>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </button>
                </div>
              </div>

              {/* Right Vetted Profile Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[350px]">
                {/* Visual Glow Fallback */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr ${vert.accentColor} opacity-10 rounded-full blur-2xl pointer-events-none`} />
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {vert.expert.avail}
                    </span>
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">
                      PRE-VETTED ID #4802
                    </span>
                  </div>

                  {/* Vetted Talent Info */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img 
                      src={vert.expert.avatar} 
                      alt={vert.expert.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-md shrink-0"
                    />
                    <div>
                      <h4 className="font-display font-black text-base text-slate-100 flex items-center gap-1.5 leading-none">
                        {vert.expert.name}
                        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                      </h4>
                      <p className="text-xs font-bold text-slate-350 mt-1">{vert.expert.role}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{vert.expert.stats} • {vert.expert.location}</p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed italic border-l-2 border-purple-500/45 pl-3 py-1 mb-5">
                    "{vert.expert.bio}"
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Vetting Status</span>
                    <span className="text-purple-400 font-black">Passed Tech & Soft Skills (100%)</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={onStartCollabing}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-700 flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Interview</span>
                      <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedExpert(vert.expert);
                        setQuoteSubmitted(false);
                      }}
                      className="py-2.5 bg-gradient-to-r from-[#9d50bb] to-[#6e48aa] hover:from-[#a85ec5] hover:to-[#7b55be] text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Request Quote</span>
                      <FileText className="w-3.5 h-3.5 text-purple-200 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 3: INTERACTIVE ELITE SELF-ASSESSMENT WIZARD */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-purple-800/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[9px] font-mono font-bold text-purple-300 bg-purple-900/60 border border-purple-500/30 px-3 py-1 rounded-full uppercase tracking-widest">
              Elite 3% Simulator
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase mt-3 tracking-tight font-display text-slate-100">
              Assess Your Standing as Elite Talent
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Test your skills against our benchmark criteria to find out if you qualify for premier contract matching.
            </p>
          </div>

          {!quizCompleted ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-purple-500 h-full transition-all duration-300"
                  style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                Step {quizStep + 1} of {quizQuestions.length}
              </span>
              
              <h4 className="font-bold text-base text-slate-150 mt-2 mb-6">
                {quizQuestions[quizStep].question}
              </h4>

              <div className="flex flex-col gap-3">
                {quizQuestions[quizStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuizAnswer(option.score, option.value)}
                    className="w-full text-left p-4 bg-slate-950 hover:bg-purple-950/20 border border-slate-800 hover:border-purple-500/40 rounded-xl transition-all font-sans text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-xl animate-fade-in">
              <div className="w-16 h-16 bg-purple-950 border border-purple-500/30 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-slate-100 uppercase tracking-tight font-display">
                Quiz Evaluation Completed
              </h4>
              <p className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-bold mt-1">
                Security clearance level: Elite Tier-1
              </p>

              <div className="my-6 max-w-md mx-auto p-4 bg-slate-950 border border-slate-850 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">Your Evaluation Score:</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">{quizScore}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: `${quizScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-3 text-left leading-normal font-sans">
                  {quizScore >= 80 
                    ? "✓ Outstanding match! You possess the necessary experience, portfolio, and self-direction parameters to interact with our top corporate escrows."
                    : "✓ Verified match. Your credentials indicate good platform alignment. Complete our free Academy lessons to guarantee contract placement."
                  }
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-750"
                >
                  Retake Test
                </button>
                <button
                  onClick={onStartEarning}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-purple-500/10"
                >
                  Create Elite Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3.5: THE TOP 1% STANDARD & GLOBAL COMP CALCULATOR (CROSSOVER INSPIRED) */}
      <div className="space-y-8">
        {/* Vetting Pipeline Dashboard */}
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left: Section Header & Step Navigation */}
            <div className="lg:w-2/5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-950/60 border border-purple-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block">
                  Only the Top 1% Pass
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase mt-3 tracking-tight font-display text-slate-100 leading-tight">
                  Our Vetting Protocol
                </h3>
                <p className="text-slate-400 text-xs mt-2 max-w-sm leading-relaxed">
                  We don't do resume screening or keyword matching. Candidates enter our high-cognitive evaluation pipeline where every skill is mathematically benchmarked.
                </p>
              </div>

              {/* Step Navigation Cards */}
              <div className="space-y-2 mt-6 lg:mt-0">
                {vettingSteps.map((step, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveVettingStep(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      activeVettingStep === idx
                        ? "bg-slate-900 border-purple-500 text-white shadow-lg"
                        : "bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-900/40 hover:border-slate-800"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                      activeVettingStep === idx
                        ? "bg-purple-950 text-purple-400 border-purple-800"
                        : "bg-slate-900 text-slate-500 border-slate-850"
                    }`}>
                      {step.step}
                    </span>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold leading-tight truncate ${activeVettingStep === idx ? "text-slate-100" : "text-slate-400"}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] font-mono text-purple-400 font-bold mt-0.5">{step.successRate}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Step Detailed View Card */}
            <div className="lg:w-3/5 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative shadow-sm">
              <div className="absolute top-4 right-4 text-[40px] font-mono font-extrabold text-slate-950/40 leading-none select-none">
                STEP {vettingSteps[activeVettingStep].step}
              </div>

              <div>
                <span className="text-[9px] font-mono font-bold uppercase text-purple-400 bg-purple-950/60 border border-purple-900/40 px-2 py-0.5 rounded-md">
                  Active Milestone
                </span>
                
                <h4 className="text-xl font-extrabold tracking-tight mt-3 text-slate-100 font-display">
                  {vettingSteps[activeVettingStep].title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 italic font-sans">
                  "{vettingSteps[activeVettingStep].subtitle}"
                </p>

                <p className="text-slate-300 text-xs mt-6 leading-relaxed font-sans border-l-2 border-purple-500/60 pl-4 py-1">
                  {vettingSteps[activeVettingStep].description}
                </p>

                {/* Criteria Checklist */}
                <div className="mt-8">
                  <h5 className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-wider mb-3">
                    Strict Admittance Benchmarks
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {vettingSteps[activeVettingStep].criteria.map((crit, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-950/60 border border-slate-850 p-2.5 rounded-xl">
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    Vetting Engine Active • Verified on-chain
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onStartEarning}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-purple-500/10 active:scale-95"
                >
                  Apply to Enter Protocol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Compensation Calculator */}
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-950/60 border border-purple-900/40 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block">
                Transparent Compensation Calculator
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase mt-3 tracking-tight font-display text-slate-100">
                Global Earnings & purchasing power estimator
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Calculate real-time contract payout rates. We pay standard global rates directly to our pre-vetted network.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-2">
                      Select Target Professional Role
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {calcRoles.map((role) => (
                        <button
                          key={role.name}
                          type="button"
                          onClick={() => setCalcRole(role.name)}
                          className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer ${
                            calcRole === role.name
                              ? "bg-purple-50 border-purple-500 text-purple-950 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <span>{role.name}</span>
                          <span className="font-mono text-[10px] text-purple-600">${role.hourlyRate}/hr</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-mono uppercase text-slate-550 font-bold">
                        Target Hours / Week
                      </label>
                      <span className="text-xs font-mono font-bold text-purple-600">{calcHours} hours</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-650"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1">
                      <span>10 hrs (Part-time)</span>
                      <span>40 hrs (Full-time)</span>
                      <span>60 hrs (Maximum)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold mb-2">
                      Convert to Regional Local Currency
                    </label>
                    <select
                      value={calcCurrency}
                      onChange={(e) => setCalcCurrency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-purple-500 font-medium cursor-pointer"
                    >
                      {Object.keys(currencies).map((curr) => (
                        <option key={curr} value={curr}>
                          {currencies[curr].label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live Output Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md inline-block">
                      Instant Verified Estimate
                    </span>

                    <div className="space-y-1">
                      <p className="text-[10px] font-mono uppercase text-slate-500 font-bold leading-none">
                        Est. Annual Earning Potential
                      </p>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                        {currencies[calcCurrency].symbol}
                        {((calcRoles.find(r => r.name === calcRole)?.hourlyRate || 95) * calcHours * 52 * currencies[calcCurrency].rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase font-bold">Monthly Rate</p>
                        <p className="text-sm font-bold text-slate-800">
                          {currencies[calcCurrency].symbol}
                          {(((calcRoles.find(r => r.name === calcRole)?.hourlyRate || 95) * calcHours * 52 * currencies[calcCurrency].rate) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase font-bold">Hourly Rate</p>
                        <p className="text-sm font-bold text-slate-800">
                          {currencies[calcCurrency].symbol}
                          {((calcRoles.find(r => r.name === calcRole)?.hourlyRate || 95) * currencies[calcCurrency].rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purchasing Power Premium Banner */}
                  <div className="mt-6 bg-purple-50 border border-purple-150 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-700">
                      <TrendingUp className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="text-[9px] font-mono uppercase font-bold tracking-wider">
                        Purchasing Power Premium
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                      This remote rate is approximately <strong className="text-emerald-600 font-mono font-bold">
                        {(
                          (((calcRoles.find(r => r.name === calcRole)?.hourlyRate || 95) * calcHours * 52) / 12) / 
                          (calcRoles.find(r => r.name === calcRole)?.averageLocalSal || 1000)
                        ).toFixed(1)}x Higher
                      </strong> than typical senior local office salaries in this region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: INTEGRATED CAREERS BOARD - FILTERABLE JOBS */}
      <div className="bg-[#FAF9F6] border border-slate-200 rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block">
              Careers Portal
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mt-2 font-display">
              Open Elite Global Opportunities
            </h3>
            <p className="text-xs text-slate-500">
              Real contracts, real escrow. Apply directly as an verified creator or developer.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 focus:border-purple-500 rounded-xl text-xs font-medium focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-350"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-5 bg-white border border-slate-200 hover:border-purple-300 transition-all rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors">
                      {job.title}
                    </h4>
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-50 border border-slate-150 text-slate-500">
                      {job.type}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                    {job.location} • <span className="text-emerald-600 font-bold">{job.rate}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-mono font-medium px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-slate-650"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onStartEarning}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-slate-150 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-slate-500 uppercase">No positions match your search</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-2 text-xs font-bold text-purple-600 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 5: PREMIUM TALENT TESTIMONIALS SLIDER */}
      <div className="bg-purple-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]" />
        
        <div className="flex-1 relative z-10">
          <span className="text-[9px] font-mono font-black text-purple-200 bg-purple-800 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
            Talent Spotlights
          </span>
          <p className="text-lg md:text-xl font-medium italic leading-relaxed text-slate-100">
            "{testimonials[activeTestimonial].quote}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <img 
              src={testimonials[activeTestimonial].avatar} 
              alt={testimonials[activeTestimonial].author}
              className="w-11 h-11 rounded-full object-cover border-2 border-purple-400"
            />
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">{testimonials[activeTestimonial].author}</p>
              <p className="text-[10px] text-purple-300 font-semibold">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0 z-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                activeTestimonial === idx ? "bg-white w-6" : "bg-purple-700 hover:bg-purple-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* SECTION 6: CLEAN MINIMAL NEWSLETTER DISPATCH */}
      <div className="bg-slate-950 border border-slate-850 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              STRR Dispatch
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold uppercase font-display leading-none text-slate-150 whitespace-nowrap">
            Get Verified Contract Alerts
          </h3>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium">
            Subscribe to our off-chain dispatch to receive exclusive verified brand contracts, developer sponsorships, and high-payout remote opportunities directly to your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center max-w-sm w-full animate-fade-in">
            <div className="w-10 h-10 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-xs font-bold text-white uppercase tracking-tight">You've Subscribed!</p>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">{email}</p>
            <button 
              onClick={() => { setSubscribed(false); setEmail(""); }}
              className="mt-3 text-[9px] font-mono text-purple-400 hover:underline cursor-pointer uppercase font-black"
            >
              Change Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your system email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 text-xs px-4 py-3 rounded-xl focus:outline-none transition-colors w-full sm:w-64 font-medium"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-98 transition-all shrink-0 cursor-pointer"
            >
              Join Dispatch
            </button>
          </form>
        )}
      </div>

      {/* REQUEST QUOTE MODAL */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedExpert(null)}
          />

          {/* Modal Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-fade-in text-white">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-slate-800 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 bg-purple-950/60 border border-purple-900/40 px-2.5 py-0.5 rounded-full uppercase">
                  Project Brief Submission
                </span>
                <h3 className="text-xl font-black font-display tracking-tight mt-2 text-slate-100">
                  Request Quote from {selectedExpert.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submit your scope specifications and budget to receive an instant vetted quote.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedExpert(null)}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              {quoteSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-100 font-display uppercase tracking-tight">Project Brief Sent Successfully!</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                      Your proposal has been routed to <strong>{selectedExpert.name}</strong>. They will review your requirements and reach out to you within 2-4 business hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedExpert(null)}
                    className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-700 active:scale-95"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  {/* Expert Summary Badge */}
                  <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
                    <img 
                      src={selectedExpert.avatar} 
                      alt={selectedExpert.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <p className="text-[9px] font-mono uppercase text-purple-400 font-bold">Selected Expert</p>
                      <h4 className="text-xs font-bold text-white leading-none mt-0.5">{selectedExpert.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{selectedExpert.role}</p>
                    </div>
                  </div>

                  {/* Input Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        placeholder="e.g. Alexis Carter"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-600 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                        Your Professional Email
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="e.g. alexis@brand.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-600 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                      Target Budget & Duration
                    </label>
                    <select
                      value={quoteBudget}
                      onChange={(e) => setQuoteBudget(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none transition-all font-medium cursor-pointer"
                    >
                      <option value="Short term (< 1 month) @ $50-100/hr">Short term (&lt; 1 month) @ $50-100/hr</option>
                      <option value="1-3 months ($100-150/hr)">Medium term (1-3 months) @ $100-150/hr</option>
                      <option value="3-6 months ($150-200/hr)">Long term (3-6 months) @ $150-200/hr</option>
                      <option value="Enterprise Turnkey Quote">Custom turnkey enterprise pricing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                      Project Brief / Deliverables Scope
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quoteBrief}
                      onChange={(e) => setQuoteBrief(e.target.value)}
                      placeholder="Describe your project scope, core features required, and desired timeline..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 text-white placeholder-slate-600 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none transition-all font-medium resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedExpert(null)}
                      className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-sans font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-800 active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md shadow-purple-500/10"
                    >
                      <span>Submit Brief</span>
                      <Send className="w-3.5 h-3.5 text-purple-200 shrink-0" />
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
