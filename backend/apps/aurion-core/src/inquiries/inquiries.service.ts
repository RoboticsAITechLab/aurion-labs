import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { ContactInquiry } from '@prisma/client';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInquiryDto): Promise<ContactInquiry> {
    return this.prisma.contactInquiry.create({ data });
  }

  async findAll(): Promise<ContactInquiry[]> {
    return this.prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string): Promise<ContactInquiry> {
    return this.prisma.contactInquiry.delete({
      where: { id },
    });
  }
}
