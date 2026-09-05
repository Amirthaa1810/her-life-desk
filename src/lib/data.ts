export type PillarKey =
  | "legal"
  | "financial"
  | "ownership"
  | "digital"
  | "career"
  | "business";

export interface Pillar {
  key: PillarKey;
  label: string;
  icon: string;
  score: number;
  description: string;
  color: string;
}

export const pillars: Pillar[] = [
  { key: "legal", label: "Legal Awareness", icon: "⚖️", score: 52, description: "Knowledge of your legal rights and where to seek help.", color: "#7c3aed" },
  { key: "financial", label: "Financial Readiness", icon: "💰", score: 71, description: "Banking, savings and financial independence readiness.", color: "#0ea5e9" },
  { key: "ownership", label: "Ownership Readiness", icon: "🏠", score: 43, description: "Understanding and organizing your owned assets.", color: "#f59e0b" },
  { key: "digital", label: "Digital Safety", icon: "🛡️", score: 86, description: "Protecting yourself online from scams and fraud.", color: "#10b981" },
  { key: "career", label: "Career Independence", icon: "💼", score: 62, description: "Building a sustainable, independent career.", color: "#ec4899" },
  { key: "business", label: "Entrepreneurship Readiness", icon: "🚀", score: 58, description: "Readiness to start and grow a business.", color: "#f97316" },
];

export interface UserProfile {
  displayName: string;
  ageGroup: string;
  location: string;
  education: string;
  employment: string;
  profession: string;
  goals: string[];
  language: string;
  careerBreakYears: number;
  xp: number;
  level: number;
  streakDays: number;
  baseIndex: number;
  indexGrowth: number;
  roadmapDone: number;
  roadmapTotal: number;
}

export const currentUser: UserProfile = {
  displayName: "Amirthaa",
  ageGroup: "26-35",
  location: "Chennai",
  education: "Bachelor's Degree",
  employment: "On career break",
  profession: "Marketing",
  goals: ["Restart my career", "Become financially independent", "Improve digital safety"],
  language: "English",
  careerBreakYears: 5,
  xp: 2450,
  level: 32,
  streakDays: 14,
  baseIndex: 67,
  indexGrowth: 8,
  roadmapDone: 12,
  roadmapTotal: 30,
};

export function getLevelInfo(xp: number): { level: number; tier: string; tierEmoji: string; nextAt: number; tierColor: string } {
  const level = Math.floor(xp / 75) + 1;
  let tier = "BRONZE";
  let tierEmoji = "🌱";
  let tierColor = "#b45309";
  if (level >= 76) { tier = "EMPOWERMENT LEGEND"; tierEmoji = "👑"; tierColor = "#a855f7"; }
  else if (level >= 51) { tier = "DIAMOND"; tierEmoji = "💎"; tierColor = "#0ea5e9"; }
  else if (level >= 26) { tier = "GOLD"; tierEmoji = "🥇"; tierColor = "#f59e0b"; }
  else if (level >= 11) { tier = "SILVER"; tierEmoji = "🥈"; tierColor = "#94a3b8"; }
  const nextAt = (level) * 75;
  return { level, tier, tierEmoji, nextAt, tierColor };
}

export const ALL_JOBS_LOCATIONS = [
  "Chennai", "Pondicherry", "Remote", "Kumbakonam", "Coimbatore",
  "Tiruchirappalli", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune",
];

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  hours: string;
  workType: string;
  salary: string;
  minSalary: number;
  maxSalary: number;
  skills: string[];
  remote: boolean;
  verified: boolean;
  featured: boolean;
  experience: string;
  description: string;
  posted: string;
}

