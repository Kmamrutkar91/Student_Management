import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class StudentDto {
  @IsNumber()
  @IsNotEmpty()
  stdid: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  department: string;
}

//DTO - Data Transfer Object Schema
