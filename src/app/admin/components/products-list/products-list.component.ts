import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@core/model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe((rta) => {
      console.log('Product deleted rta::::', rta);
      if (rta) {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    });
  }
}
