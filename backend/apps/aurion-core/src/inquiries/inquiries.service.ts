import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { ContactInquiry } from '@prisma/client';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInquiryDto): Promise<ContactInquiry> {
    const resolvedName = data.fullName ?? data.name;
    if (!resolvedName) {
      throw new BadRequestException('Either name or fullName must be provided');
    }

    const resolvedCustomRequests = data.customRequirements ?? data.customRequests ?? null;

    let resolvedBusinessType: string[] = [];
    if (data.businessType !== undefined) {
      if (typeof data.businessType === 'string') {
        resolvedBusinessType = data.businessType ? [data.businessType] : [];
      } else if (Array.isArray(data.businessType)) {
        resolvedBusinessType = data.businessType;
      }
    }

    const resolvedSupport = data.support || 'Monthly Maintenance';
    const resolvedOperationalGoal = data.operationalGoal || [];
    const resolvedCurrentWebsite = data.currentWebsite || [];
    const resolvedPages = data.pages || [];
    const resolvedFeatures = data.features || [];
    const resolvedInfrastructure = data.infrastructure || [];
    const resolvedWebsitePlatforms = data.websitePlatforms || [];
    const resolvedRequiredPages = data.requiredPages || [];

    const dbData = {
      name: resolvedName,
      businessName: data.businessName ?? null,
      email: data.email,
      phone: data.phone ?? null,
      businessType: resolvedBusinessType,
      operationalGoal: resolvedOperationalGoal,
      currentWebsite: resolvedCurrentWebsite,
      pages: resolvedPages,
      features: resolvedFeatures,
      infrastructure: resolvedInfrastructure,
      support: resolvedSupport,
      customRequests: resolvedCustomRequests,
      websitePlatforms: resolvedWebsitePlatforms,
      budgetRange: data.budgetRange ?? null,
      needDomain: data.needDomain ?? null,
      needHosting: data.needHosting ?? null,
      googleBusinessProfile: data.googleBusinessProfile ?? null,
      instagramBusinessPage: data.instagramBusinessPage ?? null,
      facebookBusinessPage: data.facebookBusinessPage ?? null,
      primaryGoal: data.primaryGoal ?? null,
      requiredPages: resolvedRequiredPages,
    };

    return this.prisma.contactInquiry.create({ data: dbData });
  }

  async findAll(): Promise<ContactInquiry[]> {
    return this.prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: UpdateInquiryDto): Promise<ContactInquiry> {
    return this.prisma.contactInquiry.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<ContactInquiry> {
    return this.prisma.contactInquiry.delete({
      where: { id },
    });
  }

  async generateProposal(id: string) {
    const inquiry = await this.prisma.contactInquiry.findUnique({ where: { id } });
    if (!inquiry) {
      throw new BadRequestException('Inquiry not found');
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const prompt = `You are the Lead Digital Architect at Aurion Labs. Generate a professional website scoping proposal for a client.
Client Name: ${inquiry.name}
Business Name: ${inquiry.businessName || 'Not specified'}
Business Type: ${inquiry.businessType.join(', ')}
Primary Goal: ${inquiry.primaryGoal || 'Not specified'}
Budget Range: ${inquiry.budgetRange || 'Not specified'}
Required Pages: ${inquiry.requiredPages.join(', ')}
Features Requested: ${inquiry.features.join(', ')}
Infrastructure Requested: ${inquiry.infrastructure.join(', ')}
Support Level Preference: ${inquiry.support}
Custom Requirements: ${inquiry.customRequests || 'None'}

Generate a structured JSON proposal strictly matching this schema:
{
  "title": "Project Proposal for ${inquiry.businessName || inquiry.name}",
  "clientName": "${inquiry.name}",
  "businessName": "${inquiry.businessName || ''}",
  "executiveSummary": "A highly compelling 3-4 sentence summary of their goals, how Aurion Labs will address them, and the value we will deliver.",
  "recommendedStack": {
    "platform": "Recommended platform name",
    "whyRecommended": "Detailed reason why this stack is the perfect fit.",
    "pros": ["Pro 1", "Pro 2"],
    "cons": ["Con 1"]
  },
  "featuresList": [
    { "name": "Feature name", "description": "Short description", "costImpact": "Included" }
  ],
  "milestones": [
    { "phase": "Phase 1", "title": "Discovery & Planning", "duration": "3-5 days", "deliverables": ["UX Wireframes", "Tech Stack Setup"] },
    { "phase": "Phase 2", "title": "Design & Prototyping", "duration": "5-7 days", "deliverables": ["UI Mockups", "Feedback iterations"] },
    { "phase": "Phase 3", "title": "Development & Integration", "duration": "7-10 days", "deliverables": ["Frontend Coding", "Third-party APIs"] },
    { "phase": "Phase 4", "title": "Testing & Launch", "duration": "3-4 days", "deliverables": ["Device testing", "Deploy", "Analytics check"] }
  ],
  "pricing": {
    "oneTimeFee": "One-time setup fee in INR (e.g. ₹15,000)",
    "oneTimeDetail": "What setup covers",
    "monthlyFee": "Monthly recurring fee in INR (e.g. ₹1,499/mo)",
    "monthlyDetail": "What monthly covers"
  }
}
Return strictly JSON. Do not wrap in markdown blocks.`;

        // Node 18 global fetch support
        const globalFetch = (global as any).fetch || fetch;
        const response = await globalFetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        });

        if (response.ok) {
          const resJson = await response.json();
          const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const proposal = JSON.parse(text);
            if (inquiry.adjustedSetupFee) {
              proposal.pricing.oneTimeFee = inquiry.adjustedSetupFee;
            }
            if (inquiry.adjustedMonthlyFee) {
              proposal.pricing.monthlyFee = inquiry.adjustedMonthlyFee;
            }
            return { ...proposal, source: 'ai' };
          }
        }
      } catch (e) {
        console.error('Error generating AI proposal, falling back to rule engine:', e);
      }
    }

    // Fallback: Deterministic Rule Engine
    return this.generateDeterministicProposal(inquiry);
  }

  private generateDeterministicProposal(inquiry: ContactInquiry) {
    // 1. Tech Stack Recommendation
    let platform = 'WordPress with Custom Theme & Elementor';
    let whyRecommended = 'Based on your requirements, WordPress is recommended to provide easy content editing, a robust plugin ecosystem, and fast delivery, all while fitting comfortably in your budget.';
    let pros = [
      'Easy self-management and content editing without coding knowledge',
      'Extremely fast turnaround and lower development overhead',
      'Wide availability of plugins for features like contact forms and SEO'
    ];
    let cons = [
      'Relies on plugins for advanced booking workflows',
      'Regular security and plugin updates are required to maintain stability'
    ];

    const platforms = inquiry.websitePlatforms || [];
    if (platforms.includes('Custom Coded Website')) {
      platform = 'Custom Next.js Frontend & NestJS Backend';
      whyRecommended = 'We recommend a custom Next.js web application to ensure absolute top-tier loading speeds, custom operational logic, robust SEO indexing, and the freedom to build bespoke workflows that scale.';
      pros = [
        'Unmatched speed & performance (highly optimized for search engine rankings)',
        '100% custom styling and workflow logic without template limitations',
        'High security with server-side rendering and API separation'
      ];
      cons = [
        'Higher setup cost and development complexity',
        'Requires developer support for major structural modifications'
      ];
    } else if (platforms.includes('Shopify')) {
      platform = 'Shopify Storefront';
      whyRecommended = 'Shopify is recommended because your primary focus involves dynamic e-commerce, product catalogues, cart flows, and secure third-party checkout ecosystems.';
      pros = [
        'Industry-standard secure checkout and payment gateway integrations out-of-the-box',
        'Highly optimized inventory and order management system dashboard',
        'Excellent scalability for high-traffic commerce events'
      ];
      cons = [
        'Monthly subscription costs for Shopify platform and premium apps',
        'Design customizations are limited by Shopify Liquidity/Themes engine'
      ];
    } else if (platforms.includes('Webflow')) {
      platform = 'Webflow CMS Builder';
      whyRecommended = 'Webflow is recommended to bridge the gap between clean designer-first layouts and database CMS capabilities, keeping hosting completely managed and uptime reliable.';
      pros = [
        'Outstanding designer-grade visual customization and micro-interactions',
        'Built-in structured database (CMS) for blogs, services, or portfolios',
        'Zero-maintenance hosting backed by AWS and Fastly CDN'
      ];
      cons = [
        'Higher monthly hosting plans compared to simple shared servers',
        'Exporting code requires a paid account and breaks active CMS functionalities'
      ];
    } else if (platforms.includes('Wix Studio') || platforms.includes('Wix')) {
      platform = 'Wix Studio';
      whyRecommended = 'Wix Studio is selected to combine drag-and-drop flexibility with premium responsive frameworks, making it optimal for small local services and styling agencies.';
      pros = [
        'Fast prototype-to-production deployment times',
        'Wix Bookings and Forms work directly without custom API bridges',
        'Simple client editor dashboard for local staff'
      ];
      cons = [
        'Locked into Wix hosting environment and subscription tiers',
        'Performance is good but can be limited compared to bespoke code'
      ];
    } else if (platforms.includes('Framer')) {
      platform = 'Framer';
      whyRecommended = 'Framer is recommended for a design-centric, interactive website where fast design imports and smooth animations are critical, best suited for portfolios and landing pages.';
      pros = [
        'Stunning layout transitions and rich responsive typography support',
        'Direct import from Figma designs makes building visual mockups instant',
        'No backend setup required for basic landing and service pages'
      ];
      cons = [
        'Limited support for complex databases or custom booking/user accounts',
        'Monthly hosting fees apply per project'
      ];
    }

    // 2. Pricing Calculator
    let setupFee = '₹14,999';
    let setupDetail = 'Covers complete design, building responsive layouts, basic SEO structure, WhatsApp integration, and deployment to staging/production environment.';
    const budget = inquiry.budgetRange || '';
    if (budget.includes('Under ₹5,000')) {
      setupFee = '₹4,999';
      setupDetail = 'Covers lightweight single-page website design, mobile responsiveness, contact forms, WhatsApp link, and deployment.';
    } else if (budget.includes('₹5,000–₹10,000')) {
      setupFee = '₹8,999';
      setupDetail = 'Covers 2-4 core pages layout, mobile-first design, services breakdown, contact routing, and standard SEO optimizations.';
    } else if (budget.includes('₹10,000–₹20,000')) {
      setupFee = '₹17,999';
      setupDetail = 'Covers up to 6 custom pages, intake forms, WhatsApp routing integrations, basic CMS setup, and complete setup handoff.';
    } else if (budget.includes('₹20,000+')) {
      setupFee = '₹34,999';
      setupDetail = 'Covers fully customized website stack, advanced intake/booking workflows, custom animations, CRM routing, and live monitoring setup.';
    }

    let recurringFee = '₹1,299/mo';
    let recurringDetail = 'Includes standard hosting maintenance, SSL certificate renewal, weekly automated backups, and basic support response within 48h.';
    const supportOpt = inquiry.support || '';
    if (supportOpt.includes('Monthly Maintenance')) {
      recurringFee = '₹999/mo';
      recurringDetail = 'Includes secure hosting, active SSL certificate, regular uptime monitoring, and monthly database backups.';
    } else if (supportOpt.includes('Quarterly Support')) {
      recurringFee = '₹1,499/mo';
      recurringDetail = 'Includes hosting, SSL, uptime monitoring, quarterly maintenance check, and minor content edit support.';
    } else if (supportOpt.includes('Half-Yearly Support')) {
      recurringFee = '₹1,999/mo';
      recurringDetail = 'Includes hosting, premium SSL, database backups, uptime checks, and priority support for half-yearly edits (up to 2h development time/mo).';
    } else if (supportOpt.includes('Yearly Operational Support')) {
      recurringFee = '₹2,999/mo';
      recurringDetail = 'Priority developer queue support, monthly performance review, uptime logs, search console monitoring, and 5h development edits support/mo.';
    }

    // 3. Features list mapping
    const featuresList = [];
    const pages = inquiry.requiredPages || inquiry.pages || [];
    if (pages.length > 0) {
      featuresList.push({
        name: `${pages.length} Custom Pages Layout`,
        description: `Design and development of requested pages: ${pages.join(', ')}.`,
        costImpact: 'Included'
      });
    } else {
      featuresList.push({
        name: 'Standard Responsive Layout',
        description: 'Design and construction of Home, Services, About, and Contact layouts.',
        costImpact: 'Included'
      });
    }

    const feats = inquiry.features || [];
    if (feats.includes('WhatsApp Integration') || inquiry.phone) {
      featuresList.push({
        name: 'WhatsApp Scoping & Routing',
        description: 'Direct CTAs connected to WhatsApp Business with pre-filled inquiries routing.',
        costImpact: 'Included'
      });
    }
    if (inquiry.needDomain) {
      featuresList.push({
        name: 'Domain Connection & DNS Setup',
        description: 'Buying and configuring your custom brand domain (e.g. yourbrand.com) and SSL mappings.',
        costImpact: 'Included'
      });
    }
    if (inquiry.needHosting) {
      featuresList.push({
        name: 'Production Cloud Hosting Setup',
        description: 'Configuring secure production hosting pipeline for 99.9% uptime compliance.',
        costImpact: 'Included'
      });
    }
    if (inquiry.googleBusinessProfile) {
      featuresList.push({
        name: 'Google Business Profile Setup',
        description: 'Creating/optimizing your Google Local Maps listing to improve search visibility.',
        costImpact: 'Included'
      });
    }

    // 4. Milestones
    const milestones = [
      {
        phase: 'Phase 1',
        title: 'Discovery, Mapping & Sitemap',
        duration: '2-3 Days',
        deliverables: ['Design wireframes layout', 'Project scope alignment sign-off', 'Access configuration setup']
      },
      {
        phase: 'Phase 2',
        title: 'High-Fidelity Visual Design',
        duration: '3-4 Days',
        deliverables: ['UI/UX mockups delivery', 'Brand styling and typography layout setup', 'Feedback revision cycles']
      },
      {
        phase: 'Phase 3',
        title: 'Development & Workflow Integration',
        duration: '4-6 Days',
        deliverables: ['Responsive programming build', 'Forms & WhatsApp routing hooks testing', 'Integrations configurations']
      },
      {
        phase: 'Phase 4',
        title: 'Uptime Review, Testing & Launch',
        duration: '2 Days',
        deliverables: ['Cross-browser layout audit', 'SEO tags indexing & analytics validation', 'Live domain mapping & launch']
      }
    ];

    const title = inquiry.businessName
      ? `Project Scoping Proposal for ${inquiry.businessName}`
      : `Digital Infrastructure Proposal for ${inquiry.name}`;

    const clientName = inquiry.name;
    const businessName = inquiry.businessName || null;
    const primaryGoal = inquiry.primaryGoal || 'enhance digital presence';
    const bizTypes = inquiry.businessType && inquiry.businessType.length > 0
      ? inquiry.businessType.join(' & ')
      : 'service business';

    const executiveSummary = `We are pleased to submit this digital systems proposal to ${clientName} for building operational infrastructure for ${businessName || 'your business'}. Our primary objective is to build a high-performance system configured around ${primaryGoal} to help you get leads and convert bookings more reliably. By implementing a modern ${platform} setup, we will eliminate operational drag and ensure a premium front door for your ${bizTypes} brand.`;

    if (inquiry.adjustedSetupFee) {
      setupFee = inquiry.adjustedSetupFee;
    }
    if (inquiry.adjustedMonthlyFee) {
      recurringFee = inquiry.adjustedMonthlyFee;
    }

    return {
      title,
      clientName,
      businessName,
      executiveSummary,
      recommendedStack: {
        platform,
        whyRecommended,
        pros,
        cons
      },
      featuresList,
      milestones,
      pricing: {
        oneTimeFee: setupFee,
        oneTimeDetail: setupDetail,
        monthlyFee: recurringFee,
        monthlyDetail: recurringDetail
      },
      source: 'rules'
    };
  }
}

