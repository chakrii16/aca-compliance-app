/* ACA - Role-Based Enterprise Workspaces & Shared Ecosystem Dataset */

const ACA_ROLES = {
  activeRole: "Customer", // default: Customer, CA, AgencyMember, AgencyAdmin

  // ROLE 1: CUSTOMER (Individual / Business Owner)
  Customer: {
    title: "Customer Workspace",
    user: { name: "Dhanush", subtitle: "Taxpayer Account", avatar: "C" },
    sidebar: [
      { id: "nav-v7", name: "Home", icon: "layout-dashboard", targetView: "view-7-dashboard" },
      { id: "nav-v9", name: "Documents", icon: "file-text", targetView: "view-9-uploaddocs" },
      { id: "nav-v8", name: "AI Assistant", icon: "bot", targetView: "view-8-aichat", badge: "24/7" },
      { id: "nav-v11", name: "Tax Filing", icon: "calculator", targetView: "view-11-results" },
      { id: "nav-v12", name: "Compliance", icon: "shield-check", targetView: "view-12-compliance" },
      { id: "nav-v17", name: "Reports", icon: "bar-chart-3", targetView: "view-17-reports" },
      { id: "nav-msg", name: "Messages", icon: "message-square", targetView: "view-messages", badge: "Live" },
      { id: "nav-v19", name: "Profile", icon: "user", targetView: "view-19-profile" },
      { id: "nav-v20", name: "Settings", icon: "settings", targetView: "view-20-settings" }
    ],
    kpis: [
      { title: "Tax Score", value: "86%", desc: "Good Status", icon: "shield-check", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "Estimated Refund", value: "$4,280.50", desc: "+$525 found today", icon: "trending-up", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Tax Owed", value: "$28,450.00", desc: "Federal & Provincial", icon: "calculator", color: "var(--warning)", bg: "rgba(244,183,64,0.15)" },
      { title: "Upcoming Deadline", value: "Apr 30", desc: "CRA T1 / IRS 1040 Due", icon: "calendar", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Documents Pending", value: "2 Files", desc: "Awaiting CA review", icon: "clock", color: "var(--warning)", bg: "rgba(244,183,64,0.15)" },
      { title: "Compliance Score", value: "92%", desc: "1 Risk Flag", icon: "shield-alert", color: "var(--success)", bg: "rgba(47,191,113,0.15)" }
    ],
    aiSuggestions: [
      { id: "c1", title: "RRSP Contribution Room", desc: "Unclaimed $8,500 RRSP limit saves up to $3,655 in taxes.", savings: 3655, applied: false },
      { id: "c2", title: "Home Office Write-Off", desc: "Deduct 28% rent & utilities for studio workspace.", savings: 2450, applied: true },
      { id: "c3", title: "Medical Expense Claims", desc: "Eligible prescription & dental receipts qualify for non-refundable credit.", savings: 420, applied: true }
    ],
    chatExamples: [
      "How much tax refund will I receive?",
      "Can I claim my laptop?",
      "Explain my Notice of Assessment.",
      "What documents does my CA need?"
    ]
  },

  // ROLE 2: CHARTERED ACCOUNTANT (CA)
  CA: {
    title: "Chartered Accountant (CA) Workspace",
    user: { name: "Apex CA Services", subtitle: "Senior Chartered Accountant", avatar: "CA" },
    sidebar: [
      { id: "nav-v7", name: "Dashboard", icon: "layout-dashboard", targetView: "view-7-dashboard" },
      { id: "nav-ca-cli", name: "Clients", icon: "users", targetView: "view-ca-clients" },
      { id: "nav-ca-ret", name: "Tax Returns", icon: "file-spreadsheet", targetView: "view-ca-returns" },
      { id: "nav-ca-doc", name: "Documents", icon: "file-text", targetView: "view-9-uploaddocs" },
      { id: "nav-v12", name: "Compliance", icon: "shield-alert", targetView: "view-12-compliance" },
      { id: "nav-ca-air", name: "AI Review", icon: "sparkles", targetView: "view-ca-aireview", badge: "AI" },
      { id: "nav-v17", name: "Reports", icon: "bar-chart-3", targetView: "view-17-reports" },
      { id: "nav-cal", name: "Calendar", icon: "calendar", targetView: "view-calendar" },
      { id: "nav-msg", name: "Messages", icon: "message-square", targetView: "view-messages", badge: "3 New" },
      { id: "nav-v19", name: "Profile", icon: "user", targetView: "view-19-profile" },
      { id: "nav-v20", name: "Settings", icon: "settings", targetView: "view-20-settings" }
    ],
    kpis: [
      { title: "Active Clients", value: "42 Clients", desc: "Personal & Corporate", icon: "users", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "Pending Tax Returns", value: "14 Pending", desc: "8 awaiting approval", icon: "file-text", color: "var(--warning)", bg: "rgba(244,183,64,0.15)" },
      { title: "Returns Ready for Review", value: "5 Ready", desc: "Ready for CRA EFILE", icon: "pen-tool", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Missing Documents", value: "8 Files", desc: "Auto-reminder sent", icon: "clock", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Compliance Alerts", value: "2 Alerts", desc: "T1135 & Foreign Assets", icon: "shield-alert", color: "var(--error)", bg: "rgba(226,85,85,0.15)" },
      { title: "Upcoming Deadlines", value: "Apr 30", desc: "12 Returns due this week", icon: "calendar", color: "var(--warning)", bg: "rgba(244,183,64,0.15)" },
      { title: "Today's Meetings", value: "3 Sessions", desc: "Client consultations", icon: "users", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "AI Insights", value: "99.8% Score", desc: "High-value deductions found", icon: "sparkles", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Notifications", value: "4 New", desc: "Client signatures & uploads", icon: "bell", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" }
    ],
    aiSuggestions: [
      { id: "ca1", title: "Bulk CRA Representative Portal Sync", desc: "Automatically match client Auth-01 consent forms with CRA RepID gateway.", savings: 0, applied: true },
      { id: "ca2", title: "High-Risk Audit Warning on Client #302", desc: "Discrepancy in foreign asset reporting T1135 vs T1 income.", savings: 0, applied: false },
      { id: "ca3", title: "Automate EFILE Package Generation", desc: "Batch generate XML schema filings for 12 completed returns.", savings: 0, applied: false }
    ],
    chatExamples: [
      "Which clients are missing documents?",
      "Review client return #402 for statutory risks.",
      "Summarize foreign property holdings for T1135.",
      "Generate client audit defense summary."
    ]
  },

  // ROLE 3: AGENCY MEMBER
  AgencyMember: {
    title: "Agency Member Workspace",
    user: { name: "Sarah Jenkins", subtitle: "Senior Tax Associate", avatar: "AM" },
    sidebar: [
      { id: "nav-v7", name: "Dashboard", icon: "layout-dashboard", targetView: "view-7-dashboard" },
      { id: "nav-am-cli", name: "Assigned Clients", icon: "users", targetView: "view-ca-clients" },
      { id: "nav-am-tsk", name: "Tasks", icon: "check-square", targetView: "view-tasks" },
      { id: "nav-am-doc", name: "Documents", icon: "file-text", targetView: "view-9-uploaddocs" },
      { id: "nav-am-ret", name: "Returns", icon: "file-spreadsheet", targetView: "view-ca-returns" },
      { id: "nav-msg", name: "Messages", icon: "message-square", targetView: "view-messages", badge: "2 New" },
      { id: "nav-v8", name: "AI Assistant", icon: "bot", targetView: "view-8-aichat", badge: "Staff" },
      { id: "nav-v17", name: "Reports", icon: "bar-chart-3", targetView: "view-17-reports" },
      { id: "nav-v19", name: "Profile", icon: "user", targetView: "view-19-profile" }
    ],
    kpis: [
      { title: "Assigned Clients", value: "12 Clients", desc: "Assigned by Firm Admin", icon: "users", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "Pending Tasks", value: "8 Tasks", desc: "5 High Priority", icon: "clock", color: "var(--warning)", bg: "rgba(244,183,64,0.15)" },
      { title: "Documents Awaiting Review", value: "5 Files", desc: "OCR verified", icon: "file-text", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Compliance Queue", value: "3 Items", desc: "Audit checks pending", icon: "shield-check", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Daily Workload", value: "85%", desc: "6 Hours logged today", icon: "trending-up", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "Performance Summary", value: "98% On Time", desc: "Zero SLA breaches", icon: "award", color: "var(--success)", bg: "rgba(47,191,113,0.15)" }
    ],
    aiSuggestions: [
      { id: "am1", title: "Index Uploaded W2 & T4 Slips", desc: "Auto-extract box values for 5 assigned client accounts.", savings: 0, applied: true },
      { id: "am2", title: "Reconcile Home Studio Receipts", desc: "Categorize 18 expense line items under CRA Schedule 8829.", savings: 0, applied: false }
    ],
    chatExamples: [
      "Show my pending tasks for today.",
      "Summarize documents for client Acme Corp.",
      "Recommend next workflow steps for filing queue.",
      "Check compliance queue status."
    ]
  },

  // ROLE 4: AGENCY ADMIN (Agency Administrator)
  AgencyAdmin: {
    title: "Agency Admin Workspace",
    user: { name: "Global CA Partners", subtitle: "Firm Administrator", avatar: "AA" },
    sidebar: [
      { id: "nav-v7", name: "Dashboard", icon: "layout-dashboard", targetView: "view-7-dashboard" },
      { id: "nav-aa-emp", name: "Employees", icon: "user-plus", targetView: "view-business-employees" },
      { id: "nav-aa-cli", name: "Clients", icon: "users", targetView: "view-ca-clients" },
      { id: "nav-aa-anl", name: "Analytics", icon: "pie-chart", targetView: "view-business-accounting" },
      { id: "nav-aa-rev", name: "Revenue", icon: "trending-up", targetView: "view-agency-revenue" },
      { id: "nav-aa-bil", name: "Billing", icon: "credit-card", targetView: "view-agency-billing" },
      { id: "nav-v17", name: "Reports", icon: "bar-chart-3", targetView: "view-17-reports" },
      { id: "nav-v20", name: "Settings", icon: "settings", targetView: "view-20-settings" }
    ],
    kpis: [
      { title: "Total Clients", value: "148 Clients", desc: "+12 this month", icon: "users", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "Active Accountants", value: "12 Staff", desc: "4 Senior CPAs, 8 Associates", icon: "user-check", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Agency Revenue", value: "$485,000.00", desc: "YTD Fee Income", icon: "dollar-sign", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Returns Filed", value: "132 Filed", desc: "98.5% CRA/IRS Acceptance", icon: "file-spreadsheet", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Productivity Metrics", value: "94.2%", desc: "Average staff efficiency", icon: "trending-up", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" },
      { title: "AI Usage", value: "1,420 Queries", desc: "Gemini 2.5 Flash Engine", icon: "bot", color: "var(--ai-accent-blue)", bg: "rgba(47,167,229,0.15)" },
      { title: "Compliance Overview", value: "99.8%", desc: "Zero audit penalties", icon: "shield-check", color: "var(--success)", bg: "rgba(47,191,113,0.15)" },
      { title: "Subscription Status", value: "Enterprise Pro", desc: "Renews Oct 2026", icon: "award", color: "var(--royal-blue)", bg: "rgba(30,90,146,0.15)" }
    ],
    aiSuggestions: [
      { id: "aa1", title: "Workload Re-allocation", desc: "Assign 4 incoming corporate returns from Senior CPA #1 to Associate #3.", savings: 0, applied: false },
      { id: "aa2", title: "Revenue Forecasting", desc: "Projected Q4 tax season billing estimated at $185,000 based on client growth.", savings: 0, applied: true }
    ],
    chatExamples: [
      "Show firm revenue breakdown for Q3.",
      "Which accountants have available bandwidth?",
      "Analyze agency AI usage and subscription ROI.",
      "Generate monthly staff productivity report."
    ]
  },

  // Aliases for legacy selection compatibility
  Individual: { title: "Customer Workspace" },
  Freelancer: { title: "Customer Workspace" },
  Business: { title: "Customer Workspace" },
  TaxAgent: { title: "Chartered Accountant Workspace" }
};

// Bind legacy aliases dynamically to core roles
ACA_ROLES.Individual = ACA_ROLES.Customer;
ACA_ROLES.Freelancer = ACA_ROLES.Customer;
ACA_ROLES.Business = ACA_ROLES.Customer;
ACA_ROLES.TaxAgent = ACA_ROLES.CA;

const ACA_DATA = {
  user: {
    name: "Dhanush",
    email: "dhanush@enterprise.com",
    phone: "+1 (416) 555-0199",
    country: "Canada",
    province: "Ontario",
    taxResidency: "Resident",
    maritalStatus: "Single",
    dependents: 0,
    occupation: "Senior Software Architect",
    incomeRange: "$120,000 - $180,000",
    userType: "Customer"
  },

  documents: [
    { id: 1, name: "T4_Employment_Income_2025.pdf", type: "Payslip / T4", size: "1.4 MB", date: "Jan 15, 2026", status: "Verified", confidence: 99.8, sharedWithCA: true },
    { id: 2, name: "W2_US_Consulting_Income.pdf", type: "Tax Form / W2", size: "850 KB", date: "Jan 22, 2026", status: "Verified", confidence: 98.5, sharedWithCA: true },
    { id: 3, name: "RRSP_Contribution_Receipt.pdf", type: "Investment", size: "2.1 MB", date: "Feb 02, 2026", status: "Verified", confidence: 100, sharedWithCA: true },
    { id: 4, name: "RBC_Bank_Statement_Q4.pdf", type: "Bank Statement", size: "3.5 MB", date: "Feb 10, 2026", status: "Processing", confidence: 94.2, sharedWithCA: true }
  ],

  complianceItems: [
    { id: "c1", type: "warning", title: "Cross-Border Foreign Property (Form T1135 / FBAR)", status: "Attention Required", detail: "US holding value exceeds $10,000 CAD. Declarative filing required before April 30." },
    { id: "c2", type: "success", title: "Social Insurance / SSN Validation", status: "Passed", detail: "Official identity match verified via CRA/IRS gateway." },
    { id: "c3", type: "success", title: "Capital Gains Cost Basis Audit", status: "Passed", detail: "Crypto and stock transaction lots accurately calculated using ACB methodology." },
    { id: "c4", type: "warning", title: "Charitable Gift Verification", status: "Review Suggested", detail: "Receipt #8839 missing tax registration number. ACA can auto-query charity database." }
  ],

  notifications: [
    { id: 1, title: "Tax Return Ready for Signature", time: "10m ago", desc: "Your Chartered Accountant Apex CA Services has completed your 2025 return. Click to review & sign digitally.", unread: true },
    { id: 2, title: "Document Shared with CA", time: "1h ago", desc: "T4_Employment_Income_2025.pdf auto-synchronized with Apex CA Services.", unread: true },
    { id: 3, title: "Upcoming Filing Deadline", time: "3h ago", desc: "Canada Revenue Agency T1 filing deadline in 42 days.", unread: false }
  ],

  reportsHistory: [
    { year: "2025 (Current)", country: "Canada & USA", status: "Draft - Ready for Signature", refund: "$4,280.50", date: "Aug 2026" },
    { year: "2024", country: "Canada (CRA T1)", status: "Assessed & Paid", refund: "$3,120.00", date: "Apr 2025" },
    { year: "2023", country: "Canada (CRA T1)", status: "Assessed & Paid", refund: "$2,890.00", date: "Apr 2024" }
  ],

  // CA Client Roster Portfolio Dataset
  caClients: [
    { id: "CLI-301", name: "Dhanush (Individual & Dual)", status: "Ready for Signature", taxYear: "2025", riskScore: "Low (94%)", assignedDocs: "3 Slips", lastUpdated: "Today 10:15 AM", complianceStatus: "Verified" },
    { id: "CLI-302", name: "Summit Health Tech Inc.", status: "Filing Ready", taxYear: "2025", riskScore: "Passed (98%)", assignedDocs: "8 Files", lastUpdated: "Yesterday", complianceStatus: "SRED Approved" },
    { id: "CLI-303", name: "Studio Freelance LLC", status: "Missing Documents", taxYear: "2025", riskScore: "Attention (78%)", assignedDocs: "2 Slips", lastUpdated: "Feb 02", complianceStatus: "T1135 Flag" },
    { id: "CLI-304", name: "Vanguard Logistics", status: "In Review", taxYear: "2025", riskScore: "Passed (96%)", assignedDocs: "5 Slips", lastUpdated: "Feb 03", complianceStatus: "Verified" }
  ],

  // Shared Ecosystem Datasets
  calendarMeetings: [
    { id: "m1", time: "10:00 AM", client: "Summit Health Tech", topic: "Corporate T2 Filing Review", type: "Video Call", status: "Confirmed" },
    { id: "m2", time: "02:30 PM", client: "Dhanush (Taxpayer)", topic: "Cross-Border Foreign Assets T1135", type: "In-Office", status: "Confirmed" },
    { id: "m3", time: "04:15 PM", client: "Vanguard Logistics", topic: "GST/HST Credit Optimization", type: "Phone Call", status: "Pending" }
  ],

  memberTasks: [
    { id: "t1", title: "Index T4 Slips for Dhanush", client: "Dhanush", priority: "High", due: "Today", status: "In Progress" },
    { id: "t2", title: "Verify Schedule C Expenses", client: "Studio Freelance", priority: "Medium", due: "Tomorrow", status: "Pending" },
    { id: "t3", title: "Generate Draft T2 Package", client: "Summit Health Tech", priority: "High", due: "Aug 08", status: "Pending" }
  ],

  agencyEmployees: [
    { empId: "EMP-101", name: "Apex CA Services", role: "Senior Chartered Accountant", clientsAssigned: 18, returnsFiled: 42, efficiency: "98.5%", status: "Active" },
    { empId: "EMP-102", name: "Sarah Jenkins", role: "Senior Tax Associate", clientsAssigned: 12, returnsFiled: 28, efficiency: "96.2%", status: "Active" },
    { empId: "EMP-103", name: "Alex Rivera", role: "Compliance Specialist", clientsAssigned: 10, returnsFiled: 24, efficiency: "94.8%", status: "Active" },
    { empId: "EMP-104", name: "David Kim", role: "Junior Tax Accountant", clientsAssigned: 8, returnsFiled: 16, efficiency: "91.0%", status: "Active" }
  ],

  agencyRevenue: {
    ytdTotal: "$485,000.00",
    monthlyRecurring: "$42,500.00",
    pendingInvoices: "$18,200.00",
    breakdown: [
      { category: "Personal Tax Returns (T1 / 1040)", amount: "$185,000.00", percentage: "38%" },
      { category: "Corporate Filings (T2 / 1120)", amount: "$210,000.00", percentage: "43%" },
      { category: "Compliance & Audit Advisory", amount: "$90,000.00", percentage: "19%" }
    ]
  },

  directMessages: [
    { id: 1, sender: "Apex CA Services (CA)", time: "10:15 AM", text: "Hello Dhanush! I have reviewed your uploaded T4 and W2 slips. Could you please confirm if you have your RRSP receipt for 2025?", unread: false },
    { id: 2, sender: "Dhanush (Customer)", time: "10:18 AM", text: "Hi! Yes, I just uploaded the RRSP receipt file. Let me know if you need any additional document for the T1135 cross-border filing.", unread: false },
    { id: 3, sender: "Apex CA Services (CA)", time: "10:25 AM", text: "Great! Your return is now complete and marked 'Ready for Signature'. Please review and sign digitally in your workspace.", unread: true }
  ],

  // Interactive Conversation Threads Dataset
  activeThreadId: "thread-1",
  threads: [
    {
      id: "thread-1",
      name: "Apex CA Services",
      role: "Senior Chartered Accountant",
      avatar: "A",
      unread: false,
      messages: [
        { sender: "Apex CA Services (CA)", time: "10:15 AM", text: "Hello Dhanush! I have reviewed your uploaded T4 and W2 slips. Could you please confirm if you have your RRSP receipt for 2025?" },
        { sender: "Dhanush (Customer)", time: "10:18 AM", text: "Hi! Yes, I just uploaded the RRSP receipt file. Let me know if you need any additional document for the T1135 cross-border filing." },
        { sender: "Apex CA Services (CA)", time: "10:25 AM", text: "Great! Your return is now complete and marked 'Ready for Signature'. Please review and sign digitally in your workspace." }
      ]
    },
    {
      id: "thread-2",
      name: "Sarah Jenkins",
      role: "Agency Tax Associate",
      avatar: "S",
      unread: true,
      messages: [
        { sender: "Sarah Jenkins (Agency)", time: "Yesterday 04:30 PM", text: "Hi Dhanush! Document OCR indexing for your W2 statement is complete with 99.8% confidence." },
        { sender: "Dhanush (Customer)", time: "Yesterday 04:45 PM", text: "Awesome, thanks Sarah! Does the foreign tax credit apply to both federal and state?" },
        { sender: "Sarah Jenkins (Agency)", time: "Yesterday 05:00 PM", text: "Yes! Article XXIV of Canada-US Tax Treaty offsets both CRA federal and provincial tax liabilities." }
      ]
    },
    {
      id: "thread-3",
      name: "Summit Health Tech",
      role: "Corporate Client #302",
      avatar: "S",
      unread: false,
      messages: [
        { sender: "Summit Health Tech", time: "Feb 04", text: "Hello team, we have uploaded the SR&ED R&D equipment receipts for Class 50 CCA review." },
        { sender: "Apex CA Services (CA)", time: "Feb 04", text: "Received! We are applying the $160,000 corporate R&D tax deduction." }
      ]
    },
    {
      id: "thread-4",
      name: "Compliance Audit Desk",
      role: "ACA Autonomous AI System",
      avatar: "🤖",
      unread: false,
      messages: [
        { sender: "ACA Audit Bot", time: "Feb 01", text: "Audit Shield System Alert: Schedule 3 ACB calculation verified. Zero audit risk flags detected." }
      ]
    }
  ],

  // Interactive Tax Returns Dataset for Agency & CAs
  caReturns: [
    { id: "RET-101", client: "Dhanush (Individual & Dual)", form: "T1 / 1040 Dual", due: "Apr 30, 2026", status: "Ready for Signature", refund: "$4,280.50", efileStatus: "Pending Signature" },
    { id: "RET-102", client: "Summit Health Tech Inc.", form: "T2 Corporate", due: "Aug 31, 2026", status: "Filing Ready", refund: "$18,500.00", efileStatus: "EFILE Ready" },
    { id: "RET-103", client: "Studio Freelance LLC", form: "Schedule C / T2125", due: "Jun 15, 2026", status: "In Review", refund: "$2,450.00", efileStatus: "Pending Docs" },
    { id: "RET-104", client: "Vanguard Logistics", form: "T2 Corporate", due: "Sep 30, 2026", status: "Filing Ready", refund: "$12,400.00", efileStatus: "EFILE Ready" },
    { id: "RET-105", client: "Sarah Jenkins (Staff Return)", form: "T1 Personal", due: "Apr 30, 2026", status: "E-Filed", refund: "$1,820.00", efileStatus: "Filed (EFILE Confirmed)" }
  ]
};

// STATUTORY STATE & PROVINCE TAX CALCULATION ENGINE (USA, CANADA, INDIA)
const ACA_TAX_RATES = {
  "USA": {
    "AL": 0.04, "AK": 0.00, "AZ": 0.056, "AR": 0.065, "CA": 0.0725,
    "CO": 0.029, "CT": 0.0635, "DE": 0.00, "FL": 0.06, "GA": 0.04,
    "HI": 0.04, "ID": 0.06, "IL": 0.0625, "IN": 0.07, "IA": 0.06,
    "KS": 0.065, "KY": 0.06, "LA": 0.0445, "ME": 0.055, "MD": 0.06,
    "MA": 0.0625, "MI": 0.06, "MN": 0.06875, "MS": 0.07, "MO": 0.04225,
    "MT": 0.00, "NE": 0.055, "NV": 0.0685, "NH": 0.00, "NJ": 0.06625,
    "NM": 0.05125, "NY": 0.04, "NC": 0.0475, "ND": 0.05, "OH": 0.0575,
    "OK": 0.045, "OR": 0.00, "PA": 0.06, "RI": 0.07, "SC": 0.06,
    "SD": 0.045, "TN": 0.07, "TX": 0.0625, "UT": 0.061, "VT": 0.06,
    "VA": 0.053, "WA": 0.065, "WV": 0.06, "WI": 0.05, "WY": 0.04,
    "DC": 0.06
  },
  "CANADA": {
    "AB": 0.05,    // GST
    "BC": 0.12,    // GST + PST
    "MB": 0.12,    // GST + PST
    "NB": 0.15,    // HST
    "NL": 0.15,    // HST
    "NT": 0.05,    // GST
    "NS": 0.15,    // HST
    "NU": 0.05,    // GST
    "ON": 0.13,    // HST
    "PE": 0.15,    // HST
    "QC": 0.14975, // GST + QST
    "SK": 0.11,    // GST + PST
    "YT": 0.05     // GST
  },
  "INDIA": {
    "ALL": 0.18
  }
};

const ACA_STATE_NAMES = {
  "USA": {
    "ALABAMA": "AL", "ALASKA": "AK", "ARIZONA": "AZ", "ARKANSAS": "AR",
    "CALIFORNIA": "CA", "COLORADO": "CO", "CONNECTICUT": "CT", "DELAWARE": "DE",
    "FLORIDA": "FL", "GEORGIA": "GA", "HAWAII": "HI", "IDAHO": "ID",
    "ILLINOIS": "IL", "INDIANA": "IN", "IOWA": "IA", "KANSAS": "KS",
    "KENTUCKY": "KY", "LOUISIANA": "LA", "MAINE": "ME", "MARYLAND": "MD",
    "MASSACHUSETTS": "MA", "MICHIGAN": "MI", "MINNESOTA": "MN", "MISSISSIPPI": "MS",
    "MISSOURI": "MO", "MONTANA": "MT", "NEBRASKA": "NE", "NEVADA": "NV",
    "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY",
    "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", "OHIO": "OH", "OKLAHOMA": "OK",
    "OREGON": "OR", "PENNSYLVANIA": "PA", "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC",
    "SOUTH DAKOTA": "SD", "TENNESSEE": "TN", "TEXAS": "TX", "UTAH": "UT",
    "VERMONT": "VT", "VIRGINIA": "VA", "WASHINGTON": "WA", "WEST VIRGINIA": "WV",
    "WISCONSIN": "WI", "WYOMING": "WY", "WASHINGTON DC": "DC", "DISTRICT OF COLUMBIA": "DC"
  },
  "CANADA": {
    "ALBERTA": "AB", "BRITISH COLUMBIA": "BC", "MANITOBA": "MB",
    "NEW BRUNSWICK": "NB", "NEWFOUNDLAND AND LABRADOR": "NL", "NORTHWEST TERRITORIES": "NT",
    "NOVA SCOTIA": "NS", "NUNAVUT": "NU", "ONTARIO": "ON", "PRINCE EDWARD ISLAND": "PE",
    "QUEBEC": "QC", "SASKATCHEWAN": "SK", "YUKON": "YT"
  }
};

function calculate_tax(country, amount, state = null) {
  if (!country) throw new Error("Country is required.");
  const c = country.toUpperCase();

  if (!ACA_TAX_RATES[c]) {
    throw new Error(`Country '${country}' is not supported. Choose 'USA', 'CANADA', or 'INDIA'.`);
  }

  let rate = 0;

  if (c === "INDIA") {
    rate = ACA_TAX_RATES["INDIA"]["ALL"];
  } else {
    if (!state) {
      throw new Error(`State/Province is required for ${c}.`);
    }
    let s = state.toUpperCase();
    const nameMap = ACA_STATE_NAMES[c] || {};
    if (nameMap[s]) {
      s = nameMap[s];
    }

    if (!ACA_TAX_RATES[c][s]) {
      throw new Error(`State/Province '${state}' is not valid for ${c}.`);
    }
    rate = ACA_TAX_RATES[c][s];
  }

  const tax_amount = amount * rate;
  const total_amount = amount + tax_amount;

  return {
    country: c,
    state: state ? state.toUpperCase() : null,
    amount: amount,
    tax_rate: rate,
    tax_amount: tax_amount,
    total_amount: total_amount
  };
}
