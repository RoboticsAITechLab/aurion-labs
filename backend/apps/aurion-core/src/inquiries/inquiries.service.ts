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
}
