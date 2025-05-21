import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MarkerType } from '../marker-type.enum';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  type: MarkerType;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsNumber()
  score: number;

  @IsArray()
  imageUris: { uri: string }[];
}
