import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  findAll() {
    return this.topicRepository.find({
      relations: {
        subtopics: true,
      },
    });
  }

  async findOne(id: number) {
    const topic = await this.topicRepository.findOneBy({
      id,
    });
    if (!topic) throw new NotFoundException(`Topic not found`);
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.findOne(id);
    Object.assign(topic, updateTopicDto);
    return this.topicRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.findOne(id);
    return this.topicRepository.remove(topic);
  }

  async getAllSubtopics(id: number) {
    const topic = await this.topicRepository.findOne({
      where: { id },
      relations: {
        subtopics: true,
      },
    });
    if (!topic) throw new NotFoundException(`Topic not found`);
    return topic.subtopics;
  }
}
