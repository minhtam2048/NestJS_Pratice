import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/Task.schema';
import { UsersModule } from 'src/users/users.module';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Task', schema: TaskSchema }
      ],
    ),
    UsersModule,
    CommentsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
