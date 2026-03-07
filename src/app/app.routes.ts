import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then(m => m.Products)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        canActivate: [AuthGuard]
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '**',
        loadComponent: () => import('./pages/notfound/notfound').then(m => m.Notfound)
    }
];
