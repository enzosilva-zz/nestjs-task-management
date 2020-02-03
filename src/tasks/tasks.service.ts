import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        // const {title, description} = createTaskDto; // * beautiful way

        const task: Task = {
            id: uuid(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}
