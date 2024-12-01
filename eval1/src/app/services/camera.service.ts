import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {Geolocation} from "@capacitor/geolocation";

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async takePhoto(): Promise<Photo> {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }
  async checkCameraPermissions(): Promise<boolean> {
    let permissions = await Camera.checkPermissions();
    if (permissions.photos !== 'granted') permissions = await Camera.requestPermissions();
    return permissions.photos === 'granted';
  }
}
