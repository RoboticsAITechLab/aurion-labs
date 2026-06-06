"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Trash2, 
  Mail, 
  Phone, 
  Globe, 
  CheckSquare, 
  Check,
  AlertCircle,
  Cpu, 
  LifeBuoy, 
  Search, 
  Briefcase, 
  SlidersHorizontal,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Container from "@/components/common/container";
import SectionWrapper from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/api/client";

interface Inquiry {
  id: string;
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  businessType: string[];
  operationalGoal: string[];
  currentWebsite: string[];
  pages: string[];
  features: string[];
  infrastructure: string[];
  support: string;
  customRequests?: string;
  createdAt: string;
  
  // Extended fields
  websitePlatforms?: string[];
  budgetRange?: string;
  needDomain?: boolean;
  needHosting?: boolean;
  googleBusinessProfile?: boolean;
  instagramBusinessPage?: boolean;
  facebookBusinessPage?: boolean;
  primaryGoal?: string;
  requiredPages?: string[];
  status?: string;
  notes?: string;
  adjustedSetupFee?: string;
  adjustedMonthlyFee?: string;
  clientSetupOffer?: string;
  clientMonthlyOffer?: string;
  clientMessage?: string;
}

const SUPPORT_OPTIONS = ["Monthly Maintenance", "Quarterly Support", "Half-Yearly Support", "Yearly Operational Support"];

const BUDGET_RANGES = [
  "Under ₹5,000",
  "₹5,000–₹10,000",
  "₹10,000–₹20,000",
  "₹20,000+",
  "Not Decided"
];

const WEBSITE_PLATFORMS = [
  "WordPress",
  "Wix",
  "Wix Studio",
  "Hostinger Website Builder",
  "Shopify",
  "Webflow",
  "Framer",
  "Squarespace",
  "Custom Coded Website",
  "Not Sure (Recommend Best Option)"
];

const PRIMARY_GOALS = [
  "Lead Generation",
  "Appointment Booking",
  "Online Store",
  "Portfolio",
  "Information Website",
  "Internal Business Tool"
];

function calculateEstimate(inquiry: Inquiry) {
  const pagesScore = (inquiry.pages?.length ?? 0) * 1.0;
  const featuresScore = (inquiry.features?.length ?? 0) * 1.6;
  const infraScore = (inquiry.infrastructure?.length ?? 0) * 1.3;
  const supportScore = (SUPPORT_OPTIONS.indexOf(inquiry.support || SUPPORT_OPTIONS[0]) + 1) * 0.9;
  const businessTypesScore = (inquiry.businessType?.length ?? 0) * 0.8;
  const goalsScore = (inquiry.operationalGoal?.length ?? 0) * 1.4;
  const websiteFlags = inquiry.currentWebsite ?? [];
  const websiteScore = websiteFlags.includes("No website") ? 1.2 : websiteFlags.length * 0.6;
  const customScore = inquiry.customRequests && inquiry.customRequests.length > 20 ? 2.4 : 0;

  // Align calculation weights with new contact form parameters
  const websitePlatformsScore = (inquiry.websitePlatforms?.length ?? 0) * 0.7;
  const pagesRequiredScore = (inquiry.requiredPages?.length ?? 0) * 0.8;
  const domainHostingScore = (inquiry.needDomain ? 0.5 : 0) + (inquiry.needHosting ? 0.8 : 0);
  const businessPresenceScore = (inquiry.googleBusinessProfile ? 0.4 : 0) + (inquiry.instagramBusinessPage ? 0.4 : 0) + (inquiry.facebookBusinessPage ? 0.4 : 0);

  const total = pagesScore + featuresScore + infraScore + supportScore + businessTypesScore + goalsScore + websiteScore + customScore + websitePlatformsScore + pagesRequiredScore + domainHostingScore + businessPresenceScore;

  let label = "Foundational";
  let range = "₹4K ─ ₹12K";
  let bgClass = "from-sky-500 to-indigo-600";
  let badgeClass = "text-sky-600 bg-sky-50 border-sky-100 dark:border-sky-200/20";
  
  if (total >= 10 && total < 22) {
    label = "Operational";
    range = "₹15K ─ ₹60K+";
    bgClass = "from-indigo-500 to-violet-600";
    badgeClass = "text-indigo-600 bg-indigo-50 border-indigo-100 dark:border-indigo-200/20";
  } else if (total >= 22) {
    label = "Scalable";
    range = "Consultation Based";
    bgClass = "from-emerald-500 to-teal-600";
    badgeClass = "text-emerald-600 bg-emerald-50 border-emerald-100 dark:border-emerald-200/20";
  }

  if (inquiry.adjustedSetupFee || inquiry.adjustedMonthlyFee) {
    label = "Adjusted";
    range = `${inquiry.adjustedSetupFee || '—'} / ${inquiry.adjustedMonthlyFee || '—'}`;
    badgeClass = "text-violet-700 bg-violet-50 border-violet-100 dark:border-violet-200/20";
    bgClass = "from-violet-500 to-violet-600";
  }

  const meter = Math.min(100, Math.round((total / 30) * 100));

  return { total, label, range, meter, bgClass, badgeClass };
}

