import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { SubtopicsController } from './subtopics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subtopic]), TopicsModule],
  controllers: [SubtopicsController],
  providers: [SubtopicsService],
})
export class SubtopicsModule {}
