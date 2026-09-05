"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import {
  FiBriefcase,
  FiCheckCircle,
  FiHome,
  FiUsers,
  FiSearch,
  FiRotateCcw,
  FiPrinter,
  FiChevronDown,
  FiAward,
  FiMapPin,
  FiClock,
  FiLayers,
} from "react-icons/fi";

interface RoadmapInput {
  region: string;
  skill: string;
  hours: string;
}

const defaultInput: RoadmapInput = {
  region: "Delhi, India",
  skill: "Tech",
  hours: "15",
};

const hourInfo: Record<string, string> = {
  "8": "Weekend only, 8 hours a week. Perfect for busy mums.",
  "15": "Part-time, 15 hours a week. A steady learning pace.",
  "40": "Full-time, 40 hours a week. Fast-track your comeback.",
};

const skillOptions = [
  {
    value: "Tech",
    emoji: "💻",
    theme: "Website development, data entry, IT support and software basics.",
  },
  {
    value: "Creative",
    emoji: "🎨",
    theme: "Design, writing, video editing and visual storytelling.",
  },
  {
    value: "Business",
    emoji: "💼",
    theme: "Marketing, admin, accounts and small-business skills.",
  },
  {
    value: "Healthcare",
    emoji: "🩺",
    theme: "Caregiving, first aid, patient support and wellness.",
  },
  {
    value: "Teaching",
    emoji: "📚",
    theme: "Tutoring, online classes, lesson planning and coaching.",
  },
  {
    value: "Sales",
    emoji: "🛒",
    theme: "Retail, inside sales, customer care and CRM work.",
  },
];

interface Task {
  text: string;
}

interface Week {
  week: number;
  title: string;
  focus: string;
  tasks: Task[];
  milestone: string;
}

interface Phase {
  phase: number;
  emoji: string;
  name: string;
  tagline: string;
  weeks: Week[];
}

const allWeeks: Phase[] = [
  {
    phase: 1,
    emoji: "🌱",
    name: "Foundation & Mindset",
    tagline: "Weeks 1-3 · Find your spark and pick your path",
    weeks: [
      { week: 1, title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [], milestone: "" },
      { week: 2, title: "Pick Your Path", focus: "Choose your direction", tasks: [], milestone: "" },
      { week: 3, title: "Free Certification", focus: "Grab a free certificate", tasks: [], milestone: "" },
    ],
  },
  {
    phase: 2,
    emoji: "🛠️",
    name: "Build Skill & Proof",
    tagline: "Weeks 4-6 · Learn, create and show your work",
    weeks: [
      { week: 4, title: "Micro-Course", focus: "Start a small focused course", tasks: [], milestone: "" },
      { week: 5, title: "Small Projects", focus: "Build your first proof", tasks: [], milestone: "" },
      { week: 6, title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [], milestone: "" },
    ],
  },
  {
    phase: 3,
    emoji: "🤝",
    name: "Reach Out & Network",
    tagline: "Weeks 7-9 · Get seen and make connections",
    weeks: [
      { week: 7, title: "Polish Your Resume", focus: "Make your story shine", tasks: [], milestone: "" },
      { week: 8, title: "Apply & Referrals", focus: "Applications and referrals", tasks: [], milestone: "" },
      { week: 9, title: "Info Interviews", focus: "Talk to people in the field", tasks: [], milestone: "" },
    ],
  },
  {
    phase: 4,
    emoji: "🚀",
    name: "Land & Grow",
    tagline: "Weeks 10-12 · Get offers and grow in the role",
    weeks: [
      { week: 10, title: "Interview Practice", focus: "Ace your interviews", tasks: [], milestone: "" },
      { week: 11, title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [], milestone: "" },
      { week: 12, title: "30/60/90 Day Plan", focus: "Start strong in your new job", tasks: [], milestone: "" },
    ],
  },
];

interface WeekContent {
  title: string;
  focus: string;
  tasks: string[];
  milestone: string;
}

type PhaseContent = WeekContent[];
type SkillContent = Record<string, PhaseContent>;

