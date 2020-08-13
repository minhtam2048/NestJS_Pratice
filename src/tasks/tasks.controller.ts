import { Controller, Get, Res, HttpStatus, Post, Body, Param, Put, Delete, NotFoundException, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../interfaces/task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskFilterDTO } from './dto/task-filter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
    const task = await this.taskService.createTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: "Task was created successfully",
      task
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Res() res, @Query(ValidationPipe) filterDTO: TaskFilterDTO): Promise<Task[]> {
    if(Object.keys(filterDTO).length) {
      const tasks = await this.taskService.getTasksWithFilter(filterDTO);
      console.log(tasks);
      return res.status(HttpStatus.OK).json(tasks);
    } else {
      const tasks = await this.taskService.getAllTasks();
      console.log(tasks);
      return res.status(HttpStatus.OK).json(tasks);
    }
  }

  @Get(':taskId')
  async getTaskById(@Res() res, @Param('taskId') taskId): Promise<Task> {
    const task = await this.taskService.getSingleTask(taskId);
    return res.status(HttpStatus.OK).json(task);
  }
  
  @Put(':taskId')
  @UsePipes(ValidationPipe)
  async updateTask(@Res() res, @Param('taskId') taskId, @Body() updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskService.updateTask(taskId, updateTaskDTO);
    
    return res.status(HttpStatus.OK).json({
      message: 'Task was updated successfully',
      task
    });
  }

  @Delete(':taskId')
  async deleteTask(@Res() res, @Param('taskId') taskId) {
    await this.taskService.deleteTask(taskId)
    return res.status(HttpStatus.OK).json({
      message: 'Task was deleted successfully',
    });
  }
}
