export interface PipelineCandidate {
  id: number;
  name: string;
  stage: "Screening" | "Interview" | "Offer" | "Hired";
  role: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  category: string;
  views: number;
  likes: number;
}

export interface UserProfile {
  accountType?: "independent" | "jobOwner";
  name: string;
  email: string;
  profession: string;
  bio: string;
  location: string;
  avatar: string;
  skills: string[];
  skillScore?: number;
  reputation?: number;
  interests: string[];
  goals: string[];
  certifications: string[];
  recommends: number;
  birthdate?: string;
  walletBalance?: number;
  walletTransactions?: {
    id: string;
    type: "receive" | "send";
    amount: number;
    sender?: string;
    receiver?: string;
    date: string;
    status: "completed" | "pending";
    description?: string;
  }[];
  instructorEarnings?: number;
  unlockedCourseIds?: string[];
  role?: string;
  level?: string;
  points?: number;
  referrals?: number;
  history?: any[];
  portfolio?: PortfolioItem[];
  handle?: string;
  hasSetupConnectProfile?: boolean;
  apiKey?: string;
  clientSecret?: string;
  webhooks?: {
    id: string;
    url: string;
    events: string[];
    status: string;
    secret: string;
  }[];
  webhookLogs?: {
    id: string;
    timestamp: string;
    event: string;
    url: string;
    status: number;
    payload: string;
    response: string;
  }[];
  appIntegrations?: {
    id: string;
    name: string;
    desc: string;
    accent: string;
    connected: boolean;
    config: any;
  }[];
  badgeTheme?: "cosmic" | "emerald" | "amber" | "dark";
  badgeSize?: "small" | "medium" | "large";
  badgeType?: "client" | "talent";
  sidebarTheme?: "white" | "ivory" | "slate" | "indigo" | "emerald" | "amber";
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
  color?: string;
  applicationsCount: number;
  createdDate: string;
}

export interface Annotation {
  id: string;
  type: "bounding-box" | "timestamp";
  data: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    timestamp?: string;
  };
  label: string;
  workflowStatus: "Draft" | "Review" | "Approved" | "Rejected";
}

export interface ConsultancyTask {
  id: string;
  category?: "marketing" | "dev" | "design" | string;
  title: string;
  desc: string;
  status: "todo" | "inprogress" | "review" | "done" | "needs-verification";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  dueDate?: string;
  amount?: number;
  userId?: string;
  comments?: { id: string; author: string; text: string; audioUrl?: string; audioDuration?: number; time: string }[];
  reviewerId?: string;
  feedback?: string;
  qualityScore?: number;
  skillRequired?: string;
  requiredConsensus?: number;
  validationRules?: { minTags?: number; minDuration?: number };
  consensusResults?: { userId: string; result: any }[];
  annotations?: Annotation[];
  blockingTaskIds?: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Internship" | "Apprenticeship" | "Independent" | "Freelance";
  location: string;
  salary: string;
  description: string;
  skillsRequired: string[];
  requirements?: string[];
  matchScore?: number;
  shareUrl?: string;
  status?: "pending" | "approved";
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateName: string;
  candidateId: string;
  status: "applied" | "reviewing" | "interview" | "offered" | "rejected";
  createdAt: string;
}

export interface InterviewSlot {
  id: string;
  jobId: string;
  candidateId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: "available" | "scheduled" | "cancelled";
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
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


export interface Survey {
  id: string;
  title: string;
  description: string;
  type: "survey" | "poll" | "code_task";
  questions: { id: string; question: string; options?: string[]; type: "single" | "multiple" | "text" | "code"; language?: string; codeSnippet?: string }[];
  responsesCount: number;
  createdAt: string;
  creatorId: string;
}

export interface AIModel {
  id: string;
  name: string;
  type: string;
  status: "Training" | "Deployed" | "Evaluating" | "Failed";
  accuracy: string;
  latency: string;
  cost: string;
  createdAt: string;
}

export interface ValidationTask {
  id: string;
  title: string;
  prompt: string;
  type: "RLHF" | "Safety" | "Bias";
  responses: { text: string; id: string }[];
  status: "Pending" | "Completed";
  points: number;
}

export interface AuditLog {
  id: string;
  action: string;
  timestamp: string;
  userId: string;
  details?: string;
}

export interface Version {
  id: string;
  data: any;
  timestamp: string;
  authorId: string;
}

export interface AnnotationProject {
  id: string;
  name: string;
  datasetId: string;
  labelingGuidelines: string;
  qualityRequirements: {
    minTagsPerItem: number;
    consensusRequired: number;
  };
  status: "Draft" | "Ready" | "Published" | "Completed";
  assignedFreelancers: string[];
  createdAt: string;
}

export interface Dataset {
  id: string;
  name: string;
  type: string;
  size: string;
  items: string;
  status: "Ready" | "Annotating" | "Processing" | "Review";
  createdAt: string;
  auditLogs?: AuditLog[];
  versions?: Version[];
}
