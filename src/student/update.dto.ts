import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class UpdateDto {
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
