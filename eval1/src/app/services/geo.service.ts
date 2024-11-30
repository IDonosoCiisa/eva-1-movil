import {Injectable} from '@angular/core';
import {Geolocation} from "@capacitor/geolocation";

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor() {}

  async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Coordinates:', coordinates);

      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };
    } catch (error) {
      console.error('Error al obtener la posición:', error);
      throw error; // Lanza el error para que pueda manejarse desde donde se llame
    }
  }
   // Método para obtener la dirección utilizando OpenStreetMap Nominatim API
   async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.display_name || 'Dirección no disponible';
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return null;
    }
  }
}