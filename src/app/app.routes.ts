import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '**', loadComponent: () => import('./components/product-dashboard/product-dashboard').then(m => m.ProductDashboard) },
];
