import {Injectable} from '@angular/core';
import {Geolocation, Position} from "@capacitor/geolocation";

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async getLocalization(): Promise<Position> {
    return await Geolocation.getCurrentPosition()
  }
  async checkGeoPermissions(): Promise<boolean> {
    let permissions = await Geolocation.checkPermissions();
    if (permissions.location !== 'granted') permissions = await Geolocation.requestPermissions();
    return permissions.location === 'granted';
  }
}
