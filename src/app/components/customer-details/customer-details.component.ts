import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer, getDefaultCustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  @Input() viewMode = false;

  @Input() currentCustomer: ICustomer = getDefaultCustomer();
  
  message = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCustomer(this.route.snapshot.params["id"]);
    }
  }

  getCustomer(id: number): void {
    this.customerService.getById(id)
      .subscribe({
        next: (data) => {
          this.currentCustomer = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateCustomer(): void {
    this.message = '';
    this.currentCustomer.updatedDate = new Date();
    this.customerService.update(this.currentCustomer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Customer was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCustomer(): void {
    this.customerService.delete(this.currentCustomer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/customer']);
        },
        error: (e) => console.error(e)
      });
  }

}
