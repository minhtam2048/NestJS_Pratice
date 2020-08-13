import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/task.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from './dto/create-task.dto';
import { exception } from 'console';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = new this.taskModel(createTaskDTO);
    const result = await task.save();
    return result;
  }

  async getAllTasks(): Promise<Task[]>{
    const tasks = await this.taskModel.find().exec();
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
}
