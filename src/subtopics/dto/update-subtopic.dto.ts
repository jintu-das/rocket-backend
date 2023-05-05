import { PartialType } from '@nestjs/mapped-types';
import { CreateSubtopicDto } from './create-subtopic.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubtopicDto extends PartialType(CreateSubtopicDto) {
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
