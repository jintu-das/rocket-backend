import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { SubtopicsModule } from './subtopics/subtopics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topics/entities/topic.entity';
import { ConfigModule } from '@nestjs/config';
import { Subtopic } from './subtopics/entities/subtopic.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Topic, Subtopic],
      synchronize: false,
    }),
    TopicsModule,
    SubtopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