const roadmapBySkill: SkillContent = {
  Tech: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List every skill you already have, like Excel, typing, logic or customer service, and write them in a notebook.",
      "Search 5 entry-level tech job posts in {region} and note which skills they ask for the most.",
      "Talk to one friend about your dream tech role and say it out loud to build confidence.",
    ], milestone: "You can name your top 3 transferable skills with pride 🎉" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one direction: web development, data entry, QA testing, or IT support.",
      "Watch 2 beginner videos on YouTube about your chosen path to see if it excites you.",
      "Join one free Facebook or WhatsApp group for women in tech in your area.",
    ], milestone: "You picked ONE clear path and feel excited about it 🌟" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Sign up for the free Harvard course called CS50x and finish Week 0.",
      "Create a freeCodeCamp account and complete the first 2 sections of Responsive Web Design.",
      "Print your first certificate as proof you are a learner.",
    ], milestone: "You hold your first free tech certificate in your hands 📜" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Enroll in a 2-week micro-course on freeCodeCamp focused on HTML and CSS basics.",
      "Follow along and build one tiny webpage about yourself.",
      "Spend your weekly hours practicing typing speed with a free typing test site.",
    ], milestone: "You finished a real micro-course end to end 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Build a simple personal profile webpage using what you learned.",
      "Create a small project like a to-do list or a landing page for a favourite shop.",
      "Share your project on the freeCodeCamp forum and ask for kind feedback.",
    ], milestone: "You have 2 small projects you can show anyone 💪" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Set up a free personal portfolio page on GitHub Pages or a free hosting site.",
      "Add your projects with clear, simple descriptions.",
      "Write a one-paragraph 'About me' that tells your comeback story.",
    ], milestone: "Your portfolio link is ready to share, in your hands 🔗" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Write your resume highlighting your new tech skills and your two projects.",
      "Use a free resume template and keep it to one clean page.",
      "Be proud and honest about your career gap, frame it as your learning time.",
    ], milestone: "Your resume now tells a clear, confident tech story 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 job applications using your polished resume, to junior and intern tech roles.",
      "Message 5 people on LinkedIn asking for a referral or recommendation.",
      "Track every application in a simple notebook so nothing slips through.",
    ], milestone: "20 applications sent and a clear tracking list 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 short chat calls with women working in tech to learn about their day.",
      "Prepare 5 smart questions about the role, pay and work culture.",
      "Send a warm thank-you note after each chat.",
    ], milestone: "You spoke with real people in the field, that is networking 🤩" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice answering the top 10 junior tech interview questions out loud.",
      "Do one mock interview with a friend or a free practice partner.",
      "Prepare 3 questions to ask the interviewer back.",
    ], milestone: "You answered an interview question out loud and felt good 🎤" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn the fair salary range for junior tech roles in {region} so you know your worth.",
      "Practice saying a polite counter offer, like a higher salary or flexible hours.",
      "Review the full offer letter carefully before you sign.",
    ], milestone: "You know your worth and can ask for it confidently 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new job", tasks: [
      "Write a simple plan for your first 30, 60 and 90 days in a new role.",
      "Set one learning goal and one connection goal for your first week.",
      "Build a small routine to keep learning while you work.",
    ], milestone: "You are ready to walk in and own your new career 🎊" },
  ],
  Creative: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List every creative skill you have, like drawing, writing, editing or crafts.",
      "Look at 5 creative jobs in {region} and spot what skills they want.",
      "Save 3 pieces you have made before to start a memory bank.",
    ], milestone: "You can name your top creative strengths with a smile 🎨" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one: graphic design, content writing, video editing, or illustration.",
      "Browse Behance and Dribbble to see the kind of work that excites you.",
      "Pick one online community for creative women to join.",
    ], milestone: "You chose your creative focus and feel inspired ✨" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Start the free Canva Design School course and finish the first lessons.",
      "Watch a free beginner tutorial on your chosen creative tool.",
      "Collect your first certificate as a confidence boost.",
    ], milestone: "Your first free creative certificate is yours 🎓" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Take a 2-week micro-course in your chosen tool, like Canva or a editing app.",
      "Redesign one old piece with your new skills.",
      "Practice for 30 minutes every session, even on busy days.",
    ], milestone: "You finished a micro-course and applied it 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Create 3 sample pieces, like a poster, a logo or a short video.",
      "Now, design or write something imaginary, like a brand for a local shop.",
      "Post your favourite piece online and ask for gentle feedback.",
    ], milestone: "You have 3 portfolio-ready pieces 💪" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Set up a free Behance or Dribbble profile, or a free website.",
      "Upload your best 3-5 pieces with short happy descriptions.",
      "Write a friendly 'About me' that shares your comeback story.",
    ], milestone: "Your creative portfolio is live and shareable 🔗" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Update your resume to highlight your creative projects and skills.",
      "Use a clean template and link your portfolio at the top.",
      "Write a short cover letter about why you love creating.",
    ], milestone: "Your resume and portfolio work together beautifully 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 creative job or freelance applications.",
      "Pitch 3 local businesses a small piece of creative work to build references.",
      "Message 5 people on LinkedIn and ask for referrals or feedback.",
    ], milestone: "20 applications out and a strong pitch list 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 short chats with working designers, writers or editors.",
      "Ask how they got their start and what clients look for.",
      "Send a warm thank-you note after each chat.",
    ], milestone: "You learned the field from real people 🤩" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice presenting your portfolio in under 3 minutes.",
      "Prepare answers to common creative interview questions.",
      "Do one practice review with a friend who gives honest feedback.",
    ], milestone: "You can present your work with pride 🎤" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn fair freelance and salaried rates for creatives in {region}.",
      "Practice quoting a confident rate or salary.",
      "Review any contract carefully before you sign.",
    ], milestone: "You value your talent and can ask for it 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new role", tasks: [
      "Write a 30/60/90 day plan for your first creative role.",
      "Set one portfolio goal to grow your body of work.",
      "Keep a small habit of creating a little every week.",
    ], milestone: "Ready to grow your creative career with joy 🎊" },
  ],
  Business: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List your business skills like accounting, admin, marketing or management.",
      "Review 5 business job postings in {region} and note the common skills.",
      "Write down one business win from your past that makes you proud.",
    ], milestone: "You can list your business strengths with confidence 💼" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one: digital marketing, admin support, data entry, or bookkeeping.",
      "Watch 2 short videos about your chosen business path.",
      "Join one business-savvy community or Facebook group.",
    ], milestone: "You picked your business direction and feel set 🎯" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Start the free Google Digital Marketing certificate (Google Garage).",
      "Complete the first 2 modules about how online ads and search work.",
      "Collect your first certificate as proof of your learning.",
    ], milestone: "Your first free business certificate is in hand 📜" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Take a 2-week micro-course on digital marketing or basic accounting.",
      "Apply one lesson to a real example, like planning a small campaign.",
      "Set a simple weekly study routine that fits your hours.",
    ], milestone: "You finished a business micro-course 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Create a one-page mock marketing plan for a local shop.",
      "Make a simple budget or cash sheet in a free spreadsheet tool.",
      "Share your plan with a friend for honest feedback.",
    ], milestone: "You have 2 samples of real business work 💪" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Build a simple LinkedIn profile and add your business samples.",
      "Write a professional summary about your experience and goals.",
      "Add your certificates under 'Licences & certifications'.",
    ], milestone: "Your LinkedIn reads like a confident professional ✨" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Rewrite your resume around your business skills and small projects.",
      "Add your certificates and quantify your past wins.",
      "Tailor the top of your resume to each role you apply for.",
    ], milestone: "Your resume is clean, focused and impressive 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 applications for admin, marketing or business roles.",
      "Message 5 people on LinkedIn asking for referrals or introductions.",
      "Keep a simple tracker of who you applied to and when.",
    ], milestone: "20 applications sent with a neat tracker 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 short chats with women working in business or marketing.",
      "Ask about the daily work, tools they use and what they love.",
      "Send a warm thank-you after each call.",
    ], milestone: "You connected with real people in business 🤝" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice answering top business interview questions out loud.",
      "Prepare a short story about a time you solved a business problem.",
      "Do one mock interview with a trusted friend.",
    ], milestone: "You handled a mock interview like a pro 🎤" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn the fair salary range for business roles in {region}.",
      "Practice asking for what you are worth in a calm, friendly way.",
      "Read any offer carefully before you agree.",
    ], milestone: "You can negotiate with confidence and calm 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new role", tasks: [
      "Draft a 30/60/90 day plan for your first business role.",
      "Set one software tool to learn in your first month.",
      "Plan one networking goal, like attending a free business meetup.",
    ], milestone: "You are set to thrive in the business world 🚀" },
  ],
  Healthcare: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List your care skills like patience, first aid, empathy or organisation.",
      "Review 5 healthcare support jobs in {region} and note the requirements.",
      "Write down one moment you cared for someone and felt proud.",
    ], milestone: "You see the real value of your caring skills ❤️" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one: caregiving, patient support, first aid or wellness assistant.",
      "Research the steps for that role locally, like any license needed.",
      "Join one caring community or support group to connect.",
    ], milestone: "You chose a healthcare path that fits your heart 🩺" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Complete a free online first aid and CPR basics course in your area.",
      "Enrol in a free introductory caregiver training if available.",
      "Collect your certificate as proof of your readiness.",
    ], milestone: "You hold a real first aid or care certificate 📜" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Take a 2-week micro-course on home care basics or patient safety.",
      "Learn the signs of common health emergencies and how to respond.",
      "Review any certification or license you need next.",
    ], milestone: "You finished a healthcare micro-course 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Create a simple care plan checklist for a daily routine.",
      "Write a short guide on how to handle a common challenge at home.",
      "Practice explaining a health topic in simple, kind words.",
    ], milestone: "You can show real, thoughtful care work 💪" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Update your LinkedIn with your certificates and caring experience.",
      "Write a summary that highlights your empathy and reliability.",
      "Add your first aid or care certificates to your profile.",
    ], milestone: "Your profile shines with warmth and skill ✨" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Write a resume focused on your care experience and certificates.",
      "List the health and safety skills you have learned.",
      "Add a short line about your passion for helping people.",
    ], milestone: "Your resume tells a caring, capable story 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 applications to caregiver and support roles.",
      "Message 5 people in healthcare on LinkedIn for advice.",
      "Ask the local community for referrals to caring roles.",
    ], milestone: "20 applications sent and connections growing 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 chats with nurses, caregivers or health assistants.",
      "Ask about daily tasks, schedules and how to succeed.",
      "Thank everyone warmly and keep their number safe.",
    ], milestone: "You understand healthcare work from real voices 🤝" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice answering care interview questions with kindness and clarity.",
      "Prepare a story about a time you helped someone well.",
      "Practice asking about shifts, safety and training.",
    ], milestone: "You interview with confidence and compassion 🩺" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn the fair pay range for caregiver roles in {region}.",
      "Ask clearly about hours, weekends and any travel needed.",
      "Read the offer and contract slowly before you sign.",
    ], milestone: "You know your worth in the caring field 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new role", tasks: [
      "Write a 30/60/90 day plan for your new care role.",
      "Set one skill to improve and one person to learn from.",
      "Plan how to take care of yourself too, so you can care well.",
    ], milestone: "Ready to care for others, and for yourself 🎊" },
  ],
  Teaching: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List your teaching skills like explaining, patience and planning.",
      "Review 5 tutoring or teaching jobs in {region} and note requirements.",
      "Write down a time you helped someone learn and loved it.",
    ], milestone: "You see yourself clearly as a natural teacher 📚" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one: online tutoring, school assistant, coaching or soft-skill training.",
      "Pick the subject you explain best, like English, maths or arts.",
      "Join a teaching community or a tutor network online.",
    ], milestone: "You chose a teaching path with a clear subject 🎯" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Enrol in a free TEFL or TESOL taster course for teaching English.",
      "Complete the first modules to learn teaching methods.",
      "Collect your first teaching certificate as proof.",
    ], milestone: "You hold your first teaching certificate 📜" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Take a 2-week micro-course on how to plan a lesson.",
      "Learn one fun teaching method, like games or visuals.",
      "Write a simple lesson plan for one of your favourite topics.",
    ], milestone: "You planned a full lesson with confidence 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Create 2 lesson plans or fun worksheets for your subject.",
      "Record a short 3-minute demo lesson on your phone.",
      "Teach a mini-lesson to a friend, family or neighbour for practice.",
    ], milestone: "You have a demo lesson to show your skill 🎬" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Put your lesson plans and demo video into a simple online folder.",
      "Create a LinkedIn profile as a teacher or tutor.",
      "Write a warm 'About me' about why you love teaching.",
    ], milestone: "Your teaching portfolio is ready to share 🎓" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Write a resume focused on your teaching and tutoring skills.",
      "Add links to your demo lesson and lesson plans.",
      "Highlight your patience, planning and love of learning.",
    ], milestone: "Your resume stands out as a teacher 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 applications to tutoring and teaching assistant roles.",
      "Message 5 educators on LinkedIn for advice and referrals.",
      "List your services on a free tutoring platform.",
    ], milestone: "20 applications sent and your name is out there 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 chats with teachers or online tutors.",
      "Ask about schedules, pay and how they keep students engaged.",
      "Send a warm thank-you note after each chat.",
    ], milestone: "You learned teaching life from real teachers 🤝" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice a short demo lesson as if in front of a class.",
      "Prepare answers about how you handle difficult students.",
      "Practice talking about your teaching philosophy in simple words.",
    ], milestone: "You can teach a demo and talk like a pro 🎤" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn the fair rate for tutors in ",
      ".",
      "Practice quoting your hourly rate clearly.",
      "Review the terms for online or school jobs before agreeing.",
    ], milestone: "You value your teaching hours and ask fairly 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new role", tasks: [
      "Write a 30/60/90 day plan for your first teaching role.",
      "Set one fun teaching technique to try in month one.",
      "Plan to keep a small folder of your best lesson ideas.",
    ], milestone: "You are ready to inspire learners with joy 🎊" },
  ],
  Sales: [
    { title: "Take Stock", focus: "Skill inventory and confidence check", tasks: [
      "List your sales skills like talking to people, empathy and follow-up.",
      "Review 5 retail or sales jobs in {region} and note the skills they want.",
      "Write down a time you persuaded someone or helped them choose.",
    ], milestone: "You see your natural sales abilities 🛒" },
    { title: "Pick Your Path", focus: "Choose your direction", tasks: [
      "Choose one: retail sales, inside sales, customer care or cashier.",
      "Watch 2 short videos on how to sell and talk to customers.",
      "Join a sales or retail community to learn from others.",
    ], milestone: "You picked the sales path that fits you 🎯" },
    { title: "Free Certification", focus: "Grab a free certificate", tasks: [
      "Complete a free customer service skills course online.",
      "Start the free HubSpot sales or customer service certification.",
      "Collect your first sales certificate as proof of skills.",
    ], milestone: "Your first free sales certificate is in hand 📜" },
    { title: "Micro-Course", focus: "Start a small focused course", tasks: [
      "Take a 2-week micro-course on retail sales basics or CRM.",
      "Learn how customer relationship tools like HubSpot work, free.",
      "Practice greeting a friend like a warm store assistant.",
    ], milestone: "You finished a sales micro-course 🏁" },
    { title: "Small Projects", focus: "Build your first proof", tasks: [
      "Practise a 2-minute 'how would you sell this item' pitch.",
      "Write a quick guide to handling a tricky customer kindly.",
      "Do a mock sales scenario with a friend and get feedback.",
    ], milestone: "You have a confident sales pitch and tips 💪" },
    { title: "Create a Portfolio", focus: "Show the world what you can do", tasks: [
      "Make your LinkedIn profile clear about your sales skills.",
      "Add your certificates to your profile.",
      "Create a short video or note of your sales pitch to share.",
    ], milestone: "Your profile shows a polished salesperson ✨" },
    { title: "Polish Your Resume", focus: "Make your story shine", tasks: [
      "Write a resume focused on customer service and sales skills.",
      "Add your certificates and any numbers from past sales.",
      "Practise writing a friendly first line for cover letters.",
    ], milestone: "Your resume sells you beautifully 📄" },
    { title: "Apply & Referrals", focus: "Applications and referrals", tasks: [
      "Send 20 applications to retail and sales roles.",
      "Message 5 people in sales on LinkedIn for advice.",
      "Ask local shops if they know of open roles to get referrals.",
    ], milestone: "20 applications out and referrals brewing 📋" },
    { title: "Info Interviews", focus: "Talk to people in the field", tasks: [
      "Book 2 chat calls with sales associates or managers.",
      "Ask about daily targets, customer care and teamwork.",
      "Send a kind thank-you note after each chat.",
    ], milestone: "You know real sales life from the people in it 🤝" },
    { title: "Interview Practice", focus: "Ace your interviews", tasks: [
      "Practice answering interview questions about handling customers.",
      "Prepare a story about a time you closed or helped a sale.",
      "Do one mock interview with role-play about a customer.",
    ], milestone: "You can shine in a sales interview 🎤" },
    { title: "Offer & Negotiation", focus: "Say yes on your terms", tasks: [
      "Learn the fair pay and targets for sales roles in {region}.",
      "Ask clearly about salary, incentives and shifts.",
      "Read the offer and commission details before signing.",
    ], milestone: "You understand your pay and can ask questions 💎" },
    { title: "30/60/90 Day Plan", focus: "Start strong in your new role", tasks: [
      "Write a 30/60/90 day plan for your sales role.",
      "Set a goal to learn the product range in your first month.",
      "Plan to build good relationships with customers and teammates.",
    ], milestone: "Ready to start strong and grow in sales 🎊" },
  ],
};

