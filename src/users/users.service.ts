import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  
  async getSingleUser(userId: string) {
    const user = await this.userModel.findById(userId)
    
    if(!user) {
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }
}
