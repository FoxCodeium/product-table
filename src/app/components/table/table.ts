import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { greaterThanZero } from '../../Validators/greater-than-zero.validator';

@Component({
  selector: 'app-table',
  imports: [
    DecimalPipe,
    CommonModule,
    NgClass,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table implements OnInit {
  public page = 1;
  public pageSize = 10;
  public readonly Math = Math;
  public products: Product[] = [];
  public search = new FormControl<string>('', { nonNullable: true });
  private modalService = inject(NgbModal);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [null as number | null, [Validators.required, greaterThanZero()]],
    stock: [
      null as number | null,
      [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)],
    ],
  });

  get controls() {
    return this.form.controls;
  }

  get filteredProducts(): Product[] {
    const q = this.search.value.trim().toLowerCase();
    if (!q) return this.products;
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q) ||
        String(p.stock).includes(q)
    );
  }

  get paginatedProducts(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.form.reset();
    this.modalService.open(content, { centered: true });
  }

  addProduct(modalRef: any) {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, price, stock } = this.form.getRawValue();

    this.productsService.addProduct({
      name: name!.trim(),
      price: Number(price),
      stock: Number(stock),
    });
    modalRef.close();
  }
}