export const jobs: Job[] = [
  { id: 1, title: "Cooking Assistant", company: "FreshBites Kitchen", location: "Chennai", type: "Full-time", hours: "9am-5pm", workType: "On-site", salary: "₹12,000 - ₹14,000/mo", minSalary: 12000, maxSalary: 14000, skills: ["Cooking", "Hygiene", "Time management"], remote: false, verified: true, featured: false, experience: "0-1 years", description: "Assist the kitchen team with daily meal preparation, cleaning and inventory management. Ideal for someone who enjoys cooking and wants steady work in a supportive environment.", posted: "2d ago" },
  { id: 2, title: "Tailoring Worker", company: "ThreadCraft Studio", location: "Pondicherry", type: "Part-time", hours: "Flexible", workType: "On-site", salary: "₹8,000 - ₹10,000/mo", minSalary: 8000, maxSalary: 10000, skills: ["Sewing", "Tailoring", "Attention to detail"], remote: false, verified: true, featured: false, experience: "1-2 years", description: "Create and alter garments for clients. You'll work closely with the design team on custom orders and ready-to-wear pieces.", posted: "3d ago" },
  { id: 3, title: "Data Entry Operator", company: "DataSure Solutions", location: "Chennai", type: "Full-time", hours: "9am-6pm", workType: "Hybrid", salary: "₹18,000 - ₹22,000/mo", minSalary: 18000, maxSalary: 22000, skills: ["Typing", "MS Excel", "Attention to detail"], remote: true, verified: true, featured: false, experience: "0-2 years", description: "Enter, update and verify data in company systems. Accuracy and speed are valued. Hybrid role with 3 days in office, 2 days remote.", posted: "1d ago" },
  { id: 4, title: "Customer Support Executive", company: "HelpDesk Co.", location: "Remote", type: "Full-time", hours: "Rotational", workType: "Remote", salary: "₹20,000 - ₹25,000/mo", minSalary: 20000, maxSalary: 25000, skills: ["Communication", "English", "Problem solving"], remote: true, verified: true, featured: true, experience: "1-3 years", description: "Handle customer enquiries via phone, email and chat. Provide solutions, follow up and maintain high customer satisfaction. Training provided.", posted: "1d ago" },
  { id: 5, title: "School Teaching Assistant", company: "St. Mary's School", location: "Kumbakonam", type: "Full-time", hours: "8am-3pm", workType: "On-site", salary: "₹11,000 - ₹13,000/mo", minSalary: 11000, maxSalary: 13000, skills: ["Teaching", "Patience", "Classroom management"], remote: false, verified: true, featured: false, experience: "0-1 years", description: "Support teachers in daily classroom activities, prepare materials and help students with their learning. School hours align well with family schedules.", posted: "4d ago" },
  { id: 6, title: "Content Writer", company: "WordFlow Media", location: "Remote", type: "Part-time", hours: "Flexible", workType: "Remote", salary: "₹12,000 - ₹16,000/mo", minSalary: 12000, maxSalary: 16000, skills: ["Writing", "SEO", "Research"], remote: true, verified: false, featured: false, experience: "1-2 years", description: "Write articles, blog posts and web content on assigned topics. Strong writing ability and basic SEO knowledge preferred. Fully remote with flexible deadlines.", posted: "5d ago" },
  { id: 7, title: "Graphic Designer", company: "PixelForge", location: "Chennai", type: "Full-time", hours: "10am-6pm", workType: "Hybrid", salary: "₹25,000 - ₹35,000/mo", minSalary: 25000, maxSalary: 35000, skills: ["Design", "Canva", "Figma"], remote: true, verified: true, featured: true, experience: "2-4 years", description: "Design social media posts, brand materials and marketing assets. Portfolio required. Hybrid with design team collaboration days.", posted: "1d ago" },
  { id: 8, title: "Boutique Sales Associate", company: "Vama Fashions", location: "Tiruchirappalli", type: "Full-time", hours: "10am-8pm", workType: "On-site", salary: "₹10,000 - ₹12,000/mo", minSalary: 10000, maxSalary: 12000, skills: ["Sales", "Customer Service", "Fashion"], remote: false, verified: false, featured: false, experience: "0-1 years", description: "Help customers choose outfits, manage inventory and maintain the showroom. A great role for anyone interested in fashion and retail.", posted: "6d ago" },
  { id: 9, title: "Junior Accountant", company: "LedgerLine", location: "Coimbatore", type: "Full-time", hours: "9:30am-6pm", workType: "On-site", salary: "₹16,000 - ₹20,000/mo", minSalary: 16000, maxSalary: 20000, skills: ["Accounting", "Tally", "MS Excel"], remote: false, verified: true, featured: false, experience: "1-3 years", description: "Maintain ledgers, reconcile bank statements and assist with monthly closings. Tally knowledge preferred. Opportunity to grow into a senior role.", posted: "3d ago" },
  { id: 10, title: "Online Tutor (Maths & Science)", company: "BrightMinds", location: "Remote", type: "Part-time", hours: "Flexible", workType: "Remote", salary: "₹15,000 - ₹20,000/mo", minSalary: 15000, maxSalary: 20000, skills: ["Teaching", "Maths", "English"], remote: true, verified: true, featured: false, experience: "1-2 years", description: "Teach students from Class 6 to 10 via online sessions. Prepare simple lesson plans and track student progress. Flexible scheduling.", posted: "2d ago" },
];

