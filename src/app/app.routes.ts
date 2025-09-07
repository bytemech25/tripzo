import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'destinations', loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent) },
  { path: 'tours', loadComponent: () => import('./pages/tours/tours.component').then(m => m.ToursComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];

