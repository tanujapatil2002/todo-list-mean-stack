import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api'; // Base URL without endpoints

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<any[]> {
    const url = this.baseUrl + '/tasks';

    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new task
  createTask(task: any): Observable<any> {
    const url = this.baseUrl + '/task';

    return this.http.post<any>(url, task).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing task
  updateTask(id: string|number, task: any): Observable<any> {
    const url = `${this.baseUrl}/task/${id}`;
    return this.http.put<any>(url, task).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a task
  deleteTask(id: string|number): Observable<any> {
    const url = `${this.baseUrl}/task/${id}`; // Changed from "/tasks/task" to "/tasks"
    if (!id) {
      return throwError(() => new Error('Invalid task ID'));
    }
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        console.error('Delete failed:', error);
        return throwError(() => new Error('Delete operation failed'));
      })
    );
  }

  // Handle errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}