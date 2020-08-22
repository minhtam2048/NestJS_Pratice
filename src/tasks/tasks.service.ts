import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { Task } from '../interfaces/task.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from './dto/create-task.dto';
import { exception } from 'console';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskFilterDTO } from './dto/task-filter.dto';
import { UsersService } from 'src/users/users.service';
import { CreateCommentDTO } from 'src/users/dto/create-comment.dto';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') 
    private readonly taskModel: Model<Task>,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService
   ) {}

  async createTask(createTaskDTO: CreateTaskDTO, userId: string): Promise<Task> {

    const user = await this.usersService.getSingleUser(userId);
    console.log(user);
    createTaskDTO.user = user._id;

    const task = new this.taskModel(createTaskDTO);
    
    const result = await task.save();
    return result;
  }

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }


  async getTasksWithFilter(filterDTO: TaskFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    let tasks = await this.getAllTasks();
    
    if(status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if(search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  async getSingleTask(taskId: string): Promise<Task> {
    try {
      const task = await this.findTaskById(taskId);
      return task;
    } catch (error) {
      throw new NotFoundException(error);
    }

  }

  async updateTask(taskId: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    try{
      const task = await this.taskModel.findByIdAndUpdate(taskId, updateTaskDTO, {new: true}).exec();   
      return task;
    }catch (error){
      throw new NotFoundException("Could not find this task");    
    }
  }

  async deleteTask(taskId: string) : Promise<void> {
    try {
      const task = await this.findTaskById(taskId)
      await this.taskModel.deleteOne(task).exec();
    } catch(error) {
      console.log(error)
      throw new exception('Errors has happened', error)
    }
  }

  private async findTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    
    if (!task) {
      throw new NotFoundException('Could not find this task');
    }

    return task;
  }

  async createComment(commentatorId: string, taskId: string, createCommentDTO: CreateCommentDTO) {
    const commentator = await this.usersService.getSingleUser(commentatorId);
    const task = await this.taskModel.findById(taskId);

    createCommentDTO.user_id = commentator._id;

    const newComment = await this.commentsService.createComment(createCommentDTO);
    console.log(newComment);

    task.comments.unshift(newComment);

    await task.save();
  }
}

