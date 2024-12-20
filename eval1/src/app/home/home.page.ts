import { Component, OnInit } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonImg} from '@ionic/angular/standalone';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../models/todo-item.model';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {CameraService} from "../services/camera.service";
import {GeoService} from '../services/geo.service';
import {StorageService} from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, FormsModule, NgForOf, AsyncPipe, IonImg],
})
export class HomePage implements OnInit {
  // @ts-ignore
  todos: Observable<TodoItem[]> = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  newTodoPhoto: string | undefined = '';
  location: { latitude: number; longitude: number } | null = null;
  address: string | null = null;

  constructor(private router : Router, private todoService: TodoService, private cameraService: CameraService, private GeoService: GeoService, private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loadTodos();
    this.loadLocation(); // Carga la ubicación al inicializar
  }

  loadTodos() {
    this.todos = this.todoService.getAll();
  }

  async loadLocation() {
    try {
      // Obtiene las coordenadas
      this.location = await this.GeoService.getCurrentPosition();

      // Si la ubicación es válida, obtiene la dirección
      if (this.location) {
        this.address = await this.GeoService.getAddressFromCoordinates(
          this.location.latitude,
          this.location.longitude
        );
        console.log('Dirección obtenida:', this.address);
      }
    } catch (error) {
      console.error('Error al obtener la ubicación o dirección:', error);
      this.location = null;
      this.address = null;
    }
  }

  async addTodo() {
    let permissions = await this.cameraService.checkCameraPermissions();
    if (this.newTodoTitle && this.newTodoDescription) {
      if (permissions) {
        this.newTodoPhoto = await this.takePhoto();

        const currentLocation = this.location
          ? `Lat: ${this.location.latitude}, Lon: ${this.location.longitude}`
          : 'Ubicación no disponible';

        const currentAddress = this.address || 'Dirección no disponible';

        console.log('Ubicación al agregar todo:', currentLocation);
        console.log('Dirección al agregar todo:', currentAddress);


        this.todoService.add(this.newTodoTitle, this.newTodoDescription, this.newTodoPhoto).subscribe(() => {
          this.loadTodos();
        });
        this.newTodoTitle = '';
        this.newTodoDescription = '';
      }
    }
  }

  async takePhoto() {
    const image = await this.cameraService.takePhoto();
    return image.dataUrl;
  }

  removeTodo(id: number) {
    this.todoService.remove(id).subscribe(() => {
      this.loadTodos();
    });
  }
  async logout() {
    await this.storageService.logout();
    await this.router.navigate(['/auth']);

  }
}
