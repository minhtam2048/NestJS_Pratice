import { Controller, Get, Res, HttpStatus, Post, Body, Param, Put, Delete, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

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

  @Get()
  async getAllTasks(@Res() res): Promise<Task[]> {
    const tasks = await this.taskService.getAllTasks();
    return res.status(HttpStatus.OK).json(tasks);
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
