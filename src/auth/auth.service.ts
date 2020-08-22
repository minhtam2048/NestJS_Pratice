import { Injectable, ConflictException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.model';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) {}

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

  async signIn(user: User): Promise<any> {
    user = await this.userModel.findOne(user);
    const payload = { 
      username: user.username,
      email: user.email, 
      sub: user._id 
    };
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });

    if(!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    
    if(valid) {
      return user;
    }

    return null;
  }
}
