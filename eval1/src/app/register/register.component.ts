import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import {IonButton, IonContent, IonHeader, IonInput, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonButton, FormsModule]

})
export class RegisterComponent {
  registerEmail: string = '';
  registerPassword: string = '';
  registerFirstName: string = '';
  registerLastName: string = '';

  constructor(private storageService: StorageService, private router: Router) {}

  async register() {
    const result = await this.storageService.registerUser(this.registerEmail, this.registerPassword, this.registerFirstName, this.registerLastName);
    if (result) {
      await this.router.navigate(['/auth']);
    } else {
      alert('User already exists');
      this.registerEmail = '';
      this.registerPassword = '';
      this.registerFirstName = '';
      this.registerLastName = '';
    }
  }
}
