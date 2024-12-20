import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storageService.isLoggedIn();
    if (!isLoggedIn) {
      await this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
