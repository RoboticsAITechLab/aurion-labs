"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Printer, 
  Cpu, 
  FileText, 
  Calendar, 
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckSquare
} from "lucide-react";

import Container from "@/components/common/container";
import SectionWrapper from "@/components/common/section-wrapper";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/client";

interface RecommendedStack {
  platform: string;
  whyRecommended: string;
  pros: string[];
  cons: string[];
}

interface FeatureItem {
  name: string;
  description: string;
  costImpact: string;
}

interface MilestoneItem {
  phase: string;
  title: string;
  duration: string;
  deliverables: string[];
}

interface PricingInfo {
  oneTimeFee: string;
  oneTimeDetail: string;
  monthlyFee: string;
  monthlyDetail: string;
}

interface ProposalData {
  title: string;
  clientName: string;
  businessName?: string;
  executiveSummary: string;
  recommendedStack: RecommendedStack;
  featuresList: FeatureItem[];
  milestones: MilestoneItem[];
  pricing: PricingInfo;
  source: string;
}

export default function ProposalClient({ id }: { id: string }) {
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  const [negotiating, setNegotiating] = useState(false);
  const [counterSetup, setCounterSetup] = useState("");
  const [counterMonthly, setCounterMonthly] = useState("");
  const [counterMessage, setCounterMessage] = useState("");
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  useEffect(() => {
    if (proposal) {
      setCounterSetup(proposal.pricing.oneTimeFee);
      setCounterMonthly(proposal.pricing.monthlyFee);
    }
  }, [proposal]);

  async function handleSubmitOffer() {
    if (!counterSetup && !counterMonthly) {
      alert("Please enter a proposed Setup Fee or Monthly Fee.");
      return;
    }
    setSubmittingOffer(true);
    try {
      await apiRequest(`/inquiries/${id}`, {
        method: "PATCH",
        json: {
          clientSetupOffer: counterSetup || null,
          clientMonthlyOffer: counterMonthly || null,
          clientMessage: counterMessage || null,
          status: "REVIEWED",
          notes: `[CLIENT OFFER SUBMITTED]: Setup: ${counterSetup}, Monthly: ${counterMonthly}. Message: "${counterMessage}"`
        }
      });
      setOfferSubmitted(true);
    } catch (err: any) {
      alert(err?.message || "Failed to submit counter offer. Please try again.");
    } finally {
      setSubmittingOffer(false);
    }
  }

  useEffect(() => {
    async function loadProposal() {
      try {
        const data = await apiRequest<ProposalData>(`/inquiries/${id}/proposal`);
        setProposal(data);
      } catch (err: any) {
        console.error("Error fetching proposal:", err);
        setError(err?.message || "Failed to load project proposal. Please check the link or contact Aurion Labs.");
      } finally {
        setLoading(false);
      }
    }
    loadProposal();
  }, [id]);

  async function handleApprove() {
    setApproving(true);
    try {
      await apiRequest(`/inquiries/${id}`, {
        method: "PATCH",
        json: { 
          status: "CONVERTED",
          notes: `[SYSTEM ALERT]: Client approved the proposal online! 🚀`
        }
      });
      setApproved(true);
    } catch (err: any) {
      alert(err?.message || "Failed to submit approval. Please try again.");
    } finally {
      setApproving(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 font-medium animate-pulse">Generating your custom proposal...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !proposal) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-28 pb-20 flex items-center justify-center">
          <Container>
            <div className="max-w-md mx-auto text-center bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto border border-red-100">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Proposal Unavailable</h3>
                <p className="text-sm text-slate-500">{error || "Could not retrieve proposal details."}</p>
              </div>
              <Button asChild className="rounded-full w-full bg-slate-900 text-white">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, footer, .no-print, button, a.btn-action {
            display: none !important;
          }
          main {
            padding-top: 1rem !important;
            background: transparent !important;
          }
          .print-container {
            max-w: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            background: white !important;
            margin-bottom: 2rem !important;
            page-break-inside: avoid !important;
            border-radius: 8px !important;
          }
          .print-header {
            border-bottom: 2px solid #000 !important;
            padding-bottom: 1rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-slate-50/50 pt-28 pb-24 text-slate-900 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50rem] bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.05),_transparent_45%)]" />
        <div className="pointer-events-none absolute -right-40 top-80 -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-500/5 blur-[120px]" />

        <Container className="print-container">
          <div className="mx-auto max-w-5xl">
            
            <div className="no-print mb-8 flex items-center justify-between">
              <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors">
                ← Back to Home
              </Link>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handlePrint}
                  variant="outline" 
                  className="rounded-full shadow-sm border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-2"
                >
                  <Printer className="h-4 w-4 text-slate-500" />
                  Save / Print PDF
                </Button>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] shadow-sm overflow-hidden print-card">
              
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-12 relative overflow-hidden print-header print:bg-none print:text-black print:p-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] print:hidden" />
                
                <div className="relative flex flex-col justify-between md:flex-row md:items-end gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30 print:text-indigo-600 print:bg-indigo-50 print:ring-indigo-100">
                        Operational Project Proposal
                      </span>
                      {proposal.source === "ai" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30 print:hidden">
                          <Sparkles className="h-3 w-3" /> AI Tailored
                        </span>
                      )}
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl print-title print:text-3xl print:text-slate-900">
                      {proposal.title}
                    </h1>
                    <p className="mt-3 text-slate-400 font-medium max-w-2xl print:text-slate-500">
                      Prepared by **Aurion Labs** for {proposal.clientName} 
                      {proposal.businessName ? ` (${proposal.businessName})` : ""}
                    </p>
                  </div>
                  
                  <div className="text-left md:text-right print:hidden">
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Valid Till</p>
                    <p className="mt-1 text-sm font-semibold text-indigo-300">
                      {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-12 print:p-0 print:space-y-8">
                
                <section className="print-card">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <FileText className="h-5 w-5 text-indigo-600 print:text-black" />
                    Executive Summary
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600 whitespace-pre-line print:text-slate-700">
                    {proposal.executiveSummary}
                  </p>
                </section>

                <section className="print-card">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <Cpu className="h-5 w-5 text-indigo-600 print:text-black" />
                    Recommended Architecture & Stack
                  </h3>
                  
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-4">
                      <div className="rounded-2xl bg-slate-50 border border-slate-200/60 p-6 print:border-slate-300">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Core Platform</p>
                        <h4 className="mt-2 text-2xl font-bold text-slate-900">{proposal.recommendedStack.platform}</h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600 print:text-slate-700">
                          {proposal.recommendedStack.whyRecommended}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-white print:border-slate-300">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2.5 flex items-center gap-1.5">
                            <CheckSquare className="h-4 w-4" /> Strategic Advantages
                          </p>
                          <ul className="space-y-1.5">
                            {proposal.recommendedStack.pros.map((pro, idx) => (
                              <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {proposal.recommendedStack.cons && proposal.recommendedStack.cons.length > 0 && (
                          <div className="border-t border-slate-100 pt-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Key Considerations</p>
                            <ul className="space-y-1.5">
                              {proposal.recommendedStack.cons.map((con, idx) => (
                                <li key={idx} className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-slate-400 font-bold mt-0.5">•</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="print-card">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <ShieldCheck className="h-5 w-5 text-indigo-600 print:text-black" />
                    Scoped Features & Deliverables
                  </h3>
                  
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/30 print:border-slate-300">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/80 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                          <th className="px-6 py-4">Module Name</th>
                          <th className="px-6 py-4">Implementation Scope Description</th>
                          <th className="px-6 py-4 text-right">Cost Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-sm text-slate-600 bg-white">
                        {proposal.featuresList.map((feat, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{feat.name}</td>
                            <td className="px-6 py-4 leading-relaxed">{feat.description}</td>
                            <td className="px-6 py-4 text-right font-medium text-indigo-600 print:text-black whitespace-nowrap">{feat.costImpact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="print-card">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <Calendar className="h-5 w-5 text-indigo-600 print:text-black" />
                    Delivery Timeline & Milestones
                  </h3>

                  <div className="mt-8 relative border-l-2 border-slate-200/80 pl-8 ml-4 space-y-8 print:border-slate-300">
                    {proposal.milestones.map((ms, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-600 bg-white ring-8 ring-white print:border-black">
                          <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 print:bg-black" />
                        </div>
                        
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{ms.phase}</span>
                              <h4 className="text-lg font-bold text-slate-900">{ms.title}</h4>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">
                              <Clock className="h-3 w-3" /> {ms.duration}
                            </span>
                          </div>
                          
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {ms.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="print-card">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <Clock className="h-5 w-5 text-indigo-600 print:text-black" />
                    Financial Scoping & Subscriptions
                  </h3>
                  
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between print:border-slate-300">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">One-Time Setup Fee</span>
                        <h4 className="mt-3 text-4xl font-extrabold text-slate-900">{proposal.pricing.oneTimeFee}</h4>
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-slate-500">
                        {proposal.pricing.oneTimeDetail}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between print:border-slate-300">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recurring Infrastructure & Support</span>
                        <h4 className="mt-3 text-4xl font-extrabold text-indigo-600 print:text-black">{proposal.pricing.monthlyFee}</h4>
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-slate-500">
                        {proposal.pricing.monthlyDetail}
                      </p>
                    </div>
                  </div>
                </section>

              </div>

              <div className="no-print border-t border-slate-200/80 bg-slate-50 p-12 text-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {approved ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 max-w-md mx-auto"
                    >
                      <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                        <Check className="h-8 w-8 stroke-[3]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Proposal Approved! 🎉</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Thank you for choosing Aurion Labs. We have received your confirmation. Our team will contact you on WhatsApp/Email within 24 hours to schedule the onboarding.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 max-w-xl mx-auto"
                    >
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">Ready to initiate your digital infrastructure?</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          Clicking approve submits your project acceptance directly to our scoping dashboard. No upfront payment is required right now.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button 
                          onClick={handleApprove}
                          disabled={approving || submittingOffer || offerSubmitted}
                          size="lg" 
                          className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md w-full sm:w-auto"
                        >
                          {approving ? "Submitting approval..." : "Approve Proposal & Start Project"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => setNegotiating(!negotiating)}
                          disabled={approving || submittingOffer || offerSubmitted}
                          variant="outline"
                          size="lg" 
                          className="rounded-full px-8 border-slate-300 text-slate-700 bg-white w-full sm:w-auto hover:bg-slate-50"
                        >
                          {negotiating ? "Hide Price Adjuster" : "Suggest Price Change"}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {negotiating && !offerSubmitted && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-6 border border-slate-200 bg-white rounded-2xl p-6 text-left max-w-lg mx-auto space-y-4 shadow-sm"
                          >
                            <h4 className="font-bold text-slate-900 text-sm">Suggest Your Budget / Pricing</h4>
                            <p className="text-xs text-slate-500">
                              Tell us what price works for your business. We will review your proposal and get in touch with you.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Proposed Setup Fee</label>
                                <input 
                                  type="text" 
                                  value={counterSetup}
                                  onChange={(e) => setCounterSetup(e.target.value)}
                                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-slate-50/20"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Proposed Monthly Fee</label>
                                <input 
                                  type="text" 
                                  value={counterMonthly}
                                  onChange={(e) => setCounterMonthly(e.target.value)}
                                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-slate-50/20"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Message / Notes</label>
                              <textarea 
                                placeholder="e.g., Can we adjust this setup fee? Or let's start with a smaller setup..."
                                value={counterMessage}
                                onChange={(e) => setCounterMessage(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 focus:bg-slate-50/20 min-h-[80px]"
                              />
                            </div>
                            <div className="text-right">
                              <Button 
                                onClick={handleSubmitOffer}
                                disabled={submittingOffer}
                                size="sm" 
                                className="rounded-xl px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                              >
                                {submittingOffer ? "Submitting..." : "Submit Counter Offer"}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {offerSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 border border-emerald-100 bg-emerald-50/50 rounded-2xl p-6 text-center max-w-md mx-auto space-y-3"
                          >
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto">
                              <Check className="h-5 w-5 stroke-[2.5]" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">Counter Offer Submitted! 🎉</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              We have received your budget requirements. Our scoping team will review the details and contact you on WhatsApp/Email shortly to finalize.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            <div className="mt-8 text-center text-xs text-slate-400 max-w-md mx-auto leading-relaxed no-print">
              This document is a formal project scope configuration prepared by Aurion Labs. For questions regarding hosting structures, integrations, or specific timelines, please email us directly.
            </div>

          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
