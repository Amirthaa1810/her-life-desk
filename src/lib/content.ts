export interface BlogPost {
  id: number;
  title: string;
  category: string;
  categoryEmoji: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  cover: string;
  coverImage: string;
  body: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Legal Rights Every Woman Should Know",
    category: "Women's Rights",
    categoryEmoji: "⚖️",
    author: "Adv. Meena K",
    authorRole: "Lawyer, Women's Rights",
    date: "02 Sep 2026",
    readTime: "6 min",
    tags: ["Rights", "Law", "Basics"],
    excerpt:
      "A simple, practical guide to the fundamental rights that protect you at home, at work and in society.",
    cover: "from-violet-500 to-purple-600",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: true,
    body: [
      "Understanding your rights is the first step to protecting them. Here are five fundamental rights every woman should know.",
      "1. Right to equal pay: The Equal Remuneration Act guarantees equal pay for equal work. You cannot be paid less because of your gender.",
      "2. Right against workplace harassment: The POSH Act requires every workplace with 10+ employees to have an Internal Committee for handling sexual harassment complaints.",
      "3. Right to property and inheritance: Under the Hindu Succession Act, daughters have equal rights in ancestral property as sons. This applies to married and unmarried daughters alike.",
      "4. Right to a safe and fair workplace: You have the right to reasonable working hours, fair leave policies and protection from unfair dismissal.",
      "5. Right to protection from violence: The Protection of Women from Domestic Violence Act covers physical, emotional, verbal and economic abuse within domestic relationships.",
      "This is educational information, not legal advice. For guidance on your specific situation, consult a qualified lawyer or reach out to the National Commission for Women.",
    ],
  },
  {
    id: 2,
    title: "Building Your First Emergency Fund",
    category: "Finance",
    categoryEmoji: "💰",
    author: "Anitha V",
    authorRole: "Financial-literacy Educator",
    date: "01 Sep 2026",
    readTime: "5 min",
    tags: ["Savings", "Money", "Planning"],
    excerpt:
      "A step-by-step plan to build a financial safety net — even when money feels tight.",
    cover: "from-sky-500 to-cyan-600",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: true,
    body: [
      "An emergency fund is money set aside for the 'what ifs' in life — a medical need, a job gap, an unexpected repair. It is your financial safety net.",
      "Start small. Even saving ₹500 a month adds up to ₹6,000 in a year. The key is consistency, not the amount.",
      "Aim for 3 to 6 months of your essential monthly expenses. To calculate this, list your rent or home costs, food, utilities, transport and any fixed payments.",
      "Keep this money in a separate savings account so you are not tempted to spend it. Do not invest it in risky products.",
      "You have an emergency fund when 3 months of your essentials are covered without touching your daily money.",
      "Educational information only. For personal financial decisions, consult a qualified financial professional.",
    ],
  },
  {
    id: 3,
    title: "Returning to Work: Finding Your Confidence",
    category: "Career",
    categoryEmoji: "💼",
    author: "Saranya M",
    authorRole: "Career Coach",
    date: "30 Aug 2026",
    readTime: "7 min",
    tags: ["Career", "Confidence", "Returners"],
    excerpt:
      "Practical and emotional strategies for women restarting their careers after a break.",
    cover: "from-rose-500 to-pink-600",
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: true,
    body: [
      "A career break does not reduce your value. It changes your story — and your story can be powerful.",
      "Start by listing everything you did during your break: managing a household, raising children, volunteering, caring for family. All of these built real skills like organisation, patience and problem-solving.",
      "Refresh your resume with a focus on outcomes, not gaps. One line for the gap with a positive framing is enough.",
      "Reconnect with old colleagues. Even one conversation can reopen doors you thought were closed.",
      "Set a realistic return schedule. Many returners do well with part-time or freelance work first, then grow.",
      "Confidence returns with small wins. Take one small step today: update your resume, or message one connection.",
    ],
  },
  {
    id: 4,
    title: "Nominations Made Simple",
    category: "Ownership",
    categoryEmoji: "🏠",
    author: "Rekha Nair",
    authorRole: "Small-business Mentor",
    date: "28 Aug 2026",
    readTime: "4 min",
    tags: ["Ownership", "Finance", "Family"],
    excerpt:
      "What nominees are, why they matter, and how to set them correctly on your accounts and assets.",
    cover: "from-amber-500 to-orange-600",
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: false,
    body: [
      "A nominee is the person you name to receive your assets (bank account, insurance, investments) in case something happens to you.",
      "Without a nomination, your family may face a long process to claim what is rightfully theirs. With one, the transfer is quick and simple.",
      "You can review and change your nominee at any time — usually at no cost, in a few minutes on your bank or insurer's app.",
      "A nominee is not the same as an heir. Nomination is about who can claim the asset easily; your will decides who inherits it legally.",
      "Practical step: open your banking app today, check the nomination section, and update it if needed. Do the same for insurance policies.",
    ],
  },
  {
    id: 5,
    title: "How UPI Scams Work — and How to Avoid Them",
    category: "Digital Safety",
    categoryEmoji: "🛡️",
    author: "Her Life Desk Team",
    authorRole: "Safety & Education",
    date: "27 Aug 2026",
    readTime: "5 min",
    tags: ["Scams", "UPI", "Safety"],
    excerpt:
      "The most common UPI fraud tactics, with simple rules to keep your money safe.",
    cover: "from-emerald-500 to-teal-600",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: false,
    body: [
      "UPI is fast and easy — and scammers love that too. Knowing their tricks is your best defence.",
      "Never share your UPI PIN, OTP or card details with anyone. No bank or payment app ever asks for these over a call.",
      "Ignore requests to 'verify' your account by transferring money to a 'safe account'. That is a common fraud pattern.",
      "Beware of QR-code refunds. A request for money from you is not a refund — check the direction of the payment.",
      "If a transaction goes wrong, contact your bank immediately and report to the National Cyber Crime helpline (1930).",
      "Save official reporting contacts on your phone before you need them.",
    ],
  },
  {
    id: 6,
    title: "Starting a Home-Based Business: First Steps",
    category: "Entrepreneurship",
    categoryEmoji: "🚀",
    author: "Rekha Nair",
    authorRole: "Small-business Mentor",
    date: "25 Aug 2026",
    readTime: "8 min",
    tags: ["Business", "Startup", "Home-based"],
    excerpt:
      "From idea to first sale — a beginner-friendly roadmap for women turning a skill into income.",
    cover: "from-fuchsia-500 to-purple-600",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: true,
    body: [
      "Every big business started with one small idea. Yours can too — and it can begin right from your home.",
      "Step 1: Choose your product or service. What do people already ask you for? A skill, a recipe, a craft.",
      "Step 2: Test with 5 people. Offer your first few orders to friends and family for honest feedback.",
      "Step 3: Set a simple price. Cover material costs plus your time, and add a small margin.",
      "Step 4: Use free tools to sell. WhatsApp, Instagram and local community groups are powerful, free channels.",
      "Step 5: Learn about registration when you grow. Small home businesses can start informal and register formally as they expand.",
    ],
  },
  {
    id: 7,
    title: "Women in STEM: Breaking Barriers",
    category: "Education",
    categoryEmoji: "🎓",
    author: "Her Life Desk Team",
    authorRole: "Education Desk",
    date: "22 Aug 2026",
    readTime: "6 min",
    tags: ["STEM", "Education", "Inspiration"],
    excerpt:
      "Among girls now outperform or match boys in STEM subjects — yet gender gaps persist in careers. Here's why it matters.",
    cover: "from-blue-500 to-indigo-600",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: false,
    body: [
      "Science, technology, engineering and math shape our future — and women deserve their place in it.",
      "Globally, girls close to matching boys in STEM performance in school, but fewer women enter and stay in STEM careers.",
      "Role models change this. When young women see women scientists, engineers and founders, they believe the path is possible.",
      "If you are considering STEM, start with one online course, one mentor conversation, or one community of learners.",
      "Whether you choose tech or not, understanding technology gives you power over your own independence.",
    ],
  },
  {
    id: 8,
    title: "Matrimonial and Dating App Scams: Red Flags",
    category: "Digital Safety",
    categoryEmoji: "🛡️",
    author: "Her Life Desk Team",
    authorRole: "Safety & Education",
    date: "20 Aug 2026",
    readTime: "6 min",
    tags: ["Scams", "Safety", "Dating"],
    excerpt:
      "How to recognize scams on matches and matrimonial sites — and how to report them.",
    cover: "from-red-500 to-rose-600",
    coverImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    featured: false,
    body: [
      "Fraudsters misuse matrimonial and dating platforms to gain trust, then ask for money. These red flags will help you spot them early.",
      "A profile that avoids video calls or meeting in person is a warning sign. Real relationships meet eventually.",
      "Emergency money requests — for travel, a sick relative, or customs fees — are a classic scam pattern.",
      "Requests to move conversations to private, unverifiable apps early on deserve caution.",
      "Never send money to someone you have not met. Never share banking details, OTPs or scanned ID proofs casually.",
      "Report suspicious profiles to the platform and to the National Cyber Crime portal if money or threats are involved.",
    ],
  },
];

