import { Injectable } from '@angular/core';
import { TodoGatewayImplementation } from '../data/gateway/todoGatewayImplementation';
import { TodoItem } from '../models/todo-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private gateway: TodoGatewayImplementation) {}

  getAll(): Observable<TodoItem[]> {
    console.log('Getting all todos');
    return this.gateway.getAll();
  }

  add(title: string, description: string, avatar: string | undefined): Observable<TodoItem> {
    return this.gateway.add(title, description, avatar);
  }

  remove(id: number): Observable<void> {
    console.log('Removing todo with id', id);
    return this.gateway.remove(id);
  }
}
