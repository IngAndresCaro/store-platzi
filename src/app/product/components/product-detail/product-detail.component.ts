import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@core/model/product.model';
import { ProductsService } from '@core/services/products/products.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.productsService.getProduct(params.id)
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
    this.productsService.createProduct(newProduct)
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
    this.productsService.updateProduct('100', updateProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  deleteProduct() {
    this.productsService.deleteProduct('100')
      .subscribe(product => {
        console.log(product);
      });
  }

  getRandonUsers() {
    this.productsService.getRandomUsers()
      .subscribe(
        users => {
          console.log(users);
        },
        error =>{
          console.error(error);
        }
      );
  }

  getFile() {
    this.productsService.getFile()
    .subscribe(content => {
      console.log(content);
      const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, 'hello world.txt');
    });
  }
}
