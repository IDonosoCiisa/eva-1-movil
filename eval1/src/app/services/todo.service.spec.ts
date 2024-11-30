import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo-item.model';

describe('TodoService Integration', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all todos', (done) => {
    service.getAll().subscribe(todos => {
      expect(todos).toBeTruthy();
      expect(todos.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new todo', (done) => {
    const newTodo: TodoItem = { id: 3, title: 'New Todo', description: 'New Description', avatar: '', direction: ''};

    service.add(newTodo.title, newTodo.description, newTodo.avatar, newTodo.direction).subscribe(todo => {
      expect(todo).toBeTruthy();
      expect(todo.title).toBe(newTodo.title);
      done();
    });
  });

  it('should remove a todo', (done) => {
    const todoId = 9;
    service.remove(todoId).subscribe(response => {
      expect(response).toBeTruthy();
      done();
    }, error => {
      done.fail(error);
    });
    }, 10000);
});