const weekOrder = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

function getWeekContent(skill: string, week: number): PaperContent {
  const weeks = roadmapBySkill[skill] ?? roadmapBySkill.Tech;
  return weeks[week - 1];
}

interface PaperContent {
  title: string;
  focus: string;
  tasks: string[];
  milestone: string;
}

interface FullWeek extends Week {
  phaseNo: number;
  phaseName: string;
  phaseEmoji: string;
  content: PaperContent;
}

function buildRoadmap(input: RoadmapInput): FullWeek[] {
  return weekOrder.map((week) => {
    const phase = allWeeks[Math.floor((week - 1) / 3)];
    const content = getWeekContent(input.skill, week);
    return {
      week,
      title: content.title,
      focus: content.focus,
      tasks: content.tasks.map((t) => ({ text: t })),
      milestone: content.milestone,
      phaseNo: phase.phase,
      phaseName: phase.name,
      phaseEmoji: phase.emoji,
      content,
    };
  });
}

const STORAGE_KEY = "her-life-desk-career-roadmap";

interface StoredShape {
  inputs?: RoadmapInput;
  completed?: Record<string, boolean>;
}

const testimonials = [
  {
    name: "Priya S.",
    quote:
      "After a 4-year break for my twins, I thought no one would hire me. Her Life Desk gave me a roadmap and confidence. I'm now a full-time UX designer at a startup in Chennai!",
    role: "UX Designer",
  },
  {
    name: "Meena K.",
    quote:
      "I was a school teacher before marriage. The roadmap helped me transition to online tutoring. I work flexible hours and earn more than before.",
    role: "Online Tutor",
  },
  {
    name: "Lakshmi R.",
    quote:
      "The portfolio projects in Phase 3 made all the difference. Employers could see what I could do, not just my gap years. I'm now a freelance content writer.",
    role: "Freelance Writer",
  },
];

