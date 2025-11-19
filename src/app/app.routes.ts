import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then(m => m.Products)
    },
    //{ path: '', redirectTo: 'home', pathMatch: 'full' }, 
    {
        path: '**',
        loadComponent: () => import('./pages/notfound/notfound').then(m => m.Notfound)
    }
];