const statusStyles: Record<string, string> = {
  NEW: "text-blue-600 bg-blue-50 border-blue-100 dark:border-blue-200/20",
  REVIEWED: "text-amber-600 bg-amber-50 border-amber-100 dark:border-amber-200/20",
  CONTACTED: "text-purple-600 bg-purple-50 border-purple-100 dark:border-purple-200/20",
  CONVERTED: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:border-emerald-200/20",
  ARCHIVED: "text-slate-600 bg-slate-50 border-slate-100 dark:border-slate-200/20",
};

function getWhatsAppMessageText(inquiry: Inquiry): string {
  const bizName = inquiry.businessName ? ` for *${inquiry.businessName}*` : "";
  const platforms = inquiry.websitePlatforms && inquiry.websitePlatforms.length > 0
    ? inquiry.websitePlatforms.join(", ")
    : "Not specified";
  const budget = inquiry.budgetRange || "Not decided";
  const goal = inquiry.primaryGoal || "Not specified";
  const pages = inquiry.requiredPages && inquiry.requiredPages.length > 0
    ? inquiry.requiredPages.join(", ")
    : "Not specified";

  return "Hello from *Aurion Labs*! 👋\n\n" +
    `We have reviewed your project scoping configuration${bizName}.\n\n` +
    "Here is a summary of the details you submitted:\n" +
    "━━━━━━━━━━━━━━━━━━━━━\n" +
    "📋 *Project Details*:\n" +
    `• *Platform Preference:* ${platforms}\n` +
    `• *Estimated Budget:* ${budget}\n` +
    `• *Primary Objective:* ${goal}\n` +
    `• *Requested Pages:* ${pages}\n` +
    "━━━━━━━━━━━━━━━━━━━━━\n\n" +
    "To help us prepare the best proposal and timeline for your project, let's schedule a quick 10-minute consultation call.\n\n" +
    "Could you please let us know your availability for this week?\n\n" +
    "Best regards,\n" +
    "*Aurion Labs Team*";
}

