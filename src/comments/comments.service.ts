import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDTO } from 'src/users/dto/create-comment.dto';
import { Model } from 'mongoose';
import { Comment } from 'src/interfaces/comment.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}
  
  async createComment(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const comment = new this.commentModel(createCommentDTO);
    return comment;
  }
}
