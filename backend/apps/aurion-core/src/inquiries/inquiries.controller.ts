import { Body, Controller, Get, Post, Patch, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private inquiriesService: InquiriesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() body: CreateInquiryDto) {
    return this.inquiriesService.create(body);
  }

  @Get()
  async findAll() {
    return this.inquiriesService.findAll();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async update(@Param('id') id: string, @Body() body: UpdateInquiryDto) {
    return this.inquiriesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.inquiriesService.delete(id);
  }
}
