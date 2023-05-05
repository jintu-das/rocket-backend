import { Topic } from 'src/topics/entities/topic.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Subtopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  paraOne: string;

  @Column()
  paraTwo: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Topic, (topic) => topic.subtopics)
  topic: Topic;
}
