import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly artist;

  @IsOptional()
  @IsDateString()
  readonly releaseDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsOptional()
  @IsString()
  readonly lyrics;
}