export interface NewsItem {
  id: number;
  headline: string;
  category: string;
  categoryEmoji: string;
  date: string;
  source: string;
  summary: string;
  tags: string[];
  breaking?: boolean;
  coverImage: string;
  body: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    headline: "Supreme Court expands protections for working mothers on maternity leave",
    category: "Legal",
    categoryEmoji: "⚖️",
    date: "04 Sep 2026",
    source: "Legal Affairs Daily",
    summary:
      "A landmark ruling clarifies that maternity-leave benefits cannot be denied to mothers who switch employers during the protected period.",
    tags: ["Maternity", "Workplace", "Rights"],
    breaking: true,
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "India's highest court has delivered a significant judgment for working mothers: maternity-leave benefits cannot be denied simply because a woman changed employers during the protected period.",
      "The ruling clarifies that the right to paid maternity leave flows from a mother's status and the law's intent to protect maternal and child health — not from how long she has been at one company.",
      "Legal experts say the decision strengthens existing protections under the Maternity Benefit Act, which already guarantees 26 weeks of paid leave, and encourages more women to continue careers while raising families.",
      "If you are expecting and work in the formal sector, remember: your medical certificate, leave records and HR correspondence matter. Keep copies safe in your documents vault.",
      "Educational update for awareness. For guidance specific to your situation, consult a qualified labour-law professional.",
    ],
  },
  {
    id: 2,
    headline: "RBI tightens rules on instant-loan apps to protect borrowers",
    category: "Finance",
    categoryEmoji: "💰",
    date: "03 Sep 2026",
    source: "Financial Watch",
    summary:
      "New guidelines require digital lenders to display total cost and interest clearly, and ban coercive recovery practices.",
    tags: ["Loans", "Banking", "Consumer safety"],
    breaking: false,
    coverImage: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "The Reserve Bank of India has tightened the rules around instant personal-loan apps to protect consumers — especially first-time and small-ticket borrowers.",
      "Digital lenders must now show the total cost of the loan — including interest, processing fees and any hidden charges — at a glance, before the borrower is locked in.",
      "Coercive recovery practices, such as threatening calls to family members or sharing default data publicly, are explicitly banned under the new guidelines.",
      "When borrowing, always check for a registered lender name, a clear agreement and the effective annual interest rate. If an app demands 'security deposits' before disbursing a loan, it is almost certainly a scam — this practice is not only unheard of but also a clear fraud signal.",
      "Educational information. Always compare offers and borrow only what you can comfortably repay.",
    ],
  },
  {
    id: 3,
    headline: "Women-owned businesses now eligible for higher Mudra loan ceiling",
    category: "Business",
    categoryEmoji: "🚀",
    date: "03 Sep 2026",
    source: "Enterprise Desk",
    summary:
      "The government has raised loan limits for women-led micro-enterprises under the Mudra scheme, opening more working capital.",
    tags: ["Business", "Funding", "Schemes"],
    breaking: true,
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "Women-led micro-enterprises across India can now access a higher borrowing ceiling under the Mudra scheme, a move designed to unlock working capital for home and small businesses.",
      "The enhanced limits mean a woman proprietor who was previously capped can now borrow significantly more to buy stock, equipment or machinery — without needing collateral.",
      "Borrowers can apply through most major banks, regional rural banks and microfinance institutions, whichever they already bank with.",
      "To prepare, keep your Aadhaar, PAN, a current account, and simple business records (sales notebook or digital ledger) ready. Banks value businesses that can show steady sales.",
      "Always compare schemes,and verify any 'agent' who asks for fees to process a government loan — legitimate loans never require advance payments.",
    ],
  },
  {
    id: 4,
    headline: "New national cyber-fraud helpline reporting window extended",
    category: "Digital Safety",
    categoryEmoji: "🛡️",
    date: "02 Sep 2026",
    source: "Cyber Brief",
    summary:
      "Reporting fraud within the first hours significantly improves recovery chances — the official 1930 helpline is operational nationwide.",
    tags: ["Fraud", "Reporting", "Safety"],
    breaking: false,
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "The national cyber-fraud helpline has extended its reporting window to help victims of digital fraud recover their money faster.",
      "The 1930 helpline operates nationwide. Reporting within the first few hours after money is taken dramatically improves the chances of freezing the transaction before it reaches the fraudster.",
      "When a payment is made through UPI or a bank transfer, the money can often be blocked at a partner bank if the complaint reaches the helpline quickly.",
      "Keep proof ready: the transaction reference, the app used, the amount and time. Then also file an FIR with your local police.",
      "There is no shame in reporting a scam — acting fast is the smartest financial move you can make.",
    ],
  },
  {
    id: 5,
    headline: "State launches free skill-certification drive for women returners",
    category: "Career",
    categoryEmoji: "💼",
    date: "02 Sep 2026",
    source: "Jobs & Skills",
    summary:
      "A 12-week certification programme covers digital skills, office basics and interview prep, aimed at women restarting their careers.",
    tags: ["Skills", "Reskilling", "Career"],
    breaking: false,
    coverImage: "https://images.unsplash.com/photo-1521791055366-0d553872125f?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "A state government has launched a free 12-week certification programme aimed squarely at women returning to work after a career break.",
      "The course covers digital skills, office basics, and interview preparation, and is designed for flexible, part-time study from home.",
      "Returner-friendly hiring drives and dedicated placement support are part of the programme, with certificates recognised by registered employers.",
      "If you are planning a comeback, treat this as a boost, not a rush: refresh one skill at a time, update your resume, and restart your professional network with alumni from your field.",
      "Check your own state's skill-development portal for similar schemes — many states now run returner programmes with free or subsidised training.",
    ],
  },
  {
    id: 6,
    headline: "New pay-parity report: women's workforce participation rising",
    category: "Economy",
    categoryEmoji: "📊",
    date: "01 Sep 2026",
    source: "India Economy Monitor",
    summary:
      "Latest data shows steady growth in women's formal workforce participation, with the biggest gains in urban parts of the south.",
    tags: ["Economy", "Workforce", "Data"],
    breaking: false,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=60&w=1200&auto=format&fit=crop",
    body: [
      "Fresh pay-parity data shows steady growth in women's participation in India's formal workforce, with the strongest gains in urban areas of the south.",
      "Analysts attribute the rise to remote work, improved maternity policies and greater access to skill training and digital payments.",
      "Despite the progress, the report notes a persistent gap in women's representation in leadership roles and across engineering roles — and calls for targeted support.",
      "For a job seeker, the takeaway is practical: hybrid and remote roles have widened the market, so geography is far less of a barrier today.",
      "The bottom line is your own: negotiate confidently, ask for growth paths, and every improvement in the data starts with one woman asserting her worth.",
    ],
  },
];

