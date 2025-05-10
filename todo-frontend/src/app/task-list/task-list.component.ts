import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTask: any = {
    title: '',
    assignedTo: '',
    status: 'Not Started',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    completed: false
  };
  editingTask: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks || [];
    });
  }

  createTask() {
    if (this.newTask.title) {
      this.taskService.createTask(this.newTask).subscribe(task => {
        this.tasks = [...this.tasks, task];
        this.resetForm();
      });
    }
  }

  startEdit(task: any) {
    this.editingTask = {...task};
  }

  updateTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask._id, this.editingTask).subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  toggleTaskCompletion(task: any) {
    this.taskService.updateTask(task._id, task).subscribe();
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t._id !== id);
      });
    }
  }

  resetForm() {
    this.newTask = {
      title: '',
      assignedTo: '',
      status: 'Not Started',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      completed: false
    };
  }

  search(term: string) {
    // Implement your search logic
  }

  // Pagination methods
  goToFirst() {}
  goToPrev() {}
  goToNext() {}
  goToLast() {}
}