export interface Mentor {
  id: number;
  name: string;
  category: string;
  categoryEmoji: string;
  expertise: string;
  experience: string;
  languages: string[];
  location: string;
  availability: string;
  verified: boolean;
}

export const mentors: Mentor[] = [
  { id: 1, name: "Dr. Kavitha R", category: "Career Mentor", categoryEmoji: "👩‍💼", expertise: "Career restart, resume building", experience: "12+ yrs", languages: ["English", "Tamil"], location: "Chennai", availability: "Evenings", verified: true },
  { id: 2, name: "Saranya M", category: "Careers", categoryEmoji: "💼", expertise: "Interview prep, job search", experience: "8 yrs", languages: ["English", "Tamil", "Telugu"], location: "Remote", availability: "Weekends", verified: true },
  { id: 3, name: "Priya Shankar", category: "Mental Health", categoryEmoji: "🧠", expertise: "Anxiety, stress management", experience: "9 yrs", languages: ["English", "Hindi"], location: "Bangalore", availability: "By appointment", verified: true },
  { id: 4, name: "Adv. Meena K", category: "Legal", categoryEmoji: "⚖️", expertise: "Women's rights, property", experience: "15+ yrs", languages: ["English", "Tamil"], location: "Chennai", availability: "Weekdays", verified: true },
  { id: 5, name: "Anitha V", category: "Financial", categoryEmoji: "💰", expertise: "Financial literacy, savings", experience: "10 yrs", languages: ["English", "Tamil"], location: "Coimbatore", availability: "Evenings", verified: true },
  { id: 6, name: "Rekha Nair", category: "Entrepreneurship", categoryEmoji: "🚀", expertise: "Small business, funding", experience: "11 yrs", languages: ["English", "Malayalam"], location: "Kochi", availability: "Weekends", verified: true },
  { id: 7, name: "Sunitha Rao", category: "Legal", categoryEmoji: "⚖️", expertise: "Workplace rights", experience: "7 yrs", languages: ["English", "Kannada"], location: "Bangalore", availability: "Weekdays", verified: false },
  { id: 8, name: "Deepa M", category: "Entrepreneurship", categoryEmoji: "🚀", expertise: "Digital marketing for business", experience: "9 yrs", languages: ["English", "Tamil"], location: "Remote", availability: "Flexible", verified: true },
];

export interface LearningModule {
  id: number;
  title: string;
  category: string;
  categoryEmoji: string;
  xp: number;
  minutes: number;
  difficulty: string;
  description: string;
}

