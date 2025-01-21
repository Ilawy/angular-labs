import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Product } from '../types/product';

interface ListResult{
  products: Product[];
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}


  getList(page: number = 0): Observable<ListResult>{    
    return this.http.get<ListResult>(`https://dummyjson.com/products?limit=10&skip=${(page) * 10}&select=title,price,rating,images,tags,stock`)
  }

  getOne(id: string){
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
  }

}
