import { IsString, IsOptional, IsEmail, IsArray } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsArray()
  @IsString({ each: true })
  businessType: string[];

  @IsArray()
  @IsString({ each: true })
  operationalGoal: string[];

  @IsArray()
  @IsString({ each: true })
  currentWebsite: string[];

  @IsArray()
  @IsString({ each: true })
  pages: string[];

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsArray()
  @IsString({ each: true })
  infrastructure: string[];

  @IsString()
  support: string;

  @IsString()
  @IsOptional()
  customRequests?: string;
}
