import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { ILike, Like, Repository } from 'typeorm';
import { Topic } from 'src/topics/entities/topic.entity';

@Injectable()
export class SubtopicsService {
  constructor(@InjectRepository(Subtopic) private repo: Repository<Subtopic>) {}

  create(createSubtopicDto: CreateSubtopicDto, topic: Topic) {
    const subtopic = this.repo.create(createSubtopicDto);
    subtopic.topic = topic;
    return this.repo.save(subtopic);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const subtopic = await this.repo.findOneBy({
      id,
    });
    if (!subtopic) {
      throw new NotFoundException('Subtopic not found');
    }
    return subtopic;
  }

  async update(id: number, updateSubtopicDto: UpdateSubtopicDto) {
    const subtopic = await this.findOne(id);
    Object.assign(subtopic, updateSubtopicDto);
    return this.repo.save(subtopic);
  }

  async remove(id: number) {
    const subtopic = await this.findOne(id);
    return this.repo.remove(subtopic);
  }

  searchByTitle(title: string) {
    return this.repo.find({
      relations: {
        topic: true,
      },
      where: {
        title: ILike(`%${title}%`),
      },
    });
  }

  async findTopic(id: number) {
    const subtopic = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        topic: true,
      },
    });
    return subtopic;
  }
}
