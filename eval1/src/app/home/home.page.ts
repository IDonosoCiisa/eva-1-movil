import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../models/todo-item.model';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, FormsModule, NgForOf],
})
export class HomePage implements OnInit {
  todos: TodoItem[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getAll();
  }

  addTodo() {
    if (this.newTodoTitle && this.newTodoDescription) {
      this.todoService.add(this.newTodoTitle, this.newTodoDescription);
      this.loadTodos();
      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }

  removeTodo(id: number) {
    this.todoService.remove(id);
    this.loadTodos();
  }
}