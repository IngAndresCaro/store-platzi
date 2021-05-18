import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@core/model/product.model';
import { ProductsService } from '@core/services/products/products.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private producsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.producsService.getProduct(params.id)
        })
      );
  }

  createProduct() {
    const newProduct: Product = {
      id: '100',
      title: 'nuevo desde angular',
      image: 'assets/images/hoodie.png',
      price: 30000,
      description: 'nuevo pruducto'
    };
    this.producsService.createProduct(newProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 55555,
      image: 'assets/images/hoodie.png',
      description: 'edicion titulo'
    };
    this.producsService.updateProduct('100', updateProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  deleteProduct() {
    this.producsService.deleteProduct('100')
      .subscribe(product => {
        console.log(product);
      });
  }

  getRandonUsers() {
    this.producsService.getRandomUsers()
      .subscribe(
        users => {
          console.log(users);
        },
        error =>{
          console.error(error);
        }
      );
  }
}
