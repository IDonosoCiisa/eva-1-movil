import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonCard, IonButton } from '@ionic/angular/standalone';

export interface Producto{
  nombre:String,
  descripcion:String,
  precio:number
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonCard, IonButton ]
})
export class ListarProductosPage implements OnInit {

  productos:Producto[] = [
    { nombre: 'Polerón', descripcion: 'Polerón personalizado con sublimación', precio: 20000 },
    { nombre: 'Velas', descripcion: 'Velas personalizadas', precio: 8000 },
    { nombre: 'Agendas', descripcion: 'Agendas personalizadas', precio: 15000 },
    { nombre: 'Bodys', descripcion: 'Bodys bebes personalizados', precio: 10000 },
  ]

  constructor() { }

  ngOnInit() {
  }

  eliminarProducto(index:number){
    this.productos.splice(index,1)
  }
  

}
