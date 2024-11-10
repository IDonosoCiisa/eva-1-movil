import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    loadComponent: () => import('./pages/listar/listar.page').then( m => m.ListarProductosPage)
  },
  {
    path: 'agregar',
    loadComponent: () => import('./pages/agregar/agregar.page').then( m => m.AgregarPage)
  },
  {
    path: 'editar',
    loadComponent: () => import('./pages/editar/editar.page').then( m => m.EditarPage)
  },
  {
    path: 'detalles',
    loadComponent: () => import('./pages/detalles/detalles.page').then( m => m.DetallesPage)
  },

];
