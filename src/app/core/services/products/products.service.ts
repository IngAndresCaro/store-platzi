import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../model/product.model';
import { environment } from './../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import * as Sentry from '@sentry/browser';


interface User {
  email: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/`)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products/`, product)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  //Atrapando errores a archivos
  getFile() {
    return this.http.get('assets/files/test.txt', { responseType: 'text' })
  }

  //En modo de ejemplo
  getRandomUsers(): Observable<User[]> {
    return this.http.get('https://randomuser.me/api/?results=2')
      .pipe(
        retry(3),
        catchError(this.handleError),
        map((response: any) => response.results.map(user => {
          return {
            email: user.email,
            gender: user.gender,
            phone: user.phone,
          } as User;
        }))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    Sentry.captureException(error)

    return throwError('Ups Algo Salio Mal')
  }
}
