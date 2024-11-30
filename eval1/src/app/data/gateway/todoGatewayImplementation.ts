import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TodoItem } from '../../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoGatewayImplementation {

  private apiUrl = `${environment.todoApiUrl}/dogs`

  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  get(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  add(title: string, description: string, avatar: string | undefined, direction: string): Observable<TodoItem> {
    const newItem = { title, description, avatar, direction};
    return this.http.post<TodoItem>(this.apiUrl, newItem);
  }

  remove(id: number): Observable<void> {
    console.log('Removing todo with id', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
