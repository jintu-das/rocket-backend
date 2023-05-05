import { Subtopic } from 'src/subtopics/entities/subtopic.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Subtopic, (subtopic) => subtopic.topic)
  subtopics: Subtopic[];
}
