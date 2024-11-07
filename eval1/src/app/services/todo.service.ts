import { Injectable } from '@angular/core';
import { TodoRepository } from '../data/repository';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private repository = TodoRepository.getInstance();

  getAll(): TodoItem[] {
    return this.repository.getAll();
  }

  add(title: string, description: string) {
    this.repository.add(title, description);
  }

  remove(id: number) {
    this.repository.remove(id);
  }

  get(id: number): TodoItem {
    const todo = this.repository.get(id);
    if (!todo) {
      throw new Error(`Tarea con id ${id} no encontrada`);
    }
    return todo;
  }
}
