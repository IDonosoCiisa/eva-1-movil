import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TodoItem } from '../../models/todo-item.model';
import { StorageService } from '../../services/storage.service';
@Injectable({
  providedIn: 'root',
})
export class TodoGatewayImplementation {

  private apiUrl = `${environment.todoApiUrl}/dogs`

  constructor(private http: HttpClient, private storage: StorageService) {}

  async getAll(): Promise<TodoItem[]> {
    const items = await this.http.get<TodoItem[]>(this.apiUrl).toPromise();
    const storagedItems: TodoItem[] = [];
    // @ts-ignore
    items.forEach(item => {
      const todoItem = { id: item.id, title: item.title, description: item.description, avatar: item.avatar };
      storagedItems.push(todoItem);
    });
    await this.storage.set('todos', storagedItems);
    return storagedItems;
  }

  get(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}/${id}`);
  }

  add(title: string, description: string, avatar: string | undefined): Observable<TodoItem> {
    const newItem = { title, description, avatar};
    return this.http.post<TodoItem>(this.apiUrl, newItem);
  }

  async remove(id: number): Promise<void> {
    console.log('Removing todo with id', id);
    await this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise();
    const todos: TodoItem[] = await this.storage.get('todos');
    await this.storage.set('todos', todos);
  }
}
