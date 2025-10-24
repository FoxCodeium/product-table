import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsSignal = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1200, stock: 30 },
    { id: 2, name: 'Smartphone', price: 850, stock: 45 },
    { id: 3, name: 'Tablet', price: 600, stock: 20 },
    { id: 4, name: 'Monitor', price: 400, stock: 25 },
    { id: 5, name: 'Teclado Mecánico', price: 150, stock: 60 },
    { id: 6, name: 'Mouse Gamer', price: 90, stock: 80 },
    { id: 7, name: 'Audífonos Bluetooth', price: 200, stock: 50 },
    { id: 8, name: 'Cámara Web HD', price: 250, stock: 40 },
    { id: 9, name: 'Disco SSD 1TB', price: 300, stock: 35 },
    { id: 10, name: 'Memoria RAM 16GB', price: 180, stock: 70 },
    { id: 11, name: 'Smartwatch', price: 320, stock: 25 },
    { id: 12, name: 'Router Wi-Fi 6', price: 270, stock: 15 },
    { id: 13, name: 'Consola Portátil', price: 900, stock: 10 },
    { id: 14, name: 'Impresora Multifuncional', price: 350, stock: 18 },
    { id: 15, name: 'Proyector LED', price: 650, stock: 12 },
  ]);

  public products = this.productsSignal.asReadonly();
  private products$ = toObservable(this.productsSignal);

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(productData: Omit<Product, 'id'>) {
    const currentProducts = this.productsSignal();
    const maxId =
      currentProducts.length > 0
        ? Math.max(...currentProducts.map((p) => p.id))
        : 0;

    const newProduct: Product = {
      ...productData,
      id: maxId + 1,
    };

    this.productsSignal.update((products) => [...products, newProduct]);
  }

  deleteProduct(productId: number) {
    this.productsSignal.update((currentProducts) =>
      currentProducts.filter((p) => p.id !== productId)
    );
  }
}
