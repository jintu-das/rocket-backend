import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @IsNotEmpty()
  @IsString()
  title: string;
}
