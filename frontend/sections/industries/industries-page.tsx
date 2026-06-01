"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Dumbbell,
  GraduationCap,
  Home,
  Scissors,
  ShieldCheck,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";

import Container from "@/components/common/container";
import ProofStrip from "@/components/common/proof-strip";
import OperationalVisual from "@/components/common/operational-visual";
import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

const industries = [
  {
    name: "Clinics",
    summary: "Reduce uncertainty with clearer appointment paths and stronger trust signals.",
    preview: "Calm language, simple next steps, and visible contact paths that make booking easier.",
    focus: ["Appointment flow", "Intake clarity", "Trust signals"],
    icon: Stethoscope,
    accent: "from-blue-50 to-white",
  },
  {
    name: "Gyms",
    summary: "Move people into action quickly with frictionless sign-up and membership pathways.",
    preview: "Short flows, clear CTAs, and mobile-first momentum to reduce dropoff.",
    focus: ["Signup flow", "Class visibility", "Mobile-first momentum"],
    icon: Dumbbell,
    accent: "from-slate-50 to-white",
  },
  {
    name: "Restaurants",
    summary: "Keep menus, ordering, and reservations instantly accessible for time-sensitive visits.",
    preview: "Menus up front, clear ordering flows, and discovery tuned for speed.",
    focus: ["Menus", "Ordering", "Reservations"],
    icon: UtensilsCrossed,
    accent: "from-amber-50 to-white",
  },
  {
    name: "Salons",
    summary: "Show work first, make availability obvious, and make booking feel effortless.",
    preview: "Visual-first presentation, quick availability checks, and a short booking path.",
    focus: ["Portfolio", "Availability", "Short booking"],
    icon: Scissors,
    accent: "from-pink-50 to-white",
  },
  {
    name: "Real Estate",
    summary: "Reduce noise around listings and surface inquiry actions where they matter most.",
    preview: "Clear listing hierarchy, immediate contact prompts, and fewer distractions.",
    focus: ["Listing clarity", "Inquiry flow", "Contact visibility"],
    icon: Home,
    accent: "from-emerald-50 to-white",
  },
  {
    name: "Medical",
    summary: "Make care pathways obvious with plain language and straightforward navigation.",
    preview: "Accessible navigation, clear service grouping, and supportive pathways to care.",
    focus: ["Service navigation", "Accessibility", "Care pathways"],
    icon: Building2,
    accent: "from-cyan-50 to-white",
  },
  {
    name: "Coaching",
    summary: "Frame offers simply and reduce friction in early onboarding moments.",
    preview: "Clear offer framing, simple next steps, and fewer choices to slow the decision.",
    focus: ["Offer framing", "Onboarding", "Program clarity"],
    icon: GraduationCap,
    accent: "from-violet-50 to-white",
  },
  {
    name: "Business",
    summary: "Sharper positioning and routing that surface the right team and next step quickly.",
    preview: "Concise positioning, clearer inquiry routing, and prioritized decision paths.",
    focus: ["Positioning", "Lead routing", "Decision hierarchy"],
    icon: Briefcase,
    accent: "from-slate-50 to-white",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">
        <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_50%)]" />
          <Container>
            <div className="mx-auto max-w-6xl text-center">
              <h1 className="mx-auto mt-8 max-w-5xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-8xl">
                Websites shaped around how businesses get customers.
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-lg">
                Different businesses convert in different ways. The page should guide that behavior, not fight it.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/contact">
                    Discuss Your Business
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-700">
                  <Link href="/portfolio">View Example Systems</Link>
                </Button>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper contained={false} className="pt-20 pb-16 lg:pt-28 lg:pb-24">
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center">
                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">What the page needs to do</h2>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600">The structure should help customers understand the business, trust it faster, and take the next step without friction.</p>
                  <div className="mt-8">
                  <Button asChild size="lg" variant="outline" className="rounded-full px-4">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>

              <OperationalVisual
                eyebrow="Operational category layer"
                title="Different businesses need different conversion rhythms."
                subtitle="The visual system stays calm, but the workflow story changes by industry so customers understand the right next step faster."
                statusLabel="Category focus"
                status="Trust, booking, and follow-up"
                steps={[
                  "Clinics need calmer intake and obvious appointment paths.",
                  "Gyms need quicker mobile momentum and stronger trial conversion.",
                  "Salons, restaurants, and coaches need visible action and simpler decisions.",
                ]}
                highlights={[
                  { label: "Clinics", value: "Trust-first" },
                  { label: "Gyms", value: "Momentum-first" },
                  { label: "Salons", value: "Visual-first" },
                ]}
              />
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper>

        <SectionWrapper density="compact" className="pt-0 pb-12">
          <ProofStrip
            eyebrow="Built For Business Flow"
            title="Every category needs a different conversion rhythm."
            subtitle="We adjust the structure to match how that business gets trust, action, and follow-up."
            items={[
              { label: "Clinics", value: "Trust-first", detail: "Clear intake and calmer booking" },
              { label: "Gyms", value: "Momentum-first", detail: "Trial signup and membership paths" },
              { label: "Salons", value: "Visual-first", detail: "Gallery to booking with fewer steps" },
              { label: "Restaurants", value: "Speed-first", detail: "Menus, ordering, reservations" },
            ]}
          />
        </SectionWrapper>
          <SectionHeading
            eyebrow="Industry Structures"
            title="Different businesses fail in different places"
            subtitle="The interface should reflect that operational reality."
          />

            <div className="mt-14 grid gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const reverse = index % 2 === 1;
              const name = industry.name;

              const isClinic = name === "Clinics" || name === "Medical";
              const isRestaurant = name === "Restaurants";
              const isRealEstate = name === "Real Estate";
              const isSalon = name === "Salons";
              const isGym = name === "Gyms";
              const isCoaching = name === "Coaching";

              return (
                <motion.section
                  key={industry.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: isRestaurant || isGym ? 0.36 : isSalon ? 1.1 : 0.6, ease: "easeOut" }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"
                >
                  {/* Clinic — appointment-first, calm rhythm */}
                  {isClinic && (
                    <div className={`grid gap-8 lg:grid-cols-[1fr_0.9fr] ${reverse ? "lg:items-start" : "lg:items-start"}`}>
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600">
                          {industry.focus.map((item) => (
                            <div key={item} className="rounded-lg bg-slate-50 p-3">{item}</div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                          <p className="text-sm font-medium text-slate-700">Appointment availability</p>
                          <div className="mt-4 grid gap-3">
                            {['Mon 9:00', 'Mon 11:00', 'Tue 14:00'].map((t) => (
                              <div key={t} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                                <div className="text-sm text-slate-700">{t}</div>
                                <div className="text-xs text-slate-500">Book</div>
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-xs text-slate-500">Calmer pacing, clearer intake, reduced hesitation.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Restaurant — menu-first, fast rhythm */}
                  {isRestaurant && (
                    <div className="grid gap-6 lg:grid-cols-[0.95fr_1fr] items-start">
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <div className="mt-6 -ml-2 flex overflow-x-auto gap-3 pb-2">
                          {['Pizza', 'Burgers', 'Salads', 'Pasta'].map((dish) => (
                            <div key={dish} className="min-w-[9rem] rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
                              <div className="font-medium">{dish}</div>
                              <div className="mt-2 text-xs text-slate-500">Quick order</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white p-4">
                          <p className="text-sm text-slate-700">Reservations & ordering</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-lg font-semibold">Reserve a table</div>
                            <div className="text-sm text-slate-500">2–4 people</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Real Estate — immersive, spatial */}
                  {isRealEstate && (
                    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <div className="mt-6 space-y-4">
                          <div className="rounded-lg overflow-hidden">
                            <div className="h-56 w-full rounded-2xl bg-slate-100" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                          <p className="text-sm text-slate-700">Featured listing</p>
                          <div className="mt-3">
                            <div className="h-36 rounded-lg bg-slate-50" />
                          </div>
                          <div className="mt-3 text-sm text-slate-500">Inquiry visible and prioritized.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Salon — gallery-first, elegant */}
                  {isSalon && (
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          {[0,1,2].map((i)=> (
                            <div key={i} className="h-24 rounded-xl bg-slate-100" />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-sm text-slate-700">Portfolio preview</p>
                          <div className="mt-3 h-40 rounded-lg bg-slate-50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gym — energetic, conversion-focused */}
                  {isGym && (
                    <div className="grid gap-4 lg:grid-cols-[0.95fr_1fr] items-start">
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <div className="mt-4 flex gap-3">
                          <div className="rounded-lg bg-slate-100 p-3">Join</div>
                          <div className="rounded-lg bg-slate-100 p-3">Classes</div>
                          <div className="rounded-lg bg-slate-100 p-3">Offers</div>
                        </div>
                      </div>
                      <div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-sm text-slate-700">Membership CTA</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-lg font-semibold">Start today</div>
                            <div className="text-sm text-slate-500">1-click signup</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Coaching — guided, simple */}
                  {isCoaching && (
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] items-start">
                      <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{industry.name}</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{industry.summary}</p>
                        <ol className="mt-6 space-y-3 text-sm text-slate-600">
                          <li>01 · Offer framing</li>
                          <li>02 · Clear onboarding</li>
                          <li>03 · Simple next step</li>
                        </ol>
                      </div>
                      <div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-sm text-slate-700">Program snapshot</p>
                          <div className="mt-3 h-28 rounded-lg bg-slate-50" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                  <div>
                    <h3 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Calm appointment-first systems</h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Designed to reduce uncertainty and make booking feel simple.</p>
                    <div className="mt-8 flex gap-4 text-sm text-slate-500">
                      <span className="opacity-80">Scheduling</span>
                      <span className="opacity-80">Intake</span>
                      <span className="opacity-80">Follow‑up</span>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))] p-6">
                
                    <div className="mt-6 grid gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="h-4 w-32 rounded-full bg-slate-100" />
                        <div className="mt-4 h-36 rounded-2xl bg-slate-50" />
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm text-slate-600">Clear intake, fewer steps.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="order-2 lg:order-1">
                <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Momentum-first layouts</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Short, action-focused flows designed for quick commitment.</p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm lg:-translate-y-6">
                  
                  <div className="mt-6 grid gap-3">
                    <div className="h-14 rounded-2xl bg-slate-50" />
                    <div className="h-14 rounded-2xl bg-white shadow-inner" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Faster menu visibility and ordering flow</h3>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Menus and ordering up front so decisions happen in seconds.</p>
                <div className="mt-8 flex gap-6 text-sm text-slate-500">
                  <span className="opacity-80">Menus</span>
                  <span className="opacity-80">Ordering</span>
                  <span className="opacity-80">Reservations</span>
                  <span className="opacity-80">Maps</span>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <SectionHeading
                eyebrow="Operational Differences"
                title="Operational Differences"
                subtitle="The structure changes because behavior changes."
              />
              <div className="mt-10 space-y-4 text-base leading-8 text-slate-600">
                <p>Clinics need trust before action.</p>
                <p>Restaurants need speed before explanation.</p>
                <p>Gyms need momentum before detail.</p>
                <p>Real estate needs clarity before commitment.</p>
                <p className="mt-6 font-semibold">The structure changes because behavior changes.</p>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Editorial Interruption</p>
              <h2 className="mt-8 text-[3.4rem] leading-[1.02] font-semibold text-slate-950 sm:text-[4rem] lg:text-[5rem]">Design for the moment that matters most.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-600">Different businesses encounter decision points at different moments — the right interface reduces friction exactly where it begins. This is not decoration; it is anticipation.</p>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-start">
              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6">
                
                <h4 className="mt-4 text-2xl font-semibold text-slate-950">Cleaner listing hierarchy</h4>
                <p className="mt-3 text-sm text-slate-600">Property pages with less noise, stronger contact paths, and room for the detail that matters.</p>
                <div className="mt-6 space-y-3">
                  <div className="text-sm text-slate-500">Listings · Inquiry</div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6">
                <h4 className="mt-4 text-2xl font-semibold text-slate-950">Visual-first booking</h4>
                <p className="mt-3 text-sm text-slate-600">A visual-first approach that makes availability obvious.</p>
                <div className="mt-6 text-sm text-slate-500">Gallery · Booking</div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-semibold text-slate-950 leading-tight">Structure Before Style</h2>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">Most business websites collapse because every section competes for attention equally. Better systems start with a clear hierarchy, fewer decisions, calmer navigation, and mobile-first pacing.</p>
              <p className="mt-12 text-5xl font-extrabold tracking-tight text-slate-900">Less friction. Better flow.</p>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-12 sm:pt-16 lg:pt-20">
          <Container>
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6">
                <h4 className="mt-4 text-2xl font-semibold text-slate-950">Structured onboarding and clearer offers</h4>
                <p className="mt-3 text-sm text-slate-600">Simple framing and fewer choices in early moments.</p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6">
                <h4 className="mt-4 text-2xl font-semibold text-slate-950">Cleaner positioning and inquiry flow</h4>
                <p className="mt-3 text-sm text-slate-600">Sharper front doors and prioritized inquiry paths.</p>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper contained={false} className="pb-28 pt-0 sm:pb-32 lg:pb-40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white/60 px-6 py-24 text-center sm:px-12 lg:px-20">
              <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-5xl">If the category is clear, the page should be too.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                We map the structure so decisions become quieter and more obvious.
              </p>
              <div className="mt-12 flex justify-center">
                <Link href="/contact" className="inline-block rounded-full border border-slate-200 px-6 py-3 text-sm text-slate-900/90">
                  Start the conversation
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
