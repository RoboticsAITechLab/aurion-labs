import { IsString, IsOptional, IsEmail, IsArray, IsBoolean, IsIn } from 'class-validator';

export const WEBSITE_PLATFORM_OPTIONS = [
  'WordPress',
  'Wix',
  'Wix Studio',
  'Hostinger Website Builder',
  'Shopify',
  'Webflow',
  'Framer',
  'Squarespace',
  'Custom Coded Website',
  'Not Sure (Recommend Best Option)'
];

export const BUDGET_RANGE_OPTIONS = [
  'Under ₹5,000',
  '₹5,000–₹10,000',
  '₹10,000–₹20,000',
  '₹20,000+',
  'Not Decided'
];

export const PRIMARY_GOAL_OPTIONS = [
  'Lead Generation',
  'Appointment Booking',
  'Online Store',
  'Portfolio',
  'Information Website',
  'Internal Business Tool'
];

export const REQUIRED_PAGE_OPTIONS = [
  'Home',
  'About',
  'Services',
  'Contact',
  'Gallery',
  'Portfolio',
  'Pricing',
  'Testimonials',
  'Blog',
  'FAQ',
  'Custom'
];

export class CreateInquiryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  businessType?: string | string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  operationalGoal?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  currentWebsite?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pages?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  infrastructure?: string[];

  @IsString()
  @IsOptional()
  support?: string;

  @IsString()
  @IsOptional()
  customRequests?: string;

  @IsString()
  @IsOptional()
  customRequirements?: string;

  // New Fields
  @IsArray()
  @IsString({ each: true })
  @IsIn(WEBSITE_PLATFORM_OPTIONS, { each: true })
  @IsOptional()
  websitePlatforms?: string[];

  @IsString()
  @IsIn(BUDGET_RANGE_OPTIONS)
  @IsOptional()
  budgetRange?: string;

  @IsBoolean()
  @IsOptional()
  needDomain?: boolean;

  @IsBoolean()
  @IsOptional()
  needHosting?: boolean;

  @IsBoolean()
  @IsOptional()
  googleBusinessProfile?: boolean;

  @IsBoolean()
  @IsOptional()
  instagramBusinessPage?: boolean;

  @IsBoolean()
  @IsOptional()
  facebookBusinessPage?: boolean;

  @IsString()
  @IsIn(PRIMARY_GOAL_OPTIONS)
  @IsOptional()
  primaryGoal?: string;

  @IsArray()
  @IsString({ each: true })
  @IsIn(REQUIRED_PAGE_OPTIONS, { each: true })
  @IsOptional()
  requiredPages?: string[];
}

