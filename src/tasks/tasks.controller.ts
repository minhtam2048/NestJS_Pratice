import { Controller, Get, Res, HttpStatus, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../interfaces/task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskFilterDTO } from './dto/task-filter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentDTO } from 'src/users/dto/create-comment.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req, @Res() res, @Body(ValidationPipe) createTaskDTO: CreateTaskDTO) {
 
    const task = await this.taskService.createTask(createTaskDTO, req.user._id);
    return res.status(HttpStatus.OK).json({
      message: "Task was created successfully",
      task
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Res() res, @Param('taskId') taskId): Promise<Task> {
    const task = await this.taskService.getSingleTask(taskId);
    return res.status(HttpStatus.OK).json(task);
  }
  
  @Put(':taskId')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateTask(@Res() res, @Param('taskId') taskId, @Body() updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskService.updateTask(taskId, updateTaskDTO);
    
    return res.status(HttpStatus.OK).json({
      message: 'Task was updated successfully',
      task
    });
  }

  @Delete(':taskId')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Res() res, @Param('taskId') taskId) {
    await this.taskService.deleteTask(taskId)
    return res.status(HttpStatus.OK).json({
      message: 'Task was deleted successfully',
    });
  }

  @Post('/comment/:taskId')
  @UseGuards(JwtAuthGuard)
  async commentTask(@Res() res, @Request() req, @Param('taskId') taskId , @Body() createCommentDTO: CreateCommentDTO) {
    const comment = await this.taskService.createComment(req.user._id, taskId, createCommentDTO);

    return res.status(HttpStatus.OK).json({
      message: "comment was created successfully",
      comment
    });
  }
}