function loadState(): StoredShape {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredShape;
    if (parsed && typeof parsed === "object") return parsed;
    return {};
  } catch {
    return {};
  }
}

function saveState(state: StoredShape) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage may be unavailable, that is fine
  }
}

export default function CareersPage() {
  const [inputs, setInputs] = useState<RoadmapInput>(defaultInput);
  const [generated, setGenerated] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({
    1: true,
  });

  useEffect(() => {
    const stored = loadState();
    if (stored.inputs) {
      setInputs((prev) => ({ ...prev, ...stored.inputs }));
    }
    if (stored.completed) {
      setCompleted(stored.completed);
    }
    if (stored.inputs) {
      setGenerated(true);
    }
  }, []);

  useEffect(() => {
    saveState({ inputs, completed });
  }, [inputs, completed]);

  const roadmap = useMemo(
    () => (generated ? buildRoadmap(inputs) : []),
    [generated, inputs]
  );

  const totalWeeks = roadmap.length;
  const doneWeeks = roadmap.filter((w) => {
    return w.content.tasks.every((_, i) => completed[`w${w.week}-${i}`]);
  }).length;
  const pct = totalWeeks > 0 ? Math.round((doneWeeks / totalWeeks) * 100) : 0;
  const complete = generated && pct === 100;

  const grouped = useMemo(() => {
    return allWeeks.map((phase) => {
      const weeks = roadmap.filter((w) => w.phaseNo === phase.phase);
      const phaseTotal = weeks.reduce((s, w) => s + w.content.tasks.length, 0);
      const phaseDone = weeks.reduce(
        (s, w) =>
          s + w.content.tasks.filter((_, i) => completed[`w${w.week}-${i}`])
            .length,
        0
      );
      return { ...phase, weeks, phaseTotal, phaseDone };
    });
  }, [roadmap, completed]);

  function toggleWeekTask(week: number, taskIdx: number) {
    const key = `w${week}-${taskIdx}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function togglePhase(phase: number) {
    setOpenPhases((prev) => ({ ...prev, [phase]: !prev[phase] }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setGenerated(true);
  }

  function resetAll() {
    setCompleted({});
    setInputs(defaultInput);
    setOpenPhases({ 1: true });
    setGenerated(true);
    saveState({ inputs: defaultInput, completed: {} });
  }

  const pathName = skillOptions.find((s) => s.value === inputs.skill)?.emoji;

  return (
    <main className="bg-[#faf8fb]">
      <PageHeader
        emoji="💼"
        title="Her Second Career"
        subtitle="A structured path back to work for women restarting after a break."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Second Career Roadmap 🌟
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Tell us a little about you, and we will build a personal 12-week
            plan, week by week, just for you.
          </p>

          <form onSubmit={handleGenerate} className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <FiMapPin className="h-4 w-4 text-violet-500" />
                Where do you live?
              </label>
              <input
                type="text"
                value={inputs.region}
                onChange={(e) =>
                  setInputs((f) => ({ ...f, region: e.target.value }))
                }
                placeholder="e.g. Delhi, India"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <FiLayers className="h-4 w-4 text-rose-500" />
                Your skill type
              </label>
              <select
                value={inputs.skill}
                onChange={(e) =>
                  setInputs((f) => ({ ...f, skill: e.target.value }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
              >
                {skillOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.emoji} {s.value}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400">
                {skillOptions.find((s) => s.value === inputs.skill)?.theme}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <FiClock className="h-4 w-4 text-violet-500" />
                Hours per week
              </label>
              <select
                value={inputs.hours}
                onChange={(e) =>
                  setInputs((f) => ({ ...f, hours: e.target.value }))
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
              >
                <option value="8">Weekend only · 8h</option>
                <option value="15">Part-time · 15h</option>
                <option value="40">Full-time · 40h</option>
              </select>
              <p className="text-xs text-slate-400">{hourInfo[inputs.hours]}</p>
            </div>

            <div className="md:col-span-3 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                <FiAward className="h-4 w-4" />
                Generate my roadmap
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <FiRotateCcw className="h-4 w-4" />
                Reset progress
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
              >
                <FiPrinter className="h-4 w-4" />
                Print / save my roadmap
              </button>
            </div>
          </form>
        </section>

        {!generated && (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl mb-3">🗓️</div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Your 12-week comeback plan is waiting
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Pick your three choices above and press Generate my roadmap. We
              will lay out every week for you, from confidence to your first day
              in a new job.
            </p>
          </section>
        )}

        {generated && (
          <section className="space-y-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>{pathName}</span> Your 12-week roadmap for{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-rose-500 bg-clip-text text-transparent">
                    {inputs.skill}
                  </span>
                </h2>
                <p className="text-sm text-slate-500">
                  Based in {inputs.region} · {hourInfo[inputs.hours]}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {complete && (
                  <span className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600">
                    Roadmap complete 🎉
                  </span>
                )}
                <span className="text-sm font-semibold text-violet-600">
                  {pct}% complete
                </span>
              </div>
            </div>

            {complete ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
                <div className="text-5xl mb-3">🎉🎊🌸</div>
                <h3 className="text-xl font-bold text-emerald-700 mb-1">
                  You did it! Roadmap complete!
                </h3>
                <p className="text-sm text-emerald-700">
                  Every week checked, every milestone reached. You are ready to
                  take on your second career with confidence. Go celebrate, you
                  earned it!
                </p>
              </div>
            ) : (
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-rose-500 transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}

            <div className="space-y-4">
              {grouped.map((phase) => {
                const open = !!openPhases[phase.phase];
                return (
                  <div
                    key={phase.phase}
                    className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => togglePhase(phase.phase)}
                      className="flex w-full items-center justify-between gap-3 p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-rose-500 text-xl text-white">
                          {phase.emoji}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Phase {phase.phase} · {phase.name}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {phase.tagline} · {phase.phaseDone}/
                            {phase.phaseTotal} tasks done
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden text-sm font-semibold text-slate-400 sm:inline">
                          Weeks{" "}
                          {(phase.phase - 1) * 3 + 1}
                          -
                          {phase.phase * 3}
                        </span>
                        <FiChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {open && (
                      <div className="border-t border-slate-100 p-5">
                        <div className="relative ml-5 space-y-6 border-l-2 border-slate-100 pl-6">
                          {phase.weeks.map((week) => {
                            const weekTasks = week.content.tasks.map(
                              (t) => ({ text: t })
                            );
                            const weekDone = weekTasks.filter(
                              (_, i) => completed[`w${week.week}-${i}`]
                            ).length;
                            const weekAllDone =
                              weekTasks.length > 0 &&
                              weekDone === weekTasks.length;
                            return (
                              <div
                                key={week.week}
                                className="relative rounded-xl border border-slate-200 bg-slate-50/50 p-4"
                              >
                                <span className="absolute -left-9 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-rose-500 text-[10px] font-bold text-white">
                                  {week.week}
                                </span>
                                <div className="mb-1 flex items-center justify-between gap-2">
                                  <h4 className="text-sm font-bold text-slate-900">
                                    Week {week.week} · {week.content.title}{" "}
                                    {weekAllDone ? "✅" : "📌"}
                                  </h4>
                                  <span className="text-xs font-semibold text-violet-600">
                                    {weekDone}/{weekTasks.length}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">
                                  <span className="font-semibold text-slate-600">
                                    Focus:
                                  </span>{" "}
                                  {week.content.focus}
                                </p>
                                <ul className="space-y-2">
                                  {weekTasks.map((task, i) => {
                                    const key = `w${week.week}-${i}`;
                                    const done = !!completed[key];
                                    return (
                                      <li key={i}>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleWeekTask(week.week, i)
                                          }
                                          className="flex w-full items-start gap-2 text-left"
                                        >
                                          <FiCheckCircle
                                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                                              done
                                                ? "text-emerald-500"
                                                : "text-slate-300"
                                            }`}
                                          />
                                          <span
                                            className={`text-sm ${
                                              done
                                                ? "text-slate-400 line-through"
                                                : "text-slate-700"
                                            }`}
                                          >
                                            {task.text.replace(
                                              "{region}",
                                              inputs.region
                                            )}
                                          </span>
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                                {week.content.milestone && (
                                  <p className="mt-3 rounded-lg bg-white px-3 py-2 text-xs font-medium text-emerald-700 border border-emerald-100">
                                    🏆 Milestone: {week.content.milestone}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Success Stories
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm italic text-slate-600 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-rose-500 text-xs font-bold text-white">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Because you might be returning after a break
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Explore these resources tailored to your journey:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <FiBriefcase className="h-4 w-4" />
              Browse Jobs
            </Link>
            <Link
              href="/network"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <FiUsers className="h-4 w-4" />
              Network
            </Link>
            <Link
              href="/ask"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <FiSearch className="h-4 w-4" />
              Ask a Mentor
            </Link>
            <Link
              href="/world"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <FiHome className="h-4 w-4" />
              Her World
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <Badge tone="warning">Disclaimer</Badge>
          <p className="mt-2 text-sm text-amber-800">
            Her Life Desk provides educational guidance and career resources.
            Individual results may vary. The roadmap generated is a suggestion
            based on the information you provide and should not be considered
            professional career advice. Always verify opportunities independently
            and consult a qualified career counsellor for specific guidance.
          </p>
        </section>
      </div>
    </main>
  );
}
