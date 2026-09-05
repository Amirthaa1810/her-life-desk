export interface CourseQuizQ {
  question: string;
  options: string[];
  answer: number;
}

export interface CourseLesson {
  title: string;
  points: string[];
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  categoryEmoji: string;
  xp: number;
  minutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  gradient: string;
  art: string;
  lessons: CourseLesson[];
  quiz: CourseQuizQ[];
  takeaway: string;
}

export const courses: Course[] = [
  {
    slug: "legal-rights",
    title: "Understanding Your Legal Rights",
    category: "Legal",
    categoryEmoji: "⚖️",
    xp: 50,
    minutes: 10,
    difficulty: "Beginner",
    description: "A clear overview of basic rights every woman in India should know.",
    gradient: "from-violet-600 to-indigo-500",
    art: "⚖️",
    lessons: [
      {
        title: "What are your basic rights?",
        points: [
          "Equal right to life and liberty — in law, you are equal to anyone else, no matter your gender.",
          "You have the right to live with dignity (Article 21) — no one can treat you as less than a person.",
          "Equal right to education and a job — no one can stop you from learning or working.",
          "Right to say YES and NO — to a job, a partner, a doctor, or anything else.",
        ],
      },
      {
        title: "At the workplace",
        points: [
          "Equal pay for equal work — a boss cannot pay you less because of your gender.",
          "A safe workplace — no one can harass you at work, in any form (words, gestures, messages).",
          "A complaint process must exist — every workplace of 10+ employees must have an Internal Committee (POSH).",
          "You can quit your job freely — your employer cannot force you to stay or work against your will.",
        ],
      },
      {
        title: "In the family and society",
        points: [
          "Right to refuse marriage — no one can force you into a marriage you don't want.",
          "Right to inherit property — parents cannot write a daughter out of a share they give to sons.",
          "Right to report violence — police must register your complaint; they cannot refuse.",
          "Maintenance and support — in times of need, families have a duty to support women members.",
        ],
      },
      {
        title: "If someone hurts you",
        points: [
          "Call the police — even a single call like 112 reaches an emergency helpline.",
          "Keep proof — chats, photos, test reports and bills become strong evidence later.",
          "Take help — women's help lines (181) and NGOs can guide you free of cost.",
          "You are not at fault — the law protects you, never blames you for what happened.",
        ],
      },
    ],
    quiz: [
      {
        question: "Your employer refuses to pay you the same salary as a man doing the same job. What is true?",
        options: [
          "This is legal if the employer is small",
          "Equal pay for equal work is your legal right",
          "You cannot complain about salary",
        ],
        answer: 1,
      },
      {
        question: "Which number can you call for an emergency like 112?",
        options: ["Only your family", "Police emergency helpline", "Your office HR"], 
        answer: 1,
      },
    ],
    takeaway: "Your rights are simple: dignity, equality, safety and freedom. Know them and no one can easily take them from you.",
  },
  {
    slug: "budgeting-savings",
    title: "Budgeting & Savings Fundamentals",
    category: "Money",
    categoryEmoji: "💰",
    xp: 60,
    minutes: 12,
    difficulty: "Beginner",
    description: "Simple ways to track income, plan a budget and start saving money.",
    gradient: "from-emerald-500 to-teal-600",
    art: "💰",
    lessons: [
      {
        title: "Know exactly what you earn",
        points: [
          "Write your total income every month — salary, side work, money from family, rental income.",
          "Count what actually reaches your hand (after tax), because that is what you can plan with.",
          "Use your phone — a simple note or the expense tracker in Her Money does the job.",
          "Income in, money spent — the gap between these two is the most important number you have.",
        ],
      },
      {
        title: "Track every rupee going out",
        points: [
          "For 30 days, note down every expense — even the ₹20 tea or auto fare.",
          "Sort spending into groups: food, rent, transport, bills, shopping, fun, health.",
          "You will be surprised where money goes quietly (small daily spends add up fast).",
          "After 30 days you will see your real habit patterns — and can fix the leaks.",
        ],
      },
      {
        title: "The 50-30-20 rule that works",
        points: [
          "Needs (50%) — rent, food, bills, transport, health. Things you must pay.",
          "Wants (30%) — shopping, eating out, movies, subscriptions. Nice-to-haves.",
          "Savings (20%) — money you pay yourself first, before spending the rest.",
          "If 50-30-20 is too tight, try 60-30-10 and grow your savings month by month.",
        ],
      },
      {
        title: "Start saving without feeling it",
        points: [
          "Pay yourself first — transfer savings on salary day, not at month-end.",
          "Start small — even ₹500 a month builds a habit and a growing pile.",
          "Automate it — a recurring transfer removes the temptation to skip.",
          "Reward yourself — small treats stop the panic of 'I am depriving myself'.",
        ],
      },
    ],
    quiz: [
      {
        question: "In the 50-30-20 rule, which part is for savings?",
        options: ["50%", "30%", "20%"],
        answer: 2,
      },
      {
        question: "When is the BEST time to move money into savings?",
        options: [
          "At the end of the month, if anything is left",
          "Right on salary day, before spending",
          "When you get a bonus only",
        ],
        answer: 1,
      },
    ],
    takeaway: "Budgets are not punishment — they are a plan that tells your money where to go, instead of wondering where it went.",
  },
  {
    slug: "banking-basics",
    title: "Banking Basics for Independence",
    category: "Money",
    categoryEmoji: "💰",
    xp: 40,
    minutes: 8,
    difficulty: "Beginner",
    description: "Open and run your own bank account with complete confidence.",
    gradient: "from-sky-500 to-blue-600",
    art: "🏦",
    lessons: [
      {
        title: "Your own account = your own power",
        points: [
          "A bank account in your own name is the first brick of financial freedom.",
          "Your money stays yours alone — no one else uses it without your permission.",
          "You need it for salary, UPI, loans, and for building a credit history.",
          "A basic savings account can be opened with very little money — even ₹0 in many banks.",
        ],
      },
      {
        title: "What you need to open an account",
        points: [
          "Photo identity card — Aadhaar card or Passport.",
          "Address proof — Aadhaar, voter ID, or a utility bill in your name.",
          "One or two passport-size photos for most banks.",
          "PAN card (or Form 60) — needed for most accounts and can be added later.",
        ],
      },
      {
        title: "Your account number, PIN and OTP are private",
        points: [
          "Account number and IFSC: safe to share for receiving money.",
          "ATM PIN and OTP: NEVER share — no bank employee or caller will ever ask these.",
          "Keep monthly statements safe — they are your money records.",
          "Register your mobile number so you always get SMS alerts on every transaction.",
        ],
      },
      {
        title: "One-time checklist for every account",
        points: [
          "Enable SMS alerts for every debit and credit.",
          "Set a strong ATM PIN and change it if you suspect anyone saw it.",
          "Know your branch phone number and complaint helpline.",
          "Update your KYC yearly to keep the account active and clean.",
        ],
      },
    ],
    quiz: [
      {
        question: "Which of these can you SHARE with someone who wants to send you money?",
        options: ["ATM PIN", "OTP", "Account number and IFSC"],
        answer: 2,
      },
      {
        question: "What is the minimum amount needed to open a basic savings account?",
        options: ["₹10,000", "₹0 in many banks", "₹50,000"],
        answer: 1,
      },
    ],
    takeaway: "Banking is simple from your phone: your account, your PIN, your privacy. Keep the PIN and OTP secret, and money flows safely.",
  },
  {
    slug: "emergency-fund",
    title: "Emergency Funds: Your Safety Net",
    category: "Money",
    categoryEmoji: "💰",
    xp: 45,
    minutes: 9,
    difficulty: "Beginner",
    description: "Why an emergency fund matters and how to build one step by step.",
    gradient: "from-amber-500 to-orange-600",
    art: "🚨",
    lessons: [
      {
        title: "Why you need this fund",
        points: [
          "Life surprises us — medical bills, job loss, sudden repairs, family needs.",
          "Without savings, a ₹20,000 shock can push you into a high-interest loan.",
          "An emergency fund turns a scary situation into an annoying one.",
          "It is NOT for shopping, gifts or trips — it is only for real emergencies.",
        ],
      },
      {
        title: "How much should you keep?",
        points: [
          "Final goal: 3 to 6 months of your monthly spending.",
          "If your monthly cost is ₹15,000, aim for ₹45,000 to ₹90,000.",
          "Start small — an immediate first goal of ₹5,000 is already a mini shield.",
          "Your fund grows as your income grows. It is a goal, not a one-time plan.",
        ],
      },
      {
        title: "Where should this money live?",
        points: [
          "It must be SAFE — not in shares or trading bits that can fall in price.",
          "It must be QUICK to reach — a day or two at most when you need it.",
          "Savings account, fixed deposits or a liquid fund are good homes.",
          "Keep it slightly separate from your normal account, so you do not spend it by mistake.",
        ],
      },
      {
        title: "Building it, one step at a time",
        points: [
          "Transfer a fixed amount monthly — e.g. ₹1,000 the day salary arrives.",
          "Side income goes in — 50% of any extra money, gifts or bonuses.",
          "Track progress — watching it grow keeps you motivated.",
          "If you use some, refill it first before any other new goal.",
        ],
      },
    ],
    quiz: [
      {
        question: "An emergency fund should be used for...",
        options: [
          "A festival shopping spree",
          "A sudden medical bill or job loss",
          "Buying a new phone",
        ],
        answer: 1,
      },
      {
        question: "How many months of expenses is the final goal?",
        options: ["1 month", "3 to 6 months", "24 months"],
        answer: 1,
      },
    ],
    takeaway: "Save for the rainy day before it rains. Even small monthly amounts build a shield that keeps big problems small.",
  },
  {
    slug: "ownership-nominations",
    title: "Ownership & Nominations Explained",
    category: "Ownership",
    categoryEmoji: "🏠",
    xp: 55,
    minutes: 11,
    difficulty: "Intermediate",
    description: "What ownership really means and why nominations protect you.",
    gradient: "from-rose-500 to-pink-600",
    art: "🔑",
    lessons: [
      {
        title: "Ownership is a paper, not a promise",
        points: [
          "A house or property is 'yours' only when your name is in official records.",
          "Buying with your own money but leaving the property in another's name gives them full rights.",
          "Getting your name added to property documents is called 'registration' or 'mutation'.",
          "If a property is bought jointly, BOTH names should appear on the paper.",
        ],
      },
      {
        title: "Why nominations matter so much",
        points: [
          "A nomination says who will receive your money or property in a crisis.",
          "Without a nomination, family members face long paperwork and legal delays.",
          "You can nominate anyone you trust — a parent, sibling, friend, or child.",
          "You can change your nomination anytime in life — it is never forever.",
        ],
      },
      {
        title: "Documents that should carry your name",
        points: [
          "Bank accounts — a nominee makes money reach your family without court.",
          "Fixed deposits and insurance — without a nominee these get stuck for months.",
          "Vehicle registration (RC) and property registry — official documents, not memories.",
          "Provident Fund (PF) and pension — always update nomination & family details.",
        ],
      },
      {
        title: "Simple action plan",
        points: [
          "List every account, FD, policy and property you use or own.",
          "Fill nomination in each one — most can be done online in minutes.",
          "Check if parents' properties should be jointly transferred to you too.",
          "Keep a small 'important documents' note (vault can help) so family knows what exists.",
        ],
      },
    ],
    quiz: [
      {
        question: "Whose name must be on the property paper for you to truly own it?",
        options: [
          "The person who gave the money",
          "Anyone in the family",
          "Your own name in the registration/records",
        ],
        answer: 2,
      },
      {
        question: "A nomination in a bank account is for...",
        options: [
          "Letting the bank spend your money",
          "Ensuring money reaches your chosen person easily in a crisis",
          "Only married people",
        ],
        answer: 1,
      },
    ],
    takeaway: "A promise of ownership without paper is just words. Put your name in documents and add nominations everywhere.",
  },
  {
    slug: "wills-estate",
    title: "Wills & Estate Planning Basics",
    category: "Ownership",
    categoryEmoji: "🏠",
    xp: 65,
    minutes: 13,
    difficulty: "Intermediate",
    description: "Understand wills, then estate planning essentials in plain words.",
    gradient: "from-fuchsia-600 to-purple-700",
    art: "📜",
    lessons: [
      {
        title: "What is a Will?",
        points: [
          "A Will is a simple paper that says who gets what after your lifetime.",
          "It must be signed by you and two witnesses to be strong in India.",
          "A Will is NOT only for rich people — it prevents fights in every family.",
          "You can change it anytime. Writing a new one simply replaces the old.",
        ],
      },
      {
        title: "If there is no Will",
        points: [
          "The law (Hindu/Indian succession) decides — you lose the choice.",
          "Every legal heir may need to agree — one unhappy relative can block everything.",
          "It can take years and lots of lawyer fees to settle finally.",
          "A simple Will keeps your family from months or years of pain.",
        ],
      },
      {
        title: "Estate planning = planning for your family's comfort",
        points: [
          "'Estate' is simply everything you own — money, property, jewellery, policies.",
          "Planning means deciding who gets what, and making that easy legally.",
          "Update your plan when life changes — wedding, baby, moving cities.",
          "Small things (a diary with account numbers) help your family as much as the Will.",
        ],
      },
      {
        title: "Making it real, step by step",
        points: [
          "Write your list: what you own, and who should get each item.",
          "Ask a lawyer to format it as a formal Will for ₹500-2,000 in most cities.",
          "Sign it with two witnesses who are not the people getting the gifts.",
          "Give a copy to two trusted people and keep your plan updated every few years.",
        ],
      },
    ],
    quiz: [
      {
        question: "Who signs as witnesses of a Will in India?",
        options: [
          "Two people not receiving the gifts",
          "Your boss and cook",
          "The bank manager",
        ],
        answer: 0,
      },
      {
        question: "Can you change your Will later in life?",
        options: ["Never", "Yes, anytime you choose", "Only once"],
        answer: 1,
      },
    ],
    takeaway: "A Will is a gift of peace — it stops arguments and protects the people you love.",
  },
  {
    slug: "upi-scams",
    title: "Spotting UPI & Payment Scams",
    category: "Digital Shield",
    categoryEmoji: "🛡️",
    xp: 50,
    minutes: 10,
    difficulty: "Beginner",
    description: "Learn to recognise the most common payment and banking scams.",
    gradient: "from-red-500 to-rose-600",
    art: "⚠️",
    lessons: [
      {
        title: "The golden rule — money flows OUT from your consent",
        points: [
          "No bank, company or government employee will ever ask for your OTP, PIN or CVV.",
          "Receiving money NEVER needs your PIN — they only need your UPI ID or account number.",
          "'Share OTP to receive a refund' is 100% a scam. 100%.",
          "Anytime someone asks for a PIN or OTP over a call — hang up at once.",
        ],
      },
      {
        title: "Common scam scripts to watch for",
        points: [
          "KYC expired — 'Send OTP to update'? A lie, banks never call for OTPs.",
          "Refund/redemption — no refund needs your PIN, ever.",
          "Job offer fees — a real job never asks you to 'pay to activate'.",
          "Shipping/electricity — fake messages with a link steal your card details.",
        ],
      },
      {
        title: "Safe habits that protect you",
        points: [
          "Verify every link — type the bank's website yourself instead of clicking.",
          "Use the official app — for banking, install from the store on your phone.",
          "Check UPI recipient names before paying — a mismatch means STOP.",
          "Turn on transaction alerts and check them daily.",
        ],
      },
      {
        title: "If you already paid or shared details",
        points: [
          "Call your bank immediately and tell them to freeze the account.",
          "Call 1930 (national cybercrime helpline) fast to report the fraud.",
          "File a complaint on cybercrime.gov.in with all chats and receipts.",
          "Do not be ashamed — scammers are professionals; reporting helps you claim back.",
        ],
      },
    ],
    quiz: [
      {
        question: "A caller says your KYC expired and asks for OTP to update it. What is true?",
        options: [
          "Share the OTP to avoid penalty",
          "Banks never call asking for OTP — it is a scam",
          "Share it only if bank logo is on the call",
        ],
        answer: 1,
      },
      {
        question: "Which number do you call to report a cyber fraud in India?",
        options: ["100", "1930", "108"],
        answer: 1,
      },
    ],
    takeaway: "Remember: OTP, PIN, CVV — never share, never type. When in doubt, hang up and call your bank directly.",
  },
  {
    slug: "two-factor-auth",
    title: "Two-Factor Authentication: Your Lock",
    category: "Digital Shield",
    categoryEmoji: "🛡️",
    xp: 35,
    minutes: 7,
    difficulty: "Beginner",
    description: "How 2FA protects your accounts — turn it on today.",
    gradient: "from-indigo-500 to-blue-600",
    art: "🔐",
    lessons: [
      {
        title: "What is 2FA and why do you need it?",
        points: [
          "A password alone is like a single lock — if someone steals it, they're inside.",
          "2FA adds a second lock: a code sent to YOUR phone.",
          "Even if a hacker has your password, without your phone they cannot enter.",
          "It blocks over 95% of account-takeover attacks — the simplest strong protection.",
        ],
      },
      {
        title: "Which accounts to protect first",
        points: [
          "Email — it can reset all your other passwords, so lock it first.",
          "Banking and UPI apps — your money's front door.",
          "Social media — strangers can't message or post as you.",
          "Any app where you saved a payment card.",
        ],
      },
      {
        title: "How to turn it on",
        points: [
          "Open Settings → Security or Privacy → 'Two-step'/2FA in the app.",
          "Choose a method — SMS code, authenticator app, or a security key.",
          "Done in 2 minutes per account. Do it for 3 key accounts this week.",
          "Set a backup option, so a lost phone won't lock YOU out forever.",
        ],
      },
      {
        title: "Never share the 2FA code",
        points: [
          "The code is personal proof — like the key to your locker.",
          "Scammers pretend to be 'support' and ask for it. It is always fake.",
          "Only you should read the code on YOUR screen and type it in the REAL app.",
          "If someone pressures you for it quickly — that is the biggest red flag.",
        ],
      },
    ],
    quiz: [
      {
        question: "2FA protects you best when...",
        options: [
          "You use a long password",
          "A second code from your phone is needed to log in",
          "You log in from home only",
        ],
        answer: 1,
      },
      {
        question: "Which is the most important account to protect first?",
        options: ["A game account", "Email", "A news app"],
        answer: 1,
      },
    ],
    takeaway: "2FA is a tiny setup for a big shield — two locks are always better than one.",
  },
  {
    slug: "social-media-security",
    title: "Protect Your Social Media Accounts",
    category: "Digital Shield",
    categoryEmoji: "🛡️",
    xp: 40,
    minutes: 8,
    difficulty: "Beginner",
    description: "Lock down your social profiles against hackers and fake profiles.",
    gradient: "from-pink-500 to-rose-600",
    art: "📱",
    lessons: [
      {
        title: "The privacy check-up you should do weekly",
        points: [
          "Review who can see your posts — Friends only beats Public.",
          "Check profile searching — stop strangers finding your phone/email.",
          "Turn off location tags on old photos where possible.",
          "Remove old devices from 'Logged-in devices' you do not recognise.",
        ],
      },
      {
        title: "Strong password + 2FA = firm lock",
        points: [
          "Use a long password (any sentence like 'BlueDressWins@2026' works great).",
          "Turn on two-step login in settings today.",
          "Never use the same password for bank and social media.",
          "Log out of shared/old phones at once.",
        ],
      },
      {
        title: "Beware of fake profiles and messages",
        points: [
          "Someone copying your photo and name = a fake profile. Report it.",
          "Too-good offers, lottery winnings and 'urgent help' are bait.",
          "Never share OTP, PIN or money 'verification' codes on chats.",
          "Block and report anything suspicious — it keeps the whole platform safer.",
        ],
      },
      {
        title: "Your photos are private-ish",
        points: [
          "That photo of your ID card or address — take it down.",
          "Avoid sharing boarding passes and ticket barcodes publicly.",
          "Watermark serious work images if they must go public.",
          "Think of your future job — future employers check profiles too.",
        ],
      },
    ],
    quiz: [
      {
        question: "Which password is the strongest of these?",
        options: ["12345678", "BlueDressWins@2026", "mypassword"],
        answer: 1,
      },
      {
        question: "Your photo and name appear on a stranger's fake account. What do you do?",
        options: [
          "Ignore it — it's harmless",
          "Share your OTP with anyone who asks",
          "Report the profile as a fake/impersonation",
        ],
        answer: 2,
      },
    ],
    takeaway: "Your profile is your home online — set strong locks, check visitors, and report intruders.",
  },
  {
    slug: "interview-prep",
    title: "Interview Preparation Essentials",
    category: "Career",
    categoryEmoji: "💼",
    xp: 55,
    minutes: 11,
    difficulty: "Intermediate",
    description: "Prepare for interviews with confidence and calm.",
    gradient: "from-teal-500 to-emerald-600",
    art: "🎤",
    lessons: [
      {
        title: "Research before you walk in",
        points: [
          "Read the company's website and latest news — know what they do.",
          "Understand the role — reread the job description line by line.",
          "Prepare 2 questions to ask them — showing interest matters.",
          "Know your own resume cold — every point must be ready to explain.",
        ],
      },
      {
        title: "The three questions that appear in every interview",
        points: [
          "'Tell me about yourself' — 2-minute story: who you are, what you do well.",
          "'Why should we hire you?' — tie your strengths to what they need.",
          "'What's your weakness?' — pick a real one and show what you're doing about it.",
        ],
      },
      {
        title: "Practice the STAR method",
        points: [
          "S — Situation: a real example you handled.",
          "T — Task: what was your responsibility in it.",
          "A — Action: what exactly YOU did (not the team).",
          "R — Result: what improved — a number or a change.",
        ],
      },
      {
        title: "Body, timing and follow-up",
        points: [
          "Arrive 10-15 minutes early — never late.",
          "Smile, make eye contact, sit and speak calmly.",
          "Answer first, keep it under 2 minutes, stop.",
          "Thank them the same day with a short email — it separates you from most.",
        ],
      },
    ],
    quiz: [
      {
        question: "In STAR, what does the A stand for?",
        options: ["Appeal", "Action — what you specifically did", "Attitude"],
        answer: 1,
      },
      {
        question: "Best time to send a thank-you after an interview?",
        options: [
          "Next month",
          "Only if you are hired",
          "Within the same day",
        ],
        answer: 2,
      },
    ],
    takeaway: "Interviews are just conversations to check fit — research, practice your story, be on time, and follow up.",
  },
  {
    slug: "returning-to-work",
    title: "Returning to Work After a Break",
    category: "Career",
    categoryEmoji: "💼",
    xp: 60,
    minutes: 12,
    difficulty: "Beginner",
    description: "Practical steps to restart your career with confidence.",
    gradient: "from-cyan-500 to-sky-600",
    art: "🌱",
    lessons: [
      {
        title: "Your break is a strength, not a gap",
        points: [
          "Time away developed skills — managing a home teaches budgeting, planning, patience.",
          "Reframe it: 'I managed a household of 5' is leadership, not a blank.",
          "Most employers today welcome returners — many have special hiring drives.",
          "Your experience before the break still counts — it never expired.",
        ],
      },
      {
        title: "Build your comeback plan in 4 weeks",
        points: [
          "Week 1 — refresh your resume and LinkedIn with your best old and new skills.",
          "Week 2 — do a free short course or certification in your field.",
          "Week 3 — message 10 people: old colleagues, friends, communities.",
          "Week 4 — apply to 10 roles a week. Volume plus focus wins.",
        ],
      },
      {
        title: "Practical choices that ease the transition",
        points: [
          "Start with part-time or freelance — test the waters while adjusting.",
          "Look for return-to-work programs some companies run specially.",
          "Consider remote jobs — they remove commute and timing pressure.",
          "Negotiate flexible hours early, not as an apology later.",
        ],
      },
      {
        title: "Keep going when it feels slow",
        points: [
          "Rejections are part of the process, not a judgement on you.",
          "Set small weekly goals — 10 applications beats 1 perfect one.",
          "Join women's career communities for leads and morale.",
          "Consistency beats intensity — 30 minutes a day keeps you moving.",
        ],
      },
    ],
    quiz: [
      {
        question: "When describing a career break, the best approach is to...",
        options: [
          "Hide it and pretend you worked",
          "Present it positively with the skills you gained",
          "Apologise throughout the answer",
        ],
        answer: 1,
      },
      {
        question: "A smart first step back is to...",
        options: [
          "Wait for the perfect job to appear",
          "Start part-time/freelance and test the waters",
          "Quit all support from family",
        ],
        answer: 1,
      },
    ],
    takeaway: "You did not fall behind — your break was a chapter, not a wall. Plan in small weeks and keep moving.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Basics",
    category: "Business",
    categoryEmoji: "🚀",
    xp: 70,
    minutes: 14,
    difficulty: "Intermediate",
    description: "Learn the fundamentals of promoting any business online.",
    gradient: "from-orange-500 to-amber-600",
    art: "📣",
    lessons: [
      {
        title: "The one big idea",
        points: [
          "Digital marketing is just word-of-mouth that can reach millions.",
          "You need three things: a good offer, the right audience, and a channel.",
          "A small business wins by serving a small group superbly, not everyone slowly.",
          "Spend your time where your customers already spend theirs.",
        ],
      },
      {
        title: "Your 5 free channels",
        points: [
          "WhatsApp/Instagram — post daily, real photos, reply fast.",
          "Google Business Profile — free visibility when people search your city.",
          "Facebook groups & local pages — your neighbourhood is your first market.",
          "Word-of-mouth loops — happy customers who tell one friend each.",
          "Simple website or link page — one clean page that builds trust.",
        ],
      },
      {
        title: "Content that sells (without shouting)",
        points: [
          "Show, don't tell — photos/videos of your product in real use.",
          "Answer questions your customers ask, in posts — you become the expert.",
          "Share prices clearly — hidden prices kill trust.",
          "Post on a schedule — 4-5 times a week beats random bursts.",
        ],
      },
      {
        title: "Measure what matters",
        points: [
          "Follow-up messages received = the real success number, not 'likes'.",
          "Ask new customers HOW they found you — write it down.",
          "Keep a simple list of your posts and which got replies.",
          "Repeat what works — double down on the posts that bring sales.",
        ],
      },
    ],
    quiz: [
      {
        question: "The real measure of marketing success is...",
        options: ["Number of likes", "Follow-up messages and sales from announcements", "Your follower count"],
        answer: 1,
      },
      {
        question: "A new business should spend its time...",
        options: [
          "On every platform at once",
          "Where its own customers already are",
          "Only on paid ads",
        ],
        answer: 1,
      },
    ],
    takeaway: "Marketing is simply showing the right people the right offer, honestly and repeatedly.",
  },
  {
    slug: "business-registration",
    title: "Business Registration Basics",
    category: "Business",
    categoryEmoji: "🚀",
    xp: 65,
    minutes: 13,
    difficulty: "Intermediate",
    description: "Know exactly what it takes to legally register a business.",
    gradient: "from-violet-500 to-fuchsia-600",
    art: "🏷️",
    lessons: [
      {
        title: "Why register at all?",
        points: [
          "A registered business can open a business bank account and take payments properly.",
          "You become eligible for loans and government schemes for women/first-time owners.",
          "It protects your personal savings from business debts (separate entity).",
          "Big clients and marketplaces generally prefer to deal with registered sellers.",
        ],
      },
      {
        title: "The simplest path — sole proprietorship",
        points: [
          "Easiest option — often just a PAN card in your own name.",
          "Open a current account with that PAN and you can bill clients.",
          "Registration via Shops & Establishments in your city is usually simple and cheap.",
          "Good enough for most small sellers, services and first-time businesses.",
        ],
      },
      {
        title: "When you need a company or LLP",
        points: [
          "A Private Limited (Pvt Ltd) or LLP separates your personal money from business.",
          "Useful when taking investors, partnerships, or large contracts.",
          "Requires DSC (digital signature), DIN, incorporation with MCA, and an auditor.",
          "Costs a few thousand rupees; an accountant or CA can guide you.",
        ],
      },
      {
        title: "The 5 things every new business must have",
        points: [
          "PAN card (personal) and a business PAN/bank account.",
          "GST registration once you cross the tax-return limit.",
          "Shop/establishment registration if you have a shop or employees.",
          "A simple receipt format and a record of sales.",
          "One small accountant or bookkeeping habit from month one.",
        ],
      },
    ],
    quiz: [
      {
        question: "The easiest registration for a small seller is...",
        options: [
          "Sole proprietorship under your own PAN",
          "A listed stock company",
          "A Public Limited company",
        ],
        answer: 0,
      },
      {
        question: "Why do most businesses register at all?",
        options: [
          "To make the work harder",
          "To appear official",
          "To take payments properly, get loans and protect personal money",
        ],
        answer: 2,
      },
    ],
    takeaway: "Registration turns your passion into a proper business — it brings trust, bank access and protection.",
  },
  {
    slug: "needs-vs-wants",
    title: "Budgeting: Needs vs Wants",
    category: "Money",
    categoryEmoji: "💰",
    xp: 40,
    minutes: 8,
    difficulty: "Beginner",
    description: "Learn to separate needs from wants and budget smarter.",
    gradient: "from-lime-500 to-emerald-600",
    art: "🧾",
    lessons: [
      {
        title: "The needs-first rule",
        points: [
          "Needs = keeps you safe and functioning — food, rent, bills, transport, health.",
          "Wants = makes life fun — eating out, shopping, subscriptions, upgrades.",
          "Pay for ALL needs before any want — unconditional, no exceptions.",
          "A want that pretends to be a need (premium phone when yours works) is a trap.",
        ],
      },
      {
        title: "The 24-hour trick for impulse purchases",
        points: [
          "When you want to buy something fun, wait one full day.",
          "If you still want it after 24 hours, buy it guilt-free.",
          "Most impulse wants melt away in a day — you saved for no pain.",
          "Keep a 'wish list' note — the joy of seeing items fall off is satisfying.",
        ],
      },
      {
        title: "Cut without suffering",
        points: [
          "Switch subscriptions — keep one streaming, cancel the unused ones.",
          "Cook 2 more meals a week at home — saves a lot and is healthier.",
          "Buy in season and in bulk only for what you truly use.",
          "Track the money saved — seeing it motivates you to keep going.",
        ],
      },
      {
        title: "Budget with your values, not guilt",
        points: [
          "A budget that makes you miserable will not last — design it to be okay.",
          "Give yourself a small 'fun money' amount monthly, guilt-free.",
          "Automate savings FIRST, then the rest is yours to enjoy.",
          "Review together monthly — budgets are a tool for freedom, not a cage.",
        ],
      },
    ],
    quiz: [
      {
        question: "Which of these is a NEED?",
        options: ["A new phone yearly", "Rent + electricity", "Monthly shopping trip"],
        answer: 1,
      },
      {
        question: "The 24-hour rule helps you...",
        options: [
          "Avoid discount sales",
          "Reduce impulse purchases that fade after a day",
          "Delay paying rent",
        ],
        answer: 1,
      },
    ],
    takeaway: "Needs first, wants later, and a small joyful budget that you can actually keep.",
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);