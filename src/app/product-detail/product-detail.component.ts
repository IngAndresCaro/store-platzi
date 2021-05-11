import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import {Product} from './../product.model'
import {ProductsService} from './../products.service'

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
    this.route.params.subscribe((params: Params) =>{
      const id = params.id;
      this.product = this.producsService.getProduct(id);
    });
  }

}
