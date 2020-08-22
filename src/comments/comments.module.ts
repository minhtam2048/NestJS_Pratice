import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/comment.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        { name: 'Comment', schema: CommentSchema }
      ]
    )
  ],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
