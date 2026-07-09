export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  category: string;
  views: number;
  likes: number;
}

export interface UserProfile {
  accountType?: "freelancer" | "jobOwner" | "creator" | "academyLearner";
  name: string;
  email: string;
  profession: string;
  bio: string;
  location: string;
  avatar: string;
  formalSkills: string[];
  creatorSkills: string[];
  skills: string[];
  interests: string[];
  goals: string[];
  certifications: string[];
  recommends: number;
  birthdate?: string;
  walletBalance?: number;
  instructorEarnings?: number;
  unlockedCourseIds?: string[];
  role?: string;
  level?: string;
  points?: number;
  history?: any[];
  portfolio?: PortfolioItem[];
  handle?: string;
  hasSetupConnectProfile?: boolean;
}

export interface ActivityPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  image?: string;
  video?: string;
  poster?: string;
  videoFilter?: string;
  audioTrack?: string;
  playbackSpeed?: string;
  textOverlay?: string;
  textStyleId?: string;
  duetWithId?: string;
  duetWithAuthor?: string;
  duetWithVideo?: string;
  likes: number;
  comments: { author: string; content: string; time: string }[];
  time: string;
  hasLiked?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: "AI & ML" | "Web3" | "Cloud DevOps" | "Data Science" | "Software Eng." | "Cybersecurity" | "Product Design" | string;
  description: string;
  rating: number;
  students: number;
  image: string;
  lessons: { id: string; title: string; duration: string; completed?: boolean; videoUrl?: string }[];
  missions: { id: string; title: string; reward: string; task: string; completed?: boolean }[];
  quizzes: { question: string; options: string[]; answer: number }[];
  zeroToIncome?: boolean;
  price?: number;
  instructorName?: string;
  instructorAvatar?: string;
  company?: string;
  type?: string;
  location?: string;
  salary?: string;
  skillsRequired?: string[] | string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  seller: string;
  sellerRating: number;
  verified: boolean;
  image: string;
  description: string;
  reviews: { author: string; rating: number; comment: string }[];
}

export interface BrandCampaign {
  id: string;
  title: string;
  brand: string;
  budget: number;
  status: "Open" | "Reviewing" | "Approved" | "Closed";
  platform: "TikTok" | "Instagram" | "YouTube" | "UGC" | "Twitter";
  deliverables: string[];
  image?: string;
  applicationsCount: number;
  createdDate: string;
}

export interface ProjectTask {
  id: string;
  category?: "marketing" | "dev" | "design" | string;
  title: string;
  desc: string;
  status: "todo" | "inprogress" | "review" | "done";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate: string;
  userId?: string;
  comments?: { id: string; author: string; text: string; audioUrl?: string; audioDuration?: number; time: string }[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Internship" | "Apprenticeship" | "Freelance";
  location: string;
  salary: string;
  description: string;
  skillsRequired: string[];
  matchScore?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface SaleRecord {
  id: string;
  customer: string;
  item: string;
  qty: number;
  total: number;
  date: string;
}

export interface ExpenseRecord {
  id: string;
  category: string;
  amount: number;
  desc: string;
  date: string;
}

export interface CommunityChannel {
  id: string;
  name: string;
  desc: string;
  posts: { id: string; author: string; content: string; time: string; likes: number }[];
}

export interface DjinniCandidate {
  id: string;
  userId: string;
  anonymousTitle: string;
  skills: string[];
  desiredSalary: number;
  experienceYears: number;
  remotePreference: "Fully Remote" | "Hybrid" | "Onsite" | string;
  anonymousSummary: string;
  isActive: boolean;
  unlockedUserIds: string[];
}

export interface DjinniPitch {
  id: string;
  candidateId: string;
  candidateUserId: string;
  employerUserId: string;
  employerName: string;
  employerEmail: string;
  jobTitle: string;
  proposedSalary: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
}

