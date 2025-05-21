import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MarkerType } from '../marker-type.enum';

export class CreatePostDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  type: MarkerType;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
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
