import { TodoItem } from '../models/todo-item.model';

export class TodoRepository {
  private static instance: TodoRepository;

  private items: TodoItem[] = [];

  private constructor() {
    this.items = [
      { id: 1, title: 'Agenda', description: 'Personalizada' },
      { id: 2, title: 'Poleron', description: 'Con estampado personalizado' },
      { id: 3, title: 'Vela', description: 'Personalizada' }
    ]
  };
  static getInstance(): TodoRepository {
    if (!TodoRepository.instance) {
      TodoRepository.instance = new TodoRepository();
    }
    return TodoRepository.instance;
  }

  getAll(): TodoItem[] {
    return this.items;
  }
  get(id: number): TodoItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  add(title: string, description: string): void {
    this.items.push({
      id: this.items.length + 1,
      description,
      title
    });
  }
  remove(id: number): void {
    try {
      this.items = this.items.filter((item) => item.id !== id);
    }
    catch (error) {
      console.log (error);
  }
}

}
