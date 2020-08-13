import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.model';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, email, password } = authCredentialsDTO;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, password: hashedPassword });

    try {
      await user.save();
    } catch( error ) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists!');
      }
      throw error;
    }
  }
}