export const modules: LearningModule[] = [
  { id: 1, title: "Understanding Your Legal Rights", category: "Legal", categoryEmoji: "⚖️", xp: 50, minutes: 10, difficulty: "Beginner", description: "A clear overview of basic rights every woman should know." },
  { id: 2, title: "Financial Fundamentals: Budgeting & Savings", category: "Money", categoryEmoji: "💰", xp: 60, minutes: 12, difficulty: "Beginner", description: "Simple ways to track income, budget and start saving." },
  { id: 3, title: "Banking Basics for Independence", category: "Money", categoryEmoji: "💰", xp: 40, minutes: 8, difficulty: "Beginner", description: "Opening and managing your own account with confidence." },
  { id: 4, title: "Emergency Funds: Your Safety Net", category: "Money", categoryEmoji: "💰", xp: 45, minutes: 9, difficulty: "Beginner", description: "Why an emergency fund matters and how to build one." },
  { id: 5, title: "Ownership & Nominations Explained", category: "Ownership", categoryEmoji: "🏠", xp: 55, minutes: 11, difficulty: "Intermediate", description: "What ownership means and why nominations matter." },
  { id: 6, title: "Wills & Estate Planning Basics", category: "Ownership", categoryEmoji: "🏠", xp: 65, minutes: 13, difficulty: "Intermediate", description: "Understanding wills and estate planning concepts." },
  { id: 7, title: "Spotting UPI & Payment Scams", category: "Digital Shield", categoryEmoji: "🛡️", xp: 50, minutes: 10, difficulty: "Beginner", description: "Learn to recognise common payment and banking scams." },
  { id: 8, title: "Two-Factor Authentication: Your Lock", category: "Digital Shield", categoryEmoji: "🛡️", xp: 35, minutes: 7, difficulty: "Beginner", description: "How 2FA protects your accounts. Turn it on today." },
  { id: 9, title: "Protecting Your Social Media Accounts", category: "Digital Shield", categoryEmoji: "🛡️", xp: 40, minutes: 8, difficulty: "Beginner", description: "Lock down your social profiles against hackers." },
  { id: 10, title: "Interview Preparation Essentials", category: "Career", categoryEmoji: "💼", xp: 55, minutes: 11, difficulty: "Intermediate", description: "Prepare for interviews with confidence." },
  { id: 11, title: "Returning to Work After a Break", category: "Career", categoryEmoji: "💼", xp: 60, minutes: 12, difficulty: "Beginner", description: "Practical steps to restart your career." },
  { id: 12, title: "Digital Marketing Basics", category: "Business", categoryEmoji: "🚀", xp: 70, minutes: 14, difficulty: "Intermediate", description: "Learn the basics of promoting a business online." },
  { id: 13, title: "Business Registration Basics", category: "Business", categoryEmoji: "🚀", xp: 65, minutes: 13, difficulty: "Intermediate", description: "Know what it takes to legally register a business." },
  { id: 14, title: "Budgeting: Needs vs Wants", category: "Money", categoryEmoji: "💰", xp: 40, minutes: 8, difficulty: "Beginner", description: "Learn to separate needs from wants while budgeting." },
];

export interface CommunityPost {
  id: number;
  author: string;
  avatarColor: string;
  time: string;
  content: string;
  reacts: number;
  comments: number;
  tags: string[];
}

export const communityPosts: CommunityPost[] = [
  { id: 1, author: "Meera", avatarColor: "#ec4899", time: "2h ago", content: "🌸 Completed my first coding certification! So proud of this step.", reacts: 34, comments: 8, tags: ["Learning", "Tech"] },
  { id: 2, author: "Priya", avatarColor: "#8b5cf6", time: "5h ago", content: "🎓 Got my first internship after a 3-year break!", reacts: 52, comments: 12, tags: ["Career", "Achievement"] },
  { id: 3, author: "Anita", avatarColor: "#10b981", time: "1d ago", content: "🚀 Started my small baking business from home!", reacts: 78, comments: 20, tags: ["Business"] },
  { id: 4, author: "Divya", avatarColor: "#f59e0b", time: "1d ago", content: "💼 Returned to work after a career break. It's possible!", reacts: 45, comments: 9, tags: ["Career"] },
  { id: 5, author: "Kavya", avatarColor: "#0ea5e9", time: "2d ago", content: "🏆 Completed my 30-day learning challenge. Feels amazing!", reacts: 63, comments: 15, tags: ["Learning", "Gamification"] },
  { id: 6, author: "Sneha", avatarColor: "#f43f5e", time: "2d ago", content: "Learned how to use 2FA on all my accounts today. Stay safe online! 🛡️", reacts: 41, comments: 6, tags: ["Digital Safety"] },
];

export interface Article {
  id: number;
  title: string;
  category: string;
  categoryEmoji: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
}

