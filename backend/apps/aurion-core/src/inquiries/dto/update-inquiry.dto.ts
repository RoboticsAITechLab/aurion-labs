import { IsString, IsOptional, IsIn } from 'class-validator';

export const INQUIRY_STATUSES = ['NEW', 'REVIEWED', 'CONTACTED', 'CONVERTED', 'ARCHIVED'];

export class UpdateInquiryDto {
  @IsString()
  @IsOptional()
  @IsIn(INQUIRY_STATUSES)
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  adjustedSetupFee?: string;

  @IsString()
  @IsOptional()
  adjustedMonthlyFee?: string;

  @IsString()
  @IsOptional()
  clientSetupOffer?: string;

  @IsString()
  @IsOptional()
  clientMonthlyOffer?: string;

  @IsString()
  @IsOptional()
  clientMessage?: string;
}