export interface DailyAffair {
  id: number;
  emoji: string;
  category: string;
  categoryEmoji: string;
  title: string;
  summary: string;
  quickTip: string;
}

export const dailyAffairs: DailyAffair[] = [
  {
    id: 1,
    emoji: "⚖️",
    category: "Rights",
    categoryEmoji: "🌱",
    title: "One right to know today",
    summary:
      "Daughters have equal inheritance rights in ancestral property by law. Standing on your rights starts with knowing them.",
    quickTip: "Save a note: 'Inheritance = equal for daughters'.",
  },
  {
    id: 2,
    emoji: "💰",
    category: "Money",
    categoryEmoji: "🌱",
    title: "The 50-30-20 rule",
    summary:
      "A simple budget guard: 50% of income for needs, 30% for wants, 20% for savings. Adjust to your life, just keep saving something.",
    quickTip: "Try rounding up every purchase today to save the difference.",
  },
  {
    id: 3,
    emoji: "🛡️",
    category: "Safety",
    categoryEmoji: "🌱",
    title: "OTP rule of thumb",
    summary:
      "No bank, app or official ever needs your OTP or PIN. Anyone who asks is a fraud signal. End the call and verify separately.",
    quickTip: "Tell someone you trust one new scam rule today.",
  },
  {
    id: 4,
    emoji: "💼",
    category: "Career",
    categoryEmoji: "🌱",
    title: "Small step toward your goal",
    summary:
      "Career growth is built on small, repeated actions. One updated resume line, one mentor message, one practice interview.",
    quickTip: "Write down one skill you want to re-learn this week.",
  },
  {
    id: 5,
    emoji: "🏠",
    category: "Ownership",
    categoryEmoji: "🌱",
    title: "Documents check-up",
    summary:
      "Strong ownership means organized documents. Today, check that at least one important paper (ID, bank, insurance) is easy to find.",
    quickTip: "Keep one folder or drawer where important papers live.",
  },
];