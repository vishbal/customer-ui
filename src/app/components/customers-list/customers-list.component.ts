import { Component } from '@angular/core';
import { ICustomer, getDefaultCustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customers?: ICustomer[];
  currentCustomer: ICustomer = getDefaultCustomer();
  currentIndex = -1;
  searchText = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAll()
      .subscribe({
        next: (data) => {
          this.customers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.getAllCustomers();
    this.currentCustomer = getDefaultCustomer();
    this.currentIndex = -1;
    sessionStorage.removeItem('currentCustomer')
  }

  setActiveCustomer(customer: ICustomer, index: number): void {
    this.currentCustomer = customer;
    this.currentIndex = index;
    sessionStorage.setItem('currentCustomer', JSON.stringify(this.currentCustomer));
  }

  removeAllCustomers(): void {
    this.customerService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.customers = [];
        },
        error: (e) => console.error(e)
      });
  }

  searchCustomer(): void {
    this.currentCustomer = getDefaultCustomer();
    this.currentIndex = -1;

    this.customers = this.customers?.filter(c => c.firstName.includes(this.searchText) || this.currentCustomer.lastName.includes(this.searchText));
  }

}
