import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApi = "http://localhost:3000";

  constructor(private http: HttpClient) {

  }

  newProduct(data: any) {
    return this.http.post<any>(this.baseApi + "/productList", data);
  }

  getProduct() {
    return this.http.get<any>(this.baseApi + "/productList");
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>(this.baseApi + "/productList/" + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.baseApi + "/productList/" + id);
  }
}
