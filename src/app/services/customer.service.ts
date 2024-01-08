import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/customer.model';

const baseUrl = 'https://localhost:7192/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(baseUrl);
  }

  getById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${baseUrl}/${id}`);
  }

  create(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(baseUrl, customer);
  }

  update(customer: ICustomer): Observable<any> {
    return this.http.put<ICustomer>(baseUrl, customer);
  }

  delete(customer: ICustomer): Observable<boolean> {
    return this.http.delete<boolean>(baseUrl, { body: customer });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteAll`);
  }

  // TODO: Good to Have
  findByName(searchText: string): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(`${baseUrl}?name=${searchText}`);
  }
}
