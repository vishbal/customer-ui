import { Component } from '@angular/core';
import { ICustomer, getDefaultCustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  customer: ICustomer = getDefaultCustomer();
  submitted = false;

  constructor(private customerService: CustomerService) { }

  saveCustomer(): void {
    const newCustomer: ICustomer = {
      ...getDefaultCustomer(),
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      email: this.customer.email
    };

    this.customerService.create(newCustomer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = getDefaultCustomer();
  }
}
