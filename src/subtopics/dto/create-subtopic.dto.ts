import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtopicDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  paraOne: string;

  @IsNotEmpty()
  @IsString()
  paraTwo: string;
}
