import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from './../product.model';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private producsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      //this.product = this.producsService.getProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.producsService.getProduct(id)
      .subscribe(product => {
        this.product = product;
      });
  }

  createProduct() {
    const newProduct: Product = {
      id: '100',
      title: "nuevo desde angular",
      image: "assets/images/hoodie.png",
      price: 30000,
      description: "nuevo pruducto"
    };
    this.producsService.createProduct(newProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  updateProduct(){
    const updateProduct: Partial<Product> = {
      price: 55555,
      image: "assets/images/hoodie.png",
      description: "edicion titulo"
    };
    this.producsService.updateProduct('100',updateProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  deleteProduct(){
    this.producsService.deleteProduct('100')
      .subscribe(product => {
        console.log(product);
      });
  }
}