export const articles: Article[] = [
  { id: 1, title: "5 Legal Rights Every Indian Woman Should Know", category: "Legal", categoryEmoji: "⚖️", author: "Adv. Meena K", date: "02 Sep 2026", readTime: "6 min", tags: ["Rights", "Law"], excerpt: "A practical guide to the fundamental legal rights that protect and empower women in India." },
  { id: 2, title: "How to Build Your First Emergency Fund", category: "Finance", categoryEmoji: "💰", author: "Anitha V", date: "01 Sep 2026", readTime: "5 min", tags: ["Savings", "Money"], excerpt: "A step-by-step plan to create a financial safety net, even on a modest income." },
  { id: 3, title: "Returning to Work: Finding Confidence Again", category: "Career", categoryEmoji: "💼", author: "Saranya M", date: "30 Aug 2026", readTime: "7 min", tags: ["Career", "Confidence"], excerpt: "Practical and emotional strategies for women re-entering the workforce after a break." },
  { id: 4, title: "Understanding Nominations on Your Assets", category: "Ownership", categoryEmoji: "🏠", author: "Rekha Nair", date: "28 Aug 2026", readTime: "4 min", tags: ["Ownership", "Finance"], excerpt: "Why nominations matter and how to review them on bank accounts, insurance and property." },
  { id: 5, title: "Common UPI Scams to Avoid in 2026", category: "Digital Safety", categoryEmoji: "🛡️", author: "Her Life Desk Team", date: "27 Aug 2026", readTime: "5 min", tags: ["Scams", "Safety"], excerpt: "Recognise the most common UPI fraud tactics and protect your hard-earned money." },
  { id: 6, title: "Starting a Home-Based Business: First Steps", category: "Business", categoryEmoji: "🚀", author: "Rekha Nair", date: "25 Aug 2026", readTime: "8 min", tags: ["Business", "Startup"], excerpt: "From idea to first sale — a beginner-friendly roadmap for aspiring entrepreneurs." },
  { id: 7, title: "Women in STEM: Breaking Barriers", category: "Education", categoryEmoji: "🎓", author: "Her Life Desk Team", date: "22 Aug 2026", readTime: "6 min", tags: ["STEM", "Education"], excerpt: "Stories and data on how women are thriving in science, technology, engineering and math." },
  { id: 8, title: "Matrimonial & Dating App Scams: Stay Alert", category: "Digital Safety", categoryEmoji: "🛡️", author: "Her Life Desk Team", date: "20 Aug 2026", readTime: "6 min", tags: ["Scams", "Safety"], excerpt: "Red flags to spot in matrimonial and dating scams, and how to report them." },
];

export const leaderboard = [
  { rank: 1, user: "Riya", level: 42, xp: 8420, badge: "💎", note: "18 learning modules this month" },
  { rank: 2, user: "Priya", level: 37, xp: 7850, badge: "💎", note: "21-day learning streak" },
  { rank: 3, user: "Meera", level: 31, xp: 6920, badge: "🥇", note: "Completed 18 modules" },
  { rank: 4, user: "Divya", level: 28, xp: 6150, badge: "🥇", note: "Started 2 businesses" },
  { rank: 5, user: "Kavya", level: 26, xp: 5780, badge: "🥇", note: "30-day challenge done" },
  { rank: 6, user: "Anita", level: 22, xp: 4890, badge: "🥈", note: "Helped 10 women" },
  { rank: 7, user: "Sneha", level: 19, xp: 4100, badge: "🥈", note: "Digital safety leader" },
  { rank: 8, user: "Ritu", level: 16, xp: 3520, badge: "🥈", note: "Consistent learner" },
  { rank: 9, user: "Lakshmi", level: 13, xp: 2900, badge: "🥈", note: "Completed legal modules" },
  { rank: 10, user: "Farah", level: 11, xp: 2350, badge: "🥈", note: "Career restart journey" },
];

export const achievements = [
  { id: 1, name: "Financial Foundations", emoji: "🏦", desc: "Completed financial-literacy basics", unlocked: true },
  { id: 2, name: "Document Ready", emoji: "📁", desc: "Completed document-readiness checklist", unlocked: true },
  { id: 3, name: "Digital Defender", emoji: "🛡️", desc: "Completed digital-safety learning", unlocked: true },
  { id: 4, name: "Rights Aware", emoji: "⚖️", desc: "Completed legal-awareness modules", unlocked: false },
  { id: 5, name: "Career Ready", emoji: "💼", desc: "Completed career-development activities", unlocked: false },
  { id: 6, name: "Entrepreneur Ready", emoji: "🚀", desc: "Completed business-readiness activities", unlocked: false },
  { id: 7, name: "7-Day Learner", emoji: "🔥", desc: "Maintained a seven-day learning streak", unlocked: true },
  { id: 8, name: "Consistent Learner", emoji: "🌟", desc: "Maintained a long-term streak", unlocked: false },
];

export const leaderboardMyRank = { rank: 47, xpToNext: 220, user: "Amirthaa", level: 32, xp: 2450 };

export const documentReadiness = [
  { name: "Identity records", status: "Ready", statusType: "success" },
  { name: "Banking information", status: "Ready", statusType: "success" },
  { name: "Insurance records", status: "Review", statusType: "warning" },
  { name: "Property records", status: "Not organized", statusType: "danger" },
  { name: "Nomination information", status: "Review", statusType: "warning" },
  { name: "Estate-planning information", status: "Not started", statusType: "danger" },
];
