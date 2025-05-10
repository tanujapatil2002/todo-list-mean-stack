import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  newTask: any = {
    title: 'ss',
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Medium',
    comments: ''
  };

  @Output() taskAdded = new EventEmitter();

  constructor(private taskService: TaskService) {}

  // addTask() {
  //   if (this.newTask.title.trim()) {
  //     this.taskService.createTask(this.newTask).subscribe((task) => {
  //       this.taskAdded.emit(task);
  //       this.resetForm();
  //     });
  //   }
  // }



  resetForm() {
    this.newTask = {
      title: 'ss',
      assignedTo: '',
      status: 'Not Started',
      dueDate: '',
      priority: 'Medium',
      comments: ''
    };
  }
}