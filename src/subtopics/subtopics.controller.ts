import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { TopicsService } from 'src/topics/topics.service';

@Controller('subtopics')
export class SubtopicsController {
  constructor(
    private readonly subtopicsService: SubtopicsService,
    private readonly topicsService: TopicsService,
  ) {}

  @Post()
  async create(
    @Body() createSubtopicDto: CreateSubtopicDto,
    @Query('topicId') topicId: string,
  ) {
    const topic = await this.topicsService.findOne(+topicId);
    return this.subtopicsService.create(createSubtopicDto, topic);
  }

  @Get()
  findAll() {
    return this.subtopicsService.findAll();
  }

  @Get('search')
  async searchByName(@Query('title') title: string) {
    return this.subtopicsService.searchByTitle(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtopicsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubtopicDto: UpdateSubtopicDto,
  ) {
    return this.subtopicsService.update(+id, updateSubtopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtopicsService.remove(+id);
  }

  @Get(':id/topic')
  findTopic(@Param('id') id: string) {
    return this.subtopicsService.findTopic(+id);
  }
}