function generateWhatsAppLink(inquiry: Inquiry) {
  const message = getWhatsAppMessageText(inquiry);
  // Clean the phone number to leave only digits
  const cleanPhone = inquiry.phone?.replace(/[^0-9]/g, "") || "";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>("All");
  const [selectedGoal, setSelectedGoal] = useState<string>("All");
  const [selectedBudget, setSelectedBudget] = useState<string>("All");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  
  // Modal/Detail states
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);

  // CRM Action States
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [localNotes, setLocalNotes] = useState<Record<string, string>>({});
  const [savingNotesId, setSavingNotesId] = useState<string | null>(null);

  const [localSetupFees, setLocalSetupFees] = useState<Record<string, string>>({});
  const [localMonthlyFees, setLocalMonthlyFees] = useState<Record<string, string>>({});
  const [savingPricingId, setSavingPricingId] = useState<string | null>(null);

  async function handleSavePricing(inquiryId: string) {
    const setupFee = localSetupFees[inquiryId] ?? "";
    const monthlyFee = localMonthlyFees[inquiryId] ?? "";
    setSavingPricingId(inquiryId);
    try {
      await apiRequest(`/inquiries/${inquiryId}`, {
        method: "PATCH",
        json: { 
          adjustedSetupFee: setupFee || null, 
          adjustedMonthlyFee: monthlyFee || null 
        }
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, adjustedSetupFee: setupFee || undefined, adjustedMonthlyFee: monthlyFee || undefined } : inq))
      );
      alert("Custom pricing overrides saved successfully! 💰");
    } catch (err: any) {
      alert(err?.message || "Failed to update pricing overrides.");
    } finally {
      setSavingPricingId(null);
    }
  }

  async function handleAcceptCounter(inquiryId: string, setup: string, monthly: string) {
    if (!confirm("Are you sure you want to accept the client's proposed pricing? This will set active prices to the counter offer and mark the project as Converted.")) return;
    try {
      await apiRequest(`/inquiries/${inquiryId}`, {
        method: "PATCH",
        json: { 
          adjustedSetupFee: setup || null, 
          adjustedMonthlyFee: monthly || null,
          clientSetupOffer: null,
          clientMonthlyOffer: null,
          status: "CONVERTED",
          notes: `[SYSTEM ALERT]: Admin accepted client's counter offer! Setup: ${setup}, Monthly: ${monthly}. 🎉`
        }
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { 
          ...inq, 
          adjustedSetupFee: setup || undefined, 
          adjustedMonthlyFee: monthly || undefined,
          clientSetupOffer: undefined,
          clientMonthlyOffer: undefined,
          status: "CONVERTED"
        } : inq))
      );
      alert("Counter offer accepted successfully! 🚀 Status updated to CONVERTED.");
    } catch (err: any) {
      alert(err?.message || "Failed to accept counter offer.");
    }
  }

  async function handleStatusChange(inquiryId: string, newStatus: string) {
    setUpdatingStatus(inquiryId);
    try {
      await apiRequest(`/inquiries/${inquiryId}`, {
        method: "PATCH",
        json: { status: newStatus }
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq))
      );
    } catch (err: any) {
      alert(err?.message || "Failed to update status.");
    } finally {
      setUpdatingStatus(null);
    }
  }

  async function handleSaveNotes(inquiryId: string) {
    const noteContent = localNotes[inquiryId] ?? "";
    setSavingNotesId(inquiryId);
    try {
      await apiRequest(`/inquiries/${inquiryId}`, {
        method: "PATCH",
        json: { notes: noteContent }
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === inquiryId ? { ...inq, notes: noteContent } : inq))
      );
      alert("Internal notes updated successfully! 🚀");
    } catch (err: any) {
      alert(err?.message || "Failed to update internal notes.");
    } finally {
      setSavingNotesId(null);
    }
  }

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest<Inquiry[]>("/inquiries");
      setInquiries(data);
    } catch (err: any) {
      console.error("Error fetching inquiries:", err);
      setError(err?.message || "Failed to load inquiries. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      await apiRequest(`/inquiries/${id}`, { method: "DELETE" });
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (expandedInquiryId === id) setExpandedInquiryId(null);
    } catch (err: any) {
      console.error("Error deleting inquiry:", err);
      alert(err?.message || "Failed to delete inquiry.");
    }
  }

  // Get unique list of business types and goals for filtering
  const businessTypesList = ["All", ...Array.from(new Set(inquiries.flatMap((i) => i.businessType || [])))];
  const goalsList = ["All", ...Array.from(new Set(inquiries.flatMap((i) => i.operationalGoal || [])))];

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.businessName && item.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.customRequests && item.customRequests.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = selectedBusinessType === "All" || (item.businessType || []).includes(selectedBusinessType);
    const matchesGoal = selectedGoal === "All" || (item.operationalGoal || []).includes(selectedGoal);
    const matchesBudget = selectedBudget === "All" || item.budgetRange === selectedBudget;
    const matchesPlatform = selectedPlatform === "All" || (item.websitePlatforms || []).includes(selectedPlatform);
    
    return matchesSearch && matchesType && matchesGoal && matchesBudget && matchesPlatform;
  });

  const stats = {
    total: inquiries.length,
    foundational: inquiries.filter((i) => calculateEstimate(i).label === "Foundational").length,
    operational: inquiries.filter((i) => calculateEstimate(i).label === "Operational").length,
    scalable: inquiries.filter((i) => calculateEstimate(i).label === "Scalable").length,
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-28 pb-20 text-slate-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.06),_transparent_50%)]" />
        
        <Container>
          {/* Header */}
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link href="/contact" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="h-4 w-4" /> Back to Contact Form
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    Admin Panel
                  </span>
                </div>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Client Inquiries
                </h1>
                <p className="mt-2 text-lg text-slate-600">
                  Monitor, manage, and analyze incoming operational scoping configurations.
                </p>
              </div>

              <Button onClick={fetchInquiries} variant="outline" className="rounded-full shadow-sm">
                Refresh Submissions
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div 
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Total Leads</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</h3>
                <p className="mt-1 text-xs text-slate-500">Form submissions received</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Foundational</p>
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                </div>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">{stats.foundational}</h3>
                <p className="mt-1 text-xs text-slate-500">Basic setups (₹4K ─ ₹12K)</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Operational</p>
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">{stats.operational}</h3>
                <p className="mt-1 text-xs text-slate-500">Workflow builds (₹15K ─ ₹60K+)</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Scalable</p>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">{stats.scalable}</h3>
                <p className="mt-1 text-xs text-slate-500">High complexity consultations</p>
              </motion.div>
            </div>

            {/* Visual Scoping Analytics Section */}
            {(() => {
              const total = filteredInquiries.length;
              const platformCounts: Record<string, number> = {};
              const budgetCounts: Record<string, number> = {};
              const goalCounts: Record<string, number> = {};

              filteredInquiries.forEach((inq) => {
                (inq.websitePlatforms || []).forEach((plat) => {
                  platformCounts[plat] = (platformCounts[plat] || 0) + 1;
                });
                const b = inq.budgetRange || "Not Decided";
                budgetCounts[b] = (budgetCounts[b] || 0) + 1;
                const g = inq.primaryGoal || "Not Specified";
                goalCounts[g] = (goalCounts[g] || 0) + 1;
              });

              return (
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  {/* Website Platforms Chart */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                      <Globe className="h-4.5 w-4.5 text-sky-600" /> Target Website Platforms
                    </p>
                    <div className="space-y-3">
                      {WEBSITE_PLATFORMS.slice(0, 4).map((plat) => {
                        const count = platformCounts[plat] || 0;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={plat} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-slate-700">
                              <span>{plat}</span>
                              <span className="text-slate-500">{count} ({pct}%)</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-1.5 rounded-full bg-sky-500" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Ranges Chart */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                      <Briefcase className="h-4.5 w-4.5 text-indigo-600" /> Budget Distributions
                    </p>
                    <div className="space-y-3">
                      {BUDGET_RANGES.map((b) => {
                        const count = budgetCounts[b] || 0;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={b} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-slate-700">
                              <span>{b}</span>
                              <span className="text-slate-500">{count} ({pct}%)</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Primary Goals Chart */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                      <Layers className="h-4.5 w-4.5 text-violet-600" /> Primary Goals
                    </p>
                    <div className="space-y-3">
                      {PRIMARY_GOALS.slice(0, 4).map((g) => {
                        const count = goalCounts[g] || 0;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={g} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-slate-700">
                              <span>{g}</span>
                              <span className="text-slate-500">{count} ({pct}%)</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-1.5 rounded-full bg-violet-500" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Filters */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
                <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
                <span>Search & Filter Configurations</span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input 
                    type="text" 
                    placeholder="Search name, email, requests..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200"
                  />
                </div>

                {/* Business Type Filter */}
                <div className="flex flex-col gap-1.5">
                  <select
                    value={selectedBusinessType}
                    onChange={(e) => setSelectedBusinessType(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
                  >
                    <option value="" disabled>Business Type</option>
                    {businessTypesList.map((type) => (
                      <option key={type} value={type}>
                        {type === "All" ? "All Business Types" : type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Operational Goal Filter */}
                <div className="flex flex-col gap-1.5">
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
                  >
                    <option value="" disabled>Operational Goal</option>
                    {goalsList.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal === "All" ? "All Goals" : goal}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range Filter */}
                <div className="flex flex-col gap-1.5">
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Budgets</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform Filter */}
                <div className="flex flex-col gap-1.5">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Platforms</option>
                    {WEBSITE_PLATFORMS.map((plat) => (
                      <option key={plat} value={plat}>
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-8">
              {loading ? (
                // Loading Skeleton List
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="space-y-2">
                          <div className="h-6 w-48 rounded bg-slate-200" />
                          <div className="h-4 w-32 rounded bg-slate-100" />
                        </div>
                        <div className="h-10 w-36 rounded-full bg-slate-200" />
                      </div>
                      <div className="mt-6 h-8 w-full rounded bg-slate-100" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                // Error State
                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-800 shadow-sm">
                  <p className="text-lg font-bold">Error Connecting to Backend</p>
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                  <Button onClick={fetchInquiries} className="mt-6 rounded-full bg-red-600 px-6 hover:bg-red-700 text-white">
                    Try Again
                  </Button>
                </div>
              ) : filteredInquiries.length === 0 ? (
                // Empty State
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-between rounded-full bg-slate-100 p-3 text-slate-400">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">No matching inquiries</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {inquiries.length === 0 
                      ? "You haven't received any form submissions yet." 
                      : "Try tweaking your filter parameters or search query."}
                  </p>
                  {inquiries.length > 0 && (
                    <Button 
                      onClick={() => { 
                        setSearchTerm(""); 
                        setSelectedBusinessType("All"); 
                        setSelectedGoal("All"); 
                        setSelectedBudget("All"); 
                        setSelectedPlatform("All"); 
                      }}
                      className="mt-6 rounded-full px-6"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : (
                // Inquiry Cards Grid
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredInquiries.map((inquiry) => {
                      const est = calculateEstimate(inquiry);
                      const isExpanded = expandedInquiryId === inquiry.id;
                      const relativeDate = new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      });

                      return (
                        <motion.div
                          key={inquiry.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setExpandedInquiryId(isExpanded ? null : inquiry.id)}
                          className={`cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${
                            isExpanded ? "border-indigo-300 ring-2 ring-indigo-100" : "border-slate-200"
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                              {/* Left Info: Contact & Company */}
                              <div>
                                <div className="flex flex-wrap items-center gap-3">
                                  <h4 className="text-xl font-bold text-slate-900">{inquiry.name}</h4>
                                  {inquiry.businessName && (
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 border border-slate-200">
                                      {inquiry.businessName}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                                  <span className="inline-flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" /> {inquiry.email}
                                  </span>
                                  {inquiry.phone && (
                                    <span className="inline-flex items-center gap-1.5">
                                      <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                                    </span>
                                  )}
                                  <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" /> {relativeDate}
                                  </span>
                                </div>
                              </div>

                              {/* Right Info: Live Estimate Recalculation */}
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="flex items-center gap-2 justify-end mb-1">
                                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[inquiry.status || 'NEW']}`}>
                                      {inquiry.status || 'NEW'}
                                    </span>
                                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${est.badgeClass}`}>
                                      {est.label}
                                    </span>
                                  </div>
                                  <p className="text-sm font-semibold text-slate-800">{est.range}</p>
                                </div>
                                
                                <Button 
                                  onClick={(e) => handleDelete(inquiry.id, e)} 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-10 w-10 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>

                            {/* Live Estimate Meter Preview */}
                            <div className="mt-5">
                              <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div 
                                  className={`h-2 rounded-full bg-gradient-to-r ${est.bgClass}`} 
                                  style={{ width: `${est.meter}%` }}
                                />
                              </div>
                            </div>

                            {/* Tags preview */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {(inquiry.businessType || []).map((bt) => (
                                <span key={bt} className="rounded-lg bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 border border-sky-100">
                                  {bt}
                                </span>
                              ))}
                              {(inquiry.operationalGoal || []).map((g) => (
                                <span key={g} className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-100">
                                  {g}
                                </span>
                              ))}
                              {(inquiry.currentWebsite || []).map((cw) => (
                                <span key={cw} className="rounded-lg bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 border border-violet-100">
                                  {cw}
                                </span>
                              ))}
                              {inquiry.budgetRange && (
                                <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-100 border-amber-100">
                                  Budget: {inquiry.budgetRange}
                                </span>
                              )}
                              {inquiry.primaryGoal && (
                                <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100 border-emerald-100">
                                  Goal: {inquiry.primaryGoal}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expanded detail panel */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                                className="border-t border-slate-100 bg-slate-50/50 cursor-default"
                              >
                                <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                  {/* Visual Approval Banner if client approved online */}
                                  {inquiry.status === "CONVERTED" && (
                                    <div className="md:col-span-2 lg:col-span-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
                                      <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                          <Check className="h-5 w-5 stroke-[2.5]" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold text-slate-900">Proposal Approved Online!</p>
                                          <p className="text-xs text-slate-600">Client has confirmed and accepted this quote and project scope details.</p>
                                        </div>
                                      </div>
                                      <span className="text-[10px] bg-emerald-600 text-white font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0">
                                        Client Confirmed
                                      </span>
                                    </div>
                                  )}

                                  {/* Visual Counter Offer Banner if client submitted custom rates */}
                                  {(inquiry.clientSetupOffer || inquiry.clientMonthlyOffer) && (
                                    <div className="md:col-span-2 lg:col-span-3 bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
                                      <div className="flex items-center gap-3 text-left">
                                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                                          <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold text-slate-900">Client Counter Offer Received!</p>
                                          <p className="text-xs text-slate-600">
                                            Proposed Setup: <strong className="text-slate-900">{inquiry.clientSetupOffer || '—'}</strong> | 
                                            Proposed Monthly: <strong className="text-slate-900">{inquiry.clientMonthlyOffer || '—'}</strong>
                                          </p>
                                          {inquiry.clientMessage && (
                                            <p className="text-xs text-slate-500 italic mt-1 bg-white/60 rounded px-2.5 py-1 border border-amber-100">
                                              Client Message: "{inquiry.clientMessage}"
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <Button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAcceptCounter(inquiry.id, inquiry.clientSetupOffer || "", inquiry.clientMonthlyOffer || "");
                                        }}
                                        size="sm"
                                        className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2 px-4 h-9 shrink-0"
                                      >
                                        Accept Counter Offer
                                      </Button>
                                    </div>
                                  )}

                                  {/* Section 1: Pages Scoped */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                      <CheckSquare className="h-4.5 w-4.5 text-sky-600" />
                                      <span>Pages Requested ({inquiry.pages?.length ?? 0})</span>
                                    </div>
                                    <div className="space-y-1.5 text-sm text-slate-600">
                                      {inquiry.pages && inquiry.pages.length > 0 ? (
                                        inquiry.pages.map((p) => (
                                          <div key={p} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            <span>{p}</span>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="text-xs text-slate-400 italic">No specific pages mapped.</p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Section 2: Features & Infra */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                      <Cpu className="h-4.5 w-4.5 text-indigo-600" />
                                      <span>Features & Infrastructure</span>
                                    </div>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Integrations</p>
                                        <div className="space-y-1 text-sm text-slate-600">
                                          {inquiry.features && inquiry.features.length > 0 ? (
                                            inquiry.features.map((f) => (
                                              <div key={f} className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                                <span>{f}</span>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="text-xs text-slate-400 italic">No features selected.</p>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Infrastructure</p>
                                        <div className="space-y-1 text-sm text-slate-600">
                                          {inquiry.infrastructure && inquiry.infrastructure.length > 0 ? (
                                            inquiry.infrastructure.map((inf) => (
                                              <div key={inf} className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                                <span>{inf}</span>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="text-xs text-slate-400 italic">No infrastructure preferences.</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Section 3: Support Layer & Actions */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                        <LifeBuoy className="h-4.5 w-4.5 text-violet-600" />
                                        <span>Support Preference</span>
                                      </div>
                                      <div className="rounded-xl bg-violet-50/50 border border-violet-100 p-3 text-sm text-violet-900 font-medium">
                                        {inquiry.support || "Monthly Maintenance"}
                                      </div>
                                    </div>

                                    {/* Action Contact buttons */}
                                    <div className="mt-6 flex flex-col gap-2">
                                      <Button asChild size="sm" className="w-full rounded-xl bg-slate-900 text-white font-medium">
                                        <a href={`mailto:${inquiry.email}?subject=Your Project Scope Consultation - Aurion Labs`} onClick={(e) => e.stopPropagation()}>
                                          <Mail className="mr-2 h-4 w-4" /> Email Client
                                        </a>
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Section 4: Specifications & Budget */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                      <Briefcase className="h-4.5 w-4.5 text-sky-600" />
                                      <span>Website Specs & Budget</span>
                                    </div>
                                    <div className="space-y-3 text-sm text-slate-600">
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Target Platforms</p>
                                        <p className="text-sm font-medium text-slate-800">
                                          {inquiry.websitePlatforms && inquiry.websitePlatforms.length > 0
                                            ? inquiry.websitePlatforms.join(", ")
                                            : "None specified"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Budget Range</p>
                                        <p className="text-sm font-medium text-slate-800">{inquiry.budgetRange || "Not specified"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Primary Website Goal</p>
                                        <p className="text-sm font-medium text-slate-800">{inquiry.primaryGoal || "Not specified"}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Section 5: Setup & Business Presence */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                      <SlidersHorizontal className="h-4.5 w-4.5 text-indigo-600" />
                                      <span>Setup & Presence</span>
                                    </div>
                                    <div className="space-y-2.5 text-xs text-slate-600">
                                      <div className="flex items-center justify-between">
                                        <span>Need Domain?</span>
                                        <span className={`rounded-md px-2 py-0.5 font-semibold ${inquiry.needDomain ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}>
                                          {inquiry.needDomain ? "Yes" : "No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Need Hosting?</span>
                                        <span className={`rounded-md px-2 py-0.5 font-semibold ${inquiry.needHosting ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}>
                                          {inquiry.needHosting ? "Yes" : "No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Google Profile?</span>
                                        <span className={`rounded-md px-2 py-0.5 font-semibold ${inquiry.googleBusinessProfile ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}>
                                          {inquiry.googleBusinessProfile ? "Yes" : "No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Instagram Page?</span>
                                        <span className={`rounded-md px-2 py-0.5 font-semibold ${inquiry.instagramBusinessPage ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}>
                                          {inquiry.instagramBusinessPage ? "Yes" : "No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span>Facebook Page?</span>
                                        <span className={`rounded-md px-2 py-0.5 font-semibold ${inquiry.facebookBusinessPage ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600"}`}>
                                          {inquiry.facebookBusinessPage ? "Yes" : "No"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Section 6: Required Pages */}
                                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                                      <Layers className="h-4.5 w-4.5 text-violet-600" />
                                      <span>Required Pages ({inquiry.requiredPages?.length ?? 0})</span>
                                    </div>
                                    <div className="space-y-1.5 text-sm text-slate-600">
                                      {inquiry.requiredPages && inquiry.requiredPages.length > 0 ? (
                                        inquiry.requiredPages.map((rp) => (
                                          <div key={rp} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                            <span>{rp}</span>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="text-xs text-slate-400 italic">None specified.</p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Section 6.5: Proposal Link Generator */}
                                  <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-indigo-100 bg-indigo-50/20 p-6 shadow-sm border-dashed flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="space-y-1 text-center sm:text-left">
                                      <h5 className="font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                                        <Sparkles className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
                                        Shareable Client Proposal Link
                                      </h5>
                                      <p className="text-sm text-slate-600">
                                        Generate a premium interactive proposal configured around this scoping. Ready to send to the client.
                                      </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
                                      <Button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const link = `${window.location.origin}/proposal?id=${inquiry.id}`;
                                          navigator.clipboard.writeText(link);
                                          alert("Client Proposal Link Copied to Clipboard! 🚀");
                                        }}
                                        variant="outline" 
                                        className="rounded-xl bg-white border-slate-200 text-slate-700 shadow-sm text-xs py-2 px-4 h-9"
                                      >
                                        Copy Client Link
                                      </Button>
                                      
                                      <Button asChild size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 h-9">
                                        <a href={`/proposal?id=${inquiry.id}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                          View Live Proposal <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                                        </a>
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Section 7: Mini CRM Status Dropdown, Pricing Adjustments & Notes Editor */}
                                  <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm grid gap-5 md:grid-cols-3">
                                    {/* CRM Status */}
                                    <div>
                                      <label className="text-sm font-semibold text-slate-800 mb-2 block">Inquiry Status (CRM Stage)</label>
                                      <select
                                        value={inquiry.status || "NEW"}
                                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                                        disabled={updatingStatus === inquiry.id}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500 disabled:opacity-60"
                                      >
                                        <option value="NEW">New Lead</option>
                                        <option value="REVIEWED">Reviewed / Under Scoping</option>
                                        <option value="CONTACTED">Contacted Client</option>
                                        <option value="CONVERTED">Converted Project</option>
                                        <option value="ARCHIVED">Archived / Closed</option>
                                      </select>
                                      {updatingStatus === inquiry.id && <p className="mt-1.5 text-xs text-indigo-600 animate-pulse">Updating status...</p>}
                                    </div>

                                    {/* Price Override Form */}
                                    <div>
                                      <label className="text-sm font-semibold text-slate-800 mb-2 block">Custom Pricing Adjustments</label>
                                      <div className="space-y-3">
                                        <div>
                                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Adjusted Setup Fee</span>
                                          <input 
                                            type="text" 
                                            placeholder="e.g. ₹15,000"
                                            value={localSetupFees[inquiry.id] !== undefined ? localSetupFees[inquiry.id] : (inquiry.adjustedSetupFee || "")}
                                            onChange={(e) => setLocalSetupFees({ ...localSetupFees, [inquiry.id]: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                        </div>
                                        <div>
                                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Adjusted Monthly Fee</span>
                                          <input 
                                            type="text" 
                                            placeholder="e.g. ₹1,499/mo"
                                            value={localMonthlyFees[inquiry.id] !== undefined ? localMonthlyFees[inquiry.id] : (inquiry.adjustedMonthlyFee || "")}
                                            onChange={(e) => setLocalMonthlyFees({ ...localMonthlyFees, [inquiry.id]: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 bg-slate-50/50 focus:bg-white"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                        </div>
                                        <div className="text-right">
                                          <Button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleSavePricing(inquiry.id);
                                            }}
                                            disabled={savingPricingId === inquiry.id}
                                            size="sm"
                                            className="rounded-xl px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
                                          >
                                            {savingPricingId === inquiry.id ? "Saving..." : "Save Prices"}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Notes Area */}
                                    <div>
                                      <label className="text-sm font-semibold text-slate-800 mb-2 block">Internal Scoping Notes</label>
                                      <textarea
                                        value={localNotes[inquiry.id] !== undefined ? localNotes[inquiry.id] : (inquiry.notes || "")}
                                        onChange={(e) => setLocalNotes({ ...localNotes, [inquiry.id]: e.target.value })}
                                        placeholder="Add private project scope notes, call logs, or developer instructions here..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-500 focus:bg-white min-h-[92px]"
                                      />
                                      <div className="mt-2 text-right">
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSaveNotes(inquiry.id);
                                          }}
                                          disabled={savingNotesId === inquiry.id}
                                          size="sm"
                                          className="rounded-xl px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors"
                                        >
                                          {savingNotesId === inquiry.id ? "Saving..." : "Save Note"}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Custom Requests (Span across full width on md screens) */}
                                  {inquiry.customRequests && (
                                    <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                      <p className="text-sm font-semibold text-slate-800 mb-2 border-b border-slate-100 pb-1.5">Custom Business Requests</p>
                                      <p className="text-sm leading-6 text-slate-700 bg-slate-50/80 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap">
                                        {inquiry.customRequests}
                                      </p>
                                    </div>
                                  )}

                                  {/* WhatsApp Scoping Followup Chat Simulator */}
                                  {inquiry.phone && (
                                    <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                                      {/* Header */}
                                      <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between select-none">
                                        <div className="flex items-center gap-3">
                                          <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 font-extrabold text-xs shadow-sm">
                                            AL
                                          </div>
                                          <div>
                                            <p className="text-sm font-semibold leading-tight">Aurion Labs Team</p>
                                            <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-[10px] bg-emerald-800/80 border border-emerald-700 px-2.5 py-0.5 rounded-full text-emerald-100 font-semibold uppercase tracking-wider">
                                          Business Account
                                        </div>
                                      </div>

                                      {/* Chat Body */}
                                      <div className="p-5 bg-[#efeae2] relative min-h-[160px] flex flex-col justify-end">
                                        {/* Message bubble */}
                                        <div className="self-start max-w-[85%] bg-[#d9fdd3] text-slate-800 rounded-2xl rounded-tl-none p-4 shadow-sm text-sm border border-[#e1f7da] relative">
                                          {/* Chat bubble tail */}
                                          <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-[#d9fdd3] border-r-[8px] border-r-transparent border-b-[8px] border-b-transparent" />
                                          <div className="space-y-1.5 whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm text-slate-800">
                                            {getWhatsAppMessageText(inquiry)}
                                          </div>
                                          <div className="mt-2 flex items-center justify-end gap-1 text-[9px] text-slate-400">
                                            <span>{new Date(inquiry.createdAt).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                                            <span className="text-sky-500 font-bold">✓✓</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Action Bar */}
                                      <div className="bg-slate-50 px-4 py-3 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-slate-100">
                                        <p className="text-xs text-slate-500">
                                          Review the generated template above. Clicking below opens WhatsApp with this pre-filled message.
                                        </p>
                                        <Button asChild size="sm" className="rounded-xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold shadow-sm px-5 transition-colors">
                                          <a href={generateWhatsAppLink(inquiry)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <ExternalLink className="mr-2 h-4 w-4" /> Send via WhatsApp
                                          </a>
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
