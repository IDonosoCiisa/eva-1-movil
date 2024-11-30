import {Injectable} from '@angular/core';
import {Geolocation, Position} from "@capacitor/geolocation";
import {GeoGatewayImpl} from "../data/gateway/geoGatewayImpl";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor(private gateway: GeoGatewayImpl) {}

  async getLocalization(): Promise<Position> {
    console.log('Getting localization');
    return await Geolocation.getCurrentPosition()
  }

  async checkGeoPermissions(): Promise<boolean> {
    console.log('Checking geo permissions');
    let permissions = await Geolocation.checkPermissions();
    if (permissions.location !== 'granted') permissions = await Geolocation.requestPermissions();
    return permissions.location === 'granted';
  }
  async getDirection(long: string, lat: string): Promise<string> {
    console.log('Getting direction');
    const direccion$ = this.gateway.getDirection(long, lat);
    const direccion = await firstValueFrom(direccion$);
    console.log(direccion);
    return direccion;
  }
}